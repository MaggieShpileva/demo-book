#!/usr/bin/env python3
"""Pre-commit project-rules review for Cursor Agent and npm CLI.

Report-only: never edits source. Writes a markdown review under
`.cursor/reviews/`.

Modes:
- Cursor `beforeShellExecution`: JSON on stdin; Agent sessions gate
  `git commit` until `.cursor/reviews/<hash>.md` exists (unless skipped).
- CLI / npm: `npm run rules:review` (`--git`) — always writes `.auto.md`
  and exits 0 (report-only, no Agent gate).
"""

from __future__ import annotations

import hashlib
import json
import os
import re
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
REVIEWS_DIR = ROOT / ".cursor" / "reviews"
CHECKLIST_PATH = ROOT / ".cursor" / "hooks" / "rules-review-checklist.md"

# Token / palette sources — hardcoded colors here are expected.
COLOR_ALLOWLIST = (
    "src/styles/_colors.scss",
    "src/styles/_variables.scss",
    "src/styles/_typography.scss",
    "src/styles/_mixins.scss",
    "src/styles/index.scss",
    "src/styles/global-ui-scale.scss",
)

HEX_RE = re.compile(r"#[0-9a-fA-F]{3,8}\b")
RGB_RE = re.compile(r"\brgba?\s*\(")
INTERFACE_RE = re.compile(r"^\s*export\s+interface\s+\w+", re.M)
DEEP_RELATIVE_RE = re.compile(r"""from\s+['"](?:\.\./){2,}""")
ASSET_IMPORT_RE = re.compile(
    r"""import\s+(\w+)\s+from\s+['"][^'"]+\.(png|jpe?g|gif|webp|svg)(?:\?[^'"]*)?['"]""",
    re.I,
)
RASTER_EXT = {".png", ".jpg", ".jpeg", ".gif", ".bmp"}
COMMIT_RE = re.compile(r"(?:^|[;&|]\s*|&&\s*)git\s+commit\b")


def emit(payload: dict) -> None:
    sys.stdout.write(json.dumps(payload, ensure_ascii=False) + "\n")


def allow(user_message: str = "", agent_message: str = "") -> None:
    out: dict = {"permission": "allow"}
    if user_message:
        out["user_message"] = user_message
    if agent_message:
        out["agent_message"] = agent_message
    emit(out)


def deny(user_message: str, agent_message: str) -> None:
    emit(
        {
            "permission": "deny",
            "user_message": user_message,
            "agent_message": agent_message,
        }
    )


def log_git(message: str) -> None:
    """CLI-visible messages go to stderr (stdout must stay clean for Cursor)."""
    sys.stderr.write(message.rstrip() + "\n")


def run_git(*args: str) -> str:
    result = subprocess.run(
        ["git", *args],
        cwd=ROOT,
        capture_output=True,
        text=True,
        check=False,
    )
    if result.returncode != 0:
        return ""
    return result.stdout


def staged_name_status() -> list[tuple[str, str]]:
    raw = run_git("diff", "--cached", "--name-status", "-z")
    if not raw:
        return []
    parts = [p for p in raw.split("\0") if p]
    rows: list[tuple[str, str]] = []
    i = 0
    while i < len(parts):
        status = parts[i]
        i += 1
        if not status:
            continue
        code = status[0]
        if code.startswith("R") or code.startswith("C"):
            if i + 1 < len(parts):
                rows.append((code, parts[i + 1]))
                i += 2
            continue
        if i < len(parts):
            rows.append((code, parts[i]))
            i += 1
    return rows


def staged_diff() -> str:
    return run_git("diff", "--cached", "--", ":(exclude).cursor/reviews/**")


def staging_hash(diff: str, files: list[tuple[str, str]]) -> str:
    payload = diff + "\n" + "\n".join(f"{s}\t{p}" for s, p in files)
    return hashlib.sha256(payload.encode("utf-8")).hexdigest()[:12]


def review_path(hash_id: str) -> Path:
    return REVIEWS_DIR / f"{hash_id}.md"


def read_staged_file(path: str) -> str:
    raw = run_git("show", f":{path}")
    return raw


def is_color_allowlisted(path: str) -> bool:
    norm = path.replace("\\", "/")
    return any(norm.endswith(allow) or norm == allow for allow in COLOR_ALLOWLIST)


def check_raster_assets(files: list[tuple[str, str]]) -> list[str]:
    findings: list[str] = []
    for status, path in files:
        if status.startswith("D"):
            continue
        lower = path.lower().replace("\\", "/")
        if "/assets/" not in lower and not lower.startswith("src/assets/"):
            continue
        ext = Path(path).suffix.lower()
        if ext in RASTER_EXT:
            findings.append(
                f"`{path}`: raster under assets should be `.webp` (found `{ext}`)"
            )
    return findings


