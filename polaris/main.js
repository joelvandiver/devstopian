/**
 * main.js – Polaris web front-end
 *
 * Loads the Rust/WASM polaris-core module and wires up an interactive
 * SVG-based drawing tool that demonstrates the core geometry primitives.
 */

import init, { Editor, Style, Color } from "./pkg/polaris_core.js";

const SVG_NS = "http://www.w3.org/2000/svg";

await init();

const sceneEl = document.getElementById("scene");
const viewportEl = document.getElementById("viewport");
const statusEl = document.getElementById("status");
const elementListEl = document.getElementById("element-list");
const exportSvgButton = document.getElementById("btn-export-svg");

let editor;
let appState;

function resizeViewport() {
  const width = viewportEl.clientWidth;
  const height = viewportEl.clientHeight;
  sceneEl.setAttribute("viewBox", `0 0 ${width} ${height}`);
  sceneEl.setAttribute("width", width);
  sceneEl.setAttribute("height", height);

  if (editor) {
    editor.resize_viewport(width, height);
    syncState();
    render();
  }
}

window.addEventListener("resize", resizeViewport);
resizeViewport();

editor = new Editor(viewportEl.clientWidth, viewportEl.clientHeight);
syncState();

const toolButtons = {
  point: document.getElementById("btn-point"),
  segment: document.getElementById("btn-segment"),
  circle: document.getElementById("btn-circle"),
  line: document.getElementById("btn-line"),
  perpendicular: document.getElementById("btn-perpendicular"),
  parallel: document.getElementById("btn-parallel"),
};

Object.entries(toolButtons).forEach(([name, button]) => {
  button.addEventListener("click", () => {
    const status = editor.set_tool(name);
    syncState();
    Object.values(toolButtons).forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    render();
    setStatus(status);
  });
});

document.getElementById("btn-intersect").addEventListener("click", () => {
  const status = editor.add_intersections(currentStyle());
  syncState();
  render();
  setStatus(status);
});

document.getElementById("btn-midpoint").addEventListener("click", () => {
  const status = editor.add_midpoints(currentStyle());
  syncState();
  render();
  setStatus(status);
});

document.getElementById("btn-clear").addEventListener("click", () => {
  const status = editor.clear();
  syncState();
  render();
  setStatus(status);
});

exportSvgButton.addEventListener("click", () => {
  openSvgInNewTab();
});

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function currentStyle() {
  const strokeHex = document.getElementById("stroke-color").value;
  const fillHex = document.getElementById("fill-color").value;
  const strokeWidth = parseFloat(document.getElementById("stroke-width").value);
  const stroke = hexToRgb(strokeHex);
  const fill = hexToRgb(fillHex);

  return new Style(
    new Color(stroke.r, stroke.g, stroke.b, 255),
    new Color(fill.r, fill.g, fill.b, 60),
    strokeWidth
  );
}

function scenePoint(event) {
  const rect = viewportEl.getBoundingClientRect();
  return { x: event.clientX - rect.left, y: event.clientY - rect.top };
}

viewportEl.addEventListener("click", (event) => {
  const point = scenePoint(event);
  const status = editor.click(point.x, point.y, currentStyle());
  syncState();
  render();
  setStatus(status);
});

viewportEl.addEventListener("mousemove", (event) => {
  if (!appState?.pending_point && !appState?.pending_reference) return;
  const point = scenePoint(event);
  render(point);
});

viewportEl.addEventListener("mouseleave", () => {
  if (!appState?.pending_point && !appState?.pending_reference) return;
  render();
});

function render(previewPoint = null) {
  sceneEl.replaceChildren();

  if (!appState) {
    return;
  }

  for (const el of appState.scene.elements) {
    if ("PointEl" in el) {
      sceneEl.appendChild(renderPoint(el.PointEl));
    } else if ("SegmentEl" in el) {
      sceneEl.appendChild(renderSegment(el.SegmentEl));
    } else if ("CircleEl" in el) {
      sceneEl.appendChild(renderCircle(el.CircleEl));
    } else if ("LineEl" in el) {
      sceneEl.appendChild(renderLine(el.LineEl));
    }
  }

  if (appState.pending_point) {
    sceneEl.appendChild(renderPendingPoint(appState.pending_point));
  }

  if (appState.pending_point && previewPoint) {
    sceneEl.appendChild(renderPreview(appState.pending_point, previewPoint, appState.tool));
  }

  if (appState.pending_reference) {
    sceneEl.appendChild(renderReferenceHighlight(appState.pending_reference));
    if (previewPoint) {
      sceneEl.appendChild(
        renderDirectedPreview(appState.pending_reference, previewPoint, appState.tool)
      );
    }
  }
}

function styleFromEl(style) {
  const { stroke, fill, stroke_width } = style;
  return {
    stroke: rgba(stroke),
    fill: rgba(fill),
    lineWidth: stroke_width,
  };
}

function rgba(color) {
  return `rgba(${color.r},${color.g},${color.b},${color.a / 255})`;
}

function createSvgElement(name, attrs = {}) {
  const el = document.createElementNS(SVG_NS, name);
  Object.entries(attrs).forEach(([key, value]) => {
    el.setAttribute(key, String(value));
  });
  return el;
}

