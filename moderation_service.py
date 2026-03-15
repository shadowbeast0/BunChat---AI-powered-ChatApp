import os, re, math, traceback, threading

# Silence the harmless "Thread-auto_conversion" JSON error from transformers
_orig_excepthook = threading.excepthook
def _quiet_excepthook(args):
    if args.thread and "auto_conversion" in (args.thread.name or ""):
        return  # harmless network-check failure — swallow it
    _orig_excepthook(args)
threading.excepthook = _quiet_excepthook

from dotenv import load_dotenv
load_dotenv()
from flask import Flask, request, jsonify
from transformers import pipeline as hf_pipeline
from sentence_transformers import SentenceTransformer
import requests as http_requests

GROQ_API_KEY = os.environ.get("GROQ_API_KEY", "")
GROQ_MODEL   = "llama-3.1-8b-instant"
GROQ_URL     = "https://api.groq.com/openai/v1/chat/completions"

# Per-model thresholds  (lower = stricter)
THRESH_TOXIC_BERT  = 0.35   # unitary/toxic-bert
THRESH_ROBERTA     = 0.40   # s-nlp/roberta_toxicity_classifier
THRESH_MARTIN      = 0.40   # martin-ha/toxic-comment-model

BLOCK_TOXIC_BERT   = 0.80
BLOCK_ROBERTA      = 0.80
BLOCK_MARTIN       = 0.80

PORT = int(os.environ.get("MODERATION_PORT", 5050))

app = Flask(__name__)

pipe_toxic_bert = None
pipe_roberta    = None
pipe_martin     = None
embedding_model = None


def get_pipe_toxic_bert():
    global pipe_toxic_bert
    if pipe_toxic_bert is None:
        print("[Moderation-PY] Loading unitary/toxic-bert …")
        pipe_toxic_bert = hf_pipeline(
            "text-classification",
            model="unitary/toxic-bert",
            top_k=None,
            device=-1,
        )
        print("[Moderation-PY] toxic-bert ready.")
    return pipe_toxic_bert


def get_pipe_roberta():
    global pipe_roberta
    if pipe_roberta is None:
        print("[Moderation-PY] Loading s-nlp/roberta_toxicity_classifier …")
        pipe_roberta = hf_pipeline(
            "text-classification",
            model="s-nlp/roberta_toxicity_classifier",
            top_k=None,
            device=-1,
        )
        print("[Moderation-PY] roberta_toxicity ready.")
    return pipe_roberta


def get_pipe_martin():
    global pipe_martin
    if pipe_martin is None:
        print("[Moderation-PY] Loading martin-ha/toxic-comment-model …")
        pipe_martin = hf_pipeline(
            "text-classification",
            model="martin-ha/toxic-comment-model",
            top_k=None,
            device=-1,
        )
        print("[Moderation-PY] toxic-comment-model ready.")
    return pipe_martin


def get_embedding_model():
    global embedding_model
    if embedding_model is None:
        print("[Moderation-PY] Loading all-MiniLM-L6-v2 …")
        embedding_model = SentenceTransformer("all-MiniLM-L6-v2")
        print("[Moderation-PY] all-MiniLM-L6-v2 ready.")
    return embedding_model


def _prewarm():
    for name, fn in [
        ("toxic-bert", get_pipe_toxic_bert),
        ("roberta-toxicity", get_pipe_roberta),
        ("toxic-comment-model", get_pipe_martin),
        ("all-MiniLM", get_embedding_model),
    ]:
        try:
            fn()
        except Exception as e:
            print(f"[Moderation-PY] {name} load error: {e}")


def cosine_sim(a, b):
    dot = sum(x * y for x, y in zip(a, b))
    na  = math.sqrt(sum(x * x for x in a))
    nb  = math.sqrt(sum(x * x for x in b))
    return dot / (na * nb + 1e-8)


PII_EMAIL = re.compile(r"[\w.\-]+@[\w.\-]+\.\w+")
PII_PHONE = re.compile(r"\b\d{10,}\b")


