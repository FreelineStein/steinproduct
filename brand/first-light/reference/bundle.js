/* @ds-bundle: {"format":4,"namespace":"Stein","components":[{"name":"Button"},{"name":"Tag"},{"name":"GlassPanel"},{"name":"Field"},{"name":"Aurora"},{"name":"StepTrack"},{"name":"Logo"},{"name":"Highlight"}]} */
(function () {
  var React = window.React;
  var h = React.createElement;
  function cx() { return Array.prototype.filter.call(arguments, Boolean).join(" "); }
  function omit(o, keys) { var r = {}; for (var k in o) if (keys.indexOf(k) < 0) r[k] = o[k]; return r; }
  var uid = 0;

  function Button(p) {
    var variant = p.variant || "primary", size = p.size || "md";
    var rest = omit(p, ["variant", "size", "arrow", "className", "children", "href"]);
    var cls = cx("sp-btn", "sp-btn-" + variant, size === "lg" && "sp-btn-lg", p.className);
    var kids = [p.children, p.arrow ? h("span", { key: "a", className: "sp-btn-arrow", "aria-hidden": "true" }, "→") : null];
    if (p.href) return h.apply(null, ["a", Object.assign({ className: cls, href: p.href }, rest)].concat(kids));
    return h.apply(null, ["button", Object.assign({ type: "button", className: cls }, rest)].concat(kids));
  }

  function Tag(p) {
    var tone = p.tone || "neutral";
    return h("span", { className: cx("sp-tag", tone !== "neutral" && "sp-tag-" + tone, p.live && "sp-tag-live", p.className) },
      (p.dot || p.live) ? h("span", { className: "sp-tag-dot", "aria-hidden": "true" }) : null, p.children);
  }

  function GlassPanel(p) {
    var As = p.as || "div";
    return h(As, { className: cx("sp-panel", p.featured && "sp-panel-featured", p.interactive && "sp-panel-interactive", p.className), style: p.style },
      p.eyebrow ? h("div", { className: "sp-eyebrow sp-panel-eyebrow" }, p.eyebrow) : null,
      p.title ? h("h3", { className: "sp-panel-title" }, p.title) : null,
      typeof p.children === "string" ? h("p", { className: "sp-panel-body" }, p.children) : p.children,
      p.footer ? h("div", { className: "sp-panel-footer" }, p.footer) : null);
  }

  function Field(p) {
    var id = p.id || ("sp-field-" + (++uid));
    var rest = omit(p, ["label", "hint", "error", "className", "id", "multiline"]);
    var hintId = (p.error || p.hint) ? id + "-hint" : undefined;
    var input = h(p.multiline ? "textarea" : "input", Object.assign({ id: id, className: "sp-field-input", "aria-invalid": p.error ? "true" : undefined, "aria-describedby": hintId, rows: p.multiline ? 4 : undefined }, rest));
    return h("div", { className: cx("sp-field", p.error && "sp-field-invalid", p.className) },
      p.label ? h("label", { className: "sp-field-label", htmlFor: id }, p.label) : null,
      input,
      (p.error || p.hint) ? h("div", { className: "sp-field-hint", id: hintId }, p.error ? "Error: " + p.error : p.hint) : null);
  }

  function Aurora(p) {
    return h("section", { className: cx("sp-aurora", p.flat && "sp-aurora-flat", p.className), style: Object.assign({ minHeight: p.minHeight }, p.style) },
      h("div", { className: "sp-aurora-stars", "aria-hidden": "true" }),
      h("div", { className: "sp-aurora-orb a", "aria-hidden": "true" }),
      h("div", { className: "sp-aurora-orb b", "aria-hidden": "true" }),
      h("div", { className: "sp-aurora-orb c", "aria-hidden": "true" }),
      p.horizon === false ? null : h("div", { className: "sp-aurora-limb", "aria-hidden": "true" }),
      h("div", { className: "sp-aurora-content", style: p.contentStyle }, p.children));
  }

  function StepTrack(p) {
    var steps = p.steps || [], active = p.active == null ? 0 : p.active;
    return h("ol", { className: cx("sp-steps", p.className), style: { "--sp-steps": steps.length } },
      p.beam === false ? null : h("span", { className: "sp-steps-beam", "aria-hidden": "true" }),
      steps.map(function (s, i) {
        var state = i < active ? "done" : i === active ? "active" : "todo";
        return h("li", { key: i, className: cx("sp-step", "sp-step-" + state), "aria-current": state === "active" ? "step" : undefined },
          h("span", { className: "sp-step-node", "aria-hidden": "true" }),
          h("span", { className: "sp-step-num" }, (i < 9 ? "0" : "") + (i + 1) + (s.meta ? "  /  " + s.meta : "")),
          h("h4", { className: "sp-step-title" }, s.title),
          s.detail ? h("p", { className: "sp-step-detail" }, s.detail) : null);
      }));
  }

  function Mark(p) {
    var id = "sp-hz-" + (++uid), size = p.size || 40, mono = p.tone === "mono";
    var stroke = mono ? "currentColor" : "url(#" + id + ")";
    return h("svg", { viewBox: "0 18 64 32", width: size, height: size / 2, "aria-hidden": "true" },
      mono ? null : h("defs", null,
        h("linearGradient", { id: id, gradientUnits: "userSpaceOnUse", x1: 5, y1: 0, x2: 60, y2: 0 },
          h("stop", { offset: "0", className: "sp-g-a" }), h("stop", { offset: ".62", className: "sp-g-b" }), h("stop", { offset: "1", className: "sp-g-c" })),
        h("linearGradient", { id: id + "s", x1: 0, y1: 0, x2: 1, y2: 0 },
          h("stop", { offset: "0", className: "sp-g-c", stopOpacity: 0 }), h("stop", { offset: ".5", className: "sp-g-sun" }), h("stop", { offset: "1", className: "sp-g-c", stopOpacity: 0 }))),
      h("g", { transform: "translate(0,4)" },
        h("path", { d: "M5 39.14 A48 48 0 0 1 60 31.34", fill: "none", stroke: stroke, strokeWidth: 6.25, strokeLinecap: "round" }),
        h("rect", { x: 24, y: 25.18, width: 40, height: 2.4, rx: 1.2, fill: mono ? "currentColor" : "url(#" + id + "s)", opacity: mono ? 0.55 : 1 }),
        h("circle", { className: "sp-logo-sun", cx: 44, cy: 26.38, r: 5, fill: mono ? "currentColor" : undefined })));
  }

  var WORD = "M53.6 100.3Q74.9 100.3 87.8 95Q100.7 89.8 100.7 77.3Q100.7 68.2 91.9 64.4Q83.1 60.5 60.8 58.8Q48 57.8 38.3 56.7Q28.6 55.6 28.6 53.1Q28.6 50.8 35.5 49.2Q42.3 47.8 52.4 47.8Q61.4 47.8 68.5 49.8Q75.7 51.9 75.7 56.1H100.7Q100.7 43.5 87.3 37.7Q74 31.8 52.7 31.8Q31.6 31.8 18.3 37Q5 42.3 5 54.2Q5 63.7 14.2 67.8Q23.4 72 44 73.5Q57.6 74.7 67.1 75.6Q76.5 76.5 76.5 79.2Q76.5 81.8 69.7 83.1Q62.9 84.3 53.2 84.3Q43.7 84.3 36.8 82.2Q29.9 80 29.9 75.8H4.9Q4.9 88.7 18 94.5Q31.1 100.3 53.6 100.3Z M159.7 101Q170.2 101 179.6 98.8V83.8Q173.2 86 167.5 86Q161.8 86 158.5 84.1Q155.2 82.3 155.2 76.7V57.4H185.4V41.4H155.2V26.4H130.6V41.4H107.7V57.4H130.6V82.5Q130.6 92.3 139.4 96.7Q148.3 101 159.7 101Z M241.6 100.7V86.4Q230.6 86.4 223.6 82.7Q216.4 79.1 216.4 71.1Q216.4 62.8 223.5 58.9Q230.5 54.9 240.8 54.9Q251.3 54.9 257.6 58.1Q261.8 60.3 263.1 63.5H214.2V77.4H287.2Q288.1 74.7 288.1 71Q288.1 56.8 274.7 48.8Q261.1 40.8 240.7 40.8Q221.5 40.8 207.3 48.4Q193.2 56 193.2 71Q193.2 86 207.4 93.4Q221.4 100.7 241.6 100.7ZM241.6 86.4V100.7Q253.3 100.7 260.6 99.6Q267.8 98.5 274.6 96.2Q281.5 94 283.9 91.6L263.6 81.4Q261.2 83 258.8 84.1Q256.2 85 252.1 85.7Q248.1 86.4 241.6 86.4Z M300.6 100H325.2V41.4H300.6Z M341.3 100H365.9V51.9L360.7 41.4H341.3ZM402.9 100H427.7V70.8Q427.7 54.8 418.7 47.8Q409.8 40.8 394.7 40.8Q375.6 40.8 364.2 51.7Q352.7 62.5 352.7 69.2L364.6 76.8Q364.6 68.5 371.2 62.7Q377.8 56.9 386.6 56.9Q394.6 56.9 398.8 60.5Q402.9 64.2 402.9 72.6Z  M483.3 100H508.3V83.4H540.5Q556.6 83.4 564.6 77.1Q572.7 70.8 572.7 57.8Q572.7 44.9 564.7 38.7Q556.6 32.5 540.5 32.5H483.3ZM508.3 67.3V48.5H534.2Q541.2 48.5 544.6 50.7Q548 52.8 548 57.9Q548 63 544.6 65.2Q541.2 67.3 534.2 67.3Z M644.1 71.3H668.9Q668.9 54.8 660.3 47.9Q651.8 40.9 635.4 40.9Q618.1 40.9 608.1 49Q598.1 57.2 598.1 64.3L607.5 72.3Q607.5 65.8 613.1 61.4Q618.7 56.9 627.3 56.9Q634.8 56.9 639.5 60.3Q644.1 63.7 644.1 71.3ZM583 100H607.7V52.9L602.5 41.4H583Z M729.3 100.4Q748.6 100.4 762.9 92.9Q777.2 85.4 777.2 70.2Q777.2 54.9 762.9 47.8Q748.6 40.7 729.3 40.7Q710 40.7 695.7 47.8Q681.4 54.9 681.4 70.2Q681.4 85.4 695.7 92.9Q710 100.4 729.3 100.4ZM729.3 84.8Q719.5 84.8 712.8 81.2Q706 77.6 706 70.5Q706 63.2 712.8 59.8Q719.5 56.3 729.3 56.3Q739.1 56.3 745.8 59.8Q752.5 63.2 752.5 70.5Q752.5 77.6 745.8 81.2Q739.1 84.8 729.3 84.8Z M853.5 100H878.1V21.5H853.5V91ZM823.7 100.5Q840.4 100.5 852.1 94.2Q863.8 87.9 863.8 84.3L853.5 73.2Q853.5 77 846.7 80.7Q839.8 84.5 831.1 84.5Q821.6 84.5 816.2 80.8Q810.8 77.1 810.8 70.7Q810.8 64.2 816.2 60.6Q821.6 56.9 831.1 56.9Q839.8 56.9 846.7 60.6Q853.5 64.3 853.5 68L863.8 57Q863.8 53.4 852.1 47.1Q840.4 40.8 823.7 40.8Q807.6 40.8 796.6 48Q785.6 55.1 785.6 70.5Q785.6 86 796.6 93.2Q807.6 100.5 823.7 100.5Z M960.6 100H979.8V41.4H955.1V89ZM917 41.4H892.2V70.7Q892.2 86.5 900.9 93.5Q909.6 100.5 924.8 100.5Q945.9 100.5 956.6 89.7Q967.3 78.8 967.3 72.2L955.2 65.4Q955.2 73.8 948.5 79.1Q941.7 84.5 932.9 84.5Q924.9 84.5 920.9 80.8Q917 77.2 917 68.7Z M1037.8 100.7Q1053 100.7 1064.9 97Q1076.9 93.3 1079 90.2L1059.1 77.2Q1058.2 79.2 1052.3 82Q1046.4 84.8 1037.8 84.8Q1029.3 84.8 1022.7 81.3Q1016.1 77.8 1016.1 70.8Q1016.1 63.9 1022.7 60.4Q1029.2 56.9 1037.8 56.9Q1046.5 56.9 1052.4 59.7Q1058.2 62.4 1059.1 64.5L1079 52Q1076.9 49.1 1064.9 45Q1053 40.9 1037.8 40.9Q1018 40.9 1004.4 48.2Q990.8 55.4 990.8 70.8Q990.8 86.4 1004.4 93.6Q1018 100.7 1037.8 100.7Z M1136.8 101Q1147.3 101 1156.7 98.8V83.8Q1150.3 86 1144.5 86Q1138.8 86 1135.6 84.1Q1132.3 82.3 1132.3 76.7V57.4H1162.5V41.4H1132.3V26.4H1107.7V41.4H1084.8V57.4H1107.7V82.5Q1107.7 92.3 1116.5 96.7Q1125.4 101 1136.8 101Z";
  var LOCK = { vb: "-2 -36 1172 138", ratio: 8.4799 };
  function Wordmark(p) {
    var id = "sp-wm-" + (++uid), mono = p.tone === "mono", height = p.height || 40;
    return h("svg", { viewBox: LOCK.vb, height: height, width: Math.round(height * LOCK.ratio), role: "img", "aria-label": "Stein Product" },
      mono ? null : h("defs", null,
        h("linearGradient", { id: id, gradientUnits: "userSpaceOnUse", x1: 192.8, y1: 0, x2: 362.2, y2: 0 },
          h("stop", { offset: "0", className: "sp-g-a" }), h("stop", { offset: ".62", className: "sp-g-b" }), h("stop", { offset: "1", className: "sp-g-c" })),
        h("linearGradient", { id: id + "s", x1: 0, y1: 0, x2: 1, y2: 0 },
          h("stop", { offset: "0", className: "sp-g-c", stopOpacity: 0 }), h("stop", { offset: ".5", className: "sp-g-sun" }), h("stop", { offset: "1", className: "sp-g-c", stopOpacity: 0 }))),
      h("path", { d: WORD, fill: "currentColor" }),
      h("path", { d: "M192.8 22.5 A147.9 147.9 0 0 1 362.2 -1.5", fill: "none", stroke: mono ? "currentColor" : "url(#" + id + ")", strokeWidth: 19.25, strokeLinecap: "round" }),
      h("rect", { x: 251.3, y: -20.5, width: 123.2, height: 7.39, rx: 3.70, fill: mono ? "currentColor" : "url(#" + id + "s)", opacity: mono ? 0.55 : 1 }),
      h("circle", { className: "sp-logo-sun", cx: 312.9, cy: -16.8, r: 15.4, fill: mono ? "currentColor" : undefined }));
  }

  function Logo(p) {
    var tone = p.tone || "auto";
    var inner = p.variant === "mark" ? h(Mark, { size: p.size || 44, tone: tone }) : h(Wordmark, { height: p.height || 40, tone: tone });
    return h(p.href ? "a" : "span", { className: cx("sp-logo", p.className), "data-tone": tone === "auto" ? undefined : tone, href: p.href, "aria-label": p.href ? "Stein Product" : undefined }, inner);
  }

  function Highlight(p) { return h("span", { className: cx("sp-highlight", p.className) }, p.children); }

  window.Stein = Object.assign(window.Stein || {}, { Button: Button, Tag: Tag, GlassPanel: GlassPanel, Field: Field, Aurora: Aurora, StepTrack: StepTrack, Logo: Logo, Mark: Mark, Wordmark: Wordmark, Highlight: Highlight });
})();
