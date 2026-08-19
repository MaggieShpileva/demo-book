---
name: project-rules-review
description: 'Report-only pre-commit / staged-diff review against project rules (webp, tokens, UI reuse, extract large logic to hooks). Never auto-fix.'
disable-model-invocation: false
---

# Project rules review (report-only)

Use when a pre-commit hook asks for a rules review, or when the user asks to review staged changes against project conventions.

Runs from:

- **Cursor** `beforeShellExecution` (Agent gate until `.cursor/reviews/<hash>.md`)
- **CLI** `npm run rules:review` → `python3 .cursor/hooks/pre-commit-rules-review.py --git` (auto report only)

Related: [coding-standards](../coding-standards/SKILL.md), [project-conventions](../project-conventions/SKILL.md), [react-feature-ui](../react-feature-ui/SKILL.md).

## Hard rules

1. **Do not edit source files** in this pass.
2. **Do not** run formatters/linters with `--fix` to “clean findings”.
3. **Only** write / update the review markdown under `.cursor/reviews/`.
4. Keep product copy and unrelated files untouched.
5. Review **only changed (staged) files** and their diff — do not scan the whole repo.

## Steps

1. Read staging hash and automated draft from the hook message
   (`.cursor/reviews/<hash>.auto.md`).
2. Inspect staged changes:

```bash
git diff --cached --name-status
git diff --cached
```

3. Apply the checklist in `.cursor/hooks/rules-review-checklist.md`.
4. Write the final review to **exactly**:

```text
.cursor/reviews/<hash>.md
```

5. Tell the user the verdict in one short paragraph + a findings table.
6. Re-run the original `git commit` only if the user still wants the commit
   (the hook allows it once `<hash>.md` exists).

## Report template

```md
# Project rules review

- **Staging hash:** `<hash>`
- **Verdict:** Pass | Needs attention
- **Mode:** report-only (no source edits)

## Findings

| Severity | Location  | Finding     |
| -------- | --------- | ----------- |
| low      | path:line | description |

## Notes

Optional context. No fix commits in this pass.
```

## Severity

| Level  | When                                                                                                                                                   |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | --- |
| high   | Wrong layer (UI vs Feature), broken a11y pattern, non-webp raster added to assets                                                                      |
| medium | Hardcoded colors, missing asset prefixes, deep relative imports, `interface` for props, logic/`useEffect` > 10 lines left inline instead of utils/hook |     |
| low    | Naming nits, optional token opportunities, style order                                                                                                 |

If there are no issues, write an empty findings table and `Verdict: Pass`.