def check_hardcoded_colors(files: list[tuple[str, str]]) -> list[str]:
    findings: list[str] = []
    for status, path in files:
        if status.startswith("D"):
            continue
        if not path.endswith((".scss", ".css", ".module.scss")):
            continue
        if is_color_allowlisted(path):
            continue
        content = read_staged_file(path)
        if not content:
            continue
        for match in HEX_RE.finditer(content):
            line = content[: match.start()].count("\n") + 1
            findings.append(
                f"`{path}:{line}`: hardcoded color `{match.group(0)}` — use tokens from `@styles`"
            )
        for match in RGB_RE.finditer(content):
            line = content[: match.start()].count("\n") + 1
            findings.append(
                f"`{path}:{line}`: hardcoded `rgb/rgba` — use tokens from `@styles`"
            )
    return findings


def check_asset_import_prefixes(files: list[tuple[str, str]]) -> list[str]:
    findings: list[str] = []
    prefix_map = {
        "png": "PNG_",
        "jpg": "JPG_",
        "jpeg": "JPG_",
        "gif": "PNG_",
        "webp": "WEBP_",
        "svg": "SVG_",
    }
    for status, path in files:
        if status.startswith("D") or not path.endswith((".ts", ".tsx")):
            continue
        content = read_staged_file(path)
        if not content:
            continue
        for match in ASSET_IMPORT_RE.finditer(content):
            name, ext = match.group(1), match.group(2).lower()
            expected = prefix_map.get(ext)
            if expected and not name.startswith(expected):
                line = content[: match.start()].count("\n") + 1
                findings.append(
                    f"`{path}:{line}`: import `{name}` should use prefix `{expected}`"
                )
    return findings


def check_type_not_interface(files: list[tuple[str, str]]) -> list[str]:
    findings: list[str] = []
    for status, path in files:
        if status.startswith("D") or not path.endswith((".ts", ".tsx")):
            continue
        content = read_staged_file(path)
        for match in INTERFACE_RE.finditer(content or ""):
            line = content[: match.start()].count("\n") + 1
            findings.append(
                f"`{path}:{line}`: prefer `type` over `interface` for props/DTOs"
            )
    return findings


def check_deep_relative_imports(files: list[tuple[str, str]]) -> list[str]:
    findings: list[str] = []
    for status, path in files:
        if status.startswith("D") or not path.endswith((".ts", ".tsx")):
            continue
        content = read_staged_file(path)
        for match in DEEP_RELATIVE_RE.finditer(content or ""):
            line = content[: match.start()].count("\n") + 1
            findings.append(
                f"`{path}:{line}`: deep relative import — use path aliases"
            )
    return findings


def check_feature_ui_layer(files: list[tuple[str, str]]) -> list[str]:
    """Heuristic: new leaf primitives under Feature that look like UI atoms."""
    findings: list[str] = []
    ui_ish = re.compile(
        r"/(Button|Input|Modal|Badge|Checkbox|Radio|Switch|Tooltip|Spinner)/"
        r"\1\.tsx$"
    )
    for status, path in files:
        if status not in {"A", "AM"} and not status.startswith("A"):
            continue
        norm = path.replace("\\", "/")
        if "/components/Feature/" not in norm:
            continue
        if ui_ish.search(norm):
            findings.append(
                f"`{path}`: looks like a reusable UI primitive under Feature — "
                "prefer `components/UI` or reuse an existing primitive"
            )
    return findings


def collect_findings(files: list[tuple[str, str]]) -> list[str]:
    findings: list[str] = []
    findings.extend(check_raster_assets(files))
    findings.extend(check_hardcoded_colors(files))
    findings.extend(check_asset_import_prefixes(files))
    findings.extend(check_type_not_interface(files))
    findings.extend(check_deep_relative_imports(files))
    findings.extend(check_feature_ui_layer(files))

    seen: set[str] = set()
    uniq: list[str] = []
    for item in findings:
        if item not in seen:
            seen.add(item)
            uniq.append(item)
    return uniq


def build_review(
    hash_id: str,
    files: list[tuple[str, str]],
    findings: list[str],
    *,
    author: str,
) -> str:
    now = datetime.now(timezone.utc).replace(microsecond=0).isoformat()
    file_lines = "\n".join(f"- `{s}` `{p}`" for s, p in files) or "- (none)"
    if findings:
        finding_lines = "\n".join(f"- [ ] {f}" for f in findings)
        verdict = "Needs attention"
    else:
        finding_lines = "- No automated findings."
        verdict = "Pass (automated checks)"

    checklist = ""
    if CHECKLIST_PATH.exists():
        checklist = CHECKLIST_PATH.read_text(encoding="utf-8").strip()

    return f"""# Project rules review

- **Staging hash:** `{hash_id}`
- **When:** {now}
- **Author:** {author}
- **Verdict:** {verdict}
- **Mode:** report-only (no source edits)

## Staged files

{file_lines}

## Automated findings

{finding_lines}

## Manual checklist (LLM / reviewer)

{checklist or "_Checklist file missing._"}

## Notes

- Do **not** apply fixes in this pass — only record findings.
- Fix only if the user explicitly asks after reading this review.
"""


