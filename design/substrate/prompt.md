Build a design system optimized for developer handoff and consumption by lower-powered models.
Output format

Deliver the system as static HTML files that render standalone (no build step required to preview). Import Tailwind via a single @import "tailwindcss"; and rely on automatic content detection — no tailwind.config.js.
Use Tailwind CSS v4 conventions. Define all design tokens in CSS using the @theme directive (e.g. --color-*, --font-*, --spacing-*, --radius-*). Tailwind v4 automatically exposes these as CSS custom properties and generates matching utility classes, so tokens stay overridable downstream while utilities remain available.
Use @theme for tokens that should map to utility classes; use :root for any plain CSS variables that shouldn't generate utilities. For runtime-overridable values (theming, dark mode), use @theme inline so the variable reference stays live and can be swapped at runtime.
Keep markup semantic and predictable (consistent, documented utility patterns) so weaker models can reliably parse and extend it.
Note: Tailwind v4 targets modern browsers only (Safari 16.4+, Chrome 111+, Firefox 128+), since it depends on @property and color-mix().

Design tokens (@theme)

Colors: organize as primitive → semantic layers (e.g. --color-gray-700 → --color-text-secondary). Include states (hover, active, disabled, focus) and status colors (info, success, warning, danger).
Typography: default to Roboto via --font-sans: "Roboto", ...system fallback stack, producing a font-sans utility. Define a compact type scale, weights, and line heights suited to dense UIs.
Include spacing, border-radius, and elevation tokens as theme variables too.

Dark / light mode

Support a dark/light mode toggle. Define semantic color tokens (text, surface, border, etc.) as variables in :root for light, overridden under a .dark class (or [data-theme="dark"]) on the root element, and reference them via @theme inline so utilities resolve to the active theme at runtime.
Drive the toggle with minimal vanilla JS that flips the class/attribute on <html>; respect prefers-color-scheme for the initial value.
Both palettes must meet accessible contrast, and all status colors should have light- and dark-appropriate values.

Density & information richness

Target high-density, information-rich interfaces. Default spacing should be tight; offer a comfortable modifier for looser layouts where needed.
Provide compact form controls, badges, and inline metadata patterns.

Tables

Condensed tables as a first-class component: small row height, minimal padding, support for many columns.
Include sticky headers, sticky first column, horizontal scroll handling, zebra striping, sortable header affordances, and truncation/tooltip patterns for overflow cells.
Provide compact, default, and comfortable density variants.

Tree structures

Interactive tree component supporting expand/collapse and drag-and-drop reordering/nesting.
Use the native HTML Drag and Drop API (vanilla JS), no framework dependencies. In-DOM reordering only — no persistence needed.
Include visual affordances for drop targets, drag handles, nesting indentation guides, and invalid-drop states.
Keep state observable in the DOM (role="tree", role="treeitem", aria-expanded, data-depth) so it's parseable.

Example layouts

Provide example banners (announcement bars, hero banners, status/alert banners) built from the token system.
Provide example landing pages assembled from the components to demonstrate composition.
Theme all example assets, copy, iconography, and sample table/tree data around the concept of data centers (server racks, infrastructure, uptime/throughput metrics, cooling, network topology).

Documentation

Include a component gallery / index HTML page demonstrating every component with copy-pasteable markup snippets.
Document each token and component inline so a developer or model can consume it without external context.
Ensure accessibility basics: ARIA roles for the tree, keyboard navigation, visible focus states, and a visible/labeled theme toggle control.

---

Follow Up Prompts:

Add a view for uploading files. The user will drag and drop files from their desktop onto a drop zone.

Also, add a view for agentic observability. The agents will be processing each file in turn.

Provide promotion and download views. The promotion view will be Human In the Loop (HITL) to update the final information model that will be downloaded. The uploaded files + the agentic work will be mapped into the final information model. Also, the promotion view should create some surveys that will be sent to customers to fill in remaining gaps in the promotion view.
