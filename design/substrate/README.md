# Substrate — Data Center Design System

A dense, token-driven design system for data center infrastructure tooling (rack
inventory, throughput dashboards, cooling telemetry, network topology). Built on
**Tailwind CSS v4** and optimized for developer handoff and consumption by
lower-powered models: predictable semantic markup, one documented way to do
things, and all state observable in the DOM.

## Files

| File | Purpose |
|---|---|
| `tokens.css` | **Canonical source of truth.** All design tokens via `@theme`, semantic light/dark tokens (`:root` / `.dark`) mapped to live utilities with `@theme inline`, plus the few component styles utilities can't express (table density/sticky, tree drag affordances). |
| `theme.js` | A generated mirror of `tokens.css` that injects the token stylesheet at runtime so every page renders standalone with **no build step**. Regenerate it from `tokens.css` whenever tokens change. |
| `ds.js` | All behavior (vanilla, no deps): theme toggle, table sort, tree expand/collapse + keyboard nav + native drag-and-drop, and doc snippet/copy helpers. |
| `index.html` | Component gallery + token reference. Every component shows live markup you can copy. |
| `tables.html` | Condensed table: sticky header & first column, sortable headers, zebra, truncation+tooltip, density variants. |
| `tree.html` | Interactive tree: expand/collapse, keyboard nav, drag-and-drop re-nesting with drop affordances + invalid states. |
| `upload.html` | Drag-and-drop file upload: drop zone (native DnD + file picker), live upload queue with per-file progress, status badges and error states. |
| `observability.html` | Agentic pipeline / observability: files processed by five agents in turn, with a live trace waterfall, span timings, agent roster, streaming event log, KPI strip, and playback controls. |
| `promotion.html` | Human-in-the-loop (HITL) promotion: the uploaded files + agent output mapped into the final information model, with field-level provenance, conflict resolution, gap detection, and a customer-survey builder. Promoting persists the model to `localStorage`. |
| `download.html` | The sealed final information model: completeness seal + checksum, provenance summary, live preview, and real file export to JSON / YAML / CSV / NDJSON. Reads the promoted model (falls back to the seed). |
| `model.js` | Shared data layer — the fleet information model seed (entities, fields, provenance, status), readiness counts, and the JSON/YAML/CSV/NDJSON serializers used by promotion + download. |
| `landing.html` | Example product ("Helios DCIM") composed entirely from the system, incl. banners. |

## Use it in a real build (recommended)

`theme.js` exists only so the demo pages run with zero tooling. In a real
project, drop `theme.js` and import the canonical CSS through your Tailwind v4
pipeline:

```css
/* app.css */
@import "tailwindcss";
@import "./tokens.css";
```

```html
<link rel="stylesheet" href="/dist/app.css">
```

## Use it with no build step (as the demos do)

```html
<head>
  <!-- set theme before paint to avoid a flash -->
  <script>(function(){try{var t=localStorage.getItem('ds-theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.classList.toggle('dark',t==='dark');}catch(e){}})();</script>
  <script src="theme.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
  <script src="ds.js" defer></script>
</head>
<body class="bg-surface text-fg">…</body>
```

> Regenerate `theme.js` after editing `tokens.css` — it embeds a copy of the CSS.

## Token model

- **Primitives** (`@theme`): fixed scales → static utilities. `bg-gray-700`, `text-brand-500`, `rounded-md`, `shadow-sm`, `text-2xs`.
- **Semantic** (`:root` / `.dark` → `@theme inline`): theme-aware. Components reference **only** these so light/dark just works: `bg-surface`, `bg-surface-raised`, `text-fg`, `text-fg-muted`, `border-border`, `bg-accent`, and status triads `text-success` / `bg-success-bg` / `border-success-border` (info · success · warning · danger).

## Dark / light mode

`.dark` on `<html>` swaps every semantic token. `ds.js` wires any
`[data-theme-toggle]` button, persists to `localStorage('ds-theme')`, and the
initial value respects `prefers-color-scheme`.

## Density

Tight by default. Tables expose `data-density="compact | default | comfortable"`.

## Accessibility

- Tree uses `role="tree"` / `role="treeitem"` / `role="group"`, `aria-expanded`, roving `tabindex`, and full arrow-key / Home / End navigation.
- Tables use `aria-sort` for sortable columns.
- Visible focus rings on all interactive elements (`--color-ring`).
- The theme toggle is a labeled `aria-pressed` button.

## Browser support

Tailwind v4 targets modern browsers only (Safari 16.4+, Chrome 111+, Firefox
128+) — it depends on `@property` and `color-mix()`.
