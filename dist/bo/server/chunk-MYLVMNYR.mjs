import './polyfills.server.mjs';
import {
  getConfig2
} from "./chunk-PHPQMZ4Q.mjs";
import {
  __name,
  select_default
} from "./chunk-4BI5D7IA.mjs";

// node_modules/mermaid/dist/chunks/mermaid.core/chunk-426QAEUC.mjs
var selectSvgElement = /* @__PURE__ */ __name((id) => {
  const {
    securityLevel
  } = getConfig2();
  let root = select_default("body");
  if (securityLevel === "sandbox") {
    const sandboxElement = select_default(`#i${id}`);
    const doc = sandboxElement.node()?.contentDocument ?? document;
    root = select_default(doc.body);
  }
  const svg = root.select(`#${id}`);
  return svg;
}, "selectSvgElement");

export {
  selectSvgElement
};
//# sourceMappingURL=chunk-MYLVMNYR.mjs.map
