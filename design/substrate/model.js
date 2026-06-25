/* =============================================================================
   Substrate — Fleet Information Model (shared data layer)
   -----------------------------------------------------------------------------
   The canonical model that the upload + agent pipeline produces and that the
   Promotion (HITL) and Download views consume. Field-level provenance + status
   make the human-in-the-loop review meaningful.

   Field.status: 'confirmed' | 'review' | 'conflict' | 'gap' | 'awaiting'
   Promotion edits are persisted to localStorage('substrate-model') so the
   Download view reflects them. Falls back to the seed.

   Exposed as window.SubstrateModel.
   ========================================================================== */
(function () {
  "use strict";

  var SEED = {
    meta: {
      name: "Fleet Information Model",
      slug: "fleet-information-model",
      version: "1.0.0-draft",
      generated: "2026-06-25T14:20:00Z",
      sourceFiles: [
        "rack-manifest-iad7.csv", "telemetry-us-east-2.json", "cooling-loop-b.yaml",
        "topology-spine-leaf.graphml", "power-audit-q2.xlsx", "firmware-bundle-v4.2.tar.gz"
      ],
      pipeline: ["Ingest", "Parse", "Classify", "Validate", "Index"]
    },
    contacts: [
      { id: "c1", name: "Maya Okafor",  role: "Platform Lead",   org: "Helios", email: "m.okafor@helios.example" },
      { id: "c2", name: "Sam Patel",    role: "Facilities Mgr",  org: "Helios", email: "s.patel@helios.example" },
      { id: "c3", name: "Dana Nguyen",  role: "Procurement",     org: "Helios", email: "d.nguyen@helios.example" }
    ],
    entities: [
      {
        id: "us-east-2", type: "Region", label: "us-east-2", sublabel: "US East (Ohio)",
        fields: [
          { key: "code", label: "Region code", value: "us-east-2", status: "confirmed", confidence: 0.99, source: { file: "rack-manifest-iad7.csv", agent: "Parse" } },
          { key: "displayName", label: "Display name", value: "US East (Ohio)", status: "confirmed", confidence: 0.97, source: { file: "topology-spine-leaf.graphml", agent: "Classify" } },
          { key: "availabilityZones", label: "Availability zones", value: "3", status: "confirmed", confidence: 0.98, source: { file: "topology-spine-leaf.graphml", agent: "Parse" } },
          { key: "complianceTier", label: "Compliance tier", value: "", status: "gap", confidence: 0, source: null, note: "Not present in any uploaded source." },
          { key: "dataResidency", label: "Data residency class", value: "", status: "gap", confidence: 0, source: null, note: "Customer-specific; collect via survey." }
        ]
      },
      {
        id: "iad-7", type: "Data center", label: "iad-7", sublabel: "Ashburn, VA",
        fields: [
          { key: "code", label: "DC code", value: "iad-7", status: "confirmed", confidence: 0.99, source: { file: "rack-manifest-iad7.csv", agent: "Parse" } },
          { key: "region", label: "Region", value: "us-east-2", status: "confirmed", confidence: 0.99, source: { file: "rack-manifest-iad7.csv", agent: "Index" } },
          { key: "pue", label: "PUE", value: "1.18", status: "confirmed", confidence: 0.95, source: { file: "telemetry-us-east-2.json", agent: "Classify" } },
          { key: "tier", label: "Uptime tier", value: "", status: "conflict", confidence: 0.6, source: null,
            candidates: [
              { value: "Tier III", source: { file: "rack-manifest-iad7.csv", agent: "Parse" }, confidence: 0.71 },
              { value: "Tier IV", source: { file: "power-audit-q2.xlsx", agent: "Classify" }, confidence: 0.64 }
            ] },
          { key: "commissioned", label: "Commissioned", value: "2021-06", status: "review", confidence: 0.58, source: { file: "power-audit-q2.xlsx", agent: "Classify" }, note: "Low confidence — month inferred." },
          { key: "address", label: "Street address", value: "", status: "gap", confidence: 0, source: null }
        ]
      },
      {
        id: "RK-04-A1", type: "Rack", label: "RK-04-A1", sublabel: "iad-7 · Hall A · row 4",
        fields: [
          { key: "uCapacity", label: "U capacity", value: "42", unit: "U", status: "confirmed", confidence: 0.99, source: { file: "rack-manifest-iad7.csv", agent: "Parse" } },
          { key: "uUsed", label: "U used", value: "38", unit: "U", status: "confirmed", confidence: 0.96, source: { file: "telemetry-us-east-2.json", agent: "Index" } },
          { key: "powerBudget", label: "Power budget", value: "8.5", unit: "kW", status: "confirmed", confidence: 0.97, source: { file: "power-audit-q2.xlsx", agent: "Parse" } },
          { key: "powerDraw", label: "Power draw", value: "7.8", unit: "kW", status: "confirmed", confidence: 0.94, source: { file: "telemetry-us-east-2.json", agent: "Classify" } },
          { key: "coolingLoop", label: "Cooling loop", value: "loop-B", status: "review", confidence: 0.62, source: { file: "cooling-loop-b.yaml", agent: "Classify" }, note: "Matched by proximity heuristic." },
          { key: "owner", label: "Owner", value: "", status: "conflict", confidence: 0.5, source: null,
            candidates: [
              { value: "m.okafor", source: { file: "rack-manifest-iad7.csv", agent: "Parse" }, confidence: 0.8 },
              { value: "M. Okafor / Platform", source: { file: "topology-spine-leaf.graphml", agent: "Classify" }, confidence: 0.74 }
            ] },
          { key: "assetTag", label: "Asset tag", value: "", status: "gap", confidence: 0, source: null, note: "Physical label not in any feed." },
          { key: "warrantyExpiry", label: "Warranty expiry", value: "", status: "gap", confidence: 0, source: null }
        ]
      },
      {
        id: "srv-gpu-0142", type: "Device", label: "srv-gpu-0142", sublabel: "RK-04-A1 · compute",
        fields: [
          { key: "model", label: "Model", value: "Dell PowerEdge XE9680", status: "confirmed", confidence: 0.93, source: { file: "firmware-bundle-v4.2.tar.gz", agent: "Classify" } },
          { key: "serial", label: "Serial", value: "CN-0XE9680-2241", status: "confirmed", confidence: 0.99, source: { file: "firmware-bundle-v4.2.tar.gz", agent: "Parse" } },
          { key: "gpuCount", label: "GPU count", value: "8", unit: "× H100", status: "confirmed", confidence: 0.98, source: { file: "telemetry-us-east-2.json", agent: "Parse" } },
          { key: "firmware", label: "Firmware", value: "v4.2", status: "review", confidence: 0.55, source: { file: "firmware-bundle-v4.2.tar.gz", agent: "Validate" }, note: "Validate flagged: bundle failed to index." },
          { key: "supportContract", label: "Support contract", value: "", status: "gap", confidence: 0, source: null }
        ]
      },
      {
        id: "loop-B", type: "Cooling loop", label: "loop-B", sublabel: "iad-7 · CRAH-B",
        fields: [
          { key: "type", label: "Loop type", value: "Chilled water", status: "confirmed", confidence: 0.96, source: { file: "cooling-loop-b.yaml", agent: "Parse" } },
          { key: "crahUnits", label: "CRAH units", value: "2", status: "confirmed", confidence: 0.97, source: { file: "cooling-loop-b.yaml", agent: "Parse" } },
          { key: "setpoint", label: "Supply setpoint", value: "18", unit: "°C", status: "review", confidence: 0.6, source: { file: "cooling-loop-b.yaml", agent: "Classify" }, note: "Validate raised 2 warnings on this record." },
          { key: "maintenanceVendor", label: "Maintenance vendor", value: "", status: "gap", confidence: 0, source: null }
        ]
      }
    ]
  };

  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  function counts(model) {
    var c = { confirmed: 0, review: 0, conflict: 0, gap: 0, awaiting: 0, total: 0 };
    model.entities.forEach(function (e) {
      e.fields.forEach(function (f) { c.total++; if (c[f.status] != null) c[f.status]++; });
    });
    return c;
  }
  function completeness(model) {
    var c = counts(model);
    return c.total ? Math.round((c.confirmed / c.total) * 100) : 0;
  }

  function fmtVal(f) {
    if (f.value === "" || f.value == null) return "";
    return f.unit ? f.value + " " + f.unit : f.value;
  }

  // ---- serializers ----
  function clean(model) {
    return {
      meta: {
        name: model.meta.name, version: model.meta.version,
        generated: model.meta.generated, completeness_pct: completeness(model),
        source_files: model.meta.sourceFiles
      },
      entities: model.entities.map(function (e) {
        var attrs = {};
        e.fields.forEach(function (f) { attrs[f.key] = fmtVal(f) || null; });
        return { id: e.id, type: e.type, label: e.sublabel || e.label, attributes: attrs };
      })
    };
  }
  function toJSON(model) { return JSON.stringify(clean(model), null, 2); }

  function toYAML(model) {
    var m = clean(model), out = [];
    function scalar(v) {
      if (v === null) return "null";
      if (typeof v === "number") return String(v);
      if (/^[\w.\-+ /°×()]+$/.test(v) && !/^\s|\s$/.test(v)) return v;
      return JSON.stringify(v);
    }
    out.push("meta:");
    Object.keys(m.meta).forEach(function (k) {
      if (Array.isArray(m.meta[k])) {
        out.push("  " + k + ":");
        m.meta[k].forEach(function (x) { out.push("    - " + scalar(x)); });
      } else out.push("  " + k + ": " + scalar(m.meta[k]));
    });
    out.push("entities:");
    m.entities.forEach(function (e) {
      out.push("  - id: " + scalar(e.id));
      out.push("    type: " + scalar(e.type));
      out.push("    label: " + scalar(e.label));
      out.push("    attributes:");
      Object.keys(e.attributes).forEach(function (k) {
        out.push("      " + k + ": " + scalar(e.attributes[k]));
      });
    });
    return out.join("\n");
  }

  function toCSV(model) {
    var rows = [["entity_id", "entity_type", "field", "value", "status", "confidence", "source_file", "source_agent"]];
    model.entities.forEach(function (e) {
      e.fields.forEach(function (f) {
        rows.push([
          e.id, e.type, f.key, fmtVal(f),
          f.status, f.confidence || "",
          f.source ? f.source.file : "", f.source ? f.source.agent : ""
        ]);
      });
    });
    return rows.map(function (r) {
      return r.map(function (c) {
        c = String(c);
        return /[",\n]/.test(c) ? '"' + c.replace(/"/g, '""') + '"' : c;
      }).join(",");
    }).join("\n");
  }

  function toNDJSON(model) {
    return clean(model).entities.map(function (e) { return JSON.stringify(e); }).join("\n");
  }

  // tiny deterministic checksum for display
  function checksum(model) {
    var s = toJSON(model), h = 0x811c9dc5;
    for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = (h * 0x01000193) >>> 0; }
    return ("00000000" + h.toString(16)).slice(-8);
  }

  var KEY = "substrate-model";
  window.SubstrateModel = {
    seed: function () { return clone(SEED); },
    load: function () {
      try { var s = localStorage.getItem(KEY); if (s) return JSON.parse(s); } catch (e) {}
      return clone(SEED);
    },
    save: function (model) { try { localStorage.setItem(KEY, JSON.stringify(model)); } catch (e) {} },
    clear: function () { try { localStorage.removeItem(KEY); } catch (e) {} },
    counts: counts, completeness: completeness, fmtVal: fmtVal,
    clean: clean, toJSON: toJSON, toYAML: toYAML, toCSV: toCSV, toNDJSON: toNDJSON,
    checksum: checksum,
    formats: [
      { id: "json",   label: "JSON",   ext: "json",   mime: "application/json",  fn: toJSON },
      { id: "yaml",   label: "YAML",   ext: "yaml",   mime: "text/yaml",         fn: toYAML },
      { id: "csv",    label: "CSV",    ext: "csv",    mime: "text/csv",          fn: toCSV },
      { id: "ndjson", label: "NDJSON", ext: "ndjson", mime: "application/x-ndjson", fn: toNDJSON }
    ]
  };
})();
