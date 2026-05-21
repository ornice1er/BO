import {
  parse
} from "./chunk-QDSHTIUZ.js";
import "./chunk-X337RBFX.js";
import {
  selectSvgElement
} from "./chunk-H2D4YPZ3.js";
import "./chunk-7HVSU7LT.js";
import "./chunk-TSIT7OKK.js";
import "./chunk-JZVYRT75.js";
import "./chunk-BL757MNV.js";
import "./chunk-5LYRE6TZ.js";
import "./chunk-ATXQLWLR.js";
import "./chunk-FAPOSUYN.js";
import "./chunk-X6VAPXHO.js";
import "./chunk-TJULHAOM.js";
import "./chunk-ILT6OF2W.js";
import "./chunk-OBVX5ZNT.js";
import {
  configureSvgSize
} from "./chunk-TC3A2PQK.js";
import "./chunk-AQWQK5VE.js";
import {
  __name,
  log
} from "./chunk-RRGDSRCB.js";
import {
  __async
} from "./chunk-TSVTIBPA.js";

// node_modules/mermaid/dist/chunks/mermaid.core/infoDiagram-42DDH7IO.mjs
var parser = {
  parse: /* @__PURE__ */ __name((input) => __async(null, null, function* () {
    const ast = yield parse("info", input);
    log.debug(ast);
  }), "parse")
};
var DEFAULT_INFO_DB = {
  version: "11.14.0" + (true ? "" : "-tiny")
};
var getVersion = /* @__PURE__ */ __name(() => DEFAULT_INFO_DB.version, "getVersion");
var db = {
  getVersion
};
var draw = /* @__PURE__ */ __name((text, id, version) => {
  log.debug("rendering info diagram\n" + text);
  const svg = selectSvgElement(id);
  configureSvgSize(svg, 100, 400, true);
  const group = svg.append("g");
  group.append("text").attr("x", 100).attr("y", 40).attr("class", "version").attr("font-size", 32).style("text-anchor", "middle").text(`v${version}`);
}, "draw");
var renderer = {
  draw
};
var diagram = {
  parser,
  db,
  renderer
};
export {
  diagram
};
//# sourceMappingURL=chunk-NSJWDQGF.js.map
