import './polyfills.server.mjs';
import {
  selectSvgElement
} from "./chunk-MYLVMNYR.mjs";
import {
  parse
} from "./chunk-5BVCP5FJ.mjs";
import "./chunk-2F4WUNXU.mjs";
import "./chunk-KRRFRPWF.mjs";
import "./chunk-N2XZCBUS.mjs";
import "./chunk-6D6XWPBA.mjs";
import "./chunk-BCT42ZOV.mjs";
import "./chunk-JTOB766M.mjs";
import "./chunk-LLWYJTB6.mjs";
import "./chunk-YFRLND5L.mjs";
import "./chunk-2SO2U3JZ.mjs";
import "./chunk-BF5MAZU2.mjs";
import {
  configureSvgSize
} from "./chunk-PHPQMZ4Q.mjs";
import {
  __name,
  log
} from "./chunk-4BI5D7IA.mjs";
import "./chunk-37HTQPMB.mjs";
import "./chunk-A6SVRKS3.mjs";
import "./chunk-SLDM7ROK.mjs";
import {
  __async
} from "./chunk-DFQCVRK3.mjs";

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
//# sourceMappingURL=chunk-EIAMEFSM.mjs.map
