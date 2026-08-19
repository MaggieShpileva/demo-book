---
name: figma-to-code
description: "Figma design-to-code for React + SCSS Modules. Use when implementing a Figma screen, sharing a figma.com URL, or calling get_design_context. Adapt MCP Tailwind reference to Feature/UI and tokens; never paste as-is."
disable-model-invocation: false
---

# Figma → Code (React + SCSS Modules)

Universal workflow: Figma → code in a repo with **React + CSS Modules + SCSS**, **Feature / UI** layers.

**Direction:** design → code only (do not write to Figma with this skill).

Details: [references/layout-mapping.md](references/layout-mapping.md), [references/validate-against-figma.md](references/validate-against-figma.md).  
Related: [react-feature-ui](../react-feature-ui/SKILL.md), [ui-motion](../ui-motion/SKILL.md), [coding-standards](../coding-standards/SKILL.md).

## 0. Discover

| What | Where |
|------|-------|
| Styles entry / tokens | `styles/index.scss`, variables, colors |
| Product font | `@font-face`, Typography — **not Inter by default** |
| UI scale | `--ui-scale` or equivalent; mixin like `dynit` |
| UI / Feature / pages | `components/UI`, `components/Feature`, `pages` |
| Aliases | vite / tsconfig |
| Motion / overlays | [ui-motion](../ui-motion/SKILL.md) — **repo patterns first** |

## 1. Figma URL

| URL | Action |
|-----|--------|
| `figma.com/design/...` | `get_design_context` |
| `figma.com/board/...` | FigJam, not an app UI screen |
| `figma.com/slides/...` | Not an app UI screen |

`node-id=1-2` → `1:2`. Without node-id — ask.  
Branch: `/design/:fileKey/branch/:branchKey/...` → `fileKey` = `branchKey`.

## 2. Context from Figma

1. `get_design_context` **before** code.
2. `get_metadata` / `get_screenshot` — orientation / validation, not a substitute for context.
3. MCP response — **reference** (often React + Tailwind), not final code.

Hint priority: Code Connect → docs → annotations → repo tokens → hex/absolute + screenshot + layout-mapping.

## 3. Design system bridge

- Code pattern first (UI/Feature), then mockup intent.
- Do not invent primitives if Button / Typography / Modal exist.
- Figma library instance → map by meaning/visual to repo UI.

## 4. Decompose → components

- Do not copy the Frame tree literally; group by meaning.
- Large screen — section by section: skeleton → section → screenshot → next.
- Before new UI: find → extend → create.
- **Size limit:** Figma-driven component file (`*.tsx`) — **≤ 70 lines**. If more — split into nested components in `components/<Child>/` (triple `Name.tsx` + `Name.module.scss` + `index.ts`). Count the whole file, not just JSX.

## 5. Auto Layout → CSS

Full table — [layout-mapping](references/layout-mapping.md).

| Figma | CSS |
|-------|-----|
| VERTICAL / HORIZONTAL | `flex-direction: column` / `row` |
| gap / padding | `gap` / `padding` (+ scale) |
| FILL | `flex: 1` / `width: 100%` on the axis |
| HUG | intrinsic / `fit-content` |
| FIXED | `calc(Npx * var(--ui-scale))` (var name — from discover) |

**Forbidden** to paste absolute `left/top` from MCP when the parent is Auto Layout.

## 6. Typography and color

- Font from repo discover, not Inter from the MCP example.
- `line-height` / `letter-spacing` from the mockup correctly in CSS.
- Colors → `$…` tokens / CSS vars; hex only if no token exists.

## 7. Project code

- Feature / UI / Page + file triple — [react-feature-ui](../react-feature-ui/SKILL.md)
- `@use '@styles/index.scss' as *;` (or repo entry)
- Classes camelCase + `clsx`; no rem/vw/Tailwind from MCP
- Assets: download MCP URLs into the repo; `WEBP_` / `PNG_` / `SVG_`; explicit width+height on icons
- Motion/overlays — [ui-motion](../ui-motion/SKILL.md)

## 8. Validation

[validate-against-figma](references/validate-against-figma.md): screenshot vs UI; clip, overlap, font, images, spacing.

## 9. Anti-patterns

- Tailwind / absolute dump as-is
- Duplicating UI primitives for pixel-perfect chasing
- Inter instead of the product font
- Layout in `pages/`
- Icons “by eye” with paths/primitives
- Migrating Modal to Dialog for the skill’s sake
- Monolithic `*.tsx` > 70 lines without nested blocks

## 10. Checklist

- [ ] `get_design_context` + node-id
- [ ] Font and scale from the repo
- [ ] Auto Layout → flex, not absolute
- [ ] UI reused; `@use` + asset prefixes
- [ ] Screenshot compared
- [ ] Overlays per `ui-motion` (reuse first)
- [ ] Every `*.tsx` ≤ 70 lines; excess → nested `components/<Child>/`
- [ ] Every `<img>` has non-empty `alt`
