/* =============================================================================
   DC GRID — behavior (vanilla, no dependencies)
   -----------------------------------------------------------------------------
   Three independent modules, all delegated off the document so markup added
   later still works:

     1. THEME TOGGLE   [data-theme-toggle]      flips `.dark` on <html>
     2. TABLE SORT     table.ds-table th[aria-sort]
     3. TREE           [data-tree] : expand/collapse, keyboard nav,
                       native HTML Drag-and-Drop reorder / nest

   State is kept in the DOM (aria-*, data-*) so it stays observable & parseable.
   The pre-paint theme is set by an inline <head> snippet; this file only wires
   the interactive controls.
   ========================================================================== */
(function () {
  "use strict";

  /* ===========================================================================
     1. THEME TOGGLE
     ======================================================================== */
  function curTheme() {
    return document.documentElement.classList.contains("dark") ? "dark" : "light";
  }
  function syncToggles() {
    var t = curTheme();
    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(t === "dark"));
      var lbl = btn.querySelector("[data-theme-label]");
      if (lbl) lbl.textContent = t === "dark" ? "Dark" : "Light";
      btn.querySelectorAll("[data-when]").forEach(function (el) {
        el.hidden = el.getAttribute("data-when") !== t;
      });
    });
  }
  function setTheme(t) {
    document.documentElement.classList.toggle("dark", t === "dark");
    document.documentElement.setAttribute("data-theme", t);
    try { localStorage.setItem("ds-theme", t); } catch (e) {}
    syncToggles();
  }
  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-theme-toggle]");
    if (!btn) return;
    setTheme(curTheme() === "dark" ? "light" : "dark");
  });

  /* ===========================================================================
     2. TABLE SORT
     ======================================================================== */
  function cellValue(td) {
    if (!td) return "";
    var v = td.getAttribute("data-sort-value");
    return v !== null ? v : td.textContent.trim();
  }
  function numericize(s) {
    var n = parseFloat(String(s).replace(/[^0-9.\-]/g, ""));
    return isNaN(n) ? null : n;
  }
  document.addEventListener("click", function (e) {
    var th = e.target.closest("th[aria-sort]");
    if (!th) return;
    var table = th.closest("table");
    var tbody = table && table.tBodies[0];
    if (!tbody) return;

    var headRow = th.parentNode;
    var idx = Array.prototype.indexOf.call(headRow.children, th);
    var dir = th.getAttribute("aria-sort") === "ascending" ? "descending" : "ascending";

    Array.prototype.forEach.call(headRow.children, function (h) {
      if (h !== th && h.hasAttribute("aria-sort")) h.setAttribute("aria-sort", "none");
    });
    th.setAttribute("aria-sort", dir);

    var rows = Array.prototype.slice.call(tbody.rows);
    var type = th.getAttribute("data-sort-type") || "auto";
    rows.sort(function (a, b) {
      var av = cellValue(a.cells[idx]), bv = cellValue(b.cells[idx]);
      var an = numericize(av), bn = numericize(bv);
      var cmp;
      if (type === "number" || (type === "auto" && an !== null && bn !== null)) {
        cmp = (an || 0) - (bn || 0);
      } else {
        cmp = av.localeCompare(bv, undefined, { numeric: true, sensitivity: "base" });
      }
      return dir === "ascending" ? cmp : -cmp;
    });
    rows.forEach(function (r) { tbody.appendChild(r); });
  });

  /* ===========================================================================
     3. TREE  (expand/collapse · keyboard · drag-and-drop)
     ======================================================================== */
  function childGroup(li) { return li.querySelector(":scope > ul[role='group']"); }
  function ensureGroup(li) {
    var g = childGroup(li);
    if (!g) { g = document.createElement("ul"); g.setAttribute("role", "group"); li.appendChild(g); }
    return g;
  }
  function hasChildren(li) {
    var g = childGroup(li);
    return !!(g && g.querySelector(":scope > li"));
  }
  function isDescendant(parent, node) {
    return parent !== node && parent.contains(node);
  }
  function refreshNode(li) {
    if (hasChildren(li)) {
      if (!li.hasAttribute("aria-expanded")) li.setAttribute("aria-expanded", "true");
    } else {
      li.removeAttribute("aria-expanded");
      var g = childGroup(li);
      if (g) g.remove();
    }
  }
  function setDepth(li, depth) {
    li.setAttribute("data-depth", String(depth));
    var g = childGroup(li);
    if (g) {
      Array.prototype.forEach.call(g.children, function (c) {
        if (c.matches("[role='treeitem']")) setDepth(c, depth + 1);
      });
    }
  }
  function setExpanded(li, open) {
    if (!hasChildren(li)) return;
    li.setAttribute("aria-expanded", String(open));
  }

  /* ---- expand / collapse via toggle ------------------------------------- */
  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-tree-toggle]");
    if (!btn) return;
    var li = btn.closest("[role='treeitem']");
    if (!li || !hasChildren(li)) return;
    setExpanded(li, li.getAttribute("aria-expanded") !== "true");
  });

  /* ---- keyboard navigation ---------------------------------------------- */
  function visibleItems(tree) {
    return Array.prototype.filter.call(
      tree.querySelectorAll("[role='treeitem']"),
      function (li) {
        var p = li.parentElement.closest("[role='treeitem']");
        while (p) {
          if (p.getAttribute("aria-expanded") === "false") return false;
          p = p.parentElement.closest("[role='treeitem']");
        }
        return true;
      }
    );
  }
  function focusRow(li) {
    var row = li.querySelector(":scope > .ds-tree-row");
    if (row) row.focus();
  }
  /* roving tabindex: only the focused row is tabbable */
  document.addEventListener("focusin", function (e) {
    var row = e.target.closest(".ds-tree-row");
    var tree = e.target.closest("[data-tree]");
    if (!row || !tree) return;
    tree.querySelectorAll(".ds-tree-row").forEach(function (r) { r.tabIndex = -1; });
    row.tabIndex = 0;
  });
  document.addEventListener("keydown", function (e) {
    var row = e.target.closest(".ds-tree-row");
    var tree = e.target.closest("[data-tree]");
    if (!row || !tree) return;
    var li = row.closest("[role='treeitem']");
    var items = visibleItems(tree);
    var i = items.indexOf(li);
    var handled = true;
    switch (e.key) {
      case "ArrowDown": if (i < items.length - 1) focusRow(items[i + 1]); break;
      case "ArrowUp":   if (i > 0) focusRow(items[i - 1]); break;
      case "ArrowRight":
        if (hasChildren(li) && li.getAttribute("aria-expanded") !== "true") setExpanded(li, true);
        else if (hasChildren(li)) focusRow(childGroup(li).querySelector(":scope > li"));
        break;
      case "ArrowLeft":
        if (hasChildren(li) && li.getAttribute("aria-expanded") === "true") setExpanded(li, false);
        else { var par = li.parentElement.closest("[role='treeitem']"); if (par) focusRow(par); }
        break;
      case "Enter":
      case " ":
        if (hasChildren(li)) setExpanded(li, li.getAttribute("aria-expanded") !== "true");
        break;
      case "Home": if (items[0]) focusRow(items[0]); break;
      case "End":  if (items.length) focusRow(items[items.length - 1]); break;
      default: handled = false;
    }
    if (handled) e.preventDefault();
  });

  /* ---- drag and drop ---------------------------------------------------- */
  var dragLi = null;
  var dropTarget = null;

  function clearDrop() {
    if (dropTarget) { dropTarget.removeAttribute("data-drop"); dropTarget = null; }
  }

  document.addEventListener("dragstart", function (e) {
    var handle = e.target.closest("[data-drag-handle]");
    if (!handle) { return; }
    dragLi = handle.closest("[role='treeitem']");
    if (!dragLi) return;
    dragLi.classList.add("ds-dragging");
    dragLi.setAttribute("aria-grabbed", "true");
    e.dataTransfer.effectAllowed = "move";
    try { e.dataTransfer.setData("text/plain", ""); } catch (_) {}
  });

  document.addEventListener("dragover", function (e) {
    if (!dragLi) return;
    var li = e.target.closest("[role='treeitem']");
    var tree = e.target.closest("[data-tree]");
    if (!li || !tree || !tree.contains(dragLi)) { clearDrop(); return; }
    e.preventDefault();

    if (li !== dropTarget) clearDrop();
    dropTarget = li;

    // invalid: dropping a node into itself or a descendant
    if (li === dragLi || isDescendant(dragLi, li)) {
      li.setAttribute("data-drop", "invalid");
      e.dataTransfer.dropEffect = "none";
      return;
    }
    e.dataTransfer.dropEffect = "move";

    var row = li.querySelector(":scope > .ds-tree-row");
    var r = row.getBoundingClientRect();
    var rel = (e.clientY - r.top) / r.height;
    var zone = rel < 0.3 ? "before" : rel > 0.7 ? "after" : "inside";
    li.setAttribute("data-drop", zone);
  });

  document.addEventListener("drop", function (e) {
    if (!dragLi || !dropTarget) { return; }
    e.preventDefault();
    var target = dropTarget;
    var zone = target.getAttribute("data-drop");
    clearDrop();

    if (zone && zone !== "invalid" && target !== dragLi && !isDescendant(dragLi, target)) {
      var oldParentLi = dragLi.parentElement.closest("[role='treeitem']");
      if (zone === "inside") {
        var g = ensureGroup(target);
        g.appendChild(dragLi);
        setExpanded(target, true);
        refreshNode(target);
      } else {
        var parentGroup = target.parentElement; // the ul[role=group] or ul[role=tree]
        if (zone === "before") parentGroup.insertBefore(dragLi, target);
        else parentGroup.insertBefore(dragLi, target.nextSibling);
      }
      // re-derive depths + parent states
      if (oldParentLi) refreshNode(oldParentLi);
      var newParentLi = dragLi.parentElement.closest("[role='treeitem']");
      if (newParentLi) refreshNode(newParentLi);
      var tree = dragLi.closest("[data-tree]");
      Array.prototype.forEach.call(tree.children, function (c) {
        if (c.matches("[role='treeitem']")) setDepth(c, 0);
      });
    }
  });

  document.addEventListener("dragend", function () {
    if (dragLi) {
      dragLi.classList.remove("ds-dragging");
      dragLi.removeAttribute("aria-grabbed");
    }
    clearDrop();
    dragLi = null;
  });

  /* ===========================================================================
     4. DOC SNIPPETS  — mirror each live example into a copy-paste code block
     ======================================================================== */
  function dedent(html) {
    var lines = html.replace(/^\s*\n/, "").replace(/\s+$/, "").split("\n");
    var indents = lines.filter(function (l) { return l.trim(); })
      .map(function (l) { return l.match(/^\s*/)[0].length; });
    var min = indents.length ? Math.min.apply(null, indents) : 0;
    return lines.map(function (l) { return l.slice(min); }).join("\n");
  }
  function buildSnippets() {
    document.querySelectorAll("[data-example]").forEach(function (block) {
      var preview = block.querySelector("[data-preview]");
      var code = block.querySelector("[data-code]");
      if (preview && code) code.textContent = dedent(preview.innerHTML);
    });
  }
  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-copy]");
    if (!btn) return;
    var block = btn.closest("[data-example]");
    var code = block && block.querySelector("[data-code]");
    if (!code || !navigator.clipboard) return;
    navigator.clipboard.writeText(code.textContent).then(function () {
      var lbl = btn.querySelector("[data-copy-label]") || btn;
      var prev = lbl.textContent;
      lbl.textContent = "Copied";
      setTimeout(function () { lbl.textContent = prev; }, 1200);
    }).catch(function () {});
  });

  /* ---- init ------------------------------------------------------------- */
  function init() {
    syncToggles();
    buildSnippets();
    document.querySelectorAll("[data-tree]").forEach(function (tree) {
      Array.prototype.forEach.call(tree.children, function (c) {
        if (c.matches("[role='treeitem']")) setDepth(c, 0);
      });
      // seed roving tabindex on the first row
      var rows = tree.querySelectorAll(".ds-tree-row");
      rows.forEach(function (r, i) { r.tabIndex = i === 0 ? 0 : -1; });
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else { init(); }
})();