function renderPoint({ point, style }) {
  const s = styleFromEl(style);
  return createSvgElement("circle", {
    cx: point.x,
    cy: point.y,
    r: Math.max(3, s.lineWidth * 2),
    fill: s.stroke,
  });
}

function renderSegment({ segment, style }) {
  const s = styleFromEl(style);
  return createSvgElement("line", {
    x1: segment.start.x,
    y1: segment.start.y,
    x2: segment.end.x,
    y2: segment.end.y,
    stroke: s.stroke,
    "stroke-width": s.lineWidth,
    "stroke-linecap": "round",
  });
}

function renderCircle({ circle, style }) {
  const s = styleFromEl(style);
  return createSvgElement("circle", {
    cx: circle.center.x,
    cy: circle.center.y,
    r: circle.radius,
    stroke: s.stroke,
    "stroke-width": s.lineWidth,
    fill: s.fill,
  });
}

// Endpoint attributes for an infinite line through (px, py) with direction
// (dx, dy), extended far beyond the viewport in both directions.
function extendedLineAttrs(px, py, dx, dy) {
  const scale = Math.max(viewportEl.clientWidth, viewportEl.clientHeight) * 10;
  const len = Math.hypot(dx, dy) || 1;
  const ux = (dx / len) * scale;
  const uy = (dy / len) * scale;

  return { x1: px - ux, y1: py - uy, x2: px + ux, y2: py + uy };
}

function renderLine({ line, style }) {
  const s = styleFromEl(style);

  return createSvgElement("line", {
    ...extendedLineAttrs(line.p1.x, line.p1.y, line.p2.x - line.p1.x, line.p2.y - line.p1.y),
    stroke: s.stroke,
    "stroke-width": s.lineWidth,
    "stroke-linecap": "round",
  });
}

function renderPendingPoint(point) {
  return createSvgElement("circle", {
    cx: point.x,
    cy: point.y,
    r: 5,
    fill: "#a0c4ff",
  });
}

function renderPreview(start, current, tool) {
  if (tool === "circle") {
    return createSvgElement("circle", {
      cx: start.x,
      cy: start.y,
      r: Math.hypot(current.x - start.x, current.y - start.y),
      stroke: "#a0c4ff88",
      "stroke-width": 1,
      "stroke-dasharray": "4 4",
      fill: "#a0c4ff22",
    });
  }

  return createSvgElement("line", {
    x1: start.x,
    y1: start.y,
    x2: current.x,
    y2: current.y,
    stroke: "#a0c4ff88",
    "stroke-width": 1,
    "stroke-dasharray": "4 4",
    "stroke-linecap": "round",
  });
}

// Emphasise the line/segment chosen as the reference for the
// perpendicular/parallel tools while the second click is pending.
function renderReferenceHighlight(reference) {
  const { p1, p2 } = reference.line;
  const endpoints = reference.is_segment
    ? { x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y }
    : extendedLineAttrs(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);

  return createSvgElement("line", {
    ...endpoints,
    stroke: "#ffc47866",
    "stroke-width": 4,
    "stroke-linecap": "round",
  });
}

// Dashed preview of the perpendicular/parallel line through the cursor.
function renderDirectedPreview(reference, current, tool) {
  let dx = reference.line.p2.x - reference.line.p1.x;
  let dy = reference.line.p2.y - reference.line.p1.y;
  if (tool === "perpendicular") {
    [dx, dy] = [-dy, dx];
  }

  return createSvgElement("line", {
    ...extendedLineAttrs(current.x, current.y, dx, dy),
    stroke: "#a0c4ff88",
    "stroke-width": 1,
    "stroke-dasharray": "4 4",
    "stroke-linecap": "round",
  });
}

function updateSidebar() {
  if (!appState) {
    elementListEl.innerHTML = "";
    return;
  }

  elementListEl.innerHTML = appState.elements
    .map(
      (el, index) =>
        `<div class="element-item">${index + 1}. <strong>${el.element_type}</strong> ${el.label}</div>`
    )
    .join("");
}

function setStatus(message) {
  statusEl.textContent = message;
}

function syncState() {
  appState = JSON.parse(editor.to_json());
  updateSidebar();
}

function openSvgInNewTab() {
  const svgMarkup = buildStandaloneSvg();
  const blob = new Blob([svgMarkup], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const opened = window.open(url, "_blank", "noopener,noreferrer");

  if (!opened) {
    URL.revokeObjectURL(url);
    setStatus("Pop-up blocked while opening the SVG");
    return;
  }

  setTimeout(() => URL.revokeObjectURL(url), 60_000);
  setStatus("Opened the current SVG in a new tab");
}

function buildStandaloneSvg() {
  const width = viewportEl.clientWidth;
  const height = viewportEl.clientHeight;
  const sceneMarkup = sceneEl.innerHTML;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="${SVG_NS}" viewBox="0 0 ${width} ${height}" width="100%" height="100%" preserveAspectRatio="none" style="display:block;width:100vw;height:100vh;background:#0d0d1a">
  <defs>
    <pattern id="polaris-grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1a1a30" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="#0d0d1a"/>
  <rect width="100%" height="100%" fill="url(#polaris-grid)"/>
  ${sceneMarkup}
</svg>`;
}

function loadDemoScene() {
  const status = editor.load_demo_scene();
  syncState();
  render();
  setStatus(status);
}

loadDemoScene();