def anonymize(text: str) -> str:
    text = PII_EMAIL.sub("[email]", text)
    text = PII_PHONE.sub("[phone]", text)
    return text


def groq_chat(system_prompt: str, user_prompt: str, temperature=0.1, max_tokens=10):
    """Call Groq LLM and return the assistant text."""
    if not GROQ_API_KEY:
        return None
    resp = http_requests.post(
        GROQ_URL,
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {GROQ_API_KEY}",
        },
        json={
            "model": GROQ_MODEL,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user",   "content": user_prompt},
            ],
            "temperature": temperature,
            "max_tokens": max_tokens,
        },
        timeout=15,
    )
    resp.raise_for_status()
    data = resp.json()
    return (data.get("choices", [{}])[0]
                .get("message", {})
                .get("content", "")).strip()


# ─── Ensemble helpers ────────────────────────────────────────
def _extract_toxic_score(raw, positive_labels):
    """
    From a HF pipeline result (possibly nested), extract the max score
    among labels considered 'toxic/positive'.
    positive_labels: set of label strings that mean toxic.
    """
    results = raw[0] if raw and isinstance(raw[0], list) else raw
    toxic_score = 0.0
    for r in results:
        lbl = r["label"].lower().strip()
        if lbl in positive_labels:
            toxic_score = max(toxic_score, r["score"])
    return toxic_score


def _run_ensemble(text):
    """
    Run all 3 models on `text`.
    Returns a list of dicts:
      [{ model, toxic_score, suspicious_thresh, block_thresh }]
    """
    verdicts = []

    # 1) toxic-bert  –  toxic labels: toxic, severe_toxic, obscene, insult, threat, identity_hate
    try:
        pipe = get_pipe_toxic_bert()
        raw = pipe(text)
        toxic_labels = {"toxic", "severe_toxic", "obscene", "insult", "threat", "identity_hate"}
        score = _extract_toxic_score(raw, toxic_labels)
        verdicts.append({
            "model": "toxic-bert",
            "toxic_score": score,
            "suspicious_thresh": THRESH_TOXIC_BERT,
            "block_thresh": BLOCK_TOXIC_BERT,
        })
    except Exception as e:
        print(f"[Moderation-PY] toxic-bert error: {e}")

    # 2) roberta-toxicity  –  positive label = "toxic"
    try:
        pipe = get_pipe_roberta()
        raw = pipe(text)
        score = _extract_toxic_score(raw, {"toxic"})
        verdicts.append({
            "model": "roberta-toxicity",
            "toxic_score": score,
            "suspicious_thresh": THRESH_ROBERTA,
            "block_thresh": BLOCK_ROBERTA,
        })
    except Exception as e:
        print(f"[Moderation-PY] roberta error: {e}")

    # 3) martin-ha toxic-comment-model  –  positive label = "toxic"
    try:
        pipe = get_pipe_martin()
        raw = pipe(text)
        score = _extract_toxic_score(raw, {"toxic"})
        verdicts.append({
            "model": "martin-ha",
            "toxic_score": score,
            "suspicious_thresh": THRESH_MARTIN,
            "block_thresh": BLOCK_MARTIN,
        })
    except Exception as e:
        print(f"[Moderation-PY] martin-ha error: {e}")

    return verdicts


