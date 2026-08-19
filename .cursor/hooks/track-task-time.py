#!/usr/bin/env python3
"""Track wall-clock time per agent conversation. Task name comes from the prompt."""

from __future__ import annotations

import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
DATA_DIR = ROOT / ".cursor" / "task-time"
STATE_PATH = DATA_DIR / "active.json"
LOG_PATH = DATA_DIR / "log.md"

TASK_PREFIX = re.compile(
    r"^(?:task|задача|таска)\s*[:\-—]\s*(.+)$",
    re.IGNORECASE,
)


def now_iso() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat()


def parse_iso(value: str) -> datetime:
    return datetime.fromisoformat(value)


def format_duration(seconds: int) -> str:
    seconds = max(0, seconds)
    hours, rem = divmod(seconds, 3600)
    minutes, secs = divmod(rem, 60)
    if hours:
        return f"{hours}h {minutes:02d}m"
    if minutes:
        return f"{minutes}m {secs:02d}s"
    return f"{secs}s"


def extract_task_name(prompt: str) -> str:
    text = (prompt or "").strip()
    if not text:
        return "Untitled task"

    first_line = text.splitlines()[0].strip()
    match = TASK_PREFIX.match(first_line)
    if match:
        name = match.group(1).strip()
        return name[:120] or "Untitled task"

    if 0 < len(first_line) <= 80:
        return first_line

    compact = re.sub(r"\s+", " ", text)
    return compact[:60].rstrip() + ("…" if len(compact) > 60 else "")


def load_state() -> dict:
    if not STATE_PATH.exists():
        return {}
    try:
        return json.loads(STATE_PATH.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError):
        return {}


def save_state(state: dict) -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    STATE_PATH.write_text(
        json.dumps(state, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


def ensure_log_header() -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    if LOG_PATH.exists():
        return
    LOG_PATH.write_text(
        "# Task time log\n\n"
        "| Date (UTC) | Task | Duration | Conversation | Status |\n"
        "| --- | --- | --- | --- | --- |\n",
        encoding="utf-8",
    )


def upsert_log_row(
    conversation_id: str,
    task_name: str,
    duration: str,
    status: str,
) -> None:
    ensure_log_header()
    date = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M")
    safe_task = task_name.replace("|", "/").replace("\n", " ")
    short_id = conversation_id[:8] if conversation_id else "unknown"
    new_row = f"| {date} | {safe_task} | {duration} | `{short_id}` | {status} |"

    lines = LOG_PATH.read_text(encoding="utf-8").splitlines()
    marker = f"| `{short_id}` |"
    replaced = False
    for index, line in enumerate(lines):
        if marker in line:
            lines[index] = new_row
            replaced = True
            break
    if not replaced:
        lines.append(new_row)

    LOG_PATH.write_text("\n".join(lines) + "\n", encoding="utf-8")


def elapsed_seconds(started_at: str) -> int:
    return int((datetime.now(timezone.utc) - parse_iso(started_at)).total_seconds())


def handle_before_submit(payload: dict) -> dict:
    conversation_id = payload.get("conversation_id") or "unknown"
    prompt = payload.get("prompt") or ""
    state = load_state()
    entry = state.get(conversation_id)

    if entry is None:
        entry = {
            "task_name": extract_task_name(prompt),
            "started_at": now_iso(),
            "last_prompt_at": now_iso(),
        }
    else:
        entry["last_prompt_at"] = now_iso()
        # Keep the first prompt's name; only fill if it was empty.
        if not entry.get("task_name") or entry["task_name"] == "Untitled task":
            entry["task_name"] = extract_task_name(prompt)

    state[conversation_id] = entry
    save_state(state)

    duration = format_duration(elapsed_seconds(entry["started_at"]))
    upsert_log_row(conversation_id, entry["task_name"], duration, "active")

    return {"continue": True}


def finalize(payload: dict, status: str) -> dict:
    conversation_id = payload.get("conversation_id") or "unknown"
    state = load_state()
    entry = state.get(conversation_id)

    if entry is None:
        return {}

    duration = format_duration(elapsed_seconds(entry["started_at"]))
    upsert_log_row(conversation_id, entry["task_name"], duration, status)

    if status == "done":
        state.pop(conversation_id, None)
        save_state(state)
    else:
        entry["last_stop_at"] = now_iso()
        state[conversation_id] = entry
        save_state(state)

    return {}


def main() -> None:
    raw = sys.stdin.read()
    try:
        payload = json.loads(raw) if raw.strip() else {}
    except json.JSONDecodeError:
        payload = {}

    event = payload.get("hook_event_name") or ""

    if event == "beforeSubmitPrompt":
        out = handle_before_submit(payload)
    elif event == "stop":
        out = finalize(payload, "active")
    elif event == "sessionEnd":
        out = finalize(payload, "done")
    else:
        out = {}

    sys.stdout.write(json.dumps(out))


if __name__ == "__main__":
    main()