def is_git_commit(command: str) -> bool:
    if not COMMIT_RE.search(command):
        return False
    # Ignore help / dry exploration
    if re.search(r"\s(?:-h|--help)\b", command):
        return False
    return True


def should_skip_review() -> bool:
    return os.environ.get("CURSOR_SKIP_RULES_REVIEW", "").strip() in {
        "1",
        "true",
        "yes",
    }


def findings_preview(findings: list[str], *, limit: int = 12) -> str:
    preview = "\n".join(f"- {f}" for f in findings[:limit]) or "- none"
    if len(findings) > limit:
        preview += f"\n- …and {len(findings) - limit} more"
    return preview


def persist_auto_report(hash_id: str, report: str) -> Path:
    REVIEWS_DIR.mkdir(parents=True, exist_ok=True)
    auto_path = REVIEWS_DIR / f"{hash_id}.auto.md"
    auto_path.write_text(report, encoding="utf-8")
    return auto_path


def agent_gate_enabled() -> bool:
    return os.environ.get("CURSOR_RULES_REVIEW_GATE", "1").strip() not in {
        "0",
        "false",
        "no",
    }


def run_review(*, in_agent: bool, cursor_mode: bool) -> int:
    """Shared review pipeline. cursor_mode emits allow/deny JSON on stdout."""
    if should_skip_review():
        msg = "Skipped project-rules review (CURSOR_SKIP_RULES_REVIEW)."
        if cursor_mode:
            allow(agent_message=msg)
        else:
            log_git(msg)
        return 0

    files = staged_name_status()
    diff = staged_diff()
    if not files and not diff.strip():
        msg = "No staged changes — rules review skipped."
        if cursor_mode:
            allow(agent_message=msg)
        else:
            log_git(msg)
        return 0

    hash_id = staging_hash(diff, files)
    path = review_path(hash_id)
    findings = collect_findings(files)
    author = "agent" if in_agent else ("hook" if cursor_mode else "cli")
    report = build_review(hash_id, files, findings, author=author)

    if path.exists():
        summary = (
            f"Project rules review already on disk: `.cursor/reviews/{hash_id}.md` "
            f"({len(findings)} automated finding(s)). Commit allowed. Do not auto-fix."
        )
        if cursor_mode:
            allow(user_message=summary, agent_message=summary)
        else:
            log_git(summary)
        return 0

    persist_auto_report(hash_id, report)
    preview = findings_preview(findings)

    # Agent gate: only via Cursor beforeShellExecution + conversation_id.
    if cursor_mode and in_agent and agent_gate_enabled():
        deny(
            user_message=(
                f"Commit blocked until rules review is filed at "
                f".cursor/reviews/{hash_id}.md "
                f"({len(findings)} automated finding(s)). "
                f"See .cursor/reviews/{hash_id}.auto.md."
            ),
            agent_message=(
                "PRE-COMMIT PROJECT RULES REVIEW (report-only).\n"
                f"Staging hash: {hash_id}\n"
                f"Automated draft: `.cursor/reviews/{hash_id}.auto.md`\n"
                f"Automated findings:\n{preview}\n\n"
                "Required next steps:\n"
                "1. Read skill `.cursor/skills/project-rules-review/SKILL.md`.\n"
                "2. Inspect staged changes (`git diff --cached`) and the automated draft.\n"
                f"3. Write the final review to `.cursor/reviews/{hash_id}.md` "
                "(markdown table of findings; verdict Pass/Needs attention).\n"
                "4. Do NOT edit source files, do NOT fix findings, do NOT restyle code.\n"
                "5. Re-run the same `git commit` command.\n"
                "Skip gate only if the user explicitly asks: "
                "`CURSOR_SKIP_RULES_REVIEW=1 git commit …`."
            ),
        )
        return 0

    summary = (
        f"Project rules review written to `.cursor/reviews/{hash_id}.auto.md` "
        f"({len(findings)} finding(s)). Report-only — no source edits."
    )
    if cursor_mode:
        allow(user_message=summary, agent_message=summary)
    else:
        log_git(summary)
        if findings:
            log_git("Automated findings:\n" + preview)
    return 0


def main_git_hook() -> int:
    """CLI / npm entrypoint (`--git`). Always report-only, exit 0."""
    return run_review(in_agent=False, cursor_mode=False)


def main_cursor_hook() -> int:
    try:
        payload = json.load(sys.stdin)
    except json.JSONDecodeError:
        allow()
        return 0

    command = str(payload.get("command") or "")
    if not is_git_commit(command):
        allow()
        return 0

    conversation_id = str(payload.get("conversation_id") or "")
    return run_review(in_agent=bool(conversation_id), cursor_mode=True)


def main() -> int:
    if "--git" in sys.argv:
        return main_git_hook()
    return main_cursor_hook()


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:  # fail open
        if "--git" in sys.argv:
            log_git(f"Rules review hook failed open: {exc}")
        else:
            allow(agent_message=f"Rules review hook failed open: {exc}")
        raise SystemExit(0) from exc