@app.route("/classify", methods=["POST"])
def classify():
    """
    Body: { "text": "..." }
    Returns: {
      "label": str,
      "score": float (max across ensemble),
      "verdict": "safe" | "suspicious" | "block",
      "details": [ { model, toxic_score } … ]
    }
    """
    body = request.get_json(force=True)
    text = (body.get("text") or "").strip()
    if not text:
        return jsonify(label="safe", score=0.0, verdict="safe", details=[])

    try:
        verdicts = _run_ensemble(text)
        if not verdicts:
            return jsonify(label="error", score=0.0, verdict="safe", details=[])

        # Ensemble verdict: if ANY model says block → block; if ANY says suspicious → suspicious
        ensemble_verdict = "safe"
        max_score = 0.0
        max_label = "safe"

        for v in verdicts:
            s = v["toxic_score"]
            if s > max_score:
                max_score = s
                max_label = v["model"]
            if s >= v["block_thresh"]:
                ensemble_verdict = "block"
            elif s >= v["suspicious_thresh"] and ensemble_verdict != "block":
                ensemble_verdict = "suspicious"

        details = [{"model": v["model"], "toxic_score": round(v["toxic_score"], 4)} for v in verdicts]

        return jsonify(
            label=max_label,
            score=round(max_score, 4),
            verdict=ensemble_verdict,
            details=details,
        )

    except Exception:
        traceback.print_exc()
        return jsonify(label="error", score=0.0, verdict="safe", details=[])  # fail-open


@app.route("/judge", methods=["POST"])
def judge():
    """
    Body: { "text": "...", "context": ["msg1","msg2",...], "username": "..." }
    Returns: { "verdict": "fun"|"trolling" }
    """
    body = request.get_json(force=True)
    text     = (body.get("text") or "").strip()
    context  = body.get("context") or []
    username = body.get("username") or "user"

    if not text:
        return jsonify(verdict="fun")

    semantic_note = ""
    try:
        model = get_embedding_model()
        cur_emb = model.encode(text).tolist()
        if context:
            ctx_embs = model.encode(context).tolist()
            sims = [cosine_sim(cur_emb, e) for e in ctx_embs]
            avg_sim = sum(sims) / len(sims) if sims else 0
            semantic_note = (
                f"Semantic similarity of flagged message to recent context: "
                f"{avg_sim:.3f} (1 = identical topic, 0 = unrelated)."
            )
    except Exception as e:
        semantic_note = "Embedding analysis unavailable."
        print(f"[Moderation-PY] Embedding error: {e}")

    system_prompt = (
        "You are a chat moderation assistant. Decide if a message is genuine "
        "trolling/toxicity OR just playful banter/gaming talk/friendly ribbing.\n\n"
        "Rules:\n"
        "- Gaming language like \"kill him\", \"destroy them\", \"get rekt\" is BANTER, NOT trolling.\n"
        "- Friendly insults among friends are NOT trolling.\n"
        "- Sarcasm and jokes are NOT trolling.\n"
        "- Only flag as \"trolling\" if the message genuinely targets, harasses, "
        "demeans a real person, is hate speech, or is persistently disruptive.\n"
        "- Be lenient. When in doubt, choose \"fun\".\n\n"
        f"{semantic_note}\n\n"
        "Respond with ONLY one word: \"fun\" or \"trolling\". Nothing else."
    )

    ctx_block = "\n".join(f"[{i+1}] {t}" for i, t in enumerate(context))
    user_prompt = (
        f"Recent chat context:\n{ctx_block}\n\n"
        f"Flagged message from \"{username}\":\n\"{text}\""
    )

    try:
        answer = groq_chat(system_prompt, user_prompt, temperature=0.1, max_tokens=10)
        if answer is None:
            return jsonify(verdict="fun")  # no API key
        verdict = "trolling" if "trolling" in answer.lower() else "fun"
        return jsonify(verdict=verdict)
    except Exception:
        traceback.print_exc()
        return jsonify(verdict="fun")  # fail-open


@app.route("/therapist", methods=["POST"])
def therapist():
    """
    Body: { "username": "...", "toxicMsg": "...", "context": ["msg1","msg2",...] }
    Returns: { "dm": "..." }
    """
    body     = request.get_json(force=True)
    username = body.get("username") or "friend"
    toxic_msg = body.get("toxicMsg") or ""
    context   = body.get("context") or []

    fallback = (
        f"Hey {username}, looks like things are heating up a bit. "
        "Maybe grab some water and take a quick breather? "
        "We're all here to have a good time 🙂"
    )

    clean_ctx = [anonymize(t) for t in context]
    clean_msg = anonymize(toxic_msg)

    ctx_block = "\n".join(f"[{i+1}] {t}" for i, t in enumerate(clean_ctx))

    system_prompt = (
        f"You are an empathetic conflict mediator in a chat app called BunChat. "
        f"The user \"{username}\" is getting frustrated or aggressive.\n\n"
        "Goal: De-escalate. DO NOT punish, scold, or lecture.\n\n"
        f"Context (recent messages in the chatroom):\n{ctx_block}\n\n"
        f"User's flagged message:\n\"{clean_msg}\"\n\n"
        "Task: Draft a short, non-judgmental private DM to the user (2-3 sentences max).\n"
        "- Acknowledge their feelings without condoning toxicity.\n"
        "- Suggest a break, water, topic change, or lighter mood.\n"
        "- Tone: Chill, friendly, non-authoritarian.\n"
        "- Do NOT mention \"moderation\", \"rules\", \"warning\", or \"punishment\".\n"
        "- You may use a casual emoji or two.\n\n"
        "Respond with ONLY the DM text. No quotes, no labels."
    )

    try:
        answer = groq_chat(system_prompt, "Generate the DM now.",
                           temperature=0.7, max_tokens=150)
        dm = (answer or "").strip() or fallback
        return jsonify(dm=dm)
    except Exception:
        traceback.print_exc()
        return jsonify(dm=fallback)


@app.route("/troll", methods=["POST"])
def troll():
    """
    Body: { "trollMsg": "...", "trollerName": "...", "targetName": "...", "context": ["msg1",...] }
    Returns: { "reply": "..." }
    """
    body        = request.get_json(force=True)
    troll_msg   = (body.get("trollMsg") or "").strip()
    troller     = body.get("trollerName") or "someone"
    target      = body.get("targetName") or ""
    context     = body.get("context") or []

    fallback = "lmaooo 💀"

    if not troll_msg:
        return jsonify(reply=fallback)

    ctx_block = "\n".join(f"[{i+1}] {t}" for i, t in enumerate(context[-5:]))

    target_instruction = ""
    if target:
        target_instruction = (
            f'The person being roasted is "{target}". '
            f"Mention their name naturally in your roast. "
        )

    system_prompt = (
        "You are BunBot, the savage roast-master of a chat app called BunChat. "
        "Troll Mode is ON — your job is to gang up with the troller and roast the target.\n\n"
        "Rules:\n"
        "- Keep it SHORT: 1-2 sentences MAX.\n"
        "- Be witty, savage, and funny — think friendly fire roast battle.\n"
        "- Use internet slang, emojis, and meme energy.\n"
        "- NO slurs, hate speech, racism, sexism, or genuinely hurtful personal attacks.\n"
        "- Stay in the realm of playful savagery, like a roast among friends.\n"
        f"- {target_instruction}\n"
        f'- The troller is "{troller}". You\'re on their side.\n\n'
        "Respond with ONLY the roast message. No labels, no quotes."
    )

    user_prompt = (
        f"Recent chat:\n{ctx_block}\n\n"
        f"{troller} said: \"{troll_msg}\"\n\n"
        "Drop your roast:"
    )

    try:
        answer = groq_chat(system_prompt, user_prompt,
                           temperature=0.9, max_tokens=120)
        reply = (answer or "").strip() or fallback
        return jsonify(reply=reply)
    except Exception:
        traceback.print_exc()
        return jsonify(reply=fallback)


@app.route("/health", methods=["GET"])
def health():
    return jsonify(status="ok", models={
        "toxic_bert": pipe_toxic_bert is not None,
        "roberta_toxicity": pipe_roberta is not None,
        "martin_ha": pipe_martin is not None,
        "all_minilm": embedding_model is not None,
    })


if __name__ == "__main__":
    _prewarm()
    print(f"[Moderation-PY] Listening on http://localhost:{PORT}")
    app.run(host="0.0.0.0", port=PORT, debug=False)
