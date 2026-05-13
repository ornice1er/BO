import {
  __commonJS,
  __objRest,
  __spreadProps,
  __spreadValues
} from "./chunk-TSVTIBPA.js";

// node_modules/quill-html-edit-button/dist/quill.htmlEditButton.min.js
var require_quill_htmlEditButton_min = __commonJS({
  "node_modules/quill-html-edit-button/dist/quill.htmlEditButton.min.js"(exports, module) {
    !function(t, e) {
      if ("object" == typeof exports && "object" == typeof module) module.exports = e();
      else if ("function" == typeof define && define.amd) define([], e);
      else {
        var n = e();
        for (var r in n) ("object" == typeof exports ? exports : t)[r] = n[r];
      }
    }(self, () => (() => {
      var t = {
        64: (t2, e2, n2) => {
          (t2.exports = n2(765)(false)).push([t2.id, ".ql-html-overlayContainer {\n  background: #0000007d;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 9999;\n}\n\n.ql-html-popupContainer {\n  background: #ddd;\n  position: absolute;\n  top: 5%;\n  left: 5%;\n  right: 5%;\n  bottom: 5%;\n  border-radius: 10px;\n}\n\n.ql-html-textContainer {\n  position: relative;\n  height: calc(100% - 40px);\n  padding: 20px;\n}\n\n.ql-html-textArea {\n  background: #fff;\n  position: absolute;\n  left: 15px;\n  width: calc(100% - 30px);\n  height: calc(100% - 60px) !important;\n}\n\n.ql-html-textArea .ql-syntax {\n  word-break: break-all;\n  white-space: pre-wrap;\n}\n\n.ql-html-buttonCancel {\n  margin-right: 20px;\n}\n\n.ql-html-popupTitle {\n  margin: 0;\n  display: block;\n  font-style: italic;\n}\n\n.ql-html-buttonGroup {\n  position: absolute;\n  bottom: 20px;\n  transform: scale(1.5);\n  left: calc(50% - 60px);\n}\n", ""]);
        },
        765: (t2) => {
          t2.exports = function(t3) {
            var e2 = [];
            return e2.toString = function() {
              return this.map(function(e3) {
                var n2 = function(t4, e4) {
                  var n3 = t4[1] || "", r = t4[3];
                  if (!r) return n3;
                  if (e4 && "function" == typeof btoa) {
                    var s = (o = r, "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(o)))) + " */"), i = r.sources.map(function(t5) {
                      return "/*# sourceURL=" + r.sourceRoot + t5 + " */";
                    });
                    return [n3].concat(i).concat([s]).join("\n");
                  }
                  var o;
                  return [n3].join("\n");
                }(e3, t3);
                return e3[2] ? "@media " + e3[2] + "{" + n2 + "}" : n2;
              }).join("");
            }, e2.i = function(t4, n2) {
              "string" == typeof t4 && (t4 = [[null, t4, ""]]);
              for (var r = {}, s = 0; s < this.length; s++) {
                var i = this[s][0];
                "number" == typeof i && (r[i] = true);
              }
              for (s = 0; s < t4.length; s++) {
                var o = t4[s];
                "number" == typeof o[0] && r[o[0]] || (n2 && !o[2] ? o[2] = n2 : n2 && (o[2] = "(" + o[2] + ") and (" + n2 + ")"), e2.push(o));
              }
            }, e2;
          };
        },
        228: (t2) => {
          "use strict";
          var e2 = Object.prototype.hasOwnProperty, n2 = "~";
          function r() {
          }
          function s(t3, e3, n3) {
            this.fn = t3, this.context = e3, this.once = n3 || false;
          }
          function i(t3, e3, r2, i2, o2) {
            if ("function" != typeof r2) throw new TypeError("The listener must be a function");
            var l2 = new s(r2, i2 || t3, o2), a = n2 ? n2 + e3 : e3;
            return t3._events[a] ? t3._events[a].fn ? t3._events[a] = [t3._events[a], l2] : t3._events[a].push(l2) : (t3._events[a] = l2, t3._eventsCount++), t3;
          }
          function o(t3, e3) {
            0 == --t3._eventsCount ? t3._events = new r() : delete t3._events[e3];
          }
          function l() {
            this._events = new r(), this._eventsCount = 0;
          }
          Object.create && (r.prototype = /* @__PURE__ */ Object.create(null), new r().__proto__ || (n2 = false)), l.prototype.eventNames = function() {
            var t3, r2, s2 = [];
            if (0 === this._eventsCount) return s2;
            for (r2 in t3 = this._events) e2.call(t3, r2) && s2.push(n2 ? r2.slice(1) : r2);
            return Object.getOwnPropertySymbols ? s2.concat(Object.getOwnPropertySymbols(t3)) : s2;
          }, l.prototype.listeners = function(t3) {
            var e3 = n2 ? n2 + t3 : t3, r2 = this._events[e3];
            if (!r2) return [];
            if (r2.fn) return [r2.fn];
            for (var s2 = 0, i2 = r2.length, o2 = new Array(i2); s2 < i2; s2++) o2[s2] = r2[s2].fn;
            return o2;
          }, l.prototype.listenerCount = function(t3) {
            var e3 = n2 ? n2 + t3 : t3, r2 = this._events[e3];
            return r2 ? r2.fn ? 1 : r2.length : 0;
          }, l.prototype.emit = function(t3, e3, r2, s2, i2, o2) {
            var l2 = n2 ? n2 + t3 : t3;
            if (!this._events[l2]) return false;
            var a, c, u = this._events[l2], h = arguments.length;
            if (u.fn) {
              switch (u.once && this.removeListener(t3, u.fn, void 0, true), h) {
                case 1:
                  return u.fn.call(u.context), true;
                case 2:
                  return u.fn.call(u.context, e3), true;
                case 3:
                  return u.fn.call(u.context, e3, r2), true;
                case 4:
                  return u.fn.call(u.context, e3, r2, s2), true;
                case 5:
                  return u.fn.call(u.context, e3, r2, s2, i2), true;
                case 6:
                  return u.fn.call(u.context, e3, r2, s2, i2, o2), true;
              }
              for (c = 1, a = new Array(h - 1); c < h; c++) a[c - 1] = arguments[c];
              u.fn.apply(u.context, a);
            } else {
              var d, f = u.length;
              for (c = 0; c < f; c++) switch (u[c].once && this.removeListener(t3, u[c].fn, void 0, true), h) {
                case 1:
                  u[c].fn.call(u[c].context);
                  break;
                case 2:
                  u[c].fn.call(u[c].context, e3);
                  break;
                case 3:
                  u[c].fn.call(u[c].context, e3, r2);
                  break;
                case 4:
                  u[c].fn.call(u[c].context, e3, r2, s2);
                  break;
                default:
                  if (!a) for (d = 1, a = new Array(h - 1); d < h; d++) a[d - 1] = arguments[d];
                  u[c].fn.apply(u[c].context, a);
              }
            }
            return true;
          }, l.prototype.on = function(t3, e3, n3) {
            return i(this, t3, e3, n3, false);
          }, l.prototype.once = function(t3, e3, n3) {
            return i(this, t3, e3, n3, true);
          }, l.prototype.removeListener = function(t3, e3, r2, s2) {
            var i2 = n2 ? n2 + t3 : t3;
            if (!this._events[i2]) return this;
            if (!e3) return o(this, i2), this;
            var l2 = this._events[i2];
            if (l2.fn) l2.fn !== e3 || s2 && !l2.once || r2 && l2.context !== r2 || o(this, i2);
            else {
              for (var a = 0, c = [], u = l2.length; a < u; a++) (l2[a].fn !== e3 || s2 && !l2[a].once || r2 && l2[a].context !== r2) && c.push(l2[a]);
              c.length ? this._events[i2] = 1 === c.length ? c[0] : c : o(this, i2);
            }
            return this;
          }, l.prototype.removeAllListeners = function(t3) {
            var e3;
            return t3 ? (e3 = n2 ? n2 + t3 : t3, this._events[e3] && o(this, e3)) : (this._events = new r(), this._eventsCount = 0), this;
          }, l.prototype.off = l.prototype.removeListener, l.prototype.addListener = l.prototype.on, l.prefixed = n2, l.EventEmitter = l, t2.exports = l;
        },
        606: (t2) => {
          var e2 = -1, n2 = 1, r = 0;
          function s(t3, g2, m2, b2, y2) {
            if (t3 === g2) return t3 ? [[r, t3]] : [];
            if (null != m2) {
              var x2 = function(t4, e3, n3) {
                var r2 = "number" == typeof n3 ? {
                  index: n3,
                  length: 0
                } : n3.oldRange, s2 = "number" == typeof n3 ? null : n3.newRange, i2 = t4.length, o2 = e3.length;
                if (0 === r2.length && (null === s2 || 0 === s2.length)) {
                  var l2 = r2.index, a2 = t4.slice(0, l2), c2 = t4.slice(l2), u2 = s2 ? s2.index : null, h2 = l2 + o2 - i2;
                  if ((null === u2 || u2 === h2) && !(h2 < 0 || h2 > o2)) {
                    var d2 = e3.slice(0, h2);
                    if ((g3 = e3.slice(h2)) === c2) {
                      var f2 = Math.min(l2, h2);
                      if ((b3 = a2.slice(0, f2)) === (x3 = d2.slice(0, f2))) return v(b3, a2.slice(f2), d2.slice(f2), c2);
                    }
                  }
                  if (null === u2 || u2 === l2) {
                    var p2 = l2, g3 = (d2 = e3.slice(0, p2), e3.slice(p2));
                    if (d2 === a2) {
                      var m3 = Math.min(i2 - p2, o2 - p2);
                      if ((y3 = c2.slice(c2.length - m3)) === (N2 = g3.slice(g3.length - m3))) return v(a2, c2.slice(0, c2.length - m3), g3.slice(0, g3.length - m3), y3);
                    }
                  }
                }
                if (r2.length > 0 && s2 && 0 === s2.length) {
                  var b3 = t4.slice(0, r2.index), y3 = t4.slice(r2.index + r2.length);
                  if (!(o2 < (f2 = b3.length) + (m3 = y3.length))) {
                    var x3 = e3.slice(0, f2), N2 = e3.slice(o2 - m3);
                    if (b3 === x3 && y3 === N2) return v(b3, t4.slice(f2, i2 - m3), e3.slice(f2, o2 - m3), y3);
                  }
                }
                return null;
              }(t3, g2, m2);
              if (x2) return x2;
            }
            var N = o(t3, g2), w = t3.substring(0, N);
            N = a(t3 = t3.substring(N), g2 = g2.substring(N));
            var E = t3.substring(t3.length - N), A = function(t4, l2) {
              var c2;
              if (!t4) return [[n2, l2]];
              if (!l2) return [[e2, t4]];
              var u2 = t4.length > l2.length ? t4 : l2, h2 = t4.length > l2.length ? l2 : t4, d2 = u2.indexOf(h2);
              if (-1 !== d2) return c2 = [[n2, u2.substring(0, d2)], [r, h2], [n2, u2.substring(d2 + h2.length)]], t4.length > l2.length && (c2[0][0] = c2[2][0] = e2), c2;
              if (1 === h2.length) return [[e2, t4], [n2, l2]];
              var f2 = function(t5, e3) {
                var n3 = t5.length > e3.length ? t5 : e3, r2 = t5.length > e3.length ? e3 : t5;
                if (n3.length < 4 || 2 * r2.length < n3.length) return null;
                function s2(t6, e4, n4) {
                  for (var r3, s3, i3, l4, c4 = t6.substring(n4, n4 + Math.floor(t6.length / 4)), u4 = -1, h4 = ""; -1 !== (u4 = e4.indexOf(c4, u4 + 1)); ) {
                    var d4 = o(t6.substring(n4), e4.substring(u4)), f4 = a(t6.substring(0, n4), e4.substring(0, u4));
                    h4.length < f4 + d4 && (h4 = e4.substring(u4 - f4, u4) + e4.substring(u4, u4 + d4), r3 = t6.substring(0, n4 - f4), s3 = t6.substring(n4 + d4), i3 = e4.substring(0, u4 - f4), l4 = e4.substring(u4 + d4));
                  }
                  return 2 * h4.length >= t6.length ? [r3, s3, i3, l4, h4] : null;
                }
                var i2, l3, c3, u3, h3, d3 = s2(n3, r2, Math.ceil(n3.length / 4)), f3 = s2(n3, r2, Math.ceil(n3.length / 2));
                if (!d3 && !f3) return null;
                i2 = f3 ? d3 && d3[4].length > f3[4].length ? d3 : f3 : d3;
                t5.length > e3.length ? (l3 = i2[0], c3 = i2[1], u3 = i2[2], h3 = i2[3]) : (u3 = i2[0], h3 = i2[1], l3 = i2[2], c3 = i2[3]);
                var p3 = i2[4];
                return [l3, c3, u3, h3, p3];
              }(t4, l2);
              if (f2) {
                var p2 = f2[0], g3 = f2[1], m3 = f2[2], b3 = f2[3], y3 = f2[4], v2 = s(p2, m3), x3 = s(g3, b3);
                return v2.concat([[r, y3]], x3);
              }
              return function(t5, r2) {
                for (var s2 = t5.length, o2 = r2.length, l3 = Math.ceil((s2 + o2) / 2), a2 = l3, c3 = 2 * l3, u3 = new Array(c3), h3 = new Array(c3), d3 = 0; d3 < c3; d3++) u3[d3] = -1, h3[d3] = -1;
                u3[a2 + 1] = 0, h3[a2 + 1] = 0;
                for (var f3 = s2 - o2, p3 = f3 % 2 != 0, g4 = 0, m4 = 0, b4 = 0, y4 = 0, v3 = 0; v3 < l3; v3++) {
                  for (var x4 = -v3 + g4; x4 <= v3 - m4; x4 += 2) {
                    for (var N2 = a2 + x4, w2 = (_ = x4 === -v3 || x4 !== v3 && u3[N2 - 1] < u3[N2 + 1] ? u3[N2 + 1] : u3[N2 - 1] + 1) - x4; _ < s2 && w2 < o2 && t5.charAt(_) === r2.charAt(w2); ) _++, w2++;
                    if (u3[N2] = _, _ > s2) m4 += 2;
                    else if (w2 > o2) g4 += 2;
                    else if (p3) {
                      if ((q = a2 + f3 - x4) >= 0 && q < c3 && -1 !== h3[q]) {
                        if (_ >= (A2 = s2 - h3[q])) return i(t5, r2, _, w2);
                      }
                    }
                  }
                  for (var E2 = -v3 + b4; E2 <= v3 - y4; E2 += 2) {
                    for (var A2, q = a2 + E2, k = (A2 = E2 === -v3 || E2 !== v3 && h3[q - 1] < h3[q + 1] ? h3[q + 1] : h3[q - 1] + 1) - E2; A2 < s2 && k < o2 && t5.charAt(s2 - A2 - 1) === r2.charAt(o2 - k - 1); ) A2++, k++;
                    if (h3[q] = A2, A2 > s2) y4 += 2;
                    else if (k > o2) b4 += 2;
                    else if (!p3) {
                      if ((N2 = a2 + f3 - E2) >= 0 && N2 < c3 && -1 !== u3[N2]) {
                        var _;
                        w2 = a2 + (_ = u3[N2]) - N2;
                        if (_ >= (A2 = s2 - A2)) return i(t5, r2, _, w2);
                      }
                    }
                  }
                }
                return [[e2, t5], [n2, r2]];
              }(t4, l2);
            }(t3 = t3.substring(0, t3.length - N), g2 = g2.substring(0, g2.length - N));
            return w && A.unshift([r, w]), E && A.push([r, E]), p(A, y2), b2 && function(t4) {
              var s2 = false, i2 = [], o2 = 0, g3 = null, m3 = 0, b3 = 0, y3 = 0, v2 = 0, x3 = 0;
              for (; m3 < t4.length; ) t4[m3][0] == r ? (i2[o2++] = m3, b3 = v2, y3 = x3, v2 = 0, x3 = 0, g3 = t4[m3][1]) : (t4[m3][0] == n2 ? v2 += t4[m3][1].length : x3 += t4[m3][1].length, g3 && g3.length <= Math.max(b3, y3) && g3.length <= Math.max(v2, x3) && (t4.splice(i2[o2 - 1], 0, [e2, g3]), t4[i2[o2 - 1] + 1][0] = n2, o2--, m3 = --o2 > 0 ? i2[o2 - 1] : -1, b3 = 0, y3 = 0, v2 = 0, x3 = 0, g3 = null, s2 = true)), m3++;
              s2 && p(t4);
              (function(t5) {
                function e3(t6, e4) {
                  if (!t6 || !e4) return 6;
                  var n4 = t6.charAt(t6.length - 1), r2 = e4.charAt(0), s4 = n4.match(c), i4 = r2.match(c), o4 = s4 && n4.match(u), l3 = i4 && r2.match(u), a2 = o4 && n4.match(h), p3 = l3 && r2.match(h), g5 = a2 && t6.match(d), m5 = p3 && e4.match(f);
                  return g5 || m5 ? 5 : a2 || p3 ? 4 : s4 && !o4 && l3 ? 3 : o4 || l3 ? 2 : s4 || i4 ? 1 : 0;
                }
                var n3 = 1;
                for (; n3 < t5.length - 1; ) {
                  if (t5[n3 - 1][0] == r && t5[n3 + 1][0] == r) {
                    var s3 = t5[n3 - 1][1], i3 = t5[n3][1], o3 = t5[n3 + 1][1], l2 = a(s3, i3);
                    if (l2) {
                      var p2 = i3.substring(i3.length - l2);
                      s3 = s3.substring(0, s3.length - l2), i3 = p2 + i3.substring(0, i3.length - l2), o3 = p2 + o3;
                    }
                    for (var g4 = s3, m4 = i3, b4 = o3, y4 = e3(s3, i3) + e3(i3, o3); i3.charAt(0) === o3.charAt(0); ) {
                      s3 += i3.charAt(0), i3 = i3.substring(1) + o3.charAt(0), o3 = o3.substring(1);
                      var v3 = e3(s3, i3) + e3(i3, o3);
                      v3 >= y4 && (y4 = v3, g4 = s3, m4 = i3, b4 = o3);
                    }
                    t5[n3 - 1][1] != g4 && (g4 ? t5[n3 - 1][1] = g4 : (t5.splice(n3 - 1, 1), n3--), t5[n3][1] = m4, b4 ? t5[n3 + 1][1] = b4 : (t5.splice(n3 + 1, 1), n3--));
                  }
                  n3++;
                }
              })(t4), m3 = 1;
              for (; m3 < t4.length; ) {
                if (t4[m3 - 1][0] == e2 && t4[m3][0] == n2) {
                  var N2 = t4[m3 - 1][1], w2 = t4[m3][1], E2 = l(N2, w2), A2 = l(w2, N2);
                  E2 >= A2 ? (E2 >= N2.length / 2 || E2 >= w2.length / 2) && (t4.splice(m3, 0, [r, w2.substring(0, E2)]), t4[m3 - 1][1] = N2.substring(0, N2.length - E2), t4[m3 + 1][1] = w2.substring(E2), m3++) : (A2 >= N2.length / 2 || A2 >= w2.length / 2) && (t4.splice(m3, 0, [r, N2.substring(0, A2)]), t4[m3 - 1][0] = n2, t4[m3 - 1][1] = w2.substring(0, w2.length - A2), t4[m3 + 1][0] = e2, t4[m3 + 1][1] = N2.substring(A2), m3++), m3++;
                }
                m3++;
              }
            }(A), A;
          }
          function i(t3, e3, n3, r2) {
            var i2 = t3.substring(0, n3), o2 = e3.substring(0, r2), l2 = t3.substring(n3), a2 = e3.substring(r2), c2 = s(i2, o2), u2 = s(l2, a2);
            return c2.concat(u2);
          }
          function o(t3, e3) {
            if (!t3 || !e3 || t3.charAt(0) !== e3.charAt(0)) return 0;
            for (var n3 = 0, r2 = Math.min(t3.length, e3.length), s2 = r2, i2 = 0; n3 < s2; ) t3.substring(i2, s2) == e3.substring(i2, s2) ? i2 = n3 = s2 : r2 = s2, s2 = Math.floor((r2 - n3) / 2 + n3);
            return g(t3.charCodeAt(s2 - 1)) && s2--, s2;
          }
          function l(t3, e3) {
            var n3 = t3.length, r2 = e3.length;
            if (0 == n3 || 0 == r2) return 0;
            n3 > r2 ? t3 = t3.substring(n3 - r2) : n3 < r2 && (e3 = e3.substring(0, n3));
            var s2 = Math.min(n3, r2);
            if (t3 == e3) return s2;
            for (var i2 = 0, o2 = 1; ; ) {
              var l2 = t3.substring(s2 - o2), a2 = e3.indexOf(l2);
              if (-1 == a2) return i2;
              o2 += a2, 0 != a2 && t3.substring(s2 - o2) != e3.substring(0, o2) || (i2 = o2, o2++);
            }
          }
          function a(t3, e3) {
            if (!t3 || !e3 || t3.slice(-1) !== e3.slice(-1)) return 0;
            for (var n3 = 0, r2 = Math.min(t3.length, e3.length), s2 = r2, i2 = 0; n3 < s2; ) t3.substring(t3.length - s2, t3.length - i2) == e3.substring(e3.length - s2, e3.length - i2) ? i2 = n3 = s2 : r2 = s2, s2 = Math.floor((r2 - n3) / 2 + n3);
            return m(t3.charCodeAt(t3.length - s2)) && s2--, s2;
          }
          var c = /[^a-zA-Z0-9]/, u = /\s/, h = /[\r\n]/, d = /\n\r?\n$/, f = /^\r?\n\r?\n/;
          function p(t3, s2) {
            t3.push([r, ""]);
            for (var i2, l2 = 0, c2 = 0, u2 = 0, h2 = "", d2 = ""; l2 < t3.length; ) if (l2 < t3.length - 1 && !t3[l2][1]) t3.splice(l2, 1);
            else switch (t3[l2][0]) {
              case n2:
                u2++, d2 += t3[l2][1], l2++;
                break;
              case e2:
                c2++, h2 += t3[l2][1], l2++;
                break;
              case r:
                var f2 = l2 - u2 - c2 - 1;
                if (s2) {
                  if (f2 >= 0 && y(t3[f2][1])) {
                    var g2 = t3[f2][1].slice(-1);
                    if (t3[f2][1] = t3[f2][1].slice(0, -1), h2 = g2 + h2, d2 = g2 + d2, !t3[f2][1]) {
                      t3.splice(f2, 1), l2--;
                      var m2 = f2 - 1;
                      t3[m2] && t3[m2][0] === n2 && (u2++, d2 = t3[m2][1] + d2, m2--), t3[m2] && t3[m2][0] === e2 && (c2++, h2 = t3[m2][1] + h2, m2--), f2 = m2;
                    }
                  }
                  if (b(t3[l2][1])) {
                    g2 = t3[l2][1].charAt(0);
                    t3[l2][1] = t3[l2][1].slice(1), h2 += g2, d2 += g2;
                  }
                }
                if (l2 < t3.length - 1 && !t3[l2][1]) {
                  t3.splice(l2, 1);
                  break;
                }
                if (h2.length > 0 || d2.length > 0) {
                  h2.length > 0 && d2.length > 0 && (0 !== (i2 = o(d2, h2)) && (f2 >= 0 ? t3[f2][1] += d2.substring(0, i2) : (t3.splice(0, 0, [r, d2.substring(0, i2)]), l2++), d2 = d2.substring(i2), h2 = h2.substring(i2)), 0 !== (i2 = a(d2, h2)) && (t3[l2][1] = d2.substring(d2.length - i2) + t3[l2][1], d2 = d2.substring(0, d2.length - i2), h2 = h2.substring(0, h2.length - i2)));
                  var v2 = u2 + c2;
                  0 === h2.length && 0 === d2.length ? (t3.splice(l2 - v2, v2), l2 -= v2) : 0 === h2.length ? (t3.splice(l2 - v2, v2, [n2, d2]), l2 = l2 - v2 + 1) : 0 === d2.length ? (t3.splice(l2 - v2, v2, [e2, h2]), l2 = l2 - v2 + 1) : (t3.splice(l2 - v2, v2, [e2, h2], [n2, d2]), l2 = l2 - v2 + 2);
                }
                0 !== l2 && t3[l2 - 1][0] === r ? (t3[l2 - 1][1] += t3[l2][1], t3.splice(l2, 1)) : l2++, u2 = 0, c2 = 0, h2 = "", d2 = "";
            }
            "" === t3[t3.length - 1][1] && t3.pop();
            var x2 = false;
            for (l2 = 1; l2 < t3.length - 1; ) t3[l2 - 1][0] === r && t3[l2 + 1][0] === r && (t3[l2][1].substring(t3[l2][1].length - t3[l2 - 1][1].length) === t3[l2 - 1][1] ? (t3[l2][1] = t3[l2 - 1][1] + t3[l2][1].substring(0, t3[l2][1].length - t3[l2 - 1][1].length), t3[l2 + 1][1] = t3[l2 - 1][1] + t3[l2 + 1][1], t3.splice(l2 - 1, 1), x2 = true) : t3[l2][1].substring(0, t3[l2 + 1][1].length) == t3[l2 + 1][1] && (t3[l2 - 1][1] += t3[l2 + 1][1], t3[l2][1] = t3[l2][1].substring(t3[l2 + 1][1].length) + t3[l2 + 1][1], t3.splice(l2 + 1, 1), x2 = true)), l2++;
            x2 && p(t3, s2);
          }
          function g(t3) {
            return t3 >= 55296 && t3 <= 56319;
          }
          function m(t3) {
            return t3 >= 56320 && t3 <= 57343;
          }
          function b(t3) {
            return m(t3.charCodeAt(0));
          }
          function y(t3) {
            return g(t3.charCodeAt(t3.length - 1));
          }
          function v(t3, s2, i2, o2) {
            return y(t3) || b(o2) ? null : function(t4) {
              for (var e3 = [], n3 = 0; n3 < t4.length; n3++) t4[n3][1].length > 0 && e3.push(t4[n3]);
              return e3;
            }([[r, t3], [e2, s2], [n2, i2], [r, o2]]);
          }
          function x(t3, e3, n3, r2) {
            return s(t3, e3, n3, r2, true);
          }
          x.INSERT = n2, x.DELETE = e2, x.EQUAL = r, t2.exports = x;
        },
        193: (t2, e2, n2) => {
          t2 = n2.nmd(t2);
          var r = "__lodash_hash_undefined__", s = 9007199254740991, i = "[object Arguments]", o = "[object Boolean]", l = "[object Date]", a = "[object Function]", c = "[object GeneratorFunction]", u = "[object Map]", h = "[object Number]", d = "[object Object]", f = "[object Promise]", p = "[object RegExp]", g = "[object Set]", m = "[object String]", b = "[object Symbol]", y = "[object WeakMap]", v = "[object ArrayBuffer]", x = "[object DataView]", N = "[object Float32Array]", w = "[object Float64Array]", E = "[object Int8Array]", A = "[object Int16Array]", q = "[object Int32Array]", k = "[object Uint8Array]", _ = "[object Uint8ClampedArray]", L = "[object Uint16Array]", O = "[object Uint32Array]", T = /\w*$/, S = /^\[object .+?Constructor\]$/, C = /^(?:0|[1-9]\d*)$/, j = {};
          j[i] = j["[object Array]"] = j[v] = j[x] = j[o] = j[l] = j[N] = j[w] = j[E] = j[A] = j[q] = j[u] = j[h] = j[d] = j[p] = j[g] = j[m] = j[b] = j[k] = j[_] = j[L] = j[O] = true, j["[object Error]"] = j[a] = j[y] = false;
          var R = "object" == typeof n2.g && n2.g && n2.g.Object === Object && n2.g, I = "object" == typeof self && self && self.Object === Object && self, M = R || I || Function("return this")(), B = e2 && !e2.nodeType && e2, U = B && t2 && !t2.nodeType && t2, D = U && U.exports === B;
          function P(t3, e3) {
            return t3.set(e3[0], e3[1]), t3;
          }
          function z(t3, e3) {
            return t3.add(e3), t3;
          }
          function H(t3, e3, n3, r2) {
            var s2 = -1, i2 = t3 ? t3.length : 0;
            for (r2 && i2 && (n3 = t3[++s2]); ++s2 < i2; ) n3 = e3(n3, t3[s2], s2, t3);
            return n3;
          }
          function F(t3) {
            var e3 = false;
            if (null != t3 && "function" != typeof t3.toString) try {
              e3 = !!(t3 + "");
            } catch (t4) {
            }
            return e3;
          }
          function $(t3) {
            var e3 = -1, n3 = Array(t3.size);
            return t3.forEach(function(t4, r2) {
              n3[++e3] = [r2, t4];
            }), n3;
          }
          function V(t3, e3) {
            return function(n3) {
              return t3(e3(n3));
            };
          }
          function K(t3) {
            var e3 = -1, n3 = Array(t3.size);
            return t3.forEach(function(t4) {
              n3[++e3] = t4;
            }), n3;
          }
          var W, Z = Array.prototype, G = Function.prototype, X = Object.prototype, Q = M["__core-js_shared__"], Y = (W = /[^.]+$/.exec(Q && Q.keys && Q.keys.IE_PROTO || "")) ? "Symbol(src)_1." + W : "", J = G.toString, tt = X.hasOwnProperty, et = X.toString, nt = RegExp("^" + J.call(tt).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), rt = D ? M.Buffer : void 0, st = M.Symbol, it = M.Uint8Array, ot = V(Object.getPrototypeOf, Object), lt = Object.create, at = X.propertyIsEnumerable, ct = Z.splice, ut = Object.getOwnPropertySymbols, ht = rt ? rt.isBuffer : void 0, dt = V(Object.keys, Object), ft = Ut(M, "DataView"), pt = Ut(M, "Map"), gt = Ut(M, "Promise"), mt = Ut(M, "Set"), bt = Ut(M, "WeakMap"), yt = Ut(Object, "create"), vt = Ft(ft), xt = Ft(pt), Nt = Ft(gt), wt = Ft(mt), Et = Ft(bt), At = st ? st.prototype : void 0, qt = At ? At.valueOf : void 0;
          function kt(t3) {
            var e3 = -1, n3 = t3 ? t3.length : 0;
            for (this.clear(); ++e3 < n3; ) {
              var r2 = t3[e3];
              this.set(r2[0], r2[1]);
            }
          }
          function _t(t3) {
            var e3 = -1, n3 = t3 ? t3.length : 0;
            for (this.clear(); ++e3 < n3; ) {
              var r2 = t3[e3];
              this.set(r2[0], r2[1]);
            }
          }
          function Lt(t3) {
            var e3 = -1, n3 = t3 ? t3.length : 0;
            for (this.clear(); ++e3 < n3; ) {
              var r2 = t3[e3];
              this.set(r2[0], r2[1]);
            }
          }
          function Ot(t3) {
            this.__data__ = new _t(t3);
          }
          function Tt(t3, e3) {
            var n3 = Vt(t3) || function(t4) {
              return function(t5) {
                return /* @__PURE__ */ function(t6) {
                  return !!t6 && "object" == typeof t6;
                }(t5) && Kt(t5);
              }(t4) && tt.call(t4, "callee") && (!at.call(t4, "callee") || et.call(t4) == i);
            }(t3) ? function(t4, e4) {
              for (var n4 = -1, r3 = Array(t4); ++n4 < t4; ) r3[n4] = e4(n4);
              return r3;
            }(t3.length, String) : [], r2 = n3.length, s2 = !!r2;
            for (var o2 in t3) !e3 && !tt.call(t3, o2) || s2 && ("length" == o2 || zt(o2, r2)) || n3.push(o2);
            return n3;
          }
          function St(t3, e3, n3) {
            var r2 = t3[e3];
            tt.call(t3, e3) && $t(r2, n3) && (void 0 !== n3 || e3 in t3) || (t3[e3] = n3);
          }
          function Ct(t3, e3) {
            for (var n3 = t3.length; n3--; ) if ($t(t3[n3][0], e3)) return n3;
            return -1;
          }
          function jt(t3, e3, n3, r2, s2, f2, y2) {
            var S2;
            if (r2 && (S2 = f2 ? r2(t3, s2, f2, y2) : r2(t3)), void 0 !== S2) return S2;
            if (!Gt(t3)) return t3;
            var C2 = Vt(t3);
            if (C2) {
              if (S2 = function(t4) {
                var e4 = t4.length, n4 = t4.constructor(e4);
                e4 && "string" == typeof t4[0] && tt.call(t4, "index") && (n4.index = t4.index, n4.input = t4.input);
                return n4;
              }(t3), !e3) return function(t4, e4) {
                var n4 = -1, r3 = t4.length;
                e4 || (e4 = Array(r3));
                for (; ++n4 < r3; ) e4[n4] = t4[n4];
                return e4;
              }(t3, S2);
            } else {
              var R2 = Pt(t3), I2 = R2 == a || R2 == c;
              if (Wt(t3)) return function(t4, e4) {
                if (e4) return t4.slice();
                var n4 = new t4.constructor(t4.length);
                return t4.copy(n4), n4;
              }(t3, e3);
              if (R2 == d || R2 == i || I2 && !f2) {
                if (F(t3)) return f2 ? t3 : {};
                if (S2 = function(t4) {
                  return "function" != typeof t4.constructor || Ht(t4) ? {} : (e4 = ot(t4), Gt(e4) ? lt(e4) : {});
                  var e4;
                }(I2 ? {} : t3), !e3) return function(t4, e4) {
                  return Mt(t4, Dt(t4), e4);
                }(t3, function(t4, e4) {
                  return t4 && Mt(e4, Xt(e4), t4);
                }(S2, t3));
              } else {
                if (!j[R2]) return f2 ? t3 : {};
                S2 = function(t4, e4, n4, r3) {
                  var s3 = t4.constructor;
                  switch (e4) {
                    case v:
                      return It(t4);
                    case o:
                    case l:
                      return new s3(+t4);
                    case x:
                      return function(t5, e5) {
                        var n5 = e5 ? It(t5.buffer) : t5.buffer;
                        return new t5.constructor(n5, t5.byteOffset, t5.byteLength);
                      }(t4, r3);
                    case N:
                    case w:
                    case E:
                    case A:
                    case q:
                    case k:
                    case _:
                    case L:
                    case O:
                      return function(t5, e5) {
                        var n5 = e5 ? It(t5.buffer) : t5.buffer;
                        return new t5.constructor(n5, t5.byteOffset, t5.length);
                      }(t4, r3);
                    case u:
                      return function(t5, e5, n5) {
                        var r4 = e5 ? n5($(t5), true) : $(t5);
                        return H(r4, P, new t5.constructor());
                      }(t4, r3, n4);
                    case h:
                    case m:
                      return new s3(t4);
                    case p:
                      return function(t5) {
                        var e5 = new t5.constructor(t5.source, T.exec(t5));
                        return e5.lastIndex = t5.lastIndex, e5;
                      }(t4);
                    case g:
                      return function(t5, e5, n5) {
                        var r4 = e5 ? n5(K(t5), true) : K(t5);
                        return H(r4, z, new t5.constructor());
                      }(t4, r3, n4);
                    case b:
                      return i2 = t4, qt ? Object(qt.call(i2)) : {};
                  }
                  var i2;
                }(t3, R2, jt, e3);
              }
            }
            y2 || (y2 = new Ot());
            var M2 = y2.get(t3);
            if (M2) return M2;
            if (y2.set(t3, S2), !C2) var B2 = n3 ? function(t4) {
              return function(t5, e4, n4) {
                var r3 = e4(t5);
                return Vt(t5) ? r3 : function(t6, e5) {
                  for (var n5 = -1, r4 = e5.length, s3 = t6.length; ++n5 < r4; ) t6[s3 + n5] = e5[n5];
                  return t6;
                }(r3, n4(t5));
              }(t4, Xt, Dt);
            }(t3) : Xt(t3);
            return function(t4, e4) {
              for (var n4 = -1, r3 = t4 ? t4.length : 0; ++n4 < r3 && false !== e4(t4[n4], n4, t4); ) ;
            }(B2 || t3, function(s3, i2) {
              B2 && (s3 = t3[i2 = s3]), St(S2, i2, jt(s3, e3, n3, r2, i2, t3, y2));
            }), S2;
          }
          function Rt(t3) {
            return !(!Gt(t3) || (e3 = t3, Y && Y in e3)) && (Zt(t3) || F(t3) ? nt : S).test(Ft(t3));
            var e3;
          }
          function It(t3) {
            var e3 = new t3.constructor(t3.byteLength);
            return new it(e3).set(new it(t3)), e3;
          }
          function Mt(t3, e3, n3, r2) {
            n3 || (n3 = {});
            for (var s2 = -1, i2 = e3.length; ++s2 < i2; ) {
              var o2 = e3[s2], l2 = r2 ? r2(n3[o2], t3[o2], o2, n3, t3) : void 0;
              St(n3, o2, void 0 === l2 ? t3[o2] : l2);
            }
            return n3;
          }
          function Bt(t3, e3) {
            var n3, r2, s2 = t3.__data__;
            return ("string" == (r2 = typeof (n3 = e3)) || "number" == r2 || "symbol" == r2 || "boolean" == r2 ? "__proto__" !== n3 : null === n3) ? s2["string" == typeof e3 ? "string" : "hash"] : s2.map;
          }
          function Ut(t3, e3) {
            var n3 = function(t4, e4) {
              return null == t4 ? void 0 : t4[e4];
            }(t3, e3);
            return Rt(n3) ? n3 : void 0;
          }
          kt.prototype.clear = function() {
            this.__data__ = yt ? yt(null) : {};
          }, kt.prototype.delete = function(t3) {
            return this.has(t3) && delete this.__data__[t3];
          }, kt.prototype.get = function(t3) {
            var e3 = this.__data__;
            if (yt) {
              var n3 = e3[t3];
              return n3 === r ? void 0 : n3;
            }
            return tt.call(e3, t3) ? e3[t3] : void 0;
          }, kt.prototype.has = function(t3) {
            var e3 = this.__data__;
            return yt ? void 0 !== e3[t3] : tt.call(e3, t3);
          }, kt.prototype.set = function(t3, e3) {
            return this.__data__[t3] = yt && void 0 === e3 ? r : e3, this;
          }, _t.prototype.clear = function() {
            this.__data__ = [];
          }, _t.prototype.delete = function(t3) {
            var e3 = this.__data__, n3 = Ct(e3, t3);
            return !(n3 < 0) && (n3 == e3.length - 1 ? e3.pop() : ct.call(e3, n3, 1), true);
          }, _t.prototype.get = function(t3) {
            var e3 = this.__data__, n3 = Ct(e3, t3);
            return n3 < 0 ? void 0 : e3[n3][1];
          }, _t.prototype.has = function(t3) {
            return Ct(this.__data__, t3) > -1;
          }, _t.prototype.set = function(t3, e3) {
            var n3 = this.__data__, r2 = Ct(n3, t3);
            return r2 < 0 ? n3.push([t3, e3]) : n3[r2][1] = e3, this;
          }, Lt.prototype.clear = function() {
            this.__data__ = {
              hash: new kt(),
              map: new (pt || _t)(),
              string: new kt()
            };
          }, Lt.prototype.delete = function(t3) {
            return Bt(this, t3).delete(t3);
          }, Lt.prototype.get = function(t3) {
            return Bt(this, t3).get(t3);
          }, Lt.prototype.has = function(t3) {
            return Bt(this, t3).has(t3);
          }, Lt.prototype.set = function(t3, e3) {
            return Bt(this, t3).set(t3, e3), this;
          }, Ot.prototype.clear = function() {
            this.__data__ = new _t();
          }, Ot.prototype.delete = function(t3) {
            return this.__data__.delete(t3);
          }, Ot.prototype.get = function(t3) {
            return this.__data__.get(t3);
          }, Ot.prototype.has = function(t3) {
            return this.__data__.has(t3);
          }, Ot.prototype.set = function(t3, e3) {
            var n3 = this.__data__;
            if (n3 instanceof _t) {
              var r2 = n3.__data__;
              if (!pt || r2.length < 199) return r2.push([t3, e3]), this;
              n3 = this.__data__ = new Lt(r2);
            }
            return n3.set(t3, e3), this;
          };
          var Dt = ut ? V(ut, Object) : function() {
            return [];
          }, Pt = function(t3) {
            return et.call(t3);
          };
          function zt(t3, e3) {
            return !!(e3 = null == e3 ? s : e3) && ("number" == typeof t3 || C.test(t3)) && t3 > -1 && t3 % 1 == 0 && t3 < e3;
          }
          function Ht(t3) {
            var e3 = t3 && t3.constructor;
            return t3 === ("function" == typeof e3 && e3.prototype || X);
          }
          function Ft(t3) {
            if (null != t3) {
              try {
                return J.call(t3);
              } catch (t4) {
              }
              try {
                return t3 + "";
              } catch (t4) {
              }
            }
            return "";
          }
          function $t(t3, e3) {
            return t3 === e3 || t3 != t3 && e3 != e3;
          }
          (ft && Pt(new ft(new ArrayBuffer(1))) != x || pt && Pt(new pt()) != u || gt && Pt(gt.resolve()) != f || mt && Pt(new mt()) != g || bt && Pt(new bt()) != y) && (Pt = function(t3) {
            var e3 = et.call(t3), n3 = e3 == d ? t3.constructor : void 0, r2 = n3 ? Ft(n3) : void 0;
            if (r2) switch (r2) {
              case vt:
                return x;
              case xt:
                return u;
              case Nt:
                return f;
              case wt:
                return g;
              case Et:
                return y;
            }
            return e3;
          });
          var Vt = Array.isArray;
          function Kt(t3) {
            return null != t3 && function(t4) {
              return "number" == typeof t4 && t4 > -1 && t4 % 1 == 0 && t4 <= s;
            }(t3.length) && !Zt(t3);
          }
          var Wt = ht || function() {
            return false;
          };
          function Zt(t3) {
            var e3 = Gt(t3) ? et.call(t3) : "";
            return e3 == a || e3 == c;
          }
          function Gt(t3) {
            var e3 = typeof t3;
            return !!t3 && ("object" == e3 || "function" == e3);
          }
          function Xt(t3) {
            return Kt(t3) ? Tt(t3) : function(t4) {
              if (!Ht(t4)) return dt(t4);
              var e3 = [];
              for (var n3 in Object(t4)) tt.call(t4, n3) && "constructor" != n3 && e3.push(n3);
              return e3;
            }(t3);
          }
          t2.exports = function(t3) {
            return jt(t3, true, true);
          };
        },
        142: (t2, e2, n2) => {
          t2 = n2.nmd(t2);
          var r = "__lodash_hash_undefined__", s = 1, i = 2, o = 9007199254740991, l = "[object Arguments]", a = "[object Array]", c = "[object AsyncFunction]", u = "[object Boolean]", h = "[object Date]", d = "[object Error]", f = "[object Function]", p = "[object GeneratorFunction]", g = "[object Map]", m = "[object Number]", b = "[object Null]", y = "[object Object]", v = "[object Promise]", x = "[object Proxy]", N = "[object RegExp]", w = "[object Set]", E = "[object String]", A = "[object Symbol]", q = "[object Undefined]", k = "[object WeakMap]", _ = "[object ArrayBuffer]", L = "[object DataView]", O = /^\[object .+?Constructor\]$/, T = /^(?:0|[1-9]\d*)$/, S = {};
          S["[object Float32Array]"] = S["[object Float64Array]"] = S["[object Int8Array]"] = S["[object Int16Array]"] = S["[object Int32Array]"] = S["[object Uint8Array]"] = S["[object Uint8ClampedArray]"] = S["[object Uint16Array]"] = S["[object Uint32Array]"] = true, S[l] = S[a] = S[_] = S[u] = S[L] = S[h] = S[d] = S[f] = S[g] = S[m] = S[y] = S[N] = S[w] = S[E] = S[k] = false;
          var C = "object" == typeof n2.g && n2.g && n2.g.Object === Object && n2.g, j = "object" == typeof self && self && self.Object === Object && self, R = C || j || Function("return this")(), I = e2 && !e2.nodeType && e2, M = I && t2 && !t2.nodeType && t2, B = M && M.exports === I, U = B && C.process, D = function() {
            try {
              return U && U.binding && U.binding("util");
            } catch (t3) {
            }
          }(), P = D && D.isTypedArray;
          function z(t3, e3) {
            for (var n3 = -1, r2 = null == t3 ? 0 : t3.length; ++n3 < r2; ) if (e3(t3[n3], n3, t3)) return true;
            return false;
          }
          function H(t3) {
            var e3 = -1, n3 = Array(t3.size);
            return t3.forEach(function(t4, r2) {
              n3[++e3] = [r2, t4];
            }), n3;
          }
          function F(t3) {
            var e3 = -1, n3 = Array(t3.size);
            return t3.forEach(function(t4) {
              n3[++e3] = t4;
            }), n3;
          }
          var $, V, K, W = Array.prototype, Z = Function.prototype, G = Object.prototype, X = R["__core-js_shared__"], Q = Z.toString, Y = G.hasOwnProperty, J = ($ = /[^.]+$/.exec(X && X.keys && X.keys.IE_PROTO || "")) ? "Symbol(src)_1." + $ : "", tt = G.toString, et = RegExp("^" + Q.call(Y).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), nt = B ? R.Buffer : void 0, rt = R.Symbol, st = R.Uint8Array, it = G.propertyIsEnumerable, ot = W.splice, lt = rt ? rt.toStringTag : void 0, at = Object.getOwnPropertySymbols, ct = nt ? nt.isBuffer : void 0, ut = (V = Object.keys, K = Object, function(t3) {
            return V(K(t3));
          }), ht = Dt(R, "DataView"), dt = Dt(R, "Map"), ft = Dt(R, "Promise"), pt = Dt(R, "Set"), gt = Dt(R, "WeakMap"), mt = Dt(Object, "create"), bt = Ft(ht), yt = Ft(dt), vt = Ft(ft), xt = Ft(pt), Nt = Ft(gt), wt = rt ? rt.prototype : void 0, Et = wt ? wt.valueOf : void 0;
          function At(t3) {
            var e3 = -1, n3 = null == t3 ? 0 : t3.length;
            for (this.clear(); ++e3 < n3; ) {
              var r2 = t3[e3];
              this.set(r2[0], r2[1]);
            }
          }
          function qt(t3) {
            var e3 = -1, n3 = null == t3 ? 0 : t3.length;
            for (this.clear(); ++e3 < n3; ) {
              var r2 = t3[e3];
              this.set(r2[0], r2[1]);
            }
          }
          function kt(t3) {
            var e3 = -1, n3 = null == t3 ? 0 : t3.length;
            for (this.clear(); ++e3 < n3; ) {
              var r2 = t3[e3];
              this.set(r2[0], r2[1]);
            }
          }
          function _t(t3) {
            var e3 = -1, n3 = null == t3 ? 0 : t3.length;
            for (this.__data__ = new kt(); ++e3 < n3; ) this.add(t3[e3]);
          }
          function Lt(t3) {
            var e3 = this.__data__ = new qt(t3);
            this.size = e3.size;
          }
          function Ot(t3, e3) {
            var n3 = Kt(t3), r2 = !n3 && Vt(t3), s2 = !n3 && !r2 && Wt(t3), i2 = !n3 && !r2 && !s2 && Yt(t3), o2 = n3 || r2 || s2 || i2, l2 = o2 ? function(t4, e4) {
              for (var n4 = -1, r3 = Array(t4); ++n4 < t4; ) r3[n4] = e4(n4);
              return r3;
            }(t3.length, String) : [], a2 = l2.length;
            for (var c2 in t3) !e3 && !Y.call(t3, c2) || o2 && ("length" == c2 || s2 && ("offset" == c2 || "parent" == c2) || i2 && ("buffer" == c2 || "byteLength" == c2 || "byteOffset" == c2) || Ht(c2, a2)) || l2.push(c2);
            return l2;
          }
          function Tt(t3, e3) {
            for (var n3 = t3.length; n3--; ) if ($t(t3[n3][0], e3)) return n3;
            return -1;
          }
          function St(t3) {
            return null == t3 ? void 0 === t3 ? q : b : lt && lt in Object(t3) ? function(t4) {
              var e3 = Y.call(t4, lt), n3 = t4[lt];
              try {
                t4[lt] = void 0;
                var r2 = true;
              } catch (t5) {
              }
              var s2 = tt.call(t4);
              r2 && (e3 ? t4[lt] = n3 : delete t4[lt]);
              return s2;
            }(t3) : function(t4) {
              return tt.call(t4);
            }(t3);
          }
          function Ct(t3) {
            return Qt(t3) && St(t3) == l;
          }
          function jt(t3, e3, n3, r2, o2) {
            return t3 === e3 || (null == t3 || null == e3 || !Qt(t3) && !Qt(e3) ? t3 != t3 && e3 != e3 : function(t4, e4, n4, r3, o3, c2) {
              var f2 = Kt(t4), p2 = Kt(e4), b2 = f2 ? a : zt(t4), v2 = p2 ? a : zt(e4), x2 = (b2 = b2 == l ? y : b2) == y, q2 = (v2 = v2 == l ? y : v2) == y, k2 = b2 == v2;
              if (k2 && Wt(t4)) {
                if (!Wt(e4)) return false;
                f2 = true, x2 = false;
              }
              if (k2 && !x2) return c2 || (c2 = new Lt()), f2 || Yt(t4) ? Mt(t4, e4, n4, r3, o3, c2) : function(t5, e5, n5, r4, o4, l2, a2) {
                switch (n5) {
                  case L:
                    if (t5.byteLength != e5.byteLength || t5.byteOffset != e5.byteOffset) return false;
                    t5 = t5.buffer, e5 = e5.buffer;
                  case _:
                    return !(t5.byteLength != e5.byteLength || !l2(new st(t5), new st(e5)));
                  case u:
                  case h:
                  case m:
                    return $t(+t5, +e5);
                  case d:
                    return t5.name == e5.name && t5.message == e5.message;
                  case N:
                  case E:
                    return t5 == e5 + "";
                  case g:
                    var c3 = H;
                  case w:
                    var f3 = r4 & s;
                    if (c3 || (c3 = F), t5.size != e5.size && !f3) return false;
                    var p3 = a2.get(t5);
                    if (p3) return p3 == e5;
                    r4 |= i, a2.set(t5, e5);
                    var b3 = Mt(c3(t5), c3(e5), r4, o4, l2, a2);
                    return a2.delete(t5), b3;
                  case A:
                    if (Et) return Et.call(t5) == Et.call(e5);
                }
                return false;
              }(t4, e4, b2, n4, r3, o3, c2);
              if (!(n4 & s)) {
                var O2 = x2 && Y.call(t4, "__wrapped__"), T2 = q2 && Y.call(e4, "__wrapped__");
                if (O2 || T2) {
                  var S2 = O2 ? t4.value() : t4, C2 = T2 ? e4.value() : e4;
                  return c2 || (c2 = new Lt()), o3(S2, C2, n4, r3, c2);
                }
              }
              if (!k2) return false;
              return c2 || (c2 = new Lt()), function(t5, e5, n5, r4, i2, o4) {
                var l2 = n5 & s, a2 = Bt(t5), c3 = a2.length, u2 = Bt(e5), h2 = u2.length;
                if (c3 != h2 && !l2) return false;
                var d2 = c3;
                for (; d2--; ) {
                  var f3 = a2[d2];
                  if (!(l2 ? f3 in e5 : Y.call(e5, f3))) return false;
                }
                var p3 = o4.get(t5);
                if (p3 && o4.get(e5)) return p3 == e5;
                var g2 = true;
                o4.set(t5, e5), o4.set(e5, t5);
                var m2 = l2;
                for (; ++d2 < c3; ) {
                  var b3 = t5[f3 = a2[d2]], y2 = e5[f3];
                  if (r4) var v3 = l2 ? r4(y2, b3, f3, e5, t5, o4) : r4(b3, y2, f3, t5, e5, o4);
                  if (!(void 0 === v3 ? b3 === y2 || i2(b3, y2, n5, r4, o4) : v3)) {
                    g2 = false;
                    break;
                  }
                  m2 || (m2 = "constructor" == f3);
                }
                if (g2 && !m2) {
                  var x3 = t5.constructor, N2 = e5.constructor;
                  x3 == N2 || !("constructor" in t5) || !("constructor" in e5) || "function" == typeof x3 && x3 instanceof x3 && "function" == typeof N2 && N2 instanceof N2 || (g2 = false);
                }
                return o4.delete(t5), o4.delete(e5), g2;
              }(t4, e4, n4, r3, o3, c2);
            }(t3, e3, n3, r2, jt, o2));
          }
          function Rt(t3) {
            return !(!Xt(t3) || function(t4) {
              return !!J && J in t4;
            }(t3)) && (Zt(t3) ? et : O).test(Ft(t3));
          }
          function It(t3) {
            if (n3 = (e3 = t3) && e3.constructor, r2 = "function" == typeof n3 && n3.prototype || G, e3 !== r2) return ut(t3);
            var e3, n3, r2, s2 = [];
            for (var i2 in Object(t3)) Y.call(t3, i2) && "constructor" != i2 && s2.push(i2);
            return s2;
          }
          function Mt(t3, e3, n3, r2, o2, l2) {
            var a2 = n3 & s, c2 = t3.length, u2 = e3.length;
            if (c2 != u2 && !(a2 && u2 > c2)) return false;
            var h2 = l2.get(t3);
            if (h2 && l2.get(e3)) return h2 == e3;
            var d2 = -1, f2 = true, p2 = n3 & i ? new _t() : void 0;
            for (l2.set(t3, e3), l2.set(e3, t3); ++d2 < c2; ) {
              var g2 = t3[d2], m2 = e3[d2];
              if (r2) var b2 = a2 ? r2(m2, g2, d2, e3, t3, l2) : r2(g2, m2, d2, t3, e3, l2);
              if (void 0 !== b2) {
                if (b2) continue;
                f2 = false;
                break;
              }
              if (p2) {
                if (!z(e3, function(t4, e4) {
                  if (s2 = e4, !p2.has(s2) && (g2 === t4 || o2(g2, t4, n3, r2, l2))) return p2.push(e4);
                  var s2;
                })) {
                  f2 = false;
                  break;
                }
              } else if (g2 !== m2 && !o2(g2, m2, n3, r2, l2)) {
                f2 = false;
                break;
              }
            }
            return l2.delete(t3), l2.delete(e3), f2;
          }
          function Bt(t3) {
            return function(t4, e3, n3) {
              var r2 = e3(t4);
              return Kt(t4) ? r2 : function(t5, e4) {
                for (var n4 = -1, r3 = e4.length, s2 = t5.length; ++n4 < r3; ) t5[s2 + n4] = e4[n4];
                return t5;
              }(r2, n3(t4));
            }(t3, Jt, Pt);
          }
          function Ut(t3, e3) {
            var n3, r2, s2 = t3.__data__;
            return ("string" == (r2 = typeof (n3 = e3)) || "number" == r2 || "symbol" == r2 || "boolean" == r2 ? "__proto__" !== n3 : null === n3) ? s2["string" == typeof e3 ? "string" : "hash"] : s2.map;
          }
          function Dt(t3, e3) {
            var n3 = function(t4, e4) {
              return null == t4 ? void 0 : t4[e4];
            }(t3, e3);
            return Rt(n3) ? n3 : void 0;
          }
          At.prototype.clear = function() {
            this.__data__ = mt ? mt(null) : {}, this.size = 0;
          }, At.prototype.delete = function(t3) {
            var e3 = this.has(t3) && delete this.__data__[t3];
            return this.size -= e3 ? 1 : 0, e3;
          }, At.prototype.get = function(t3) {
            var e3 = this.__data__;
            if (mt) {
              var n3 = e3[t3];
              return n3 === r ? void 0 : n3;
            }
            return Y.call(e3, t3) ? e3[t3] : void 0;
          }, At.prototype.has = function(t3) {
            var e3 = this.__data__;
            return mt ? void 0 !== e3[t3] : Y.call(e3, t3);
          }, At.prototype.set = function(t3, e3) {
            var n3 = this.__data__;
            return this.size += this.has(t3) ? 0 : 1, n3[t3] = mt && void 0 === e3 ? r : e3, this;
          }, qt.prototype.clear = function() {
            this.__data__ = [], this.size = 0;
          }, qt.prototype.delete = function(t3) {
            var e3 = this.__data__, n3 = Tt(e3, t3);
            return !(n3 < 0) && (n3 == e3.length - 1 ? e3.pop() : ot.call(e3, n3, 1), --this.size, true);
          }, qt.prototype.get = function(t3) {
            var e3 = this.__data__, n3 = Tt(e3, t3);
            return n3 < 0 ? void 0 : e3[n3][1];
          }, qt.prototype.has = function(t3) {
            return Tt(this.__data__, t3) > -1;
          }, qt.prototype.set = function(t3, e3) {
            var n3 = this.__data__, r2 = Tt(n3, t3);
            return r2 < 0 ? (++this.size, n3.push([t3, e3])) : n3[r2][1] = e3, this;
          }, kt.prototype.clear = function() {
            this.size = 0, this.__data__ = {
              hash: new At(),
              map: new (dt || qt)(),
              string: new At()
            };
          }, kt.prototype.delete = function(t3) {
            var e3 = Ut(this, t3).delete(t3);
            return this.size -= e3 ? 1 : 0, e3;
          }, kt.prototype.get = function(t3) {
            return Ut(this, t3).get(t3);
          }, kt.prototype.has = function(t3) {
            return Ut(this, t3).has(t3);
          }, kt.prototype.set = function(t3, e3) {
            var n3 = Ut(this, t3), r2 = n3.size;
            return n3.set(t3, e3), this.size += n3.size == r2 ? 0 : 1, this;
          }, _t.prototype.add = _t.prototype.push = function(t3) {
            return this.__data__.set(t3, r), this;
          }, _t.prototype.has = function(t3) {
            return this.__data__.has(t3);
          }, Lt.prototype.clear = function() {
            this.__data__ = new qt(), this.size = 0;
          }, Lt.prototype.delete = function(t3) {
            var e3 = this.__data__, n3 = e3.delete(t3);
            return this.size = e3.size, n3;
          }, Lt.prototype.get = function(t3) {
            return this.__data__.get(t3);
          }, Lt.prototype.has = function(t3) {
            return this.__data__.has(t3);
          }, Lt.prototype.set = function(t3, e3) {
            var n3 = this.__data__;
            if (n3 instanceof qt) {
              var r2 = n3.__data__;
              if (!dt || r2.length < 199) return r2.push([t3, e3]), this.size = ++n3.size, this;
              n3 = this.__data__ = new kt(r2);
            }
            return n3.set(t3, e3), this.size = n3.size, this;
          };
          var Pt = at ? function(t3) {
            return null == t3 ? [] : (t3 = Object(t3), function(t4, e3) {
              for (var n3 = -1, r2 = null == t4 ? 0 : t4.length, s2 = 0, i2 = []; ++n3 < r2; ) {
                var o2 = t4[n3];
                e3(o2, n3, t4) && (i2[s2++] = o2);
              }
              return i2;
            }(at(t3), function(e3) {
              return it.call(t3, e3);
            }));
          } : function() {
            return [];
          }, zt = St;
          function Ht(t3, e3) {
            return !!(e3 = null == e3 ? o : e3) && ("number" == typeof t3 || T.test(t3)) && t3 > -1 && t3 % 1 == 0 && t3 < e3;
          }
          function Ft(t3) {
            if (null != t3) {
              try {
                return Q.call(t3);
              } catch (t4) {
              }
              try {
                return t3 + "";
              } catch (t4) {
              }
            }
            return "";
          }
          function $t(t3, e3) {
            return t3 === e3 || t3 != t3 && e3 != e3;
          }
          (ht && zt(new ht(new ArrayBuffer(1))) != L || dt && zt(new dt()) != g || ft && zt(ft.resolve()) != v || pt && zt(new pt()) != w || gt && zt(new gt()) != k) && (zt = function(t3) {
            var e3 = St(t3), n3 = e3 == y ? t3.constructor : void 0, r2 = n3 ? Ft(n3) : "";
            if (r2) switch (r2) {
              case bt:
                return L;
              case yt:
                return g;
              case vt:
                return v;
              case xt:
                return w;
              case Nt:
                return k;
            }
            return e3;
          });
          var Vt = Ct(/* @__PURE__ */ function() {
            return arguments;
          }()) ? Ct : function(t3) {
            return Qt(t3) && Y.call(t3, "callee") && !it.call(t3, "callee");
          }, Kt = Array.isArray;
          var Wt = ct || function() {
            return false;
          };
          function Zt(t3) {
            if (!Xt(t3)) return false;
            var e3 = St(t3);
            return e3 == f || e3 == p || e3 == c || e3 == x;
          }
          function Gt(t3) {
            return "number" == typeof t3 && t3 > -1 && t3 % 1 == 0 && t3 <= o;
          }
          function Xt(t3) {
            var e3 = typeof t3;
            return null != t3 && ("object" == e3 || "function" == e3);
          }
          function Qt(t3) {
            return null != t3 && "object" == typeof t3;
          }
          var Yt = P ? /* @__PURE__ */ function(t3) {
            return function(e3) {
              return t3(e3);
            };
          }(P) : function(t3) {
            return Qt(t3) && Gt(t3.length) && !!S[St(t3)];
          };
          function Jt(t3) {
            return null != (e3 = t3) && Gt(e3.length) && !Zt(e3) ? Ot(t3) : It(t3);
            var e3;
          }
          t2.exports = function(t3, e3) {
            return jt(t3, e3);
          };
        },
        106: (t2, e2, n2) => {
          "use strict";
          Object.defineProperty(e2, "__esModule", {
            value: true
          });
          const r = n2(193), s = n2(142);
          var i;
          !function(t3) {
            t3.compose = function(t4 = {}, e3 = {}, n3 = false) {
              "object" != typeof t4 && (t4 = {}), "object" != typeof e3 && (e3 = {});
              let s2 = r(e3);
              n3 || (s2 = Object.keys(s2).reduce((t5, e4) => (null != s2[e4] && (t5[e4] = s2[e4]), t5), {}));
              for (const n4 in t4) void 0 !== t4[n4] && void 0 === e3[n4] && (s2[n4] = t4[n4]);
              return Object.keys(s2).length > 0 ? s2 : void 0;
            }, t3.diff = function(t4 = {}, e3 = {}) {
              "object" != typeof t4 && (t4 = {}), "object" != typeof e3 && (e3 = {});
              const n3 = Object.keys(t4).concat(Object.keys(e3)).reduce((n4, r2) => (s(t4[r2], e3[r2]) || (n4[r2] = void 0 === e3[r2] ? null : e3[r2]), n4), {});
              return Object.keys(n3).length > 0 ? n3 : void 0;
            }, t3.invert = function(t4 = {}, e3 = {}) {
              t4 = t4 || {};
              const n3 = Object.keys(e3).reduce((n4, r2) => (e3[r2] !== t4[r2] && void 0 !== t4[r2] && (n4[r2] = e3[r2]), n4), {});
              return Object.keys(t4).reduce((n4, r2) => (t4[r2] !== e3[r2] && void 0 === e3[r2] && (n4[r2] = null), n4), n3);
            }, t3.transform = function(t4, e3, n3 = false) {
              if ("object" != typeof t4) return e3;
              if ("object" != typeof e3) return;
              if (!n3) return e3;
              const r2 = Object.keys(e3).reduce((n4, r3) => (void 0 === t4[r3] && (n4[r3] = e3[r3]), n4), {});
              return Object.keys(r2).length > 0 ? r2 : void 0;
            };
          }(i || (i = {})), e2.default = i;
        },
        660: (t2, e2, n2) => {
          "use strict";
          Object.defineProperty(e2, "__esModule", {
            value: true
          }), e2.AttributeMap = e2.OpIterator = e2.Op = void 0;
          const r = n2(606), s = n2(193), i = n2(142), o = n2(106);
          e2.AttributeMap = o.default;
          const l = n2(759);
          e2.Op = l.default;
          const a = n2(317);
          e2.OpIterator = a.default;
          const c = String.fromCharCode(0), u = (t3, e3) => {
            if ("object" != typeof t3 || null === t3) throw new Error("cannot retain a " + typeof t3);
            if ("object" != typeof e3 || null === e3) throw new Error("cannot retain a " + typeof e3);
            const n3 = Object.keys(t3)[0];
            if (!n3 || n3 !== Object.keys(e3)[0]) throw new Error(`embed types not matched: ${n3} != ${Object.keys(e3)[0]}`);
            return [n3, t3[n3], e3[n3]];
          };
          class h {
            constructor(t3) {
              Array.isArray(t3) ? this.ops = t3 : null != t3 && Array.isArray(t3.ops) ? this.ops = t3.ops : this.ops = [];
            }
            static registerEmbed(t3, e3) {
              this.handlers[t3] = e3;
            }
            static unregisterEmbed(t3) {
              delete this.handlers[t3];
            }
            static getHandler(t3) {
              const e3 = this.handlers[t3];
              if (!e3) throw new Error(`no handlers for embed type "${t3}"`);
              return e3;
            }
            insert(t3, e3) {
              const n3 = {};
              return "string" == typeof t3 && 0 === t3.length ? this : (n3.insert = t3, null != e3 && "object" == typeof e3 && Object.keys(e3).length > 0 && (n3.attributes = e3), this.push(n3));
            }
            delete(t3) {
              return t3 <= 0 ? this : this.push({
                delete: t3
              });
            }
            retain(t3, e3) {
              if ("number" == typeof t3 && t3 <= 0) return this;
              const n3 = {
                retain: t3
              };
              return null != e3 && "object" == typeof e3 && Object.keys(e3).length > 0 && (n3.attributes = e3), this.push(n3);
            }
            push(t3) {
              let e3 = this.ops.length, n3 = this.ops[e3 - 1];
              if (t3 = s(t3), "object" == typeof n3) {
                if ("number" == typeof t3.delete && "number" == typeof n3.delete) return this.ops[e3 - 1] = {
                  delete: n3.delete + t3.delete
                }, this;
                if ("number" == typeof n3.delete && null != t3.insert && (e3 -= 1, n3 = this.ops[e3 - 1], "object" != typeof n3)) return this.ops.unshift(t3), this;
                if (i(t3.attributes, n3.attributes)) {
                  if ("string" == typeof t3.insert && "string" == typeof n3.insert) return this.ops[e3 - 1] = {
                    insert: n3.insert + t3.insert
                  }, "object" == typeof t3.attributes && (this.ops[e3 - 1].attributes = t3.attributes), this;
                  if ("number" == typeof t3.retain && "number" == typeof n3.retain) return this.ops[e3 - 1] = {
                    retain: n3.retain + t3.retain
                  }, "object" == typeof t3.attributes && (this.ops[e3 - 1].attributes = t3.attributes), this;
                }
              }
              return e3 === this.ops.length ? this.ops.push(t3) : this.ops.splice(e3, 0, t3), this;
            }
            chop() {
              const t3 = this.ops[this.ops.length - 1];
              return t3 && "number" == typeof t3.retain && !t3.attributes && this.ops.pop(), this;
            }
            filter(t3) {
              return this.ops.filter(t3);
            }
            forEach(t3) {
              this.ops.forEach(t3);
            }
            map(t3) {
              return this.ops.map(t3);
            }
            partition(t3) {
              const e3 = [], n3 = [];
              return this.forEach((r2) => {
                (t3(r2) ? e3 : n3).push(r2);
              }), [e3, n3];
            }
            reduce(t3, e3) {
              return this.ops.reduce(t3, e3);
            }
            changeLength() {
              return this.reduce((t3, e3) => e3.insert ? t3 + l.default.length(e3) : e3.delete ? t3 - e3.delete : t3, 0);
            }
            length() {
              return this.reduce((t3, e3) => t3 + l.default.length(e3), 0);
            }
            slice(t3 = 0, e3 = 1 / 0) {
              const n3 = [], r2 = new a.default(this.ops);
              let s2 = 0;
              for (; s2 < e3 && r2.hasNext(); ) {
                let i2;
                s2 < t3 ? i2 = r2.next(t3 - s2) : (i2 = r2.next(e3 - s2), n3.push(i2)), s2 += l.default.length(i2);
              }
              return new h(n3);
            }
            compose(t3) {
              const e3 = new a.default(this.ops), n3 = new a.default(t3.ops), r2 = [], s2 = n3.peek();
              if (null != s2 && "number" == typeof s2.retain && null == s2.attributes) {
                let t4 = s2.retain;
                for (; "insert" === e3.peekType() && e3.peekLength() <= t4; ) t4 -= e3.peekLength(), r2.push(e3.next());
                s2.retain - t4 > 0 && n3.next(s2.retain - t4);
              }
              const l2 = new h(r2);
              for (; e3.hasNext() || n3.hasNext(); ) if ("insert" === n3.peekType()) l2.push(n3.next());
              else if ("delete" === e3.peekType()) l2.push(e3.next());
              else {
                const t4 = Math.min(e3.peekLength(), n3.peekLength()), r3 = e3.next(t4), s3 = n3.next(t4);
                if (s3.retain) {
                  const a2 = {};
                  if ("number" == typeof r3.retain) a2.retain = "number" == typeof s3.retain ? t4 : s3.retain;
                  else if ("number" == typeof s3.retain) null == r3.retain ? a2.insert = r3.insert : a2.retain = r3.retain;
                  else {
                    const t5 = null == r3.retain ? "insert" : "retain", [e4, n4, i2] = u(r3[t5], s3.retain), o2 = h.getHandler(e4);
                    a2[t5] = {
                      [e4]: o2.compose(n4, i2, "retain" === t5)
                    };
                  }
                  const c2 = o.default.compose(r3.attributes, s3.attributes, "number" == typeof r3.retain);
                  if (c2 && (a2.attributes = c2), l2.push(a2), !n3.hasNext() && i(l2.ops[l2.ops.length - 1], a2)) {
                    const t5 = new h(e3.rest());
                    return l2.concat(t5).chop();
                  }
                } else "number" == typeof s3.delete && ("number" == typeof r3.retain || "object" == typeof r3.retain && null !== r3.retain) && l2.push(s3);
              }
              return l2.chop();
            }
            concat(t3) {
              const e3 = new h(this.ops.slice());
              return t3.ops.length > 0 && (e3.push(t3.ops[0]), e3.ops = e3.ops.concat(t3.ops.slice(1))), e3;
            }
            diff(t3, e3) {
              if (this.ops === t3.ops) return new h();
              const n3 = [this, t3].map((e4) => e4.map((n4) => {
                if (null != n4.insert) return "string" == typeof n4.insert ? n4.insert : c;
                throw new Error("diff() called " + (e4 === t3 ? "on" : "with") + " non-document");
              }).join("")), s2 = new h(), l2 = r(n3[0], n3[1], e3, true), u2 = new a.default(this.ops), d = new a.default(t3.ops);
              return l2.forEach((t4) => {
                let e4 = t4[1].length;
                for (; e4 > 0; ) {
                  let n4 = 0;
                  switch (t4[0]) {
                    case r.INSERT:
                      n4 = Math.min(d.peekLength(), e4), s2.push(d.next(n4));
                      break;
                    case r.DELETE:
                      n4 = Math.min(e4, u2.peekLength()), u2.next(n4), s2.delete(n4);
                      break;
                    case r.EQUAL:
                      n4 = Math.min(u2.peekLength(), d.peekLength(), e4);
                      const t5 = u2.next(n4), l3 = d.next(n4);
                      i(t5.insert, l3.insert) ? s2.retain(n4, o.default.diff(t5.attributes, l3.attributes)) : s2.push(l3).delete(n4);
                  }
                  e4 -= n4;
                }
              }), s2.chop();
            }
            eachLine(t3, e3 = "\n") {
              const n3 = new a.default(this.ops);
              let r2 = new h(), s2 = 0;
              for (; n3.hasNext(); ) {
                if ("insert" !== n3.peekType()) return;
                const i2 = n3.peek(), o2 = l.default.length(i2) - n3.peekLength(), a2 = "string" == typeof i2.insert ? i2.insert.indexOf(e3, o2) - o2 : -1;
                if (a2 < 0) r2.push(n3.next());
                else if (a2 > 0) r2.push(n3.next(a2));
                else {
                  if (false === t3(r2, n3.next(1).attributes || {}, s2)) return;
                  s2 += 1, r2 = new h();
                }
              }
              r2.length() > 0 && t3(r2, {}, s2);
            }
            invert(t3) {
              const e3 = new h();
              return this.reduce((n3, r2) => {
                if (r2.insert) e3.delete(l.default.length(r2));
                else {
                  if ("number" == typeof r2.retain && null == r2.attributes) return e3.retain(r2.retain), n3 + r2.retain;
                  if (r2.delete || "number" == typeof r2.retain) {
                    const s2 = r2.delete || r2.retain;
                    return t3.slice(n3, n3 + s2).forEach((t4) => {
                      r2.delete ? e3.push(t4) : r2.retain && r2.attributes && e3.retain(l.default.length(t4), o.default.invert(r2.attributes, t4.attributes));
                    }), n3 + s2;
                  }
                  if ("object" == typeof r2.retain && null !== r2.retain) {
                    const s2 = t3.slice(n3, n3 + 1), i2 = new a.default(s2.ops).next(), [l2, c2, d] = u(r2.retain, i2.insert), f = h.getHandler(l2);
                    return e3.retain({
                      [l2]: f.invert(c2, d)
                    }, o.default.invert(r2.attributes, i2.attributes)), n3 + 1;
                  }
                }
                return n3;
              }, 0), e3.chop();
            }
            transform(t3, e3 = false) {
              if (e3 = !!e3, "number" == typeof t3) return this.transformPosition(t3, e3);
              const n3 = t3, r2 = new a.default(this.ops), s2 = new a.default(n3.ops), i2 = new h();
              for (; r2.hasNext() || s2.hasNext(); ) if ("insert" !== r2.peekType() || !e3 && "insert" === s2.peekType()) {
                if ("insert" === s2.peekType()) i2.push(s2.next());
                else {
                  const t4 = Math.min(r2.peekLength(), s2.peekLength()), n4 = r2.next(t4), l2 = s2.next(t4);
                  if (n4.delete) continue;
                  if (l2.delete) i2.push(l2);
                  else {
                    const r3 = n4.retain, s3 = l2.retain;
                    let a2 = "object" == typeof s3 && null !== s3 ? s3 : t4;
                    if ("object" == typeof r3 && null !== r3 && "object" == typeof s3 && null !== s3) {
                      const t5 = Object.keys(r3)[0];
                      if (t5 === Object.keys(s3)[0]) {
                        const n5 = h.getHandler(t5);
                        n5 && (a2 = {
                          [t5]: n5.transform(r3[t5], s3[t5], e3)
                        });
                      }
                    }
                    i2.retain(a2, o.default.transform(n4.attributes, l2.attributes, e3));
                  }
                }
              } else i2.retain(l.default.length(r2.next()));
              return i2.chop();
            }
            transformPosition(t3, e3 = false) {
              e3 = !!e3;
              const n3 = new a.default(this.ops);
              let r2 = 0;
              for (; n3.hasNext() && r2 <= t3; ) {
                const s2 = n3.peekLength(), i2 = n3.peekType();
                n3.next(), "delete" !== i2 ? ("insert" === i2 && (r2 < t3 || !e3) && (t3 += s2), r2 += s2) : t3 -= Math.min(s2, t3 - r2);
              }
              return t3;
            }
          }
          h.Op = l.default, h.OpIterator = a.default, h.AttributeMap = o.default, h.handlers = {}, e2.default = h, t2.exports = h, t2.exports.default = h;
        },
        759: (t2, e2) => {
          "use strict";
          var n2;
          Object.defineProperty(e2, "__esModule", {
            value: true
          }), function(t3) {
            t3.length = function(t4) {
              return "number" == typeof t4.delete ? t4.delete : "number" == typeof t4.retain ? t4.retain : "object" == typeof t4.retain && null !== t4.retain ? 1 : "string" == typeof t4.insert ? t4.insert.length : 1;
            };
          }(n2 || (n2 = {})), e2.default = n2;
        },
        317: (t2, e2, n2) => {
          "use strict";
          Object.defineProperty(e2, "__esModule", {
            value: true
          });
          const r = n2(759);
          e2.default = class {
            constructor(t3) {
              this.ops = t3, this.index = 0, this.offset = 0;
            }
            hasNext() {
              return this.peekLength() < 1 / 0;
            }
            next(t3) {
              t3 || (t3 = 1 / 0);
              const e3 = this.ops[this.index];
              if (e3) {
                const n3 = this.offset, s = r.default.length(e3);
                if (t3 >= s - n3 ? (t3 = s - n3, this.index += 1, this.offset = 0) : this.offset += t3, "number" == typeof e3.delete) return {
                  delete: t3
                };
                {
                  const r2 = {};
                  return e3.attributes && (r2.attributes = e3.attributes), "number" == typeof e3.retain ? r2.retain = t3 : "object" == typeof e3.retain && null !== e3.retain ? r2.retain = e3.retain : "string" == typeof e3.insert ? r2.insert = e3.insert.substr(n3, t3) : r2.insert = e3.insert, r2;
                }
              }
              return {
                retain: 1 / 0
              };
            }
            peek() {
              return this.ops[this.index];
            }
            peekLength() {
              return this.ops[this.index] ? r.default.length(this.ops[this.index]) - this.offset : 1 / 0;
            }
            peekType() {
              const t3 = this.ops[this.index];
              return t3 ? "number" == typeof t3.delete ? "delete" : "number" == typeof t3.retain || "object" == typeof t3.retain && null !== t3.retain ? "retain" : "insert" : "retain";
            }
            rest() {
              if (this.hasNext()) {
                if (0 === this.offset) return this.ops.slice(this.index);
                {
                  const t3 = this.offset, e3 = this.index, n3 = this.next(), r2 = this.ops.slice(this.index);
                  return this.offset = t3, this.index = e3, [n3].concat(r2);
                }
              }
              return [];
            }
          };
        },
        968: (t2, e2, n2) => {
          var r = n2(64);
          "string" == typeof r && (r = [[t2.id, r, ""]]);
          var s = {
            hmr: true,
            transform: void 0
          };
          n2(27)(r, s);
          r.locals && (t2.exports = r.locals);
        },
        27: (t2, e2, n2) => {
          var r, s, i = {}, o = (r = function() {
            return window && document && document.all && !window.atob;
          }, function() {
            return void 0 === s && (s = r.apply(this, arguments)), s;
          }), l = /* @__PURE__ */ function(t3) {
            var e3 = {};
            return function(n3) {
              if (void 0 === e3[n3]) {
                var r2 = t3.call(this, n3);
                if (r2 instanceof window.HTMLIFrameElement) try {
                  r2 = r2.contentDocument.head;
                } catch (t4) {
                  r2 = null;
                }
                e3[n3] = r2;
              }
              return e3[n3];
            };
          }(function(t3) {
            return document.querySelector(t3);
          }), a = null, c = 0, u = [], h = n2(874);
          function d(t3, e3) {
            for (var n3 = 0; n3 < t3.length; n3++) {
              var r2 = t3[n3], s2 = i[r2.id];
              if (s2) {
                s2.refs++;
                for (var o2 = 0; o2 < s2.parts.length; o2++) s2.parts[o2](r2.parts[o2]);
                for (; o2 < r2.parts.length; o2++) s2.parts.push(y(r2.parts[o2], e3));
              } else {
                var l2 = [];
                for (o2 = 0; o2 < r2.parts.length; o2++) l2.push(y(r2.parts[o2], e3));
                i[r2.id] = {
                  id: r2.id,
                  refs: 1,
                  parts: l2
                };
              }
            }
          }
          function f(t3, e3) {
            for (var n3 = [], r2 = {}, s2 = 0; s2 < t3.length; s2++) {
              var i2 = t3[s2], o2 = e3.base ? i2[0] + e3.base : i2[0], l2 = {
                css: i2[1],
                media: i2[2],
                sourceMap: i2[3]
              };
              r2[o2] ? r2[o2].parts.push(l2) : n3.push(r2[o2] = {
                id: o2,
                parts: [l2]
              });
            }
            return n3;
          }
          function p(t3, e3) {
            var n3 = l(t3.insertInto);
            if (!n3) throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
            var r2 = u[u.length - 1];
            if ("top" === t3.insertAt) r2 ? r2.nextSibling ? n3.insertBefore(e3, r2.nextSibling) : n3.appendChild(e3) : n3.insertBefore(e3, n3.firstChild), u.push(e3);
            else if ("bottom" === t3.insertAt) n3.appendChild(e3);
            else {
              if ("object" != typeof t3.insertAt || !t3.insertAt.before) throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
              var s2 = l(t3.insertInto + " " + t3.insertAt.before);
              n3.insertBefore(e3, s2);
            }
          }
          function g(t3) {
            if (null === t3.parentNode) return false;
            t3.parentNode.removeChild(t3);
            var e3 = u.indexOf(t3);
            e3 >= 0 && u.splice(e3, 1);
          }
          function m(t3) {
            var e3 = document.createElement("style");
            return t3.attrs.type = "text/css", b(e3, t3.attrs), p(t3, e3), e3;
          }
          function b(t3, e3) {
            Object.keys(e3).forEach(function(n3) {
              t3.setAttribute(n3, e3[n3]);
            });
          }
          function y(t3, e3) {
            var n3, r2, s2, i2;
            if (e3.transform && t3.css) {
              if (!(i2 = e3.transform(t3.css))) return function() {
              };
              t3.css = i2;
            }
            if (e3.singleton) {
              var o2 = c++;
              n3 = a || (a = m(e3)), r2 = N.bind(null, n3, o2, false), s2 = N.bind(null, n3, o2, true);
            } else t3.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (n3 = function(t4) {
              var e4 = document.createElement("link");
              return t4.attrs.type = "text/css", t4.attrs.rel = "stylesheet", b(e4, t4.attrs), p(t4, e4), e4;
            }(e3), r2 = E.bind(null, n3, e3), s2 = function() {
              g(n3), n3.href && URL.revokeObjectURL(n3.href);
            }) : (n3 = m(e3), r2 = w.bind(null, n3), s2 = function() {
              g(n3);
            });
            return r2(t3), function(e4) {
              if (e4) {
                if (e4.css === t3.css && e4.media === t3.media && e4.sourceMap === t3.sourceMap) return;
                r2(t3 = e4);
              } else s2();
            };
          }
          t2.exports = function(t3, e3) {
            if ("undefined" != typeof DEBUG && DEBUG && "object" != typeof document) throw new Error("The style-loader cannot be used in a non-browser environment");
            (e3 = e3 || {}).attrs = "object" == typeof e3.attrs ? e3.attrs : {}, e3.singleton || "boolean" == typeof e3.singleton || (e3.singleton = o()), e3.insertInto || (e3.insertInto = "head"), e3.insertAt || (e3.insertAt = "bottom");
            var n3 = f(t3, e3);
            return d(n3, e3), function(t4) {
              for (var r2 = [], s2 = 0; s2 < n3.length; s2++) {
                var o2 = n3[s2];
                (l2 = i[o2.id]).refs--, r2.push(l2);
              }
              t4 && d(f(t4, e3), e3);
              for (s2 = 0; s2 < r2.length; s2++) {
                var l2;
                if (0 === (l2 = r2[s2]).refs) {
                  for (var a2 = 0; a2 < l2.parts.length; a2++) l2.parts[a2]();
                  delete i[l2.id];
                }
              }
            };
          };
          var v, x = (v = [], function(t3, e3) {
            return v[t3] = e3, v.filter(Boolean).join("\n");
          });
          function N(t3, e3, n3, r2) {
            var s2 = n3 ? "" : r2.css;
            if (t3.styleSheet) t3.styleSheet.cssText = x(e3, s2);
            else {
              var i2 = document.createTextNode(s2), o2 = t3.childNodes;
              o2[e3] && t3.removeChild(o2[e3]), o2.length ? t3.insertBefore(i2, o2[e3]) : t3.appendChild(i2);
            }
          }
          function w(t3, e3) {
            var n3 = e3.css, r2 = e3.media;
            if (r2 && t3.setAttribute("media", r2), t3.styleSheet) t3.styleSheet.cssText = n3;
            else {
              for (; t3.firstChild; ) t3.removeChild(t3.firstChild);
              t3.appendChild(document.createTextNode(n3));
            }
          }
          function E(t3, e3, n3) {
            var r2 = n3.css, s2 = n3.sourceMap, i2 = void 0 === e3.convertToAbsoluteUrls && s2;
            (e3.convertToAbsoluteUrls || i2) && (r2 = h(r2)), s2 && (r2 += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(s2)))) + " */");
            var o2 = new Blob([r2], {
              type: "text/css"
            }), l2 = t3.href;
            t3.href = URL.createObjectURL(o2), l2 && URL.revokeObjectURL(l2);
          }
        },
        874: (t2) => {
          t2.exports = function(t3) {
            var e2 = "undefined" != typeof window && window.location;
            if (!e2) throw new Error("fixUrls requires window.location");
            if (!t3 || "string" != typeof t3) return t3;
            var n2 = e2.protocol + "//" + e2.host, r = n2 + e2.pathname.replace(/\/[^\/]*$/, "/");
            return t3.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(t4, e3) {
              var s, i = e3.trim().replace(/^"(.*)"$/, function(t5, e4) {
                return e4;
              }).replace(/^'(.*)'$/, function(t5, e4) {
                return e4;
              });
              return /^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(i) ? t4 : (s = 0 === i.indexOf("//") ? i : 0 === i.indexOf("/") ? n2 + i : r + i.replace(/^\.\//, ""), "url(" + JSON.stringify(s) + ")");
            });
          };
        },
        676: (t2, e2) => {
          "use strict";
          Object.defineProperty(e2, "__esModule", {
            value: true
          }), e2.FormatHTMLStringIndentation = function(t3, e3) {
            for (var n2 = " ".repeat(2), r = 0, s = "\n", i = null, o = null, l = null, a = "", c = 0; c <= t3.length; c++) {
              i = o, o = t3.substr(c, 1), l = t3.substr(c + 1, 1);
              var u = "<br>" === t3.substr(c, 4), h = "<" === o && "/" !== l && !u, d = "<" === o && "/" === l && !u, f = ">" === i && "<" !== o && r > 0, p = !u && !h && !d && f && "" === t3.substr(c, t3.substr(c).indexOf("<")).trim();
              u && (a += s, r--, c += 4), h ? (a += s + n2.repeat(r), r++) : d ? (--r < 0 && (r = 0), a += s + n2.repeat(r)) : (" " === o && " " === l || o === s && "" === t3.substr(c, t3.substr(c).indexOf("<")).trim()) && (o = ""), f && !p && (a += s + n2.repeat(r)), a += o;
            }
            return e3.log("formatHTML", {
              before: t3,
              after: a
            }), a;
          };
        },
        795: (t2, e2) => {
          "use strict";
          function n2(t3) {
            return t3.replace(/\s+/g, " ").trim();
          }
          function r(t3) {
            return t3.replace(/<br([\s]*[\/]?>)/g, "<p> </p>");
          }
          function s(t3) {
            return t3.replace(/<p><\/p>/g, "<p> </p>");
          }
          function i(t3) {
            return t3.replace(/(<(?!\/)[\w=\."'\s]*>) /g, "$1");
          }
          function o(t3) {
            return t3.replace(/ (<\/[\w]+>)/g, "$1");
          }
          function l(t3, e3) {
            return t3.reduce(function(t4, e4) {
              return e4(t4);
            }, e3);
          }
          Object.defineProperty(e2, "__esModule", {
            value: true
          }), e2.OutputHTMLParser = function(t3) {
            return l([n2, i, o, r, s], t3);
          }, e2.ConvertMultipleSpacesToSingle = n2, e2.PreserveNewlinesBr = r, e2.PreserveNewlinesPTags = s, e2.FixTagSpaceOpenTag = i, e2.FixTagSpaceCloseTag = o, e2.Compose = l;
        },
        614: (t2, e2) => {
          "use strict";
          Object.defineProperty(e2, "__esModule", {
            value: true
          }), e2.QuillHtmlLogger = void 0;
          var n2 = function() {
            function t3() {
              this.debug = false;
            }
            return t3.prototype.setDebug = function(t4) {
              this.debug = t4;
            }, t3.prototype.prefixString = function() {
              return "</> quill-html-edit-button: ";
            }, Object.defineProperty(t3.prototype, "log", {
              get: function() {
                return this.debug ? console.log.bind(console, this.prefixString()) : function() {
                  for (var t4 = [], e3 = 0; e3 < arguments.length; e3++) t4[e3] = arguments[e3];
                };
              },
              enumerable: false,
              configurable: true
            }), t3;
          }();
          e2.QuillHtmlLogger = n2;
        },
        190: function(t2, e2, n2) {
          "use strict";
          var r = this && this.__assign || function() {
            return r = Object.assign || function(t3) {
              for (var e3, n3 = 1, r2 = arguments.length; n3 < r2; n3++) for (var s2 in e3 = arguments[n3]) Object.prototype.hasOwnProperty.call(e3, s2) && (t3[s2] = e3[s2]);
              return t3;
            }, r.apply(this, arguments);
          }, s = this && this.__importDefault || function(t3) {
            return t3 && t3.__esModule ? t3 : {
              default: t3
            };
          };
          Object.defineProperty(e2, "__esModule", {
            value: true
          }), e2.htmlEditButton = void 0;
          var i = n2(614);
          n2(968);
          var o = s(n2(429)), l = n2(795), a = n2(676);
          function c(t3) {
            return document.createElement(t3);
          }
          function u(t3, e3, n3) {
            return t3.setAttribute(e3, n3);
          }
          var h = new i.QuillHtmlLogger(), d = function(t3, e3) {
            var n3 = e3 || {}, s2 = !(!n3 || !n3.debug);
            h.setDebug(s2), h.log("logging enabled");
            var i2 = t3.getModule("toolbar");
            if (!i2) throw new Error('quill.htmlEditButton requires the "toolbar" module to be included too');
            var d2 = i2.container, f = c("span");
            u(f, "class", "ql-formats");
            var p = c("button");
            p.innerHTML = n3.buttonHTML || "&lt;&gt;", p.title = n3.buttonTitle || "Show HTML source", p.type = "button";
            var g = function(e4) {
              t3.clipboard.dangerouslyPasteHTML(e4);
            };
            p.onclick = function(e4) {
              e4.preventDefault(), function(t4, e5, n4) {
                var s3 = t4.container.querySelector(".ql-editor").innerHTML, i3 = c("div"), d3 = c("div"), f2 = e5.msg || `Edit HTML here, when you click "OK" the quill editor's contents will be replaced`, p2 = e5.cancelText || "Cancel", g2 = e5.okText || "Ok", m = false !== e5.closeOnClickOverlay;
                u(d3, "class", "ql-html-overlayContainer"), u(i3, "class", "ql-html-popupContainer");
                var b = c("span");
                u(b, "class", "ql-html-popupTitle"), b.innerText = f2;
                var y = c("div");
                y.appendChild(b), u(y, "class", "ql-html-textContainer");
                var v = c("pre");
                u(v, "data-language", "xml"), v.innerText = (0, a.FormatHTMLStringIndentation)(s3, h);
                var x = c("div");
                u(x, "class", "ql-html-textArea");
                var N = c("button");
                N.innerHTML = p2, u(N, "class", "ql-html-buttonCancel");
                var w = c("button");
                w.innerHTML = g2, u(w, "class", "ql-html-buttonOk");
                var E = c("div");
                u(E, "class", "ql-html-buttonGroup");
                var A = document.querySelector(e5.prependSelector);
                E.appendChild(N), E.appendChild(w), x.appendChild(v), y.appendChild(x), y.appendChild(E), i3.appendChild(y), d3.appendChild(i3), A ? A.prepend(d3) : document.body.appendChild(d3);
                var q = e5 && e5.editorModules, k = q && Object.keys(q).length ? q : {}, _ = new o.default(x, {
                  modules: r({
                    syntax: e5.syntax
                  }, k)
                });
                N.onclick = function() {
                  A ? A.removeChild(d3) : document.body.removeChild(d3);
                }, m && (d3.onclick = N.onclick), i3.onclick = function(t5) {
                  t5.preventDefault(), t5.stopPropagation();
                }, w.onclick = function() {
                  var t5 = _.container.querySelector(".ql-editor").innerText, e6 = (0, l.OutputHTMLParser)(t5);
                  h.log("OutputHTMLParser", {
                    htmlInputFromPopup: t5,
                    htmlOutputFormatted: e6
                  }), n4(e6), A ? A.removeChild(d3) : document.body.removeChild(d3);
                };
              }(t3, n3, g);
            }, f.appendChild(p), null == d2 || d2.appendChild(f);
          };
          e2.htmlEditButton = d, window.htmlEditButton = d, e2.default = d;
        },
        429: (t2, e2, n2) => {
          "use strict";
          n2.r(e2), n2.d(e2, {
            Module: () => xs,
            Parchment: () => r,
            Range: () => cs,
            default: () => tl
          });
          var r = {};
          n2.r(r), n2.d(r, {
            Attributor: () => ze,
            AttributorStore: () => Ge,
            BlockBlot: () => an,
            ClassAttributor: () => Ke,
            ContainerBlot: () => un,
            EmbedBlot: () => hn,
            InlineBlot: () => on,
            LeafBlot: () => Je,
            ParentBlot: () => rn,
            Registry: () => $e,
            Scope: () => Pe,
            ScrollBlot: () => pn,
            StyleAttributor: () => Ze,
            TextBlot: () => mn
          });
          const s = function() {
            this.__data__ = [], this.size = 0;
          };
          const i = function(t3, e3) {
            return t3 === e3 || t3 != t3 && e3 != e3;
          };
          const o = function(t3, e3) {
            for (var n3 = t3.length; n3--; ) if (i(t3[n3][0], e3)) return n3;
            return -1;
          };
          var l = Array.prototype.splice;
          const a = function(t3) {
            var e3 = this.__data__, n3 = o(e3, t3);
            return !(n3 < 0) && (n3 == e3.length - 1 ? e3.pop() : l.call(e3, n3, 1), --this.size, true);
          };
          const c = function(t3) {
            var e3 = this.__data__, n3 = o(e3, t3);
            return n3 < 0 ? void 0 : e3[n3][1];
          };
          const u = function(t3) {
            return o(this.__data__, t3) > -1;
          };
          const h = function(t3, e3) {
            var n3 = this.__data__, r2 = o(n3, t3);
            return r2 < 0 ? (++this.size, n3.push([t3, e3])) : n3[r2][1] = e3, this;
          };
          function d(t3) {
            var e3 = -1, n3 = null == t3 ? 0 : t3.length;
            for (this.clear(); ++e3 < n3; ) {
              var r2 = t3[e3];
              this.set(r2[0], r2[1]);
            }
          }
          d.prototype.clear = s, d.prototype.delete = a, d.prototype.get = c, d.prototype.has = u, d.prototype.set = h;
          const f = d;
          const p = function() {
            this.__data__ = new f(), this.size = 0;
          };
          const g = function(t3) {
            var e3 = this.__data__, n3 = e3.delete(t3);
            return this.size = e3.size, n3;
          };
          const m = function(t3) {
            return this.__data__.get(t3);
          };
          const b = function(t3) {
            return this.__data__.has(t3);
          };
          const y = "object" == typeof global && global && global.Object === Object && global;
          var v = "object" == typeof self && self && self.Object === Object && self;
          const x = y || v || Function("return this")();
          const N = x.Symbol;
          var w = Object.prototype, E = w.hasOwnProperty, A = w.toString, q = N ? N.toStringTag : void 0;
          const k = function(t3) {
            var e3 = E.call(t3, q), n3 = t3[q];
            try {
              t3[q] = void 0;
              var r2 = true;
            } catch (t4) {
            }
            var s2 = A.call(t3);
            return r2 && (e3 ? t3[q] = n3 : delete t3[q]), s2;
          };
          var _ = Object.prototype.toString;
          const L = function(t3) {
            return _.call(t3);
          };
          var O = N ? N.toStringTag : void 0;
          const T = function(t3) {
            return null == t3 ? void 0 === t3 ? "[object Undefined]" : "[object Null]" : O && O in Object(t3) ? k(t3) : L(t3);
          };
          const S = function(t3) {
            var e3 = typeof t3;
            return null != t3 && ("object" == e3 || "function" == e3);
          };
          const C = function(t3) {
            if (!S(t3)) return false;
            var e3 = T(t3);
            return "[object Function]" == e3 || "[object GeneratorFunction]" == e3 || "[object AsyncFunction]" == e3 || "[object Proxy]" == e3;
          };
          const j = x["__core-js_shared__"];
          var R, I = (R = /[^.]+$/.exec(j && j.keys && j.keys.IE_PROTO || "")) ? "Symbol(src)_1." + R : "";
          const M = function(t3) {
            return !!I && I in t3;
          };
          var B = Function.prototype.toString;
          const U = function(t3) {
            if (null != t3) {
              try {
                return B.call(t3);
              } catch (t4) {
              }
              try {
                return t3 + "";
              } catch (t4) {
              }
            }
            return "";
          };
          var D = /^\[object .+?Constructor\]$/, P = Function.prototype, z = Object.prototype, H = P.toString, F = z.hasOwnProperty, $ = RegExp("^" + H.call(F).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
          const V = function(t3) {
            return !(!S(t3) || M(t3)) && (C(t3) ? $ : D).test(U(t3));
          };
          const K = function(t3, e3) {
            return null == t3 ? void 0 : t3[e3];
          };
          const W = function(t3, e3) {
            var n3 = K(t3, e3);
            return V(n3) ? n3 : void 0;
          };
          const Z = W(x, "Map");
          const G = W(Object, "create");
          const X = function() {
            this.__data__ = G ? G(null) : {}, this.size = 0;
          };
          const Q = function(t3) {
            var e3 = this.has(t3) && delete this.__data__[t3];
            return this.size -= e3 ? 1 : 0, e3;
          };
          var Y = Object.prototype.hasOwnProperty;
          const J = function(t3) {
            var e3 = this.__data__;
            if (G) {
              var n3 = e3[t3];
              return "__lodash_hash_undefined__" === n3 ? void 0 : n3;
            }
            return Y.call(e3, t3) ? e3[t3] : void 0;
          };
          var tt = Object.prototype.hasOwnProperty;
          const et = function(t3) {
            var e3 = this.__data__;
            return G ? void 0 !== e3[t3] : tt.call(e3, t3);
          };
          const nt = function(t3, e3) {
            var n3 = this.__data__;
            return this.size += this.has(t3) ? 0 : 1, n3[t3] = G && void 0 === e3 ? "__lodash_hash_undefined__" : e3, this;
          };
          function rt(t3) {
            var e3 = -1, n3 = null == t3 ? 0 : t3.length;
            for (this.clear(); ++e3 < n3; ) {
              var r2 = t3[e3];
              this.set(r2[0], r2[1]);
            }
          }
          rt.prototype.clear = X, rt.prototype.delete = Q, rt.prototype.get = J, rt.prototype.has = et, rt.prototype.set = nt;
          const st = rt;
          const it = function() {
            this.size = 0, this.__data__ = {
              hash: new st(),
              map: new (Z || f)(),
              string: new st()
            };
          };
          const ot = function(t3) {
            var e3 = typeof t3;
            return "string" == e3 || "number" == e3 || "symbol" == e3 || "boolean" == e3 ? "__proto__" !== t3 : null === t3;
          };
          const lt = function(t3, e3) {
            var n3 = t3.__data__;
            return ot(e3) ? n3["string" == typeof e3 ? "string" : "hash"] : n3.map;
          };
          const at = function(t3) {
            var e3 = lt(this, t3).delete(t3);
            return this.size -= e3 ? 1 : 0, e3;
          };
          const ct = function(t3) {
            return lt(this, t3).get(t3);
          };
          const ut = function(t3) {
            return lt(this, t3).has(t3);
          };
          const ht = function(t3, e3) {
            var n3 = lt(this, t3), r2 = n3.size;
            return n3.set(t3, e3), this.size += n3.size == r2 ? 0 : 1, this;
          };
          function dt(t3) {
            var e3 = -1, n3 = null == t3 ? 0 : t3.length;
            for (this.clear(); ++e3 < n3; ) {
              var r2 = t3[e3];
              this.set(r2[0], r2[1]);
            }
          }
          dt.prototype.clear = it, dt.prototype.delete = at, dt.prototype.get = ct, dt.prototype.has = ut, dt.prototype.set = ht;
          const ft = dt;
          const pt = function(t3, e3) {
            var n3 = this.__data__;
            if (n3 instanceof f) {
              var r2 = n3.__data__;
              if (!Z || r2.length < 199) return r2.push([t3, e3]), this.size = ++n3.size, this;
              n3 = this.__data__ = new ft(r2);
            }
            return n3.set(t3, e3), this.size = n3.size, this;
          };
          function gt(t3) {
            var e3 = this.__data__ = new f(t3);
            this.size = e3.size;
          }
          gt.prototype.clear = p, gt.prototype.delete = g, gt.prototype.get = m, gt.prototype.has = b, gt.prototype.set = pt;
          const mt = gt;
          const bt = function() {
            try {
              var t3 = W(Object, "defineProperty");
              return t3({}, "", {}), t3;
            } catch (t4) {
            }
          }();
          const yt = function(t3, e3, n3) {
            "__proto__" == e3 && bt ? bt(t3, e3, {
              configurable: true,
              enumerable: true,
              value: n3,
              writable: true
            }) : t3[e3] = n3;
          };
          const vt = function(t3, e3, n3) {
            (void 0 !== n3 && !i(t3[e3], n3) || void 0 === n3 && !(e3 in t3)) && yt(t3, e3, n3);
          };
          const xt = /* @__PURE__ */ function(t3) {
            return function(e3, n3, r2) {
              for (var s2 = -1, i2 = Object(e3), o2 = r2(e3), l2 = o2.length; l2--; ) {
                var a2 = o2[t3 ? l2 : ++s2];
                if (false === n3(i2[a2], a2, i2)) break;
              }
              return e3;
            };
          }();
          var Nt = "object" == typeof exports && exports && !exports.nodeType && exports, wt = Nt && "object" == typeof module && module && !module.nodeType && module, Et = wt && wt.exports === Nt ? x.Buffer : void 0, At = Et ? Et.allocUnsafe : void 0;
          const qt = function(t3, e3) {
            if (e3) return t3.slice();
            var n3 = t3.length, r2 = At ? At(n3) : new t3.constructor(n3);
            return t3.copy(r2), r2;
          };
          const kt = x.Uint8Array;
          const _t = function(t3) {
            var e3 = new t3.constructor(t3.byteLength);
            return new kt(e3).set(new kt(t3)), e3;
          };
          const Lt = function(t3, e3) {
            var n3 = e3 ? _t(t3.buffer) : t3.buffer;
            return new t3.constructor(n3, t3.byteOffset, t3.length);
          };
          const Ot = function(t3, e3) {
            var n3 = -1, r2 = t3.length;
            for (e3 || (e3 = Array(r2)); ++n3 < r2; ) e3[n3] = t3[n3];
            return e3;
          };
          var Tt = Object.create;
          const St = /* @__PURE__ */ function() {
            function t3() {
            }
            return function(e3) {
              if (!S(e3)) return {};
              if (Tt) return Tt(e3);
              t3.prototype = e3;
              var n3 = new t3();
              return t3.prototype = void 0, n3;
            };
          }();
          const Ct = function(t3, e3) {
            return function(n3) {
              return t3(e3(n3));
            };
          };
          const jt = Ct(Object.getPrototypeOf, Object);
          var Rt = Object.prototype;
          const It = function(t3) {
            var e3 = t3 && t3.constructor;
            return t3 === ("function" == typeof e3 && e3.prototype || Rt);
          };
          const Mt = function(t3) {
            return "function" != typeof t3.constructor || It(t3) ? {} : St(jt(t3));
          };
          const Bt = function(t3) {
            return null != t3 && "object" == typeof t3;
          };
          const Ut = function(t3) {
            return Bt(t3) && "[object Arguments]" == T(t3);
          };
          var Dt = Object.prototype, Pt = Dt.hasOwnProperty, zt = Dt.propertyIsEnumerable;
          const Ht = Ut(/* @__PURE__ */ function() {
            return arguments;
          }()) ? Ut : function(t3) {
            return Bt(t3) && Pt.call(t3, "callee") && !zt.call(t3, "callee");
          };
          const Ft = Array.isArray;
          const $t = function(t3) {
            return "number" == typeof t3 && t3 > -1 && t3 % 1 == 0 && t3 <= 9007199254740991;
          };
          const Vt = function(t3) {
            return null != t3 && $t(t3.length) && !C(t3);
          };
          const Kt = function(t3) {
            return Bt(t3) && Vt(t3);
          };
          const Wt = function() {
            return false;
          };
          var Zt = "object" == typeof exports && exports && !exports.nodeType && exports, Gt = Zt && "object" == typeof module && module && !module.nodeType && module, Xt = Gt && Gt.exports === Zt ? x.Buffer : void 0;
          const Qt = (Xt ? Xt.isBuffer : void 0) || Wt;
          var Yt = Function.prototype, Jt = Object.prototype, te = Yt.toString, ee = Jt.hasOwnProperty, ne = te.call(Object);
          const re = function(t3) {
            if (!Bt(t3) || "[object Object]" != T(t3)) return false;
            var e3 = jt(t3);
            if (null === e3) return true;
            var n3 = ee.call(e3, "constructor") && e3.constructor;
            return "function" == typeof n3 && n3 instanceof n3 && te.call(n3) == ne;
          };
          var se = {};
          se["[object Float32Array]"] = se["[object Float64Array]"] = se["[object Int8Array]"] = se["[object Int16Array]"] = se["[object Int32Array]"] = se["[object Uint8Array]"] = se["[object Uint8ClampedArray]"] = se["[object Uint16Array]"] = se["[object Uint32Array]"] = true, se["[object Arguments]"] = se["[object Array]"] = se["[object ArrayBuffer]"] = se["[object Boolean]"] = se["[object DataView]"] = se["[object Date]"] = se["[object Error]"] = se["[object Function]"] = se["[object Map]"] = se["[object Number]"] = se["[object Object]"] = se["[object RegExp]"] = se["[object Set]"] = se["[object String]"] = se["[object WeakMap]"] = false;
          const ie = function(t3) {
            return Bt(t3) && $t(t3.length) && !!se[T(t3)];
          };
          const oe = function(t3) {
            return function(e3) {
              return t3(e3);
            };
          };
          var le = "object" == typeof exports && exports && !exports.nodeType && exports, ae = le && "object" == typeof module && module && !module.nodeType && module, ce = ae && ae.exports === le && y.process;
          const ue = function() {
            try {
              var t3 = ae && ae.require && ae.require("util").types;
              return t3 || ce && ce.binding && ce.binding("util");
            } catch (t4) {
            }
          }();
          var he = ue && ue.isTypedArray;
          const de = he ? oe(he) : ie;
          const fe = function(t3, e3) {
            if (("constructor" !== e3 || "function" != typeof t3[e3]) && "__proto__" != e3) return t3[e3];
          };
          var pe = Object.prototype.hasOwnProperty;
          const ge = function(t3, e3, n3) {
            var r2 = t3[e3];
            pe.call(t3, e3) && i(r2, n3) && (void 0 !== n3 || e3 in t3) || yt(t3, e3, n3);
          };
          const me = function(t3, e3, n3, r2) {
            var s2 = !n3;
            n3 || (n3 = {});
            for (var i2 = -1, o2 = e3.length; ++i2 < o2; ) {
              var l2 = e3[i2], a2 = r2 ? r2(n3[l2], t3[l2], l2, n3, t3) : void 0;
              void 0 === a2 && (a2 = t3[l2]), s2 ? yt(n3, l2, a2) : ge(n3, l2, a2);
            }
            return n3;
          };
          const be = function(t3, e3) {
            for (var n3 = -1, r2 = Array(t3); ++n3 < t3; ) r2[n3] = e3(n3);
            return r2;
          };
          var ye = /^(?:0|[1-9]\d*)$/;
          const ve = function(t3, e3) {
            var n3 = typeof t3;
            return !!(e3 = null == e3 ? 9007199254740991 : e3) && ("number" == n3 || "symbol" != n3 && ye.test(t3)) && t3 > -1 && t3 % 1 == 0 && t3 < e3;
          };
          var xe = Object.prototype.hasOwnProperty;
          const Ne = function(t3, e3) {
            var n3 = Ft(t3), r2 = !n3 && Ht(t3), s2 = !n3 && !r2 && Qt(t3), i2 = !n3 && !r2 && !s2 && de(t3), o2 = n3 || r2 || s2 || i2, l2 = o2 ? be(t3.length, String) : [], a2 = l2.length;
            for (var c2 in t3) !e3 && !xe.call(t3, c2) || o2 && ("length" == c2 || s2 && ("offset" == c2 || "parent" == c2) || i2 && ("buffer" == c2 || "byteLength" == c2 || "byteOffset" == c2) || ve(c2, a2)) || l2.push(c2);
            return l2;
          };
          const we = function(t3) {
            var e3 = [];
            if (null != t3) for (var n3 in Object(t3)) e3.push(n3);
            return e3;
          };
          var Ee = Object.prototype.hasOwnProperty;
          const Ae = function(t3) {
            if (!S(t3)) return we(t3);
            var e3 = It(t3), n3 = [];
            for (var r2 in t3) ("constructor" != r2 || !e3 && Ee.call(t3, r2)) && n3.push(r2);
            return n3;
          };
          const qe = function(t3) {
            return Vt(t3) ? Ne(t3, true) : Ae(t3);
          };
          const ke = function(t3) {
            return me(t3, qe(t3));
          };
          const _e = function(t3, e3, n3, r2, s2, i2, o2) {
            var l2 = fe(t3, n3), a2 = fe(e3, n3), c2 = o2.get(a2);
            if (c2) vt(t3, n3, c2);
            else {
              var u2 = i2 ? i2(l2, a2, n3 + "", t3, e3, o2) : void 0, h2 = void 0 === u2;
              if (h2) {
                var d2 = Ft(a2), f2 = !d2 && Qt(a2), p2 = !d2 && !f2 && de(a2);
                u2 = a2, d2 || f2 || p2 ? Ft(l2) ? u2 = l2 : Kt(l2) ? u2 = Ot(l2) : f2 ? (h2 = false, u2 = qt(a2, true)) : p2 ? (h2 = false, u2 = Lt(a2, true)) : u2 = [] : re(a2) || Ht(a2) ? (u2 = l2, Ht(l2) ? u2 = ke(l2) : S(l2) && !C(l2) || (u2 = Mt(a2))) : h2 = false;
              }
              h2 && (o2.set(a2, u2), s2(u2, a2, r2, i2, o2), o2.delete(a2)), vt(t3, n3, u2);
            }
          };
          const Le = function t3(e3, n3, r2, s2, i2) {
            e3 !== n3 && xt(n3, function(o2, l2) {
              if (i2 || (i2 = new mt()), S(o2)) _e(e3, n3, l2, r2, t3, s2, i2);
              else {
                var a2 = s2 ? s2(fe(e3, l2), o2, l2 + "", e3, n3, i2) : void 0;
                void 0 === a2 && (a2 = o2), vt(e3, l2, a2);
              }
            }, qe);
          };
          const Oe = function(t3) {
            return t3;
          };
          const Te = function(t3, e3, n3) {
            switch (n3.length) {
              case 0:
                return t3.call(e3);
              case 1:
                return t3.call(e3, n3[0]);
              case 2:
                return t3.call(e3, n3[0], n3[1]);
              case 3:
                return t3.call(e3, n3[0], n3[1], n3[2]);
            }
            return t3.apply(e3, n3);
          };
          var Se = Math.max;
          const Ce = function(t3, e3, n3) {
            return e3 = Se(void 0 === e3 ? t3.length - 1 : e3, 0), function() {
              for (var r2 = arguments, s2 = -1, i2 = Se(r2.length - e3, 0), o2 = Array(i2); ++s2 < i2; ) o2[s2] = r2[e3 + s2];
              s2 = -1;
              for (var l2 = Array(e3 + 1); ++s2 < e3; ) l2[s2] = r2[s2];
              return l2[e3] = n3(o2), Te(t3, this, l2);
            };
          };
          const je = function(t3) {
            return function() {
              return t3;
            };
          };
          const Re = bt ? function(t3, e3) {
            return bt(t3, "toString", {
              configurable: true,
              enumerable: false,
              value: je(e3),
              writable: true
            });
          } : Oe;
          var Ie = Date.now;
          const Me = /* @__PURE__ */ function(t3) {
            var e3 = 0, n3 = 0;
            return function() {
              var r2 = Ie(), s2 = 16 - (r2 - n3);
              if (n3 = r2, s2 > 0) {
                if (++e3 >= 800) return arguments[0];
              } else e3 = 0;
              return t3.apply(void 0, arguments);
            };
          }(Re);
          const Be = function(t3, e3) {
            return Me(Ce(t3, e3, Oe), t3 + "");
          };
          const Ue = function(t3, e3, n3) {
            if (!S(n3)) return false;
            var r2 = typeof e3;
            return !!("number" == r2 ? Vt(n3) && ve(e3, n3.length) : "string" == r2 && e3 in n3) && i(n3[e3], t3);
          };
          const De = function(t3) {
            return Be(function(e3, n3) {
              var r2 = -1, s2 = n3.length, i2 = s2 > 1 ? n3[s2 - 1] : void 0, o2 = s2 > 2 ? n3[2] : void 0;
              for (i2 = t3.length > 3 && "function" == typeof i2 ? (s2--, i2) : void 0, o2 && Ue(n3[0], n3[1], o2) && (i2 = s2 < 3 ? void 0 : i2, s2 = 1), e3 = Object(e3); ++r2 < s2; ) {
                var l2 = n3[r2];
                l2 && t3(e3, l2, r2, i2);
              }
              return e3;
            });
          }(function(t3, e3, n3) {
            Le(t3, e3, n3);
          });
          var Pe = ((t3) => (t3[t3.TYPE = 3] = "TYPE", t3[t3.LEVEL = 12] = "LEVEL", t3[t3.ATTRIBUTE = 13] = "ATTRIBUTE", t3[t3.BLOT = 14] = "BLOT", t3[t3.INLINE = 7] = "INLINE", t3[t3.BLOCK = 11] = "BLOCK", t3[t3.BLOCK_BLOT = 10] = "BLOCK_BLOT", t3[t3.INLINE_BLOT = 6] = "INLINE_BLOT", t3[t3.BLOCK_ATTRIBUTE = 9] = "BLOCK_ATTRIBUTE", t3[t3.INLINE_ATTRIBUTE = 5] = "INLINE_ATTRIBUTE", t3[t3.ANY = 15] = "ANY", t3))(Pe || {});
          class ze {
            constructor(t3, e3, n3 = {}) {
              this.attrName = t3, this.keyName = e3;
              const r2 = Pe.TYPE & Pe.ATTRIBUTE;
              this.scope = null != n3.scope ? n3.scope & Pe.LEVEL | r2 : Pe.ATTRIBUTE, null != n3.whitelist && (this.whitelist = n3.whitelist);
            }
            static keys(t3) {
              return Array.from(t3.attributes).map((t4) => t4.name);
            }
            add(t3, e3) {
              return !!this.canAdd(t3, e3) && (t3.setAttribute(this.keyName, e3), true);
            }
            canAdd(t3, e3) {
              return null == this.whitelist || ("string" == typeof e3 ? this.whitelist.indexOf(e3.replace(/["']/g, "")) > -1 : this.whitelist.indexOf(e3) > -1);
            }
            remove(t3) {
              t3.removeAttribute(this.keyName);
            }
            value(t3) {
              const e3 = t3.getAttribute(this.keyName);
              return this.canAdd(t3, e3) && e3 ? e3 : "";
            }
          }
          class He extends Error {
            constructor(t3) {
              super(t3 = "[Parchment] " + t3), this.message = t3, this.name = this.constructor.name;
            }
          }
          const Fe = class t3 {
            constructor() {
              this.attributes = {}, this.classes = {}, this.tags = {}, this.types = {};
            }
            static find(t4, e3 = false) {
              if (null == t4) return null;
              if (this.blots.has(t4)) return this.blots.get(t4) || null;
              if (e3) {
                let n3 = null;
                try {
                  n3 = t4.parentNode;
                } catch {
                  return null;
                }
                return this.find(n3, e3);
              }
              return null;
            }
            create(e3, n3, r2) {
              const s2 = this.query(n3);
              if (null == s2) throw new He(`Unable to create ${n3} blot`);
              const i2 = s2, o2 = n3 instanceof Node || n3.nodeType === Node.TEXT_NODE ? n3 : i2.create(r2), l2 = new i2(e3, o2, r2);
              return t3.blots.set(l2.domNode, l2), l2;
            }
            find(e3, n3 = false) {
              return t3.find(e3, n3);
            }
            query(t4, e3 = Pe.ANY) {
              let n3;
              return "string" == typeof t4 ? n3 = this.types[t4] || this.attributes[t4] : t4 instanceof Text || t4.nodeType === Node.TEXT_NODE ? n3 = this.types.text : "number" == typeof t4 ? t4 & Pe.LEVEL & Pe.BLOCK ? n3 = this.types.block : t4 & Pe.LEVEL & Pe.INLINE && (n3 = this.types.inline) : t4 instanceof Element && ((t4.getAttribute("class") || "").split(/\s+/).some((t5) => (n3 = this.classes[t5], !!n3)), n3 = n3 || this.tags[t4.tagName]), null == n3 ? null : "scope" in n3 && e3 & Pe.LEVEL & n3.scope && e3 & Pe.TYPE & n3.scope ? n3 : null;
            }
            register(...t4) {
              return t4.map((t5) => {
                const e3 = "blotName" in t5, n3 = "attrName" in t5;
                if (!e3 && !n3) throw new He("Invalid definition");
                if (e3 && "abstract" === t5.blotName) throw new He("Cannot register abstract class");
                const r2 = e3 ? t5.blotName : n3 ? t5.attrName : void 0;
                return this.types[r2] = t5, n3 ? "string" == typeof t5.keyName && (this.attributes[t5.keyName] = t5) : e3 && (t5.className && (this.classes[t5.className] = t5), t5.tagName && (Array.isArray(t5.tagName) ? t5.tagName = t5.tagName.map((t6) => t6.toUpperCase()) : t5.tagName = t5.tagName.toUpperCase(), (Array.isArray(t5.tagName) ? t5.tagName : [t5.tagName]).forEach((e4) => {
                  (null == this.tags[e4] || null == t5.className) && (this.tags[e4] = t5);
                }))), t5;
              });
            }
          };
          Fe.blots = /* @__PURE__ */ new WeakMap();
          let $e = Fe;
          function Ve(t3, e3) {
            return (t3.getAttribute("class") || "").split(/\s+/).filter((t4) => 0 === t4.indexOf(`${e3}-`));
          }
          const Ke = class extends ze {
            static keys(t3) {
              return (t3.getAttribute("class") || "").split(/\s+/).map((t4) => t4.split("-").slice(0, -1).join("-"));
            }
            add(t3, e3) {
              return !!this.canAdd(t3, e3) && (this.remove(t3), t3.classList.add(`${this.keyName}-${e3}`), true);
            }
            remove(t3) {
              Ve(t3, this.keyName).forEach((e3) => {
                t3.classList.remove(e3);
              }), 0 === t3.classList.length && t3.removeAttribute("class");
            }
            value(t3) {
              const e3 = (Ve(t3, this.keyName)[0] || "").slice(this.keyName.length + 1);
              return this.canAdd(t3, e3) ? e3 : "";
            }
          };
          function We(t3) {
            const e3 = t3.split("-"), n3 = e3.slice(1).map((t4) => t4[0].toUpperCase() + t4.slice(1)).join("");
            return e3[0] + n3;
          }
          const Ze = class extends ze {
            static keys(t3) {
              return (t3.getAttribute("style") || "").split(";").map((t4) => t4.split(":")[0].trim());
            }
            add(t3, e3) {
              return !!this.canAdd(t3, e3) && (t3.style[We(this.keyName)] = e3, true);
            }
            remove(t3) {
              t3.style[We(this.keyName)] = "", t3.getAttribute("style") || t3.removeAttribute("style");
            }
            value(t3) {
              const e3 = t3.style[We(this.keyName)];
              return this.canAdd(t3, e3) ? e3 : "";
            }
          };
          const Ge = class {
            constructor(t3) {
              this.attributes = {}, this.domNode = t3, this.build();
            }
            attribute(t3, e3) {
              e3 ? t3.add(this.domNode, e3) && (null != t3.value(this.domNode) ? this.attributes[t3.attrName] = t3 : delete this.attributes[t3.attrName]) : (t3.remove(this.domNode), delete this.attributes[t3.attrName]);
            }
            build() {
              this.attributes = {};
              const t3 = $e.find(this.domNode);
              if (null == t3) return;
              const e3 = ze.keys(this.domNode), n3 = Ke.keys(this.domNode), r2 = Ze.keys(this.domNode);
              e3.concat(n3).concat(r2).forEach((e4) => {
                const n4 = t3.scroll.query(e4, Pe.ATTRIBUTE);
                n4 instanceof ze && (this.attributes[n4.attrName] = n4);
              });
            }
            copy(t3) {
              Object.keys(this.attributes).forEach((e3) => {
                const n3 = this.attributes[e3].value(this.domNode);
                t3.format(e3, n3);
              });
            }
            move(t3) {
              this.copy(t3), Object.keys(this.attributes).forEach((t4) => {
                this.attributes[t4].remove(this.domNode);
              }), this.attributes = {};
            }
            values() {
              return Object.keys(this.attributes).reduce((t3, e3) => (t3[e3] = this.attributes[e3].value(this.domNode), t3), {});
            }
          }, Xe = class {
            constructor(t3, e3) {
              this.scroll = t3, this.domNode = e3, $e.blots.set(e3, this), this.prev = null, this.next = null;
            }
            static create(t3) {
              if (null == this.tagName) throw new He("Blot definition missing tagName");
              let e3, n3;
              return Array.isArray(this.tagName) ? ("string" == typeof t3 ? (n3 = t3.toUpperCase(), parseInt(n3, 10).toString() === n3 && (n3 = parseInt(n3, 10))) : "number" == typeof t3 && (n3 = t3), e3 = "number" == typeof n3 ? document.createElement(this.tagName[n3 - 1]) : n3 && this.tagName.indexOf(n3) > -1 ? document.createElement(n3) : document.createElement(this.tagName[0])) : e3 = document.createElement(this.tagName), this.className && e3.classList.add(this.className), e3;
            }
            get statics() {
              return this.constructor;
            }
            attach() {
            }
            clone() {
              const t3 = this.domNode.cloneNode(false);
              return this.scroll.create(t3);
            }
            detach() {
              null != this.parent && this.parent.removeChild(this), $e.blots.delete(this.domNode);
            }
            deleteAt(t3, e3) {
              this.isolate(t3, e3).remove();
            }
            formatAt(t3, e3, n3, r2) {
              const s2 = this.isolate(t3, e3);
              if (null != this.scroll.query(n3, Pe.BLOT) && r2) s2.wrap(n3, r2);
              else if (null != this.scroll.query(n3, Pe.ATTRIBUTE)) {
                const t4 = this.scroll.create(this.statics.scope);
                s2.wrap(t4), t4.format(n3, r2);
              }
            }
            insertAt(t3, e3, n3) {
              const r2 = null == n3 ? this.scroll.create("text", e3) : this.scroll.create(e3, n3), s2 = this.split(t3);
              this.parent.insertBefore(r2, s2 || void 0);
            }
            isolate(t3, e3) {
              const n3 = this.split(t3);
              if (null == n3) throw new Error("Attempt to isolate at end");
              return n3.split(e3), n3;
            }
            length() {
              return 1;
            }
            offset(t3 = this.parent) {
              return null == this.parent || this === t3 ? 0 : this.parent.children.offset(this) + this.parent.offset(t3);
            }
            optimize(t3) {
              this.statics.requiredContainer && !(this.parent instanceof this.statics.requiredContainer) && this.wrap(this.statics.requiredContainer.blotName);
            }
            remove() {
              null != this.domNode.parentNode && this.domNode.parentNode.removeChild(this.domNode), this.detach();
            }
            replaceWith(t3, e3) {
              const n3 = "string" == typeof t3 ? this.scroll.create(t3, e3) : t3;
              return null != this.parent && (this.parent.insertBefore(n3, this.next || void 0), this.remove()), n3;
            }
            split(t3, e3) {
              return 0 === t3 ? this : this.next;
            }
            update(t3, e3) {
            }
            wrap(t3, e3) {
              const n3 = "string" == typeof t3 ? this.scroll.create(t3, e3) : t3;
              if (null != this.parent && this.parent.insertBefore(n3, this.next || void 0), "function" != typeof n3.appendChild) throw new He(`Cannot wrap ${t3}`);
              return n3.appendChild(this), n3;
            }
          };
          Xe.blotName = "abstract";
          let Qe = Xe;
          const Ye = class extends Qe {
            static value(t3) {
              return true;
            }
            index(t3, e3) {
              return this.domNode === t3 || this.domNode.compareDocumentPosition(t3) & Node.DOCUMENT_POSITION_CONTAINED_BY ? Math.min(e3, 1) : -1;
            }
            position(t3, e3) {
              let n3 = Array.from(this.parent.domNode.childNodes).indexOf(this.domNode);
              return t3 > 0 && (n3 += 1), [this.parent.domNode, n3];
            }
            value() {
              return {
                [this.statics.blotName]: this.statics.value(this.domNode) || true
              };
            }
          };
          Ye.scope = Pe.INLINE_BLOT;
          const Je = Ye;
          class tn {
            constructor() {
              this.head = null, this.tail = null, this.length = 0;
            }
            append(...t3) {
              if (this.insertBefore(t3[0], null), t3.length > 1) {
                const e3 = t3.slice(1);
                this.append(...e3);
              }
            }
            at(t3) {
              const e3 = this.iterator();
              let n3 = e3();
              for (; n3 && t3 > 0; ) t3 -= 1, n3 = e3();
              return n3;
            }
            contains(t3) {
              const e3 = this.iterator();
              let n3 = e3();
              for (; n3; ) {
                if (n3 === t3) return true;
                n3 = e3();
              }
              return false;
            }
            indexOf(t3) {
              const e3 = this.iterator();
              let n3 = e3(), r2 = 0;
              for (; n3; ) {
                if (n3 === t3) return r2;
                r2 += 1, n3 = e3();
              }
              return -1;
            }
            insertBefore(t3, e3) {
              null != t3 && (this.remove(t3), t3.next = e3, null != e3 ? (t3.prev = e3.prev, null != e3.prev && (e3.prev.next = t3), e3.prev = t3, e3 === this.head && (this.head = t3)) : null != this.tail ? (this.tail.next = t3, t3.prev = this.tail, this.tail = t3) : (t3.prev = null, this.head = this.tail = t3), this.length += 1);
            }
            offset(t3) {
              let e3 = 0, n3 = this.head;
              for (; null != n3; ) {
                if (n3 === t3) return e3;
                e3 += n3.length(), n3 = n3.next;
              }
              return -1;
            }
            remove(t3) {
              this.contains(t3) && (null != t3.prev && (t3.prev.next = t3.next), null != t3.next && (t3.next.prev = t3.prev), t3 === this.head && (this.head = t3.next), t3 === this.tail && (this.tail = t3.prev), this.length -= 1);
            }
            iterator(t3 = this.head) {
              return () => {
                const e3 = t3;
                return null != t3 && (t3 = t3.next), e3;
              };
            }
            find(t3, e3 = false) {
              const n3 = this.iterator();
              let r2 = n3();
              for (; r2; ) {
                const s2 = r2.length();
                if (t3 < s2 || e3 && t3 === s2 && (null == r2.next || 0 !== r2.next.length())) return [r2, t3];
                t3 -= s2, r2 = n3();
              }
              return [null, 0];
            }
            forEach(t3) {
              const e3 = this.iterator();
              let n3 = e3();
              for (; n3; ) t3(n3), n3 = e3();
            }
            forEachAt(t3, e3, n3) {
              if (e3 <= 0) return;
              const [r2, s2] = this.find(t3);
              let i2 = t3 - s2;
              const o2 = this.iterator(r2);
              let l2 = o2();
              for (; l2 && i2 < t3 + e3; ) {
                const r3 = l2.length();
                t3 > i2 ? n3(l2, t3 - i2, Math.min(e3, i2 + r3 - t3)) : n3(l2, 0, Math.min(r3, t3 + e3 - i2)), i2 += r3, l2 = o2();
              }
            }
            map(t3) {
              return this.reduce((e3, n3) => (e3.push(t3(n3)), e3), []);
            }
            reduce(t3, e3) {
              const n3 = this.iterator();
              let r2 = n3();
              for (; r2; ) e3 = t3(e3, r2), r2 = n3();
              return e3;
            }
          }
          function en(t3, e3) {
            const n3 = e3.find(t3);
            if (n3) return n3;
            try {
              return e3.create(t3);
            } catch {
              const n4 = e3.create(Pe.INLINE);
              return Array.from(t3.childNodes).forEach((t4) => {
                n4.domNode.appendChild(t4);
              }), t3.parentNode && t3.parentNode.replaceChild(n4.domNode, t3), n4.attach(), n4;
            }
          }
          const nn = class t3 extends Qe {
            constructor(t4, e3) {
              super(t4, e3), this.uiNode = null, this.build();
            }
            appendChild(t4) {
              this.insertBefore(t4);
            }
            attach() {
              super.attach(), this.children.forEach((t4) => {
                t4.attach();
              });
            }
            attachUI(e3) {
              null != this.uiNode && this.uiNode.remove(), this.uiNode = e3, t3.uiClass && this.uiNode.classList.add(t3.uiClass), this.uiNode.setAttribute("contenteditable", "false"), this.domNode.insertBefore(this.uiNode, this.domNode.firstChild);
            }
            build() {
              this.children = new tn(), Array.from(this.domNode.childNodes).filter((t4) => t4 !== this.uiNode).reverse().forEach((t4) => {
                try {
                  const e3 = en(t4, this.scroll);
                  this.insertBefore(e3, this.children.head || void 0);
                } catch (t5) {
                  if (t5 instanceof He) return;
                  throw t5;
                }
              });
            }
            deleteAt(t4, e3) {
              if (0 === t4 && e3 === this.length()) return this.remove();
              this.children.forEachAt(t4, e3, (t5, e4, n3) => {
                t5.deleteAt(e4, n3);
              });
            }
            descendant(e3, n3 = 0) {
              const [r2, s2] = this.children.find(n3);
              return null == e3.blotName && e3(r2) || null != e3.blotName && r2 instanceof e3 ? [r2, s2] : r2 instanceof t3 ? r2.descendant(e3, s2) : [null, -1];
            }
            descendants(e3, n3 = 0, r2 = Number.MAX_VALUE) {
              let s2 = [], i2 = r2;
              return this.children.forEachAt(n3, r2, (n4, r3, o2) => {
                (null == e3.blotName && e3(n4) || null != e3.blotName && n4 instanceof e3) && s2.push(n4), n4 instanceof t3 && (s2 = s2.concat(n4.descendants(e3, r3, i2))), i2 -= o2;
              }), s2;
            }
            detach() {
              this.children.forEach((t4) => {
                t4.detach();
              }), super.detach();
            }
            enforceAllowedChildren() {
              let e3 = false;
              this.children.forEach((n3) => {
                e3 || this.statics.allowedChildren.some((t4) => n3 instanceof t4) || (n3.statics.scope === Pe.BLOCK_BLOT ? (null != n3.next && this.splitAfter(n3), null != n3.prev && this.splitAfter(n3.prev), n3.parent.unwrap(), e3 = true) : n3 instanceof t3 ? n3.unwrap() : n3.remove());
              });
            }
            formatAt(t4, e3, n3, r2) {
              this.children.forEachAt(t4, e3, (t5, e4, s2) => {
                t5.formatAt(e4, s2, n3, r2);
              });
            }
            insertAt(t4, e3, n3) {
              const [r2, s2] = this.children.find(t4);
              if (r2) r2.insertAt(s2, e3, n3);
              else {
                const t5 = null == n3 ? this.scroll.create("text", e3) : this.scroll.create(e3, n3);
                this.appendChild(t5);
              }
            }
            insertBefore(t4, e3) {
              null != t4.parent && t4.parent.children.remove(t4);
              let n3 = null;
              this.children.insertBefore(t4, e3 || null), t4.parent = this, null != e3 && (n3 = e3.domNode), (this.domNode.parentNode !== t4.domNode || this.domNode.nextSibling !== n3) && this.domNode.insertBefore(t4.domNode, n3), t4.attach();
            }
            length() {
              return this.children.reduce((t4, e3) => t4 + e3.length(), 0);
            }
            moveChildren(t4, e3) {
              this.children.forEach((n3) => {
                t4.insertBefore(n3, e3);
              });
            }
            optimize(t4) {
              if (super.optimize(t4), this.enforceAllowedChildren(), null != this.uiNode && this.uiNode !== this.domNode.firstChild && this.domNode.insertBefore(this.uiNode, this.domNode.firstChild), 0 === this.children.length) if (null != this.statics.defaultChild) {
                const t5 = this.scroll.create(this.statics.defaultChild.blotName);
                this.appendChild(t5);
              } else this.remove();
            }
            path(e3, n3 = false) {
              const [r2, s2] = this.children.find(e3, n3), i2 = [[this, e3]];
              return r2 instanceof t3 ? i2.concat(r2.path(s2, n3)) : (null != r2 && i2.push([r2, s2]), i2);
            }
            removeChild(t4) {
              this.children.remove(t4);
            }
            replaceWith(e3, n3) {
              const r2 = "string" == typeof e3 ? this.scroll.create(e3, n3) : e3;
              return r2 instanceof t3 && this.moveChildren(r2), super.replaceWith(r2);
            }
            split(t4, e3 = false) {
              if (!e3) {
                if (0 === t4) return this;
                if (t4 === this.length()) return this.next;
              }
              const n3 = this.clone();
              return this.parent && this.parent.insertBefore(n3, this.next || void 0), this.children.forEachAt(t4, this.length(), (t5, r2, s2) => {
                const i2 = t5.split(r2, e3);
                null != i2 && n3.appendChild(i2);
              }), n3;
            }
            splitAfter(t4) {
              const e3 = this.clone();
              for (; null != t4.next; ) e3.appendChild(t4.next);
              return this.parent && this.parent.insertBefore(e3, this.next || void 0), e3;
            }
            unwrap() {
              this.parent && this.moveChildren(this.parent, this.next || void 0), this.remove();
            }
            update(t4, e3) {
              const n3 = [], r2 = [];
              t4.forEach((t5) => {
                t5.target === this.domNode && "childList" === t5.type && (n3.push(...t5.addedNodes), r2.push(...t5.removedNodes));
              }), r2.forEach((t5) => {
                if (null != t5.parentNode && "IFRAME" !== t5.tagName && document.body.compareDocumentPosition(t5) & Node.DOCUMENT_POSITION_CONTAINED_BY) return;
                const e4 = this.scroll.find(t5);
                null != e4 && (null == e4.domNode.parentNode || e4.domNode.parentNode === this.domNode) && e4.detach();
              }), n3.filter((t5) => t5.parentNode === this.domNode && t5 !== this.uiNode).sort((t5, e4) => t5 === e4 ? 0 : t5.compareDocumentPosition(e4) & Node.DOCUMENT_POSITION_FOLLOWING ? 1 : -1).forEach((t5) => {
                let e4 = null;
                null != t5.nextSibling && (e4 = this.scroll.find(t5.nextSibling));
                const n4 = en(t5, this.scroll);
                (n4.next !== e4 || null == n4.next) && (null != n4.parent && n4.parent.removeChild(this), this.insertBefore(n4, e4 || void 0));
              }), this.enforceAllowedChildren();
            }
          };
          nn.uiClass = "";
          const rn = nn;
          const sn = class t3 extends rn {
            static create(t4) {
              return super.create(t4);
            }
            static formats(e3, n3) {
              const r2 = n3.query(t3.blotName);
              if (null == r2 || e3.tagName !== r2.tagName) {
                if ("string" == typeof this.tagName) return true;
                if (Array.isArray(this.tagName)) return e3.tagName.toLowerCase();
              }
            }
            constructor(t4, e3) {
              super(t4, e3), this.attributes = new Ge(this.domNode);
            }
            format(e3, n3) {
              if (e3 !== this.statics.blotName || n3) {
                const t4 = this.scroll.query(e3, Pe.INLINE);
                if (null == t4) return;
                t4 instanceof ze ? this.attributes.attribute(t4, n3) : n3 && (e3 !== this.statics.blotName || this.formats()[e3] !== n3) && this.replaceWith(e3, n3);
              } else this.children.forEach((e4) => {
                e4 instanceof t3 || (e4 = e4.wrap(t3.blotName, true)), this.attributes.copy(e4);
              }), this.unwrap();
            }
            formats() {
              const t4 = this.attributes.values(), e3 = this.statics.formats(this.domNode, this.scroll);
              return null != e3 && (t4[this.statics.blotName] = e3), t4;
            }
            formatAt(t4, e3, n3, r2) {
              null != this.formats()[n3] || this.scroll.query(n3, Pe.ATTRIBUTE) ? this.isolate(t4, e3).format(n3, r2) : super.formatAt(t4, e3, n3, r2);
            }
            optimize(e3) {
              super.optimize(e3);
              const n3 = this.formats();
              if (0 === Object.keys(n3).length) return this.unwrap();
              const r2 = this.next;
              r2 instanceof t3 && r2.prev === this && function(t4, e4) {
                if (Object.keys(t4).length !== Object.keys(e4).length) return false;
                for (const n4 in t4) if (t4[n4] !== e4[n4]) return false;
                return true;
              }(n3, r2.formats()) && (r2.moveChildren(this), r2.remove());
            }
            replaceWith(t4, e3) {
              const n3 = super.replaceWith(t4, e3);
              return this.attributes.copy(n3), n3;
            }
            update(t4, e3) {
              super.update(t4, e3), t4.some((t5) => t5.target === this.domNode && "attributes" === t5.type) && this.attributes.build();
            }
            wrap(e3, n3) {
              const r2 = super.wrap(e3, n3);
              return r2 instanceof t3 && this.attributes.move(r2), r2;
            }
          };
          sn.allowedChildren = [sn, Je], sn.blotName = "inline", sn.scope = Pe.INLINE_BLOT, sn.tagName = "SPAN";
          const on = sn, ln = class t3 extends rn {
            static create(t4) {
              return super.create(t4);
            }
            static formats(e3, n3) {
              const r2 = n3.query(t3.blotName);
              if (null == r2 || e3.tagName !== r2.tagName) {
                if ("string" == typeof this.tagName) return true;
                if (Array.isArray(this.tagName)) return e3.tagName.toLowerCase();
              }
            }
            constructor(t4, e3) {
              super(t4, e3), this.attributes = new Ge(this.domNode);
            }
            format(e3, n3) {
              const r2 = this.scroll.query(e3, Pe.BLOCK);
              null != r2 && (r2 instanceof ze ? this.attributes.attribute(r2, n3) : e3 !== this.statics.blotName || n3 ? n3 && (e3 !== this.statics.blotName || this.formats()[e3] !== n3) && this.replaceWith(e3, n3) : this.replaceWith(t3.blotName));
            }
            formats() {
              const t4 = this.attributes.values(), e3 = this.statics.formats(this.domNode, this.scroll);
              return null != e3 && (t4[this.statics.blotName] = e3), t4;
            }
            formatAt(t4, e3, n3, r2) {
              null != this.scroll.query(n3, Pe.BLOCK) ? this.format(n3, r2) : super.formatAt(t4, e3, n3, r2);
            }
            insertAt(t4, e3, n3) {
              if (null == n3 || null != this.scroll.query(e3, Pe.INLINE)) super.insertAt(t4, e3, n3);
              else {
                const r2 = this.split(t4);
                if (null == r2) throw new Error("Attempt to insertAt after block boundaries");
                {
                  const t5 = this.scroll.create(e3, n3);
                  r2.parent.insertBefore(t5, r2);
                }
              }
            }
            replaceWith(t4, e3) {
              const n3 = super.replaceWith(t4, e3);
              return this.attributes.copy(n3), n3;
            }
            update(t4, e3) {
              super.update(t4, e3), t4.some((t5) => t5.target === this.domNode && "attributes" === t5.type) && this.attributes.build();
            }
          };
          ln.blotName = "block", ln.scope = Pe.BLOCK_BLOT, ln.tagName = "P", ln.allowedChildren = [on, ln, Je];
          const an = ln, cn = class extends rn {
            checkMerge() {
              return null !== this.next && this.next.statics.blotName === this.statics.blotName;
            }
            deleteAt(t3, e3) {
              super.deleteAt(t3, e3), this.enforceAllowedChildren();
            }
            formatAt(t3, e3, n3, r2) {
              super.formatAt(t3, e3, n3, r2), this.enforceAllowedChildren();
            }
            insertAt(t3, e3, n3) {
              super.insertAt(t3, e3, n3), this.enforceAllowedChildren();
            }
            optimize(t3) {
              super.optimize(t3), this.children.length > 0 && null != this.next && this.checkMerge() && (this.next.moveChildren(this), this.next.remove());
            }
          };
          cn.blotName = "container", cn.scope = Pe.BLOCK_BLOT;
          const un = cn;
          const hn = class extends Je {
            static formats(t3, e3) {
            }
            format(t3, e3) {
              super.formatAt(0, this.length(), t3, e3);
            }
            formatAt(t3, e3, n3, r2) {
              0 === t3 && e3 === this.length() ? this.format(n3, r2) : super.formatAt(t3, e3, n3, r2);
            }
            formats() {
              return this.statics.formats(this.domNode, this.scroll);
            }
          }, dn = {
            attributes: true,
            characterData: true,
            characterDataOldValue: true,
            childList: true,
            subtree: true
          }, fn = class extends rn {
            constructor(t3, e3) {
              super(null, e3), this.registry = t3, this.scroll = this, this.build(), this.observer = new MutationObserver((t4) => {
                this.update(t4);
              }), this.observer.observe(this.domNode, dn), this.attach();
            }
            create(t3, e3) {
              return this.registry.create(this, t3, e3);
            }
            find(t3, e3 = false) {
              const n3 = this.registry.find(t3, e3);
              return n3 ? n3.scroll === this ? n3 : e3 ? this.find(n3.scroll.domNode.parentNode, true) : null : null;
            }
            query(t3, e3 = Pe.ANY) {
              return this.registry.query(t3, e3);
            }
            register(...t3) {
              return this.registry.register(...t3);
            }
            build() {
              null != this.scroll && super.build();
            }
            detach() {
              super.detach(), this.observer.disconnect();
            }
            deleteAt(t3, e3) {
              this.update(), 0 === t3 && e3 === this.length() ? this.children.forEach((t4) => {
                t4.remove();
              }) : super.deleteAt(t3, e3);
            }
            formatAt(t3, e3, n3, r2) {
              this.update(), super.formatAt(t3, e3, n3, r2);
            }
            insertAt(t3, e3, n3) {
              this.update(), super.insertAt(t3, e3, n3);
            }
            optimize(t3 = [], e3 = {}) {
              super.optimize(e3);
              const n3 = e3.mutationsMap || /* @__PURE__ */ new WeakMap();
              let r2 = Array.from(this.observer.takeRecords());
              for (; r2.length > 0; ) t3.push(r2.pop());
              const s2 = (t4, e4 = true) => {
                null == t4 || t4 === this || null != t4.domNode.parentNode && (n3.has(t4.domNode) || n3.set(t4.domNode, []), e4 && s2(t4.parent));
              }, i2 = (t4) => {
                n3.has(t4.domNode) && (t4 instanceof rn && t4.children.forEach(i2), n3.delete(t4.domNode), t4.optimize(e3));
              };
              let o2 = t3;
              for (let e4 = 0; o2.length > 0; e4 += 1) {
                if (e4 >= 100) throw new Error("[Parchment] Maximum optimize iterations reached");
                for (o2.forEach((t4) => {
                  const e5 = this.find(t4.target, true);
                  null != e5 && (e5.domNode === t4.target && ("childList" === t4.type ? (s2(this.find(t4.previousSibling, false)), Array.from(t4.addedNodes).forEach((t5) => {
                    const e6 = this.find(t5, false);
                    s2(e6, false), e6 instanceof rn && e6.children.forEach((t6) => {
                      s2(t6, false);
                    });
                  })) : "attributes" === t4.type && s2(e5.prev)), s2(e5));
                }), this.children.forEach(i2), o2 = Array.from(this.observer.takeRecords()), r2 = o2.slice(); r2.length > 0; ) t3.push(r2.pop());
              }
            }
            update(t3, e3 = {}) {
              t3 = t3 || this.observer.takeRecords();
              const n3 = /* @__PURE__ */ new WeakMap();
              t3.map((t4) => {
                const e4 = this.find(t4.target, true);
                return null == e4 ? null : n3.has(e4.domNode) ? (n3.get(e4.domNode).push(t4), null) : (n3.set(e4.domNode, [t4]), e4);
              }).forEach((t4) => {
                null != t4 && t4 !== this && n3.has(t4.domNode) && t4.update(n3.get(t4.domNode) || [], e3);
              }), e3.mutationsMap = n3, n3.has(this.domNode) && super.update(n3.get(this.domNode), e3), this.optimize(t3, e3);
            }
          };
          fn.blotName = "scroll", fn.defaultChild = an, fn.allowedChildren = [an, un], fn.scope = Pe.BLOCK_BLOT, fn.tagName = "DIV";
          const pn = fn, gn = class t3 extends Je {
            static create(t4) {
              return document.createTextNode(t4);
            }
            static value(t4) {
              return t4.data;
            }
            constructor(t4, e3) {
              super(t4, e3), this.text = this.statics.value(this.domNode);
            }
            deleteAt(t4, e3) {
              this.domNode.data = this.text = this.text.slice(0, t4) + this.text.slice(t4 + e3);
            }
            index(t4, e3) {
              return this.domNode === t4 ? e3 : -1;
            }
            insertAt(t4, e3, n3) {
              null == n3 ? (this.text = this.text.slice(0, t4) + e3 + this.text.slice(t4), this.domNode.data = this.text) : super.insertAt(t4, e3, n3);
            }
            length() {
              return this.text.length;
            }
            optimize(e3) {
              super.optimize(e3), this.text = this.statics.value(this.domNode), 0 === this.text.length ? this.remove() : this.next instanceof t3 && this.next.prev === this && (this.insertAt(this.length(), this.next.value()), this.next.remove());
            }
            position(t4, e3 = false) {
              return [this.domNode, t4];
            }
            split(t4, e3 = false) {
              if (!e3) {
                if (0 === t4) return this;
                if (t4 === this.length()) return this.next;
              }
              const n3 = this.scroll.create(this.domNode.splitText(t4));
              return this.parent.insertBefore(n3, this.next || void 0), this.text = this.statics.value(this.domNode), n3;
            }
            update(t4, e3) {
              t4.some((t5) => "characterData" === t5.type && t5.target === this.domNode) && (this.text = this.statics.value(this.domNode));
            }
            value() {
              return this.text;
            }
          };
          gn.blotName = "text", gn.scope = Pe.INLINE_BLOT;
          const mn = gn;
          var bn = n2(660);
          const yn = function(t3, e3) {
            for (var n3 = -1, r2 = null == t3 ? 0 : t3.length; ++n3 < r2 && false !== e3(t3[n3], n3, t3); ) ;
            return t3;
          };
          const vn = Ct(Object.keys, Object);
          var xn = Object.prototype.hasOwnProperty;
          const Nn = function(t3) {
            if (!It(t3)) return vn(t3);
            var e3 = [];
            for (var n3 in Object(t3)) xn.call(t3, n3) && "constructor" != n3 && e3.push(n3);
            return e3;
          };
          const wn = function(t3) {
            return Vt(t3) ? Ne(t3) : Nn(t3);
          };
          const En = function(t3, e3) {
            return t3 && me(e3, wn(e3), t3);
          };
          const An = function(t3, e3) {
            return t3 && me(e3, qe(e3), t3);
          };
          const qn = function(t3, e3) {
            for (var n3 = -1, r2 = null == t3 ? 0 : t3.length, s2 = 0, i2 = []; ++n3 < r2; ) {
              var o2 = t3[n3];
              e3(o2, n3, t3) && (i2[s2++] = o2);
            }
            return i2;
          };
          const kn = function() {
            return [];
          };
          var _n = Object.prototype.propertyIsEnumerable, Ln = Object.getOwnPropertySymbols;
          const On = Ln ? function(t3) {
            return null == t3 ? [] : (t3 = Object(t3), qn(Ln(t3), function(e3) {
              return _n.call(t3, e3);
            }));
          } : kn;
          const Tn = function(t3, e3) {
            return me(t3, On(t3), e3);
          };
          const Sn = function(t3, e3) {
            for (var n3 = -1, r2 = e3.length, s2 = t3.length; ++n3 < r2; ) t3[s2 + n3] = e3[n3];
            return t3;
          };
          const Cn = Object.getOwnPropertySymbols ? function(t3) {
            for (var e3 = []; t3; ) Sn(e3, On(t3)), t3 = jt(t3);
            return e3;
          } : kn;
          const jn = function(t3, e3) {
            return me(t3, Cn(t3), e3);
          };
          const Rn = function(t3, e3, n3) {
            var r2 = e3(t3);
            return Ft(t3) ? r2 : Sn(r2, n3(t3));
          };
          const In = function(t3) {
            return Rn(t3, wn, On);
          };
          const Mn = function(t3) {
            return Rn(t3, qe, Cn);
          };
          const Bn = W(x, "DataView");
          const Un = W(x, "Promise");
          const Dn = W(x, "Set");
          const Pn = W(x, "WeakMap");
          var zn = "[object Map]", Hn = "[object Promise]", Fn = "[object Set]", $n = "[object WeakMap]", Vn = "[object DataView]", Kn = U(Bn), Wn = U(Z), Zn = U(Un), Gn = U(Dn), Xn = U(Pn), Qn = T;
          (Bn && Qn(new Bn(new ArrayBuffer(1))) != Vn || Z && Qn(new Z()) != zn || Un && Qn(Un.resolve()) != Hn || Dn && Qn(new Dn()) != Fn || Pn && Qn(new Pn()) != $n) && (Qn = function(t3) {
            var e3 = T(t3), n3 = "[object Object]" == e3 ? t3.constructor : void 0, r2 = n3 ? U(n3) : "";
            if (r2) switch (r2) {
              case Kn:
                return Vn;
              case Wn:
                return zn;
              case Zn:
                return Hn;
              case Gn:
                return Fn;
              case Xn:
                return $n;
            }
            return e3;
          });
          const Yn = Qn;
          var Jn = Object.prototype.hasOwnProperty;
          const tr = function(t3) {
            var e3 = t3.length, n3 = new t3.constructor(e3);
            return e3 && "string" == typeof t3[0] && Jn.call(t3, "index") && (n3.index = t3.index, n3.input = t3.input), n3;
          };
          const er = function(t3, e3) {
            var n3 = e3 ? _t(t3.buffer) : t3.buffer;
            return new t3.constructor(n3, t3.byteOffset, t3.byteLength);
          };
          var nr = /\w*$/;
          const rr = function(t3) {
            var e3 = new t3.constructor(t3.source, nr.exec(t3));
            return e3.lastIndex = t3.lastIndex, e3;
          };
          var sr = N ? N.prototype : void 0, ir = sr ? sr.valueOf : void 0;
          const or = function(t3) {
            return ir ? Object(ir.call(t3)) : {};
          };
          const lr = function(t3, e3, n3) {
            var r2 = t3.constructor;
            switch (e3) {
              case "[object ArrayBuffer]":
                return _t(t3);
              case "[object Boolean]":
              case "[object Date]":
                return new r2(+t3);
              case "[object DataView]":
                return er(t3, n3);
              case "[object Float32Array]":
              case "[object Float64Array]":
              case "[object Int8Array]":
              case "[object Int16Array]":
              case "[object Int32Array]":
              case "[object Uint8Array]":
              case "[object Uint8ClampedArray]":
              case "[object Uint16Array]":
              case "[object Uint32Array]":
                return Lt(t3, n3);
              case "[object Map]":
              case "[object Set]":
                return new r2();
              case "[object Number]":
              case "[object String]":
                return new r2(t3);
              case "[object RegExp]":
                return rr(t3);
              case "[object Symbol]":
                return or(t3);
            }
          };
          const ar = function(t3) {
            return Bt(t3) && "[object Map]" == Yn(t3);
          };
          var cr = ue && ue.isMap;
          const ur = cr ? oe(cr) : ar;
          const hr = function(t3) {
            return Bt(t3) && "[object Set]" == Yn(t3);
          };
          var dr = ue && ue.isSet;
          const fr = dr ? oe(dr) : hr;
          var pr = "[object Arguments]", gr = "[object Function]", mr = "[object Object]", br = {};
          br[pr] = br["[object Array]"] = br["[object ArrayBuffer]"] = br["[object DataView]"] = br["[object Boolean]"] = br["[object Date]"] = br["[object Float32Array]"] = br["[object Float64Array]"] = br["[object Int8Array]"] = br["[object Int16Array]"] = br["[object Int32Array]"] = br["[object Map]"] = br["[object Number]"] = br[mr] = br["[object RegExp]"] = br["[object Set]"] = br["[object String]"] = br["[object Symbol]"] = br["[object Uint8Array]"] = br["[object Uint8ClampedArray]"] = br["[object Uint16Array]"] = br["[object Uint32Array]"] = true, br["[object Error]"] = br[gr] = br["[object WeakMap]"] = false;
          const yr = function t3(e3, n3, r2, s2, i2, o2) {
            var l2, a2 = 1 & n3, c2 = 2 & n3, u2 = 4 & n3;
            if (r2 && (l2 = i2 ? r2(e3, s2, i2, o2) : r2(e3)), void 0 !== l2) return l2;
            if (!S(e3)) return e3;
            var h2 = Ft(e3);
            if (h2) {
              if (l2 = tr(e3), !a2) return Ot(e3, l2);
            } else {
              var d2 = Yn(e3), f2 = d2 == gr || "[object GeneratorFunction]" == d2;
              if (Qt(e3)) return qt(e3, a2);
              if (d2 == mr || d2 == pr || f2 && !i2) {
                if (l2 = c2 || f2 ? {} : Mt(e3), !a2) return c2 ? jn(e3, An(l2, e3)) : Tn(e3, En(l2, e3));
              } else {
                if (!br[d2]) return i2 ? e3 : {};
                l2 = lr(e3, d2, a2);
              }
            }
            o2 || (o2 = new mt());
            var p2 = o2.get(e3);
            if (p2) return p2;
            o2.set(e3, l2), fr(e3) ? e3.forEach(function(s3) {
              l2.add(t3(s3, n3, r2, s3, e3, o2));
            }) : ur(e3) && e3.forEach(function(s3, i3) {
              l2.set(i3, t3(s3, n3, r2, i3, e3, o2));
            });
            var g2 = h2 ? void 0 : (u2 ? c2 ? Mn : In : c2 ? qe : wn)(e3);
            return yn(g2 || e3, function(s3, i3) {
              g2 && (s3 = e3[i3 = s3]), ge(l2, i3, t3(s3, n3, r2, i3, e3, o2));
            }), l2;
          };
          const vr = function(t3) {
            return yr(t3, 5);
          };
          const xr = function(t3) {
            return this.__data__.set(t3, "__lodash_hash_undefined__"), this;
          };
          const Nr = function(t3) {
            return this.__data__.has(t3);
          };
          function wr(t3) {
            var e3 = -1, n3 = null == t3 ? 0 : t3.length;
            for (this.__data__ = new ft(); ++e3 < n3; ) this.add(t3[e3]);
          }
          wr.prototype.add = wr.prototype.push = xr, wr.prototype.has = Nr;
          const Er = wr;
          const Ar = function(t3, e3) {
            for (var n3 = -1, r2 = null == t3 ? 0 : t3.length; ++n3 < r2; ) if (e3(t3[n3], n3, t3)) return true;
            return false;
          };
          const qr = function(t3, e3) {
            return t3.has(e3);
          };
          const kr = function(t3, e3, n3, r2, s2, i2) {
            var o2 = 1 & n3, l2 = t3.length, a2 = e3.length;
            if (l2 != a2 && !(o2 && a2 > l2)) return false;
            var c2 = i2.get(t3), u2 = i2.get(e3);
            if (c2 && u2) return c2 == e3 && u2 == t3;
            var h2 = -1, d2 = true, f2 = 2 & n3 ? new Er() : void 0;
            for (i2.set(t3, e3), i2.set(e3, t3); ++h2 < l2; ) {
              var p2 = t3[h2], g2 = e3[h2];
              if (r2) var m2 = o2 ? r2(g2, p2, h2, e3, t3, i2) : r2(p2, g2, h2, t3, e3, i2);
              if (void 0 !== m2) {
                if (m2) continue;
                d2 = false;
                break;
              }
              if (f2) {
                if (!Ar(e3, function(t4, e4) {
                  if (!qr(f2, e4) && (p2 === t4 || s2(p2, t4, n3, r2, i2))) return f2.push(e4);
                })) {
                  d2 = false;
                  break;
                }
              } else if (p2 !== g2 && !s2(p2, g2, n3, r2, i2)) {
                d2 = false;
                break;
              }
            }
            return i2.delete(t3), i2.delete(e3), d2;
          };
          const _r = function(t3) {
            var e3 = -1, n3 = Array(t3.size);
            return t3.forEach(function(t4, r2) {
              n3[++e3] = [r2, t4];
            }), n3;
          };
          const Lr = function(t3) {
            var e3 = -1, n3 = Array(t3.size);
            return t3.forEach(function(t4) {
              n3[++e3] = t4;
            }), n3;
          };
          var Or = N ? N.prototype : void 0, Tr = Or ? Or.valueOf : void 0;
          const Sr = function(t3, e3, n3, r2, s2, o2, l2) {
            switch (n3) {
              case "[object DataView]":
                if (t3.byteLength != e3.byteLength || t3.byteOffset != e3.byteOffset) return false;
                t3 = t3.buffer, e3 = e3.buffer;
              case "[object ArrayBuffer]":
                return !(t3.byteLength != e3.byteLength || !o2(new kt(t3), new kt(e3)));
              case "[object Boolean]":
              case "[object Date]":
              case "[object Number]":
                return i(+t3, +e3);
              case "[object Error]":
                return t3.name == e3.name && t3.message == e3.message;
              case "[object RegExp]":
              case "[object String]":
                return t3 == e3 + "";
              case "[object Map]":
                var a2 = _r;
              case "[object Set]":
                var c2 = 1 & r2;
                if (a2 || (a2 = Lr), t3.size != e3.size && !c2) return false;
                var u2 = l2.get(t3);
                if (u2) return u2 == e3;
                r2 |= 2, l2.set(t3, e3);
                var h2 = kr(a2(t3), a2(e3), r2, s2, o2, l2);
                return l2.delete(t3), h2;
              case "[object Symbol]":
                if (Tr) return Tr.call(t3) == Tr.call(e3);
            }
            return false;
          };
          var Cr = Object.prototype.hasOwnProperty;
          const jr = function(t3, e3, n3, r2, s2, i2) {
            var o2 = 1 & n3, l2 = In(t3), a2 = l2.length;
            if (a2 != In(e3).length && !o2) return false;
            for (var c2 = a2; c2--; ) {
              var u2 = l2[c2];
              if (!(o2 ? u2 in e3 : Cr.call(e3, u2))) return false;
            }
            var h2 = i2.get(t3), d2 = i2.get(e3);
            if (h2 && d2) return h2 == e3 && d2 == t3;
            var f2 = true;
            i2.set(t3, e3), i2.set(e3, t3);
            for (var p2 = o2; ++c2 < a2; ) {
              var g2 = t3[u2 = l2[c2]], m2 = e3[u2];
              if (r2) var b2 = o2 ? r2(m2, g2, u2, e3, t3, i2) : r2(g2, m2, u2, t3, e3, i2);
              if (!(void 0 === b2 ? g2 === m2 || s2(g2, m2, n3, r2, i2) : b2)) {
                f2 = false;
                break;
              }
              p2 || (p2 = "constructor" == u2);
            }
            if (f2 && !p2) {
              var y2 = t3.constructor, v2 = e3.constructor;
              y2 == v2 || !("constructor" in t3) || !("constructor" in e3) || "function" == typeof y2 && y2 instanceof y2 && "function" == typeof v2 && v2 instanceof v2 || (f2 = false);
            }
            return i2.delete(t3), i2.delete(e3), f2;
          };
          var Rr = "[object Arguments]", Ir = "[object Array]", Mr = "[object Object]", Br = Object.prototype.hasOwnProperty;
          const Ur = function(t3, e3, n3, r2, s2, i2) {
            var o2 = Ft(t3), l2 = Ft(e3), a2 = o2 ? Ir : Yn(t3), c2 = l2 ? Ir : Yn(e3), u2 = (a2 = a2 == Rr ? Mr : a2) == Mr, h2 = (c2 = c2 == Rr ? Mr : c2) == Mr, d2 = a2 == c2;
            if (d2 && Qt(t3)) {
              if (!Qt(e3)) return false;
              o2 = true, u2 = false;
            }
            if (d2 && !u2) return i2 || (i2 = new mt()), o2 || de(t3) ? kr(t3, e3, n3, r2, s2, i2) : Sr(t3, e3, a2, n3, r2, s2, i2);
            if (!(1 & n3)) {
              var f2 = u2 && Br.call(t3, "__wrapped__"), p2 = h2 && Br.call(e3, "__wrapped__");
              if (f2 || p2) {
                var g2 = f2 ? t3.value() : t3, m2 = p2 ? e3.value() : e3;
                return i2 || (i2 = new mt()), s2(g2, m2, n3, r2, i2);
              }
            }
            return !!d2 && (i2 || (i2 = new mt()), jr(t3, e3, n3, r2, s2, i2));
          };
          const Dr = function t3(e3, n3, r2, s2, i2) {
            return e3 === n3 || (null == e3 || null == n3 || !Bt(e3) && !Bt(n3) ? e3 != e3 && n3 != n3 : Ur(e3, n3, r2, s2, t3, i2));
          };
          const Pr = function(t3, e3) {
            return Dr(t3, e3);
          };
          class zr extends hn {
            static value() {
            }
            optimize() {
              (this.prev || this.next) && this.remove();
            }
            length() {
              return 0;
            }
            value() {
              return "";
            }
          }
          zr.blotName = "break", zr.tagName = "BR";
          const Hr = zr;
          class Fr extends mn {
          }
          function $r(t3) {
            return t3.replace(/[&<>"']/g, (t4) => ({
              "&": "&amp;",
              "<": "&lt;",
              ">": "&gt;",
              '"': "&quot;",
              "'": "&#39;"
            })[t4]);
          }
          class Vr extends on {
            static allowedChildren = [Vr, Hr, hn, Fr];
            static order = ["cursor", "inline", "link", "underline", "strike", "italic", "bold", "script", "code"];
            static compare(t3, e3) {
              const n3 = Vr.order.indexOf(t3), r2 = Vr.order.indexOf(e3);
              return n3 >= 0 || r2 >= 0 ? n3 - r2 : t3 === e3 ? 0 : t3 < e3 ? -1 : 1;
            }
            formatAt(t3, e3, n3, r2) {
              if (Vr.compare(this.statics.blotName, n3) < 0 && this.scroll.query(n3, Pe.BLOT)) {
                const s2 = this.isolate(t3, e3);
                r2 && s2.wrap(n3, r2);
              } else super.formatAt(t3, e3, n3, r2);
            }
            optimize(t3) {
              if (super.optimize(t3), this.parent instanceof Vr && Vr.compare(this.statics.blotName, this.parent.statics.blotName) > 0) {
                const t4 = this.parent.isolate(this.offset(), this.length());
                this.moveChildren(t4), t4.wrap(this);
              }
            }
          }
          const Kr = Vr;
          class Wr extends an {
            cache = {};
            delta() {
              return null == this.cache.delta && (this.cache.delta = Gr(this)), this.cache.delta;
            }
            deleteAt(t3, e3) {
              super.deleteAt(t3, e3), this.cache = {};
            }
            formatAt(t3, e3, n3, r2) {
              e3 <= 0 || (this.scroll.query(n3, Pe.BLOCK) ? t3 + e3 === this.length() && this.format(n3, r2) : super.formatAt(t3, Math.min(e3, this.length() - t3 - 1), n3, r2), this.cache = {});
            }
            insertAt(t3, e3, n3) {
              if (null != n3) return super.insertAt(t3, e3, n3), void (this.cache = {});
              if (0 === e3.length) return;
              const r2 = e3.split("\n"), s2 = r2.shift();
              s2.length > 0 && (t3 < this.length() - 1 || null == this.children.tail ? super.insertAt(Math.min(t3, this.length() - 1), s2) : this.children.tail.insertAt(this.children.tail.length(), s2), this.cache = {});
              let i2 = this;
              r2.reduce((t4, e4) => (i2 = i2.split(t4, true), i2.insertAt(0, e4), e4.length), t3 + s2.length);
            }
            insertBefore(t3, e3) {
              const {
                head: n3
              } = this.children;
              super.insertBefore(t3, e3), n3 instanceof Hr && n3.remove(), this.cache = {};
            }
            length() {
              return null == this.cache.length && (this.cache.length = super.length() + 1), this.cache.length;
            }
            moveChildren(t3, e3) {
              super.moveChildren(t3, e3), this.cache = {};
            }
            optimize(t3) {
              super.optimize(t3), this.cache = {};
            }
            path(t3) {
              return super.path(t3, true);
            }
            removeChild(t3) {
              super.removeChild(t3), this.cache = {};
            }
            split(t3) {
              let e3 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
              if (e3 && (0 === t3 || t3 >= this.length() - 1)) {
                const e4 = this.clone();
                return 0 === t3 ? (this.parent.insertBefore(e4, this), this) : (this.parent.insertBefore(e4, this.next), e4);
              }
              const n3 = super.split(t3, e3);
              return this.cache = {}, n3;
            }
          }
          Wr.blotName = "block", Wr.tagName = "P", Wr.defaultChild = Hr, Wr.allowedChildren = [Hr, Kr, hn, Fr];
          class Zr extends hn {
            attach() {
              super.attach(), this.attributes = new Ge(this.domNode);
            }
            delta() {
              return new bn().insert(this.value(), __spreadValues(__spreadValues({}, this.formats()), this.attributes.values()));
            }
            format(t3, e3) {
              const n3 = this.scroll.query(t3, Pe.BLOCK_ATTRIBUTE);
              null != n3 && this.attributes.attribute(n3, e3);
            }
            formatAt(t3, e3, n3, r2) {
              this.format(n3, r2);
            }
            insertAt(t3, e3, n3) {
              if (null != n3) return void super.insertAt(t3, e3, n3);
              const r2 = e3.split("\n"), s2 = r2.pop(), i2 = r2.map((t4) => {
                const e4 = this.scroll.create(Wr.blotName);
                return e4.insertAt(0, t4), e4;
              }), o2 = this.split(t3);
              i2.forEach((t4) => {
                this.parent.insertBefore(t4, o2);
              }), s2 && this.parent.insertBefore(this.scroll.create("text", s2), o2);
            }
          }
          function Gr(t3) {
            let e3 = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
            return t3.descendants(Je).reduce((t4, n3) => 0 === n3.length() ? t4 : t4.insert(n3.value(), Xr(n3, {}, e3)), new bn()).insert("\n", Xr(t3));
          }
          function Xr(t3) {
            let e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n3 = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
            return null == t3 ? e3 : ("formats" in t3 && "function" == typeof t3.formats && (e3 = __spreadValues(__spreadValues({}, e3), t3.formats()), n3 && delete e3["code-token"]), null == t3.parent || "scroll" === t3.parent.statics.blotName || t3.parent.statics.scope !== t3.statics.scope ? e3 : Xr(t3.parent, e3, n3));
          }
          Zr.scope = Pe.BLOCK_BLOT;
          class Qr extends hn {
            static blotName = "cursor";
            static className = "ql-cursor";
            static tagName = "span";
            static CONTENTS = "\uFEFF";
            static value() {
            }
            constructor(t3, e3, n3) {
              super(t3, e3), this.selection = n3, this.textNode = document.createTextNode(Qr.CONTENTS), this.domNode.appendChild(this.textNode), this.savedLength = 0;
            }
            detach() {
              null != this.parent && this.parent.removeChild(this);
            }
            format(t3, e3) {
              if (0 !== this.savedLength) return void super.format(t3, e3);
              let n3 = this, r2 = 0;
              for (; null != n3 && n3.statics.scope !== Pe.BLOCK_BLOT; ) r2 += n3.offset(n3.parent), n3 = n3.parent;
              null != n3 && (this.savedLength = Qr.CONTENTS.length, n3.optimize(), n3.formatAt(r2, Qr.CONTENTS.length, t3, e3), this.savedLength = 0);
            }
            index(t3, e3) {
              return t3 === this.textNode ? 0 : super.index(t3, e3);
            }
            length() {
              return this.savedLength;
            }
            position() {
              return [this.textNode, this.textNode.data.length];
            }
            remove() {
              super.remove(), this.parent = null;
            }
            restore() {
              if (this.selection.composing || null == this.parent) return null;
              const t3 = this.selection.getNativeRange();
              for (; null != this.domNode.lastChild && this.domNode.lastChild !== this.textNode; ) this.domNode.parentNode.insertBefore(this.domNode.lastChild, this.domNode);
              const e3 = this.prev instanceof Fr ? this.prev : null, n3 = e3 ? e3.length() : 0, r2 = this.next instanceof Fr ? this.next : null, s2 = r2 ? r2.text : "", {
                textNode: i2
              } = this, o2 = i2.data.split(Qr.CONTENTS).join("");
              let l2;
              if (i2.data = Qr.CONTENTS, e3) l2 = e3, (o2 || r2) && (e3.insertAt(e3.length(), o2 + s2), r2 && r2.remove());
              else if (r2) l2 = r2, r2.insertAt(0, o2);
              else {
                const t4 = document.createTextNode(o2);
                l2 = this.scroll.create(t4), this.parent.insertBefore(l2, this);
              }
              if (this.remove(), t3) {
                const s3 = (t4, s4) => e3 && t4 === e3.domNode ? s4 : t4 === i2 ? n3 + s4 - 1 : r2 && t4 === r2.domNode ? n3 + o2.length + s4 : null, a2 = s3(t3.start.node, t3.start.offset), c2 = s3(t3.end.node, t3.end.offset);
                if (null !== a2 && null !== c2) return {
                  startNode: l2.domNode,
                  startOffset: a2,
                  endNode: l2.domNode,
                  endOffset: c2
                };
              }
              return null;
            }
            update(t3, e3) {
              if (t3.some((t4) => "characterData" === t4.type && t4.target === this.textNode)) {
                const t4 = this.restore();
                t4 && (e3.range = t4);
              }
            }
            optimize(t3) {
              super.optimize(t3);
              let {
                parent: e3
              } = this;
              for (; e3; ) {
                if ("A" === e3.domNode.tagName) {
                  this.savedLength = Qr.CONTENTS.length, e3.isolate(this.offset(e3), this.length()).unwrap(), this.savedLength = 0;
                  break;
                }
                e3 = e3.parent;
              }
            }
            value() {
              return "";
            }
          }
          const Yr = Qr;
          var Jr = n2(228);
          const ts = /* @__PURE__ */ new WeakMap(), es = ["error", "warn", "log", "info"];
          let ns = "warn";
          function rs(t3) {
            if (ns && es.indexOf(t3) <= es.indexOf(ns)) {
              for (var e3 = arguments.length, n3 = new Array(e3 > 1 ? e3 - 1 : 0), r2 = 1; r2 < e3; r2++) n3[r2 - 1] = arguments[r2];
              console[t3](...n3);
            }
          }
          function ss(t3) {
            return es.reduce((e3, n3) => (e3[n3] = rs.bind(console, n3, t3), e3), {});
          }
          ss.level = (t3) => {
            ns = t3;
          }, rs.level = ss.level;
          const is = ss, os = is("quill:events");
          ["selectionchange", "mousedown", "mouseup", "click"].forEach((t3) => {
            document.addEventListener(t3, function() {
              for (var t4 = arguments.length, e3 = new Array(t4), n3 = 0; n3 < t4; n3++) e3[n3] = arguments[n3];
              Array.from(document.querySelectorAll(".ql-container")).forEach((t5) => {
                const n4 = ts.get(t5);
                n4 && n4.emitter && n4.emitter.handleDOM(...e3);
              });
            });
          });
          const ls = class extends Jr {
            static events = {
              EDITOR_CHANGE: "editor-change",
              SCROLL_BEFORE_UPDATE: "scroll-before-update",
              SCROLL_BLOT_MOUNT: "scroll-blot-mount",
              SCROLL_BLOT_UNMOUNT: "scroll-blot-unmount",
              SCROLL_OPTIMIZE: "scroll-optimize",
              SCROLL_UPDATE: "scroll-update",
              SCROLL_EMBED_UPDATE: "scroll-embed-update",
              SELECTION_CHANGE: "selection-change",
              TEXT_CHANGE: "text-change",
              COMPOSITION_BEFORE_START: "composition-before-start",
              COMPOSITION_START: "composition-start",
              COMPOSITION_BEFORE_END: "composition-before-end",
              COMPOSITION_END: "composition-end"
            };
            static sources = {
              API: "api",
              SILENT: "silent",
              USER: "user"
            };
            constructor() {
              super(), this.domListeners = {}, this.on("error", os.error);
            }
            emit() {
              for (var t3 = arguments.length, e3 = new Array(t3), n3 = 0; n3 < t3; n3++) e3[n3] = arguments[n3];
              return os.log.call(os, ...e3), super.emit(...e3);
            }
            handleDOM(t3) {
              for (var e3 = arguments.length, n3 = new Array(e3 > 1 ? e3 - 1 : 0), r2 = 1; r2 < e3; r2++) n3[r2 - 1] = arguments[r2];
              (this.domListeners[t3.type] || []).forEach((e4) => {
                let {
                  node: r3,
                  handler: s2
                } = e4;
                (t3.target === r3 || r3.contains(t3.target)) && s2(t3, ...n3);
              });
            }
            listenDOM(t3, e3, n3) {
              this.domListeners[t3] || (this.domListeners[t3] = []), this.domListeners[t3].push({
                node: e3,
                handler: n3
              });
            }
          }, as = is("quill:selection");
          class cs {
            constructor(t3) {
              let e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
              this.index = t3, this.length = e3;
            }
          }
          function us(t3, e3) {
            try {
              e3.parentNode;
            } catch (t4) {
              return false;
            }
            return t3.contains(e3);
          }
          const hs = class {
            constructor(t3, e3) {
              this.emitter = e3, this.scroll = t3, this.composing = false, this.mouseDown = false, this.root = this.scroll.domNode, this.cursor = this.scroll.create("cursor", this), this.savedRange = new cs(0, 0), this.lastRange = this.savedRange, this.lastNative = null, this.handleComposition(), this.handleDragging(), this.emitter.listenDOM("selectionchange", document, () => {
                this.mouseDown || this.composing || setTimeout(this.update.bind(this, ls.sources.USER), 1);
              }), this.emitter.on(ls.events.SCROLL_BEFORE_UPDATE, () => {
                if (!this.hasFocus()) return;
                const t4 = this.getNativeRange();
                null != t4 && t4.start.node !== this.cursor.textNode && this.emitter.once(ls.events.SCROLL_UPDATE, (e4, n3) => {
                  try {
                    this.root.contains(t4.start.node) && this.root.contains(t4.end.node) && this.setNativeRange(t4.start.node, t4.start.offset, t4.end.node, t4.end.offset);
                    const r2 = n3.some((t5) => "characterData" === t5.type || "childList" === t5.type || "attributes" === t5.type && t5.target === this.root);
                    this.update(r2 ? ls.sources.SILENT : e4);
                  } catch (t5) {
                  }
                });
              }), this.emitter.on(ls.events.SCROLL_OPTIMIZE, (t4, e4) => {
                if (e4.range) {
                  const {
                    startNode: t5,
                    startOffset: n3,
                    endNode: r2,
                    endOffset: s2
                  } = e4.range;
                  this.setNativeRange(t5, n3, r2, s2), this.update(ls.sources.SILENT);
                }
              }), this.update(ls.sources.SILENT);
            }
            handleComposition() {
              this.emitter.on(ls.events.COMPOSITION_BEFORE_START, () => {
                this.composing = true;
              }), this.emitter.on(ls.events.COMPOSITION_END, () => {
                if (this.composing = false, this.cursor.parent) {
                  const t3 = this.cursor.restore();
                  if (!t3) return;
                  setTimeout(() => {
                    this.setNativeRange(t3.startNode, t3.startOffset, t3.endNode, t3.endOffset);
                  }, 1);
                }
              });
            }
            handleDragging() {
              this.emitter.listenDOM("mousedown", document.body, () => {
                this.mouseDown = true;
              }), this.emitter.listenDOM("mouseup", document.body, () => {
                this.mouseDown = false, this.update(ls.sources.USER);
              });
            }
            focus() {
              this.hasFocus() || (this.root.focus({
                preventScroll: true
              }), this.setRange(this.savedRange));
            }
            format(t3, e3) {
              this.scroll.update();
              const n3 = this.getNativeRange();
              if (null != n3 && n3.native.collapsed && !this.scroll.query(t3, Pe.BLOCK)) {
                if (n3.start.node !== this.cursor.textNode) {
                  const t4 = this.scroll.find(n3.start.node, false);
                  if (null == t4) return;
                  if (t4 instanceof Je) {
                    const e4 = t4.split(n3.start.offset);
                    t4.parent.insertBefore(this.cursor, e4);
                  } else t4.insertBefore(this.cursor, n3.start.node);
                  this.cursor.attach();
                }
                this.cursor.format(t3, e3), this.scroll.optimize(), this.setNativeRange(this.cursor.textNode, this.cursor.textNode.data.length), this.update();
              }
            }
            getBounds(t3) {
              let e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
              const n3 = this.scroll.length();
              let r2;
              t3 = Math.min(t3, n3 - 1), e3 = Math.min(t3 + e3, n3 - 1) - t3;
              let [s2, i2] = this.scroll.leaf(t3);
              if (null == s2) return null;
              if (e3 > 0 && i2 === s2.length()) {
                const [e4] = this.scroll.leaf(t3 + 1);
                if (e4) {
                  const [n4] = this.scroll.line(t3), [r3] = this.scroll.line(t3 + 1);
                  n4 === r3 && (s2 = e4, i2 = 0);
                }
              }
              [r2, i2] = s2.position(i2, true);
              const o2 = document.createRange();
              if (e3 > 0) return o2.setStart(r2, i2), [s2, i2] = this.scroll.leaf(t3 + e3), null == s2 ? null : ([r2, i2] = s2.position(i2, true), o2.setEnd(r2, i2), o2.getBoundingClientRect());
              let l2, a2 = "left";
              if (r2 instanceof Text) {
                if (!r2.data.length) return null;
                i2 < r2.data.length ? (o2.setStart(r2, i2), o2.setEnd(r2, i2 + 1)) : (o2.setStart(r2, i2 - 1), o2.setEnd(r2, i2), a2 = "right"), l2 = o2.getBoundingClientRect();
              } else {
                if (!(s2.domNode instanceof Element)) return null;
                l2 = s2.domNode.getBoundingClientRect(), i2 > 0 && (a2 = "right");
              }
              return {
                bottom: l2.top + l2.height,
                height: l2.height,
                left: l2[a2],
                right: l2[a2],
                top: l2.top,
                width: 0
              };
            }
            getNativeRange() {
              const t3 = document.getSelection();
              if (null == t3 || t3.rangeCount <= 0) return null;
              const e3 = t3.getRangeAt(0);
              if (null == e3) return null;
              const n3 = this.normalizeNative(e3);
              return as.info("getNativeRange", n3), n3;
            }
            getRange() {
              const t3 = this.scroll.domNode;
              if ("isConnected" in t3 && !t3.isConnected) return [null, null];
              const e3 = this.getNativeRange();
              if (null == e3) return [null, null];
              return [this.normalizedToRange(e3), e3];
            }
            hasFocus() {
              return document.activeElement === this.root || null != document.activeElement && us(this.root, document.activeElement);
            }
            normalizedToRange(t3) {
              const e3 = [[t3.start.node, t3.start.offset]];
              t3.native.collapsed || e3.push([t3.end.node, t3.end.offset]);
              const n3 = e3.map((t4) => {
                const [e4, n4] = t4, r3 = this.scroll.find(e4, true), s3 = r3.offset(this.scroll);
                return 0 === n4 ? s3 : r3 instanceof Je ? s3 + r3.index(e4, n4) : s3 + r3.length();
              }), r2 = Math.min(Math.max(...n3), this.scroll.length() - 1), s2 = Math.min(r2, ...n3);
              return new cs(s2, r2 - s2);
            }
            normalizeNative(t3) {
              if (!us(this.root, t3.startContainer) || !t3.collapsed && !us(this.root, t3.endContainer)) return null;
              const e3 = {
                start: {
                  node: t3.startContainer,
                  offset: t3.startOffset
                },
                end: {
                  node: t3.endContainer,
                  offset: t3.endOffset
                },
                native: t3
              };
              return [e3.start, e3.end].forEach((t4) => {
                let {
                  node: e4,
                  offset: n3
                } = t4;
                for (; !(e4 instanceof Text) && e4.childNodes.length > 0; ) if (e4.childNodes.length > n3) e4 = e4.childNodes[n3], n3 = 0;
                else {
                  if (e4.childNodes.length !== n3) break;
                  e4 = e4.lastChild, n3 = e4 instanceof Text ? e4.data.length : e4.childNodes.length > 0 ? e4.childNodes.length : e4.childNodes.length + 1;
                }
                t4.node = e4, t4.offset = n3;
              }), e3;
            }
            rangeToNative(t3) {
              const e3 = this.scroll.length(), n3 = (t4, n4) => {
                t4 = Math.min(e3 - 1, t4);
                const [r2, s2] = this.scroll.leaf(t4);
                return r2 ? r2.position(s2, n4) : [null, -1];
              };
              return [...n3(t3.index, false), ...n3(t3.index + t3.length, true)];
            }
            setNativeRange(t3, e3) {
              let n3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : t3, r2 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : e3, s2 = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
              if (as.info("setNativeRange", t3, e3, n3, r2), null != t3 && (null == this.root.parentNode || null == t3.parentNode || null == n3.parentNode)) return;
              const i2 = document.getSelection();
              if (null != i2) if (null != t3) {
                this.hasFocus() || this.root.focus({
                  preventScroll: true
                });
                const {
                  native: o2
                } = this.getNativeRange() || {};
                if (null == o2 || s2 || t3 !== o2.startContainer || e3 !== o2.startOffset || n3 !== o2.endContainer || r2 !== o2.endOffset) {
                  t3 instanceof Element && "BR" === t3.tagName && (e3 = Array.from(t3.parentNode.childNodes).indexOf(t3), t3 = t3.parentNode), n3 instanceof Element && "BR" === n3.tagName && (r2 = Array.from(n3.parentNode.childNodes).indexOf(n3), n3 = n3.parentNode);
                  const s3 = document.createRange();
                  s3.setStart(t3, e3), s3.setEnd(n3, r2), i2.removeAllRanges(), i2.addRange(s3);
                }
              } else i2.removeAllRanges(), this.root.blur();
            }
            setRange(t3) {
              let e3 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], n3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : ls.sources.API;
              if ("string" == typeof e3 && (n3 = e3, e3 = false), as.info("setRange", t3), null != t3) {
                const n4 = this.rangeToNative(t3);
                this.setNativeRange(...n4, e3);
              } else this.setNativeRange(null);
              this.update(n3);
            }
            update() {
              let t3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ls.sources.USER;
              const e3 = this.lastRange, [n3, r2] = this.getRange();
              if (this.lastRange = n3, this.lastNative = r2, null != this.lastRange && (this.savedRange = this.lastRange), !Pr(e3, this.lastRange)) {
                if (!this.composing && null != r2 && r2.native.collapsed && r2.start.node !== this.cursor.textNode) {
                  const t4 = this.cursor.restore();
                  t4 && this.setNativeRange(t4.startNode, t4.startOffset, t4.endNode, t4.endOffset);
                }
                const n4 = [ls.events.SELECTION_CHANGE, vr(this.lastRange), vr(e3), t3];
                this.emitter.emit(ls.events.EDITOR_CHANGE, ...n4), t3 !== ls.sources.SILENT && this.emitter.emit(...n4);
              }
            }
          }, ds = /^[ -~]*$/;
          function fs(t3, e3, n3) {
            if (0 === t3.length) {
              const [t4] = ms(n3.pop());
              return e3 <= 0 ? `</li></${t4}>` : `</li></${t4}>${fs([], e3 - 1, n3)}`;
            }
            const [{
              child: r2,
              offset: s2,
              length: i2,
              indent: o2,
              type: l2
            }, ...a2] = t3, [c2, u2] = ms(l2);
            if (o2 > e3) return n3.push(l2), o2 === e3 + 1 ? `<${c2}><li${u2}>${ps(r2, s2, i2)}${fs(a2, o2, n3)}` : `<${c2}><li>${fs(t3, e3 + 1, n3)}`;
            const h2 = n3[n3.length - 1];
            if (o2 === e3 && l2 === h2) return `</li><li${u2}>${ps(r2, s2, i2)}${fs(a2, o2, n3)}`;
            const [d2] = ms(n3.pop());
            return `</li></${d2}>${fs(t3, e3 - 1, n3)}`;
          }
          function ps(t3, e3, n3) {
            let r2 = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
            if ("html" in t3 && "function" == typeof t3.html) return t3.html(e3, n3);
            if (t3 instanceof Fr) return $r(t3.value().slice(e3, e3 + n3));
            if (t3 instanceof rn) {
              if ("list-container" === t3.statics.blotName) {
                const r3 = [];
                return t3.children.forEachAt(e3, n3, (t4, e4, n4) => {
                  const s3 = "formats" in t4 && "function" == typeof t4.formats ? t4.formats() : {};
                  r3.push({
                    child: t4,
                    offset: e4,
                    length: n4,
                    indent: s3.indent || 0,
                    type: s3.list
                  });
                }), fs(r3, -1, []);
              }
              const s2 = [];
              if (t3.children.forEachAt(e3, n3, (t4, e4, n4) => {
                s2.push(ps(t4, e4, n4));
              }), r2 || "list" === t3.statics.blotName) return s2.join("");
              const {
                outerHTML: i2,
                innerHTML: o2
              } = t3.domNode, [l2, a2] = i2.split(`>${o2}<`);
              return "<table" === l2 ? `<table style="border: 1px solid #000;">${s2.join("")}<${a2}` : `${l2}>${s2.join("")}<${a2}`;
            }
            return t3.domNode instanceof Element ? t3.domNode.outerHTML : "";
          }
          function gs(t3, e3) {
            return Object.keys(e3).reduce((n3, r2) => {
              if (null == t3[r2]) return n3;
              const s2 = e3[r2];
              return s2 === t3[r2] ? n3[r2] = s2 : Array.isArray(s2) ? s2.indexOf(t3[r2]) < 0 ? n3[r2] = s2.concat([t3[r2]]) : n3[r2] = s2 : n3[r2] = [s2, t3[r2]], n3;
            }, {});
          }
          function ms(t3) {
            const e3 = "ordered" === t3 ? "ol" : "ul";
            switch (t3) {
              case "checked":
                return [e3, ' data-list="checked"'];
              case "unchecked":
                return [e3, ' data-list="unchecked"'];
              default:
                return [e3, ""];
            }
          }
          function bs(t3) {
            return t3.reduce((t4, e3) => {
              if ("string" == typeof e3.insert) {
                const n3 = e3.insert.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
                return t4.insert(n3, e3.attributes);
              }
              return t4.push(e3);
            }, new bn());
          }
          function ys(t3, e3) {
            let {
              index: n3,
              length: r2
            } = t3;
            return new cs(n3 + e3, r2);
          }
          const vs = class {
            constructor(t3) {
              this.scroll = t3, this.delta = this.getDelta();
            }
            applyDelta(t3) {
              this.scroll.update();
              let e3 = this.scroll.length();
              this.scroll.batchStart();
              const n3 = bs(t3), r2 = new bn();
              return function(t4) {
                const e4 = [];
                return t4.forEach((t5) => {
                  if ("string" == typeof t5.insert) {
                    t5.insert.split("\n").forEach((n4, r3) => {
                      r3 && e4.push({
                        insert: "\n",
                        attributes: t5.attributes
                      }), n4 && e4.push({
                        insert: n4,
                        attributes: t5.attributes
                      });
                    });
                  } else e4.push(t5);
                }), e4;
              }(n3.ops.slice()).reduce((t4, n4) => {
                const s2 = bn.Op.length(n4);
                let i2 = n4.attributes || {}, o2 = false, l2 = false;
                if (null != n4.insert) {
                  if (r2.retain(s2), "string" == typeof n4.insert) {
                    const r3 = n4.insert;
                    l2 = !r3.endsWith("\n") && (e3 <= t4 || !!this.scroll.descendant(Zr, t4)[0]), this.scroll.insertAt(t4, r3);
                    const [s3, o3] = this.scroll.line(t4);
                    let a3 = De({}, Xr(s3));
                    if (s3 instanceof Wr) {
                      const [t5] = s3.descendant(Je, o3);
                      t5 && (a3 = De(a3, Xr(t5)));
                    }
                    i2 = bn.AttributeMap.diff(a3, i2) || {};
                  } else if ("object" == typeof n4.insert) {
                    const r3 = Object.keys(n4.insert)[0];
                    if (null == r3) return t4;
                    const s3 = null != this.scroll.query(r3, Pe.INLINE);
                    if (s3) (e3 <= t4 || this.scroll.descendant(Zr, t4)[0]) && (l2 = true);
                    else if (t4 > 0) {
                      const [e4, n5] = this.scroll.descendant(Je, t4 - 1);
                      if (e4 instanceof Fr) {
                        "\n" !== e4.value()[n5] && (o2 = true);
                      } else e4 instanceof hn && e4.statics.scope === Pe.INLINE_BLOT && (o2 = true);
                    }
                    if (this.scroll.insertAt(t4, r3, n4.insert[r3]), s3) {
                      const [e4] = this.scroll.descendant(Je, t4);
                      if (e4) {
                        const t5 = De({}, Xr(e4));
                        i2 = bn.AttributeMap.diff(t5, i2) || {};
                      }
                    }
                  }
                  e3 += s2;
                } else if (r2.push(n4), null !== n4.retain && "object" == typeof n4.retain) {
                  const e4 = Object.keys(n4.retain)[0];
                  if (null == e4) return t4;
                  this.scroll.updateEmbedAt(t4, e4, n4.retain[e4]);
                }
                Object.keys(i2).forEach((e4) => {
                  this.scroll.formatAt(t4, s2, e4, i2[e4]);
                });
                const a2 = o2 ? 1 : 0, c2 = l2 ? 1 : 0;
                return e3 += a2 + c2, r2.retain(a2), r2.delete(c2), t4 + s2 + a2 + c2;
              }, 0), r2.reduce((t4, e4) => "number" == typeof e4.delete ? (this.scroll.deleteAt(t4, e4.delete), t4) : t4 + bn.Op.length(e4), 0), this.scroll.batchEnd(), this.scroll.optimize(), this.update(n3);
            }
            deleteText(t3, e3) {
              return this.scroll.deleteAt(t3, e3), this.update(new bn().retain(t3).delete(e3));
            }
            formatLine(t3, e3) {
              let n3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
              this.scroll.update(), Object.keys(n3).forEach((r3) => {
                this.scroll.lines(t3, Math.max(e3, 1)).forEach((t4) => {
                  t4.format(r3, n3[r3]);
                });
              }), this.scroll.optimize();
              const r2 = new bn().retain(t3).retain(e3, vr(n3));
              return this.update(r2);
            }
            formatText(t3, e3) {
              let n3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
              Object.keys(n3).forEach((r3) => {
                this.scroll.formatAt(t3, e3, r3, n3[r3]);
              });
              const r2 = new bn().retain(t3).retain(e3, vr(n3));
              return this.update(r2);
            }
            getContents(t3, e3) {
              return this.delta.slice(t3, t3 + e3);
            }
            getDelta() {
              return this.scroll.lines().reduce((t3, e3) => t3.concat(e3.delta()), new bn());
            }
            getFormat(t3) {
              let e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, n3 = [], r2 = [];
              0 === e3 ? this.scroll.path(t3).forEach((t4) => {
                const [e4] = t4;
                e4 instanceof Wr ? n3.push(e4) : e4 instanceof Je && r2.push(e4);
              }) : (n3 = this.scroll.lines(t3, e3), r2 = this.scroll.descendants(Je, t3, e3));
              const [s2, i2] = [n3, r2].map((t4) => {
                const e4 = t4.shift();
                if (null == e4) return {};
                let n4 = Xr(e4);
                for (; Object.keys(n4).length > 0; ) {
                  const e5 = t4.shift();
                  if (null == e5) return n4;
                  n4 = gs(Xr(e5), n4);
                }
                return n4;
              });
              return __spreadValues(__spreadValues({}, s2), i2);
            }
            getHTML(t3, e3) {
              const [n3, r2] = this.scroll.line(t3);
              if (n3) {
                const s2 = n3.length();
                return !(n3.length() >= r2 + e3) || 0 === r2 && e3 === s2 ? ps(this.scroll, t3, e3, true) : ps(n3, r2, e3, true);
              }
              return "";
            }
            getText(t3, e3) {
              return this.getContents(t3, e3).filter((t4) => "string" == typeof t4.insert).map((t4) => t4.insert).join("");
            }
            insertContents(t3, e3) {
              const n3 = bs(e3), r2 = new bn().retain(t3).concat(n3);
              return this.scroll.insertContents(t3, n3), this.update(r2);
            }
            insertEmbed(t3, e3, n3) {
              return this.scroll.insertAt(t3, e3, n3), this.update(new bn().retain(t3).insert({
                [e3]: n3
              }));
            }
            insertText(t3, e3) {
              let n3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
              return e3 = e3.replace(/\r\n/g, "\n").replace(/\r/g, "\n"), this.scroll.insertAt(t3, e3), Object.keys(n3).forEach((r2) => {
                this.scroll.formatAt(t3, e3.length, r2, n3[r2]);
              }), this.update(new bn().retain(t3).insert(e3, vr(n3)));
            }
            isBlank() {
              if (0 === this.scroll.children.length) return true;
              if (this.scroll.children.length > 1) return false;
              const t3 = this.scroll.children.head;
              if (t3?.statics.blotName !== Wr.blotName) return false;
              const e3 = t3;
              return !(e3.children.length > 1) && e3.children.head instanceof Hr;
            }
            removeFormat(t3, e3) {
              const n3 = this.getText(t3, e3), [r2, s2] = this.scroll.line(t3 + e3);
              let i2 = 0, o2 = new bn();
              null != r2 && (i2 = r2.length() - s2, o2 = r2.delta().slice(s2, s2 + i2 - 1).insert("\n"));
              const l2 = this.getContents(t3, e3 + i2).diff(new bn().insert(n3).concat(o2)), a2 = new bn().retain(t3).concat(l2);
              return this.applyDelta(a2);
            }
            update(t3) {
              let e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [], n3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0;
              const r2 = this.delta;
              if (1 === e3.length && "characterData" === e3[0].type && e3[0].target.data.match(ds) && this.scroll.find(e3[0].target)) {
                const s2 = this.scroll.find(e3[0].target), i2 = Xr(s2), o2 = s2.offset(this.scroll), l2 = e3[0].oldValue.replace(Yr.CONTENTS, ""), a2 = new bn().insert(l2), c2 = new bn().insert(s2.value()), u2 = n3 && {
                  oldRange: ys(n3.oldRange, -o2),
                  newRange: ys(n3.newRange, -o2)
                };
                t3 = new bn().retain(o2).concat(a2.diff(c2, u2)).reduce((t4, e4) => e4.insert ? t4.insert(e4.insert, i2) : t4.push(e4), new bn()), this.delta = r2.compose(t3);
              } else this.delta = this.getDelta(), t3 && Pr(r2.compose(t3), this.delta) || (t3 = r2.diff(this.delta, n3));
              return t3;
            }
          };
          const xs = class {
            static DEFAULTS = {};
            constructor(t3) {
              let e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
              this.quill = t3, this.options = e3;
            }
          }, Ns = "\uFEFF";
          const ws = class extends hn {
            constructor(t3, e3) {
              super(t3, e3), this.contentNode = document.createElement("span"), this.contentNode.setAttribute("contenteditable", "false"), Array.from(this.domNode.childNodes).forEach((t4) => {
                this.contentNode.appendChild(t4);
              }), this.leftGuard = document.createTextNode(Ns), this.rightGuard = document.createTextNode(Ns), this.domNode.appendChild(this.leftGuard), this.domNode.appendChild(this.contentNode), this.domNode.appendChild(this.rightGuard);
            }
            index(t3, e3) {
              return t3 === this.leftGuard ? 0 : t3 === this.rightGuard ? 1 : super.index(t3, e3);
            }
            restore(t3) {
              let e3, n3 = null;
              const r2 = t3.data.split(Ns).join("");
              if (t3 === this.leftGuard) {
                if (this.prev instanceof Fr) {
                  const t4 = this.prev.length();
                  this.prev.insertAt(t4, r2), n3 = {
                    startNode: this.prev.domNode,
                    startOffset: t4 + r2.length
                  };
                } else e3 = document.createTextNode(r2), this.parent.insertBefore(this.scroll.create(e3), this), n3 = {
                  startNode: e3,
                  startOffset: r2.length
                };
              } else t3 === this.rightGuard && (this.next instanceof Fr ? (this.next.insertAt(0, r2), n3 = {
                startNode: this.next.domNode,
                startOffset: r2.length
              }) : (e3 = document.createTextNode(r2), this.parent.insertBefore(this.scroll.create(e3), this.next), n3 = {
                startNode: e3,
                startOffset: r2.length
              }));
              return t3.data = Ns, n3;
            }
            update(t3, e3) {
              t3.forEach((t4) => {
                if ("characterData" === t4.type && (t4.target === this.leftGuard || t4.target === this.rightGuard)) {
                  const n3 = this.restore(t4.target);
                  n3 && (e3.range = n3);
                }
              });
            }
          };
          const Es = class {
            isComposing = false;
            constructor(t3, e3) {
              this.scroll = t3, this.emitter = e3, this.setupListeners();
            }
            setupListeners() {
              this.scroll.domNode.addEventListener("compositionstart", (t3) => {
                this.isComposing || this.handleCompositionStart(t3);
              }), this.scroll.domNode.addEventListener("compositionend", (t3) => {
                this.isComposing && queueMicrotask(() => {
                  this.handleCompositionEnd(t3);
                });
              });
            }
            handleCompositionStart(t3) {
              const e3 = t3.target instanceof Node ? this.scroll.find(t3.target, true) : null;
              !e3 || e3 instanceof ws || (this.emitter.emit(ls.events.COMPOSITION_BEFORE_START, t3), this.scroll.batchStart(), this.emitter.emit(ls.events.COMPOSITION_START, t3), this.isComposing = true);
            }
            handleCompositionEnd(t3) {
              this.emitter.emit(ls.events.COMPOSITION_BEFORE_END, t3), this.scroll.batchEnd(), this.emitter.emit(ls.events.COMPOSITION_END, t3), this.isComposing = false;
            }
          };
          class As {
            static DEFAULTS = {
              modules: {}
            };
            static themes = {
              default: As
            };
            modules = {};
            constructor(t3, e3) {
              this.quill = t3, this.options = e3;
            }
            init() {
              Object.keys(this.options.modules).forEach((t3) => {
                null == this.modules[t3] && this.addModule(t3);
              });
            }
            addModule(t3) {
              const e3 = this.quill.constructor.import(`modules/${t3}`);
              return this.modules[t3] = new e3(this.quill, this.options.modules[t3] || {}), this.modules[t3];
            }
          }
          const qs = As, ks = (t3) => {
            const e3 = t3.getBoundingClientRect(), n3 = "offsetWidth" in t3 && Math.abs(e3.width) / t3.offsetWidth || 1, r2 = "offsetHeight" in t3 && Math.abs(e3.height) / t3.offsetHeight || 1;
            return {
              top: e3.top,
              right: e3.left + t3.clientWidth * n3,
              bottom: e3.top + t3.clientHeight * r2,
              left: e3.left
            };
          }, _s = (t3) => {
            const e3 = parseInt(t3, 10);
            return Number.isNaN(e3) ? 0 : e3;
          }, Ls = (t3, e3, n3, r2, s2, i2) => t3 < n3 && e3 > r2 ? 0 : t3 < n3 ? -(n3 - t3 + s2) : e3 > r2 ? e3 - t3 > r2 - n3 ? t3 + s2 - n3 : e3 - r2 + i2 : 0, Os = (t3, e3) => {
            const n3 = t3.ownerDocument;
            let r2 = e3, s2 = t3;
            for (; s2; ) {
              const t4 = s2 === n3.body, e4 = t4 ? {
                top: 0,
                right: window.visualViewport?.width ?? n3.documentElement.clientWidth,
                bottom: window.visualViewport?.height ?? n3.documentElement.clientHeight,
                left: 0
              } : ks(s2), o2 = getComputedStyle(s2), l2 = Ls(r2.left, r2.right, e4.left, e4.right, _s(o2.scrollPaddingLeft), _s(o2.scrollPaddingRight)), a2 = Ls(r2.top, r2.bottom, e4.top, e4.bottom, _s(o2.scrollPaddingTop), _s(o2.scrollPaddingBottom));
              if (l2 || a2) if (t4) n3.defaultView?.scrollBy(l2, a2);
              else {
                const {
                  scrollLeft: t5,
                  scrollTop: e5
                } = s2;
                a2 && (s2.scrollTop += a2), l2 && (s2.scrollLeft += l2);
                const n4 = s2.scrollLeft - t5, i3 = s2.scrollTop - e5;
                r2 = {
                  left: r2.left - n4,
                  top: r2.top - i3,
                  right: r2.right - n4,
                  bottom: r2.bottom - i3
                };
              }
              s2 = t4 || "fixed" === o2.position ? null : (i2 = s2).parentElement || i2.getRootNode().host || null;
            }
            var i2;
          }, Ts = ["block", "break", "cursor", "inline", "scroll", "text"], Ss = (t3, e3, n3) => {
            const r2 = new $e();
            return Ts.forEach((t4) => {
              const n4 = e3.query(t4);
              n4 && r2.register(n4);
            }), t3.forEach((t4) => {
              let s2 = e3.query(t4);
              s2 || n3.error(`Cannot register "${t4}" specified in "formats" config. Are you sure it was registered?`);
              let i2 = 0;
              for (; s2; ) if (r2.register(s2), s2 = "blotName" in s2 ? s2.requiredContainer ?? null : null, i2 += 1, i2 > 100) {
                n3.error(`Cycle detected in registering blot requiredContainer: "${t4}"`);
                break;
              }
            }), r2;
          }, Cs = is("quill"), js = new $e();
          rn.uiClass = "ql-ui";
          class Rs {
            static DEFAULTS = {
              bounds: null,
              modules: {
                clipboard: true,
                keyboard: true,
                history: true,
                uploader: true
              },
              placeholder: "",
              readOnly: false,
              registry: js,
              theme: "default"
            };
            static events = ls.events;
            static sources = ls.sources;
            static version = "2.0.2";
            static imports = {
              delta: bn,
              parchment: r,
              "core/module": xs,
              "core/theme": qs
            };
            static debug(t3) {
              true === t3 && (t3 = "log"), is.level(t3);
            }
            static find(t3) {
              let e3 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
              return ts.get(t3) || js.find(t3, e3);
            }
            static import(t3) {
              return null == this.imports[t3] && Cs.error(`Cannot import ${t3}. Are you sure it was registered?`), this.imports[t3];
            }
            static register() {
              if ("string" != typeof (arguments.length <= 0 ? void 0 : arguments[0])) {
                const t3 = arguments.length <= 0 ? void 0 : arguments[0], e3 = !!(arguments.length <= 1 ? void 0 : arguments[1]), n3 = "attrName" in t3 ? t3.attrName : t3.blotName;
                "string" == typeof n3 ? this.register(`formats/${n3}`, t3, e3) : Object.keys(t3).forEach((n4) => {
                  this.register(n4, t3[n4], e3);
                });
              } else {
                const t3 = arguments.length <= 0 ? void 0 : arguments[0], e3 = arguments.length <= 1 ? void 0 : arguments[1], n3 = !!(arguments.length <= 2 ? void 0 : arguments[2]);
                null == this.imports[t3] || n3 || Cs.warn(`Overwriting ${t3} with`, e3), this.imports[t3] = e3, (t3.startsWith("blots/") || t3.startsWith("formats/")) && e3 && "boolean" != typeof e3 && "abstract" !== e3.blotName && js.register(e3), "function" == typeof e3.register && e3.register(js);
              }
            }
            constructor(t3) {
              let e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
              if (this.options = function(t4, e4) {
                const n4 = Is(t4);
                if (!n4) throw new Error("Invalid Quill container");
                const r3 = !e4.theme || e4.theme === Rs.DEFAULTS.theme, s3 = r3 ? qs : Rs.import(`themes/${e4.theme}`);
                if (!s3) throw new Error(`Invalid theme ${e4.theme}. Did you register it?`);
                const _a = Rs.DEFAULTS, {
                  modules: i2
                } = _a, o2 = __objRest(_a, [
                  "modules"
                ]), _b = s3.DEFAULTS, {
                  modules: l2
                } = _b, a2 = __objRest(_b, [
                  "modules"
                ]);
                let c2 = Ms(e4.modules);
                null != c2 && c2.toolbar && c2.toolbar.constructor !== Object && (c2 = __spreadProps(__spreadValues({}, c2), {
                  toolbar: {
                    container: c2.toolbar
                  }
                }));
                const u2 = De({}, Ms(i2), Ms(l2), c2), h2 = __spreadValues(__spreadValues(__spreadValues({}, o2), Bs(a2)), Bs(e4));
                let d2 = e4.registry;
                d2 ? e4.formats && Cs.warn('Ignoring "formats" option because "registry" is specified') : d2 = e4.formats ? Ss(e4.formats, h2.registry, Cs) : h2.registry;
                return __spreadProps(__spreadValues({}, h2), {
                  registry: d2,
                  container: n4,
                  theme: s3,
                  modules: Object.entries(u2).reduce((t5, e5) => {
                    let [n5, r4] = e5;
                    if (!r4) return t5;
                    const s4 = Rs.import(`modules/${n5}`);
                    return null == s4 ? (Cs.error(`Cannot load ${n5} module. Are you sure you registered it?`), t5) : __spreadProps(__spreadValues({}, t5), {
                      [n5]: De({}, s4.DEFAULTS || {}, r4)
                    });
                  }, {}),
                  bounds: Is(h2.bounds)
                });
              }(t3, e3), this.container = this.options.container, null == this.container) return void Cs.error("Invalid Quill container", t3);
              this.options.debug && Rs.debug(this.options.debug);
              const n3 = this.container.innerHTML.trim();
              this.container.classList.add("ql-container"), this.container.innerHTML = "", ts.set(this.container, this), this.root = this.addContainer("ql-editor"), this.root.classList.add("ql-blank"), this.emitter = new ls();
              const r2 = pn.blotName, s2 = this.options.registry.query(r2);
              if (!s2 || !("blotName" in s2)) throw new Error(`Cannot initialize Quill without "${r2}" blot`);
              if (this.scroll = new s2(this.options.registry, this.root, {
                emitter: this.emitter
              }), this.editor = new vs(this.scroll), this.selection = new hs(this.scroll, this.emitter), this.composition = new Es(this.scroll, this.emitter), this.theme = new this.options.theme(this, this.options), this.keyboard = this.theme.addModule("keyboard"), this.clipboard = this.theme.addModule("clipboard"), this.history = this.theme.addModule("history"), this.uploader = this.theme.addModule("uploader"), this.theme.addModule("input"), this.theme.addModule("uiNode"), this.theme.init(), this.emitter.on(ls.events.EDITOR_CHANGE, (t4) => {
                t4 === ls.events.TEXT_CHANGE && this.root.classList.toggle("ql-blank", this.editor.isBlank());
              }), this.emitter.on(ls.events.SCROLL_UPDATE, (t4, e4) => {
                const n4 = this.selection.lastRange, [r3] = this.selection.getRange(), s3 = n4 && r3 ? {
                  oldRange: n4,
                  newRange: r3
                } : void 0;
                Us.call(this, () => this.editor.update(null, e4, s3), t4);
              }), this.emitter.on(ls.events.SCROLL_EMBED_UPDATE, (t4, e4) => {
                const n4 = this.selection.lastRange, [r3] = this.selection.getRange(), s3 = n4 && r3 ? {
                  oldRange: n4,
                  newRange: r3
                } : void 0;
                Us.call(this, () => {
                  const n5 = new bn().retain(t4.offset(this)).retain({
                    [t4.statics.blotName]: e4
                  });
                  return this.editor.update(n5, [], s3);
                }, Rs.sources.USER);
              }), n3) {
                const t4 = this.clipboard.convert({
                  html: `${n3}<p><br></p>`,
                  text: "\n"
                });
                this.setContents(t4);
              }
              this.history.clear(), this.options.placeholder && this.root.setAttribute("data-placeholder", this.options.placeholder), this.options.readOnly && this.disable(), this.allowReadOnlyEdits = false;
            }
            addContainer(t3) {
              let e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
              if ("string" == typeof t3) {
                const e4 = t3;
                (t3 = document.createElement("div")).classList.add(e4);
              }
              return this.container.insertBefore(t3, e3), t3;
            }
            blur() {
              this.selection.setRange(null);
            }
            deleteText(t3, e3, n3) {
              return [t3, e3, , n3] = Ds(t3, e3, n3), Us.call(this, () => this.editor.deleteText(t3, e3), n3, t3, -1 * e3);
            }
            disable() {
              this.enable(false);
            }
            editReadOnly(t3) {
              this.allowReadOnlyEdits = true;
              const e3 = t3();
              return this.allowReadOnlyEdits = false, e3;
            }
            enable() {
              let t3 = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
              this.scroll.enable(t3), this.container.classList.toggle("ql-disabled", !t3);
            }
            focus() {
              let t3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
              this.selection.focus(), t3.preventScroll || this.scrollSelectionIntoView();
            }
            format(t3, e3) {
              let n3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : ls.sources.API;
              return Us.call(this, () => {
                const n4 = this.getSelection(true);
                let r2 = new bn();
                if (null == n4) return r2;
                if (this.scroll.query(t3, Pe.BLOCK)) r2 = this.editor.formatLine(n4.index, n4.length, {
                  [t3]: e3
                });
                else {
                  if (0 === n4.length) return this.selection.format(t3, e3), r2;
                  r2 = this.editor.formatText(n4.index, n4.length, {
                    [t3]: e3
                  });
                }
                return this.setSelection(n4, ls.sources.SILENT), r2;
              }, n3);
            }
            formatLine(t3, e3, n3, r2, s2) {
              let i2;
              return [t3, e3, i2, s2] = Ds(t3, e3, n3, r2, s2), Us.call(this, () => this.editor.formatLine(t3, e3, i2), s2, t3, 0);
            }
            formatText(t3, e3, n3, r2, s2) {
              let i2;
              return [t3, e3, i2, s2] = Ds(t3, e3, n3, r2, s2), Us.call(this, () => this.editor.formatText(t3, e3, i2), s2, t3, 0);
            }
            getBounds(t3) {
              let e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, n3 = null;
              if (n3 = "number" == typeof t3 ? this.selection.getBounds(t3, e3) : this.selection.getBounds(t3.index, t3.length), !n3) return null;
              const r2 = this.container.getBoundingClientRect();
              return {
                bottom: n3.bottom - r2.top,
                height: n3.height,
                left: n3.left - r2.left,
                right: n3.right - r2.left,
                top: n3.top - r2.top,
                width: n3.width
              };
            }
            getContents() {
              let t3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.getLength() - t3;
              return [t3, e3] = Ds(t3, e3), this.editor.getContents(t3, e3);
            }
            getFormat() {
              let t3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.getSelection(true), e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
              return "number" == typeof t3 ? this.editor.getFormat(t3, e3) : this.editor.getFormat(t3.index, t3.length);
            }
            getIndex(t3) {
              return t3.offset(this.scroll);
            }
            getLength() {
              return this.scroll.length();
            }
            getLeaf(t3) {
              return this.scroll.leaf(t3);
            }
            getLine(t3) {
              return this.scroll.line(t3);
            }
            getLines() {
              let t3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : Number.MAX_VALUE;
              return "number" != typeof t3 ? this.scroll.lines(t3.index, t3.length) : this.scroll.lines(t3, e3);
            }
            getModule(t3) {
              return this.theme.modules[t3];
            }
            getSelection() {
              return arguments.length > 0 && void 0 !== arguments[0] && arguments[0] && this.focus(), this.update(), this.selection.getRange()[0];
            }
            getSemanticHTML() {
              let t3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, e3 = arguments.length > 1 ? arguments[1] : void 0;
              return "number" == typeof t3 && (e3 = e3 ?? this.getLength() - t3), [t3, e3] = Ds(t3, e3), this.editor.getHTML(t3, e3);
            }
            getText() {
              let t3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, e3 = arguments.length > 1 ? arguments[1] : void 0;
              return "number" == typeof t3 && (e3 = e3 ?? this.getLength() - t3), [t3, e3] = Ds(t3, e3), this.editor.getText(t3, e3);
            }
            hasFocus() {
              return this.selection.hasFocus();
            }
            insertEmbed(t3, e3, n3) {
              let r2 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : Rs.sources.API;
              return Us.call(this, () => this.editor.insertEmbed(t3, e3, n3), r2, t3);
            }
            insertText(t3, e3, n3, r2, s2) {
              let i2;
              return [t3, , i2, s2] = Ds(t3, 0, n3, r2, s2), Us.call(this, () => this.editor.insertText(t3, e3, i2), s2, t3, e3.length);
            }
            isEnabled() {
              return this.scroll.isEnabled();
            }
            off() {
              return this.emitter.off(...arguments);
            }
            on() {
              return this.emitter.on(...arguments);
            }
            once() {
              return this.emitter.once(...arguments);
            }
            removeFormat(t3, e3, n3) {
              return [t3, e3, , n3] = Ds(t3, e3, n3), Us.call(this, () => this.editor.removeFormat(t3, e3), n3, t3);
            }
            scrollRectIntoView(t3) {
              Os(this.root, t3);
            }
            scrollIntoView() {
              console.warn("Quill#scrollIntoView() has been deprecated and will be removed in the near future. Please use Quill#scrollSelectionIntoView() instead."), this.scrollSelectionIntoView();
            }
            scrollSelectionIntoView() {
              const t3 = this.selection.lastRange, e3 = t3 && this.selection.getBounds(t3.index, t3.length);
              e3 && this.scrollRectIntoView(e3);
            }
            setContents(t3) {
              let e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ls.sources.API;
              return Us.call(this, () => {
                t3 = new bn(t3);
                const e4 = this.getLength(), n3 = this.editor.deleteText(0, e4), r2 = this.editor.insertContents(0, t3), s2 = this.editor.deleteText(this.getLength() - 1, 1);
                return n3.compose(r2).compose(s2);
              }, e3);
            }
            setSelection(t3, e3, n3) {
              null == t3 ? this.selection.setRange(null, e3 || Rs.sources.API) : ([t3, e3, , n3] = Ds(t3, e3, n3), this.selection.setRange(new cs(Math.max(0, t3), e3), n3), n3 !== ls.sources.SILENT && this.scrollSelectionIntoView());
            }
            setText(t3) {
              let e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ls.sources.API;
              const n3 = new bn().insert(t3);
              return this.setContents(n3, e3);
            }
            update() {
              let t3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ls.sources.USER;
              const e3 = this.scroll.update(t3);
              return this.selection.update(t3), e3;
            }
            updateContents(t3) {
              let e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ls.sources.API;
              return Us.call(this, () => (t3 = new bn(t3), this.editor.applyDelta(t3)), e3, true);
            }
          }
          function Is(t3) {
            return "string" == typeof t3 ? document.querySelector(t3) : t3;
          }
          function Ms(t3) {
            return Object.entries(t3 ?? {}).reduce((t4, e3) => {
              let [n3, r2] = e3;
              return __spreadProps(__spreadValues({}, t4), {
                [n3]: true === r2 ? {} : r2
              });
            }, {});
          }
          function Bs(t3) {
            return Object.fromEntries(Object.entries(t3).filter((t4) => void 0 !== t4[1]));
          }
          function Us(t3, e3, n3, r2) {
            if (!this.isEnabled() && e3 === ls.sources.USER && !this.allowReadOnlyEdits) return new bn();
            let s2 = null == n3 ? null : this.getSelection();
            const i2 = this.editor.delta, o2 = t3();
            if (null != s2 && (true === n3 && (n3 = s2.index), null == r2 ? s2 = Ps(s2, o2, e3) : 0 !== r2 && (s2 = Ps(s2, n3, r2, e3)), this.setSelection(s2, ls.sources.SILENT)), o2.length() > 0) {
              const t4 = [ls.events.TEXT_CHANGE, o2, i2, e3];
              this.emitter.emit(ls.events.EDITOR_CHANGE, ...t4), e3 !== ls.sources.SILENT && this.emitter.emit(...t4);
            }
            return o2;
          }
          function Ds(t3, e3, n3, r2, s2) {
            let i2 = {};
            return "number" == typeof t3.index && "number" == typeof t3.length ? "number" != typeof e3 ? (s2 = r2, r2 = n3, n3 = e3, e3 = t3.length, t3 = t3.index) : (e3 = t3.length, t3 = t3.index) : "number" != typeof e3 && (s2 = r2, r2 = n3, n3 = e3, e3 = 0), "object" == typeof n3 ? (i2 = n3, s2 = r2) : "string" == typeof n3 && (null != r2 ? i2[n3] = r2 : s2 = n3), [t3, e3, i2, s2 = s2 || ls.sources.API];
          }
          function Ps(t3, e3, n3, r2) {
            const s2 = "number" == typeof n3 ? n3 : 0;
            if (null == t3) return null;
            let i2, o2;
            return e3 && "function" == typeof e3.transformPosition ? [i2, o2] = [t3.index, t3.index + t3.length].map((t4) => e3.transformPosition(t4, r2 !== ls.sources.USER)) : [i2, o2] = [t3.index, t3.index + t3.length].map((t4) => t4 < e3 || t4 === e3 && r2 === ls.sources.USER ? t4 : s2 >= 0 ? t4 + s2 : Math.max(e3, t4 + s2)), new cs(i2, o2 - i2);
          }
          const zs = class extends un {
          };
          function Hs(t3) {
            return t3 instanceof Wr || t3 instanceof Zr;
          }
          function Fs(t3) {
            return "function" == typeof t3.updateContent;
          }
          function $s(t3, e3, n3) {
            n3.reduce((e4, n4) => {
              const r2 = bn.Op.length(n4);
              let s2 = n4.attributes || {};
              if (null != n4.insert) {
                if ("string" == typeof n4.insert) {
                  const r3 = n4.insert;
                  t3.insertAt(e4, r3);
                  const [i2] = t3.descendant(Je, e4), o2 = Xr(i2);
                  s2 = bn.AttributeMap.diff(o2, s2) || {};
                } else if ("object" == typeof n4.insert) {
                  const r3 = Object.keys(n4.insert)[0];
                  if (null == r3) return e4;
                  t3.insertAt(e4, r3, n4.insert[r3]);
                  if (null != t3.scroll.query(r3, Pe.INLINE)) {
                    const [n5] = t3.descendant(Je, e4), r4 = Xr(n5);
                    s2 = bn.AttributeMap.diff(r4, s2) || {};
                  }
                }
              }
              return Object.keys(s2).forEach((n5) => {
                t3.formatAt(e4, r2, n5, s2[n5]);
              }), e4 + r2;
            }, e3);
          }
          const Vs = class extends pn {
            static blotName = "scroll";
            static className = "ql-editor";
            static tagName = "DIV";
            static defaultChild = Wr;
            static allowedChildren = [Wr, Zr, zs];
            constructor(t3, e3, n3) {
              let {
                emitter: r2
              } = n3;
              super(t3, e3), this.emitter = r2, this.batch = false, this.optimize(), this.enable(), this.domNode.addEventListener("dragstart", (t4) => this.handleDragStart(t4));
            }
            batchStart() {
              Array.isArray(this.batch) || (this.batch = []);
            }
            batchEnd() {
              if (!this.batch) return;
              const t3 = this.batch;
              this.batch = false, this.update(t3);
            }
            emitMount(t3) {
              this.emitter.emit(ls.events.SCROLL_BLOT_MOUNT, t3);
            }
            emitUnmount(t3) {
              this.emitter.emit(ls.events.SCROLL_BLOT_UNMOUNT, t3);
            }
            emitEmbedUpdate(t3, e3) {
              this.emitter.emit(ls.events.SCROLL_EMBED_UPDATE, t3, e3);
            }
            deleteAt(t3, e3) {
              const [n3, r2] = this.line(t3), [s2] = this.line(t3 + e3);
              if (super.deleteAt(t3, e3), null != s2 && n3 !== s2 && r2 > 0) {
                if (n3 instanceof Zr || s2 instanceof Zr) return void this.optimize();
                const t4 = s2.children.head instanceof Hr ? null : s2.children.head;
                n3.moveChildren(s2, t4), n3.remove();
              }
              this.optimize();
            }
            enable() {
              let t3 = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
              this.domNode.setAttribute("contenteditable", t3 ? "true" : "false");
            }
            formatAt(t3, e3, n3, r2) {
              super.formatAt(t3, e3, n3, r2), this.optimize();
            }
            insertAt(t3, e3, n3) {
              if (t3 >= this.length()) {
                if (null == n3 || null == this.scroll.query(e3, Pe.BLOCK)) {
                  const t4 = this.scroll.create(this.statics.defaultChild.blotName);
                  this.appendChild(t4), null == n3 && e3.endsWith("\n") ? t4.insertAt(0, e3.slice(0, -1), n3) : t4.insertAt(0, e3, n3);
                } else {
                  const t4 = this.scroll.create(e3, n3);
                  this.appendChild(t4);
                }
              } else super.insertAt(t3, e3, n3);
              this.optimize();
            }
            insertBefore(t3, e3) {
              if (t3.statics.scope === Pe.INLINE_BLOT) {
                const n3 = this.scroll.create(this.statics.defaultChild.blotName);
                n3.appendChild(t3), super.insertBefore(n3, e3);
              } else super.insertBefore(t3, e3);
            }
            insertContents(t3, e3) {
              const n3 = this.deltaToRenderBlocks(e3.concat(new bn().insert("\n"))), r2 = n3.pop();
              if (null == r2) return;
              this.batchStart();
              const s2 = n3.shift();
              if (s2) {
                const e4 = "block" === s2.type && (0 === s2.delta.length() || !this.descendant(Zr, t3)[0] && t3 < this.length()), n4 = "block" === s2.type ? s2.delta : new bn().insert({
                  [s2.key]: s2.value
                });
                $s(this, t3, n4);
                const r3 = "block" === s2.type ? 1 : 0, i3 = t3 + n4.length() + r3;
                e4 && this.insertAt(i3 - 1, "\n");
                const o3 = Xr(this.line(t3)[0]), l2 = bn.AttributeMap.diff(o3, s2.attributes) || {};
                Object.keys(l2).forEach((t4) => {
                  this.formatAt(i3 - 1, 1, t4, l2[t4]);
                }), t3 = i3;
              }
              let [i2, o2] = this.children.find(t3);
              if (n3.length && (i2 && (i2 = i2.split(o2), o2 = 0), n3.forEach((t4) => {
                if ("block" === t4.type) {
                  $s(this.createBlock(t4.attributes, i2 || void 0), 0, t4.delta);
                } else {
                  const e4 = this.create(t4.key, t4.value);
                  this.insertBefore(e4, i2 || void 0), Object.keys(t4.attributes).forEach((n4) => {
                    e4.format(n4, t4.attributes[n4]);
                  });
                }
              })), "block" === r2.type && r2.delta.length()) {
                $s(this, i2 ? i2.offset(i2.scroll) + o2 : this.length(), r2.delta);
              }
              this.batchEnd(), this.optimize();
            }
            isEnabled() {
              return "true" === this.domNode.getAttribute("contenteditable");
            }
            leaf(t3) {
              const e3 = this.path(t3).pop();
              if (!e3) return [null, -1];
              const [n3, r2] = e3;
              return n3 instanceof Je ? [n3, r2] : [null, -1];
            }
            line(t3) {
              return t3 === this.length() ? this.line(t3 - 1) : this.descendant(Hs, t3);
            }
            lines() {
              let t3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : Number.MAX_VALUE;
              const n3 = (t4, e4, r2) => {
                let s2 = [], i2 = r2;
                return t4.children.forEachAt(e4, r2, (t5, e5, r3) => {
                  Hs(t5) ? s2.push(t5) : t5 instanceof un && (s2 = s2.concat(n3(t5, e5, i2))), i2 -= r3;
                }), s2;
              };
              return n3(this, t3, e3);
            }
            optimize() {
              let t3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
              this.batch || (super.optimize(t3, e3), t3.length > 0 && this.emitter.emit(ls.events.SCROLL_OPTIMIZE, t3, e3));
            }
            path(t3) {
              return super.path(t3).slice(1);
            }
            remove() {
            }
            update(t3) {
              if (this.batch) return void (Array.isArray(t3) && (this.batch = this.batch.concat(t3)));
              let e3 = ls.sources.USER;
              "string" == typeof t3 && (e3 = t3), Array.isArray(t3) || (t3 = this.observer.takeRecords()), (t3 = t3.filter((t4) => {
                let {
                  target: e4
                } = t4;
                const n3 = this.find(e4, true);
                return n3 && !Fs(n3);
              })).length > 0 && this.emitter.emit(ls.events.SCROLL_BEFORE_UPDATE, e3, t3), super.update(t3.concat([])), t3.length > 0 && this.emitter.emit(ls.events.SCROLL_UPDATE, e3, t3);
            }
            updateEmbedAt(t3, e3, n3) {
              const [r2] = this.descendant((t4) => t4 instanceof Zr, t3);
              r2 && r2.statics.blotName === e3 && Fs(r2) && r2.updateContent(n3);
            }
            handleDragStart(t3) {
              t3.preventDefault();
            }
            deltaToRenderBlocks(t3) {
              const e3 = [];
              let n3 = new bn();
              return t3.forEach((t4) => {
                const r2 = t4?.insert;
                if (r2) if ("string" == typeof r2) {
                  const s2 = r2.split("\n");
                  s2.slice(0, -1).forEach((r3) => {
                    n3.insert(r3, t4.attributes), e3.push({
                      type: "block",
                      delta: n3,
                      attributes: t4.attributes ?? {}
                    }), n3 = new bn();
                  });
                  const i2 = s2[s2.length - 1];
                  i2 && n3.insert(i2, t4.attributes);
                } else {
                  const s2 = Object.keys(r2)[0];
                  if (!s2) return;
                  this.query(s2, Pe.INLINE) ? n3.push(t4) : (n3.length() && e3.push({
                    type: "block",
                    delta: n3,
                    attributes: {}
                  }), n3 = new bn(), e3.push({
                    type: "blockEmbed",
                    key: s2,
                    value: r2[s2],
                    attributes: t4.attributes ?? {}
                  }));
                }
              }), n3.length() && e3.push({
                type: "block",
                delta: n3,
                attributes: {}
              }), e3;
            }
            createBlock(t3, e3) {
              let n3;
              const r2 = {};
              Object.entries(t3).forEach((t4) => {
                let [e4, s3] = t4;
                null != this.query(e4, Pe.BLOCK & Pe.BLOT) ? n3 = e4 : r2[e4] = s3;
              });
              const s2 = this.create(n3 || this.statics.defaultChild.blotName, n3 ? t3[n3] : void 0);
              this.insertBefore(s2, e3 || void 0);
              const i2 = s2.length();
              return Object.entries(r2).forEach((t4) => {
                let [e4, n4] = t4;
                s2.formatAt(0, i2, e4, n4);
              }), s2;
            }
          }, Ks = {
            scope: Pe.BLOCK,
            whitelist: ["right", "center", "justify"]
          }, Ws = new ze("align", "align", Ks), Zs = new Ke("align", "ql-align", Ks), Gs = new Ze("align", "text-align", Ks);
          class Xs extends Ze {
            value(t3) {
              let e3 = super.value(t3);
              if (!e3.startsWith("rgb(")) return e3;
              e3 = e3.replace(/^[^\d]+/, "").replace(/[^\d]+$/, "");
              return `#${e3.split(",").map((t4) => `00${parseInt(t4, 10).toString(16)}`.slice(-2)).join("")}`;
            }
          }
          const Qs = new Ke("color", "ql-color", {
            scope: Pe.INLINE
          }), Ys = new Xs("color", "color", {
            scope: Pe.INLINE
          }), Js = new Ke("background", "ql-bg", {
            scope: Pe.INLINE
          }), ti = new Xs("background", "background-color", {
            scope: Pe.INLINE
          });
          class ei extends zs {
            static create(t3) {
              const e3 = super.create(t3);
              return e3.setAttribute("spellcheck", "false"), e3;
            }
            code(t3, e3) {
              return this.children.map((t4) => t4.length() <= 1 ? "" : t4.domNode.innerText).join("\n").slice(t3, t3 + e3);
            }
            html(t3, e3) {
              return `<pre>
${$r(this.code(t3, e3))}
</pre>`;
            }
          }
          class ni extends Wr {
            static TAB = "  ";
            static register() {
              Rs.register(ei);
            }
          }
          class ri extends Kr {
          }
          ri.blotName = "code", ri.tagName = "CODE", ni.blotName = "code-block", ni.className = "ql-code-block", ni.tagName = "DIV", ei.blotName = "code-block-container", ei.className = "ql-code-block-container", ei.tagName = "DIV", ei.allowedChildren = [ni], ni.allowedChildren = [Fr, Hr, Yr], ni.requiredContainer = ei;
          const si = {
            scope: Pe.BLOCK,
            whitelist: ["rtl"]
          }, ii = new ze("direction", "dir", si), oi = new Ke("direction", "ql-direction", si), li = new Ze("direction", "direction", si), ai = {
            scope: Pe.INLINE,
            whitelist: ["serif", "monospace"]
          }, ci = new Ke("font", "ql-font", ai);
          const ui = new class extends Ze {
            value(t3) {
              return super.value(t3).replace(/["']/g, "");
            }
          }("font", "font-family", ai), hi = new Ke("size", "ql-size", {
            scope: Pe.INLINE,
            whitelist: ["small", "large", "huge"]
          }), di = new Ze("size", "font-size", {
            scope: Pe.INLINE,
            whitelist: ["10px", "18px", "32px"]
          }), fi = is("quill:keyboard"), pi = /Mac/i.test(navigator.platform) ? "metaKey" : "ctrlKey";
          class gi extends xs {
            static match(t3, e3) {
              return !["altKey", "ctrlKey", "metaKey", "shiftKey"].some((n3) => !!e3[n3] !== t3[n3] && null !== e3[n3]) && (e3.key === t3.key || e3.key === t3.which);
            }
            constructor(t3, e3) {
              super(t3, e3), this.bindings = {}, Object.keys(this.options.bindings).forEach((t4) => {
                this.options.bindings[t4] && this.addBinding(this.options.bindings[t4]);
              }), this.addBinding({
                key: "Enter",
                shiftKey: null
              }, this.handleEnter), this.addBinding({
                key: "Enter",
                metaKey: null,
                ctrlKey: null,
                altKey: null
              }, () => {
              }), /Firefox/i.test(navigator.userAgent) ? (this.addBinding({
                key: "Backspace"
              }, {
                collapsed: true
              }, this.handleBackspace), this.addBinding({
                key: "Delete"
              }, {
                collapsed: true
              }, this.handleDelete)) : (this.addBinding({
                key: "Backspace"
              }, {
                collapsed: true,
                prefix: /^.?$/
              }, this.handleBackspace), this.addBinding({
                key: "Delete"
              }, {
                collapsed: true,
                suffix: /^.?$/
              }, this.handleDelete)), this.addBinding({
                key: "Backspace"
              }, {
                collapsed: false
              }, this.handleDeleteRange), this.addBinding({
                key: "Delete"
              }, {
                collapsed: false
              }, this.handleDeleteRange), this.addBinding({
                key: "Backspace",
                altKey: null,
                ctrlKey: null,
                metaKey: null,
                shiftKey: null
              }, {
                collapsed: true,
                offset: 0
              }, this.handleBackspace), this.listen();
            }
            addBinding(t3) {
              let e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
              const r2 = function(t4) {
                if ("string" == typeof t4 || "number" == typeof t4) t4 = {
                  key: t4
                };
                else {
                  if ("object" != typeof t4) return null;
                  t4 = vr(t4);
                }
                t4.shortKey && (t4[pi] = t4.shortKey, delete t4.shortKey);
                return t4;
              }(t3);
              if (null == r2) return void fi.warn("Attempted to add invalid keyboard binding", r2);
              "function" == typeof e3 && (e3 = {
                handler: e3
              }), "function" == typeof n3 && (n3 = {
                handler: n3
              });
              (Array.isArray(r2.key) ? r2.key : [r2.key]).forEach((t4) => {
                const s2 = __spreadValues(__spreadValues(__spreadProps(__spreadValues({}, r2), {
                  key: t4
                }), e3), n3);
                this.bindings[s2.key] = this.bindings[s2.key] || [], this.bindings[s2.key].push(s2);
              });
            }
            listen() {
              this.quill.root.addEventListener("keydown", (t3) => {
                if (t3.defaultPrevented || t3.isComposing) return;
                if (229 === t3.keyCode && ("Enter" === t3.key || "Backspace" === t3.key)) return;
                const e3 = (this.bindings[t3.key] || []).concat(this.bindings[t3.which] || []).filter((e4) => gi.match(t3, e4));
                if (0 === e3.length) return;
                const n3 = Rs.find(t3.target, true);
                if (n3 && n3.scroll !== this.quill.scroll) return;
                const r2 = this.quill.getSelection();
                if (null == r2 || !this.quill.hasFocus()) return;
                const [s2, i2] = this.quill.getLine(r2.index), [o2, l2] = this.quill.getLeaf(r2.index), [a2, c2] = 0 === r2.length ? [o2, l2] : this.quill.getLeaf(r2.index + r2.length), u2 = o2 instanceof mn ? o2.value().slice(0, l2) : "", h2 = a2 instanceof mn ? a2.value().slice(c2) : "", d2 = {
                  collapsed: 0 === r2.length,
                  empty: 0 === r2.length && s2.length() <= 1,
                  format: this.quill.getFormat(r2),
                  line: s2,
                  offset: i2,
                  prefix: u2,
                  suffix: h2,
                  event: t3
                };
                e3.some((t4) => {
                  if (null != t4.collapsed && t4.collapsed !== d2.collapsed) return false;
                  if (null != t4.empty && t4.empty !== d2.empty) return false;
                  if (null != t4.offset && t4.offset !== d2.offset) return false;
                  if (Array.isArray(t4.format)) {
                    if (t4.format.every((t5) => null == d2.format[t5])) return false;
                  } else if ("object" == typeof t4.format && !Object.keys(t4.format).every((e4) => true === t4.format[e4] ? null != d2.format[e4] : false === t4.format[e4] ? null == d2.format[e4] : Pr(t4.format[e4], d2.format[e4]))) return false;
                  return !(null != t4.prefix && !t4.prefix.test(d2.prefix)) && !(null != t4.suffix && !t4.suffix.test(d2.suffix)) && true !== t4.handler.call(this, r2, d2, t4);
                }) && t3.preventDefault();
              });
            }
            handleBackspace(t3, e3) {
              const n3 = /[\uD800-\uDBFF][\uDC00-\uDFFF]$/.test(e3.prefix) ? 2 : 1;
              if (0 === t3.index || this.quill.getLength() <= 1) return;
              let r2 = {};
              const [s2] = this.quill.getLine(t3.index);
              let i2 = new bn().retain(t3.index - n3).delete(n3);
              if (0 === e3.offset) {
                const [e4] = this.quill.getLine(t3.index - 1);
                if (e4) {
                  if (!("block" === e4.statics.blotName && e4.length() <= 1)) {
                    const e5 = s2.formats(), n4 = this.quill.getFormat(t3.index - 1, 1);
                    if (r2 = bn.AttributeMap.diff(e5, n4) || {}, Object.keys(r2).length > 0) {
                      const e6 = new bn().retain(t3.index + s2.length() - 2).retain(1, r2);
                      i2 = i2.compose(e6);
                    }
                  }
                }
              }
              this.quill.updateContents(i2, Rs.sources.USER), this.quill.focus();
            }
            handleDelete(t3, e3) {
              const n3 = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(e3.suffix) ? 2 : 1;
              if (t3.index >= this.quill.getLength() - n3) return;
              let r2 = {};
              const [s2] = this.quill.getLine(t3.index);
              let i2 = new bn().retain(t3.index).delete(n3);
              if (e3.offset >= s2.length() - 1) {
                const [e4] = this.quill.getLine(t3.index + 1);
                if (e4) {
                  const n4 = s2.formats(), o2 = this.quill.getFormat(t3.index, 1);
                  r2 = bn.AttributeMap.diff(n4, o2) || {}, Object.keys(r2).length > 0 && (i2 = i2.retain(e4.length() - 1).retain(1, r2));
                }
              }
              this.quill.updateContents(i2, Rs.sources.USER), this.quill.focus();
            }
            handleDeleteRange(t3) {
              Ni({
                range: t3,
                quill: this.quill
              }), this.quill.focus();
            }
            handleEnter(t3, e3) {
              const n3 = Object.keys(e3.format).reduce((t4, n4) => (this.quill.scroll.query(n4, Pe.BLOCK) && !Array.isArray(e3.format[n4]) && (t4[n4] = e3.format[n4]), t4), {}), r2 = new bn().retain(t3.index).delete(t3.length).insert("\n", n3);
              this.quill.updateContents(r2, Rs.sources.USER), this.quill.setSelection(t3.index + 1, Rs.sources.SILENT), this.quill.focus();
            }
          }
          const mi = {
            bindings: {
              bold: vi("bold"),
              italic: vi("italic"),
              underline: vi("underline"),
              indent: {
                key: "Tab",
                format: ["blockquote", "indent", "list"],
                handler(t3, e3) {
                  return !(!e3.collapsed || 0 === e3.offset) || (this.quill.format("indent", "+1", Rs.sources.USER), false);
                }
              },
              outdent: {
                key: "Tab",
                shiftKey: true,
                format: ["blockquote", "indent", "list"],
                handler(t3, e3) {
                  return !(!e3.collapsed || 0 === e3.offset) || (this.quill.format("indent", "-1", Rs.sources.USER), false);
                }
              },
              "outdent backspace": {
                key: "Backspace",
                collapsed: true,
                shiftKey: null,
                metaKey: null,
                ctrlKey: null,
                altKey: null,
                format: ["indent", "list"],
                offset: 0,
                handler(t3, e3) {
                  null != e3.format.indent ? this.quill.format("indent", "-1", Rs.sources.USER) : null != e3.format.list && this.quill.format("list", false, Rs.sources.USER);
                }
              },
              "indent code-block": bi(true),
              "outdent code-block": bi(false),
              "remove tab": {
                key: "Tab",
                shiftKey: true,
                collapsed: true,
                prefix: /\t$/,
                handler(t3) {
                  this.quill.deleteText(t3.index - 1, 1, Rs.sources.USER);
                }
              },
              tab: {
                key: "Tab",
                handler(t3, e3) {
                  if (e3.format.table) return true;
                  this.quill.history.cutoff();
                  const n3 = new bn().retain(t3.index).delete(t3.length).insert("	");
                  return this.quill.updateContents(n3, Rs.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(t3.index + 1, Rs.sources.SILENT), false;
                }
              },
              "blockquote empty enter": {
                key: "Enter",
                collapsed: true,
                format: ["blockquote"],
                empty: true,
                handler() {
                  this.quill.format("blockquote", false, Rs.sources.USER);
                }
              },
              "list empty enter": {
                key: "Enter",
                collapsed: true,
                format: ["list"],
                empty: true,
                handler(t3, e3) {
                  const n3 = {
                    list: false
                  };
                  e3.format.indent && (n3.indent = false), this.quill.formatLine(t3.index, t3.length, n3, Rs.sources.USER);
                }
              },
              "checklist enter": {
                key: "Enter",
                collapsed: true,
                format: {
                  list: "checked"
                },
                handler(t3) {
                  const [e3, n3] = this.quill.getLine(t3.index), r2 = __spreadProps(__spreadValues({}, e3.formats()), {
                    list: "checked"
                  }), s2 = new bn().retain(t3.index).insert("\n", r2).retain(e3.length() - n3 - 1).retain(1, {
                    list: "unchecked"
                  });
                  this.quill.updateContents(s2, Rs.sources.USER), this.quill.setSelection(t3.index + 1, Rs.sources.SILENT), this.quill.scrollSelectionIntoView();
                }
              },
              "header enter": {
                key: "Enter",
                collapsed: true,
                format: ["header"],
                suffix: /^$/,
                handler(t3, e3) {
                  const [n3, r2] = this.quill.getLine(t3.index), s2 = new bn().retain(t3.index).insert("\n", e3.format).retain(n3.length() - r2 - 1).retain(1, {
                    header: null
                  });
                  this.quill.updateContents(s2, Rs.sources.USER), this.quill.setSelection(t3.index + 1, Rs.sources.SILENT), this.quill.scrollSelectionIntoView();
                }
              },
              "table backspace": {
                key: "Backspace",
                format: ["table"],
                collapsed: true,
                offset: 0,
                handler() {
                }
              },
              "table delete": {
                key: "Delete",
                format: ["table"],
                collapsed: true,
                suffix: /^$/,
                handler() {
                }
              },
              "table enter": {
                key: "Enter",
                shiftKey: null,
                format: ["table"],
                handler(t3) {
                  const e3 = this.quill.getModule("table");
                  if (e3) {
                    const [n3, r2, s2, i2] = e3.getTable(t3), o2 = function(t4, e4, n4, r3) {
                      if (null == e4.prev && null == e4.next) return null == n4.prev && null == n4.next ? 0 === r3 ? -1 : 1 : null == n4.prev ? -1 : 1;
                      if (null == e4.prev) return -1;
                      if (null == e4.next) return 1;
                      return null;
                    }(0, r2, s2, i2);
                    if (null == o2) return;
                    let l2 = n3.offset();
                    if (o2 < 0) {
                      const e4 = new bn().retain(l2).insert("\n");
                      this.quill.updateContents(e4, Rs.sources.USER), this.quill.setSelection(t3.index + 1, t3.length, Rs.sources.SILENT);
                    } else if (o2 > 0) {
                      l2 += n3.length();
                      const t4 = new bn().retain(l2).insert("\n");
                      this.quill.updateContents(t4, Rs.sources.USER), this.quill.setSelection(l2, Rs.sources.USER);
                    }
                  }
                }
              },
              "table tab": {
                key: "Tab",
                shiftKey: null,
                format: ["table"],
                handler(t3, e3) {
                  const {
                    event: n3,
                    line: r2
                  } = e3, s2 = r2.offset(this.quill.scroll);
                  n3.shiftKey ? this.quill.setSelection(s2 - 1, Rs.sources.USER) : this.quill.setSelection(s2 + r2.length(), Rs.sources.USER);
                }
              },
              "list autofill": {
                key: " ",
                shiftKey: null,
                collapsed: true,
                format: {
                  "code-block": false,
                  blockquote: false,
                  table: false
                },
                prefix: /^\s*?(\d+\.|-|\*|\[ ?\]|\[x\])$/,
                handler(t3, e3) {
                  if (null == this.quill.scroll.query("list")) return true;
                  const {
                    length: n3
                  } = e3.prefix, [r2, s2] = this.quill.getLine(t3.index);
                  if (s2 > n3) return true;
                  let i2;
                  switch (e3.prefix.trim()) {
                    case "[]":
                    case "[ ]":
                      i2 = "unchecked";
                      break;
                    case "[x]":
                      i2 = "checked";
                      break;
                    case "-":
                    case "*":
                      i2 = "bullet";
                      break;
                    default:
                      i2 = "ordered";
                  }
                  this.quill.insertText(t3.index, " ", Rs.sources.USER), this.quill.history.cutoff();
                  const o2 = new bn().retain(t3.index - s2).delete(n3 + 1).retain(r2.length() - 2 - s2).retain(1, {
                    list: i2
                  });
                  return this.quill.updateContents(o2, Rs.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(t3.index - n3, Rs.sources.SILENT), false;
                }
              },
              "code exit": {
                key: "Enter",
                collapsed: true,
                format: ["code-block"],
                prefix: /^$/,
                suffix: /^\s*$/,
                handler(t3) {
                  const [e3, n3] = this.quill.getLine(t3.index);
                  let r2 = 2, s2 = e3;
                  for (; null != s2 && s2.length() <= 1 && s2.formats()["code-block"]; ) if (s2 = s2.prev, r2 -= 1, r2 <= 0) {
                    const r3 = new bn().retain(t3.index + e3.length() - n3 - 2).retain(1, {
                      "code-block": null
                    }).delete(1);
                    return this.quill.updateContents(r3, Rs.sources.USER), this.quill.setSelection(t3.index - 1, Rs.sources.SILENT), false;
                  }
                  return true;
                }
              },
              "embed left": yi("ArrowLeft", false),
              "embed left shift": yi("ArrowLeft", true),
              "embed right": yi("ArrowRight", false),
              "embed right shift": yi("ArrowRight", true),
              "table down": xi(false),
              "table up": xi(true)
            }
          };
          function bi(t3) {
            return {
              key: "Tab",
              shiftKey: !t3,
              format: {
                "code-block": true
              },
              handler(e3, n3) {
                let {
                  event: r2
                } = n3;
                const s2 = this.quill.scroll.query("code-block"), {
                  TAB: i2
                } = s2;
                if (0 === e3.length && !r2.shiftKey) return this.quill.insertText(e3.index, i2, Rs.sources.USER), void this.quill.setSelection(e3.index + i2.length, Rs.sources.SILENT);
                const o2 = 0 === e3.length ? this.quill.getLines(e3.index, 1) : this.quill.getLines(e3);
                let {
                  index: l2,
                  length: a2
                } = e3;
                o2.forEach((e4, n4) => {
                  t3 ? (e4.insertAt(0, i2), 0 === n4 ? l2 += i2.length : a2 += i2.length) : e4.domNode.textContent.startsWith(i2) && (e4.deleteAt(0, i2.length), 0 === n4 ? l2 -= i2.length : a2 -= i2.length);
                }), this.quill.update(Rs.sources.USER), this.quill.setSelection(l2, a2, Rs.sources.SILENT);
              }
            };
          }
          function yi(t3, e3) {
            const n3 = "ArrowLeft" === t3 ? "prefix" : "suffix";
            return {
              key: t3,
              shiftKey: e3,
              altKey: null,
              [n3]: /^$/,
              handler(n4) {
                let {
                  index: r2
                } = n4;
                "ArrowRight" === t3 && (r2 += n4.length + 1);
                const [s2] = this.quill.getLeaf(r2);
                return !(s2 instanceof hn) || ("ArrowLeft" === t3 ? e3 ? this.quill.setSelection(n4.index - 1, n4.length + 1, Rs.sources.USER) : this.quill.setSelection(n4.index - 1, Rs.sources.USER) : e3 ? this.quill.setSelection(n4.index, n4.length + 1, Rs.sources.USER) : this.quill.setSelection(n4.index + n4.length + 1, Rs.sources.USER), false);
              }
            };
          }
          function vi(t3) {
            return {
              key: t3[0],
              shortKey: true,
              handler(e3, n3) {
                this.quill.format(t3, !n3.format[t3], Rs.sources.USER);
              }
            };
          }
          function xi(t3) {
            return {
              key: t3 ? "ArrowUp" : "ArrowDown",
              collapsed: true,
              format: ["table"],
              handler(e3, n3) {
                const r2 = t3 ? "prev" : "next", s2 = n3.line, i2 = s2.parent[r2];
                if (null != i2) {
                  if ("table-row" === i2.statics.blotName) {
                    let t4 = i2.children.head, e4 = s2;
                    for (; null != e4.prev; ) e4 = e4.prev, t4 = t4.next;
                    const r3 = t4.offset(this.quill.scroll) + Math.min(n3.offset, t4.length() - 1);
                    this.quill.setSelection(r3, 0, Rs.sources.USER);
                  }
                } else {
                  const e4 = s2.table()[r2];
                  null != e4 && (t3 ? this.quill.setSelection(e4.offset(this.quill.scroll) + e4.length() - 1, 0, Rs.sources.USER) : this.quill.setSelection(e4.offset(this.quill.scroll), 0, Rs.sources.USER));
                }
                return false;
              }
            };
          }
          function Ni(t3) {
            let {
              quill: e3,
              range: n3
            } = t3;
            const r2 = e3.getLines(n3);
            let s2 = {};
            if (r2.length > 1) {
              const t4 = r2[0].formats(), e4 = r2[r2.length - 1].formats();
              s2 = bn.AttributeMap.diff(e4, t4) || {};
            }
            e3.deleteText(n3, Rs.sources.USER), Object.keys(s2).length > 0 && e3.formatLine(n3.index, 1, s2, Rs.sources.USER), e3.setSelection(n3.index, Rs.sources.SILENT);
          }
          gi.DEFAULTS = mi;
          const wi = /font-weight:\s*normal/, Ei = ["P", "OL", "UL"], Ai = (t3) => t3 && Ei.includes(t3.tagName);
          const qi = /\bmso-list:[^;]*ignore/i, ki = /\bmso-list:[^;]*\bl(\d+)/i, _i = /\bmso-list:[^;]*\blevel(\d+)/i, Li = (t3) => {
            const e3 = Array.from(t3.querySelectorAll("[style*=mso-list]")), n3 = [], r2 = [];
            e3.forEach((t4) => {
              (t4.getAttribute("style") || "").match(qi) ? n3.push(t4) : r2.push(t4);
            }), n3.forEach((t4) => t4.parentNode?.removeChild(t4));
            const s2 = t3.documentElement.innerHTML, i2 = r2.map((t4) => ((t5, e4) => {
              const n4 = t5.getAttribute("style"), r3 = n4?.match(ki);
              if (!r3) return null;
              const s3 = Number(r3[1]), i3 = n4?.match(_i), o2 = i3 ? Number(i3[1]) : 1, l2 = new RegExp(`@list l${s3}:level${o2}\\s*\\{[^\\}]*mso-level-number-format:\\s*([\\w-]+)`, "i"), a2 = e4.match(l2);
              return {
                id: s3,
                indent: o2,
                type: a2 && "bullet" === a2[1] ? "bullet" : "ordered",
                element: t5
              };
            })(t4, s2)).filter((t4) => t4);
            for (; i2.length; ) {
              const t4 = [];
              let e4 = i2.shift();
              for (; e4; ) t4.push(e4), e4 = i2.length && i2[0]?.element === e4.element.nextElementSibling && i2[0].id === e4.id ? i2.shift() : null;
              const n4 = document.createElement("ul");
              t4.forEach((t5) => {
                const e5 = document.createElement("li");
                e5.setAttribute("data-list", t5.type), t5.indent > 1 && e5.setAttribute("class", "ql-indent-" + (t5.indent - 1)), e5.innerHTML = t5.element.innerHTML, n4.appendChild(e5);
              });
              const r3 = t4[0]?.element, {
                parentNode: s3
              } = r3 ?? {};
              r3 && s3?.replaceChild(n4, r3), t4.slice(1).forEach((t5) => {
                let {
                  element: e5
                } = t5;
                s3?.removeChild(e5);
              });
            }
          };
          const Oi = [function(t3) {
            "urn:schemas-microsoft-com:office:word" === t3.documentElement.getAttribute("xmlns:w") && Li(t3);
          }, function(t3) {
            t3.querySelector('[id^="docs-internal-guid-"]') && (((t4) => {
              Array.from(t4.querySelectorAll('b[style*="font-weight"]')).filter((t5) => t5.getAttribute("style")?.match(wi)).forEach((e3) => {
                const n3 = t4.createDocumentFragment();
                n3.append(...e3.childNodes), e3.parentNode?.replaceChild(n3, e3);
              });
            })(t3), ((t4) => {
              Array.from(t4.querySelectorAll("br")).filter((t5) => Ai(t5.previousElementSibling) && Ai(t5.nextElementSibling)).forEach((t5) => {
                t5.parentNode?.removeChild(t5);
              });
            })(t3));
          }], Ti = (t3) => {
            t3.documentElement && Oi.forEach((e3) => {
              e3(t3);
            });
          }, Si = is("quill:clipboard"), Ci = [[Node.TEXT_NODE, function(t3, e3, n3) {
            let r2 = t3.data;
            if ("O:P" === t3.parentElement?.tagName) return e3.insert(r2.trim());
            if (!Di(t3)) {
              if (0 === r2.trim().length && r2.includes("\n") && !function(t4, e4) {
                return t4.previousElementSibling && t4.nextElementSibling && !Bi(t4.previousElementSibling, e4) && !Bi(t4.nextElementSibling, e4);
              }(t3, n3)) return e3;
              const s2 = (t4, e4) => {
                const n4 = e4.replace(/[^\u00a0]/g, "");
                return n4.length < 1 && t4 ? " " : n4;
              };
              r2 = r2.replace(/\r\n/g, " ").replace(/\n/g, " "), r2 = r2.replace(/\s\s+/g, s2.bind(s2, true)), (null == t3.previousSibling && null != t3.parentElement && Bi(t3.parentElement, n3) || t3.previousSibling instanceof Element && Bi(t3.previousSibling, n3)) && (r2 = r2.replace(/^\s+/, s2.bind(s2, false))), (null == t3.nextSibling && null != t3.parentElement && Bi(t3.parentElement, n3) || t3.nextSibling instanceof Element && Bi(t3.nextSibling, n3)) && (r2 = r2.replace(/\s+$/, s2.bind(s2, false)));
            }
            return e3.insert(r2);
          }], [Node.TEXT_NODE, Hi], ["br", function(t3, e3) {
            Mi(e3, "\n") || e3.insert("\n");
            return e3;
          }], [Node.ELEMENT_NODE, Hi], [Node.ELEMENT_NODE, function(t3, e3, n3) {
            const r2 = n3.query(t3);
            if (null == r2) return e3;
            if (r2.prototype instanceof hn) {
              const e4 = {}, s2 = r2.value(t3);
              if (null != s2) return e4[r2.blotName] = s2, new bn().insert(e4, r2.formats(t3, n3));
            } else if (r2.prototype instanceof an && !Mi(e3, "\n") && e3.insert("\n"), "blotName" in r2 && "formats" in r2 && "function" == typeof r2.formats) return Ii(e3, r2.blotName, r2.formats(t3, n3), n3);
            return e3;
          }], [Node.ELEMENT_NODE, function(t3, e3, n3) {
            const r2 = ze.keys(t3), s2 = Ke.keys(t3), i2 = Ze.keys(t3), o2 = {};
            return r2.concat(s2).concat(i2).forEach((e4) => {
              let r3 = n3.query(e4, Pe.ATTRIBUTE);
              null != r3 && (o2[r3.attrName] = r3.value(t3), o2[r3.attrName]) || (r3 = ji[e4], null == r3 || r3.attrName !== e4 && r3.keyName !== e4 || (o2[r3.attrName] = r3.value(t3) || void 0), r3 = Ri[e4], null == r3 || r3.attrName !== e4 && r3.keyName !== e4 || (r3 = Ri[e4], o2[r3.attrName] = r3.value(t3) || void 0));
            }), Object.entries(o2).reduce((t4, e4) => {
              let [r3, s3] = e4;
              return Ii(t4, r3, s3, n3);
            }, e3);
          }], [Node.ELEMENT_NODE, function(t3, e3, n3) {
            const r2 = {}, s2 = t3.style || {};
            "italic" === s2.fontStyle && (r2.italic = true);
            "underline" === s2.textDecoration && (r2.underline = true);
            "line-through" === s2.textDecoration && (r2.strike = true);
            (s2.fontWeight?.startsWith("bold") || parseInt(s2.fontWeight, 10) >= 700) && (r2.bold = true);
            if (e3 = Object.entries(r2).reduce((t4, e4) => {
              let [r3, s3] = e4;
              return Ii(t4, r3, s3, n3);
            }, e3), parseFloat(s2.textIndent || 0) > 0) return new bn().insert("	").concat(e3);
            return e3;
          }], ["li", function(t3, e3, n3) {
            const r2 = n3.query(t3);
            if (null == r2 || "list" !== r2.blotName || !Mi(e3, "\n")) return e3;
            let s2 = -1, i2 = t3.parentNode;
            for (; null != i2; ) ["OL", "UL"].includes(i2.tagName) && (s2 += 1), i2 = i2.parentNode;
            return s2 <= 0 ? e3 : e3.reduce((t4, e4) => e4.insert ? e4.attributes && "number" == typeof e4.attributes.indent ? t4.push(e4) : t4.insert(e4.insert, __spreadValues({
              indent: s2
            }, e4.attributes || {})) : t4, new bn());
          }], ["ol, ul", function(t3, e3, n3) {
            const r2 = t3;
            let s2 = "OL" === r2.tagName ? "ordered" : "bullet";
            const i2 = r2.getAttribute("data-checked");
            i2 && (s2 = "true" === i2 ? "checked" : "unchecked");
            return Ii(e3, "list", s2, n3);
          }], ["pre", function(t3, e3, n3) {
            const r2 = n3.query("code-block"), s2 = !r2 || !("formats" in r2) || "function" != typeof r2.formats || r2.formats(t3, n3);
            return Ii(e3, "code-block", s2, n3);
          }], ["tr", function(t3, e3, n3) {
            const r2 = "TABLE" === t3.parentElement?.tagName ? t3.parentElement : t3.parentElement?.parentElement;
            if (null != r2) {
              return Ii(e3, "table", Array.from(r2.querySelectorAll("tr")).indexOf(t3) + 1, n3);
            }
            return e3;
          }], ["b", zi("bold")], ["i", zi("italic")], ["strike", zi("strike")], ["style", function() {
            return new bn();
          }]], ji = [Ws, ii].reduce((t3, e3) => (t3[e3.keyName] = e3, t3), {}), Ri = [Gs, ti, Ys, li, ui, di].reduce((t3, e3) => (t3[e3.keyName] = e3, t3), {});
          function Ii(t3, e3, n3, r2) {
            return r2.query(e3) ? t3.reduce((t4, r3) => {
              if (!r3.insert) return t4;
              if (r3.attributes && r3.attributes[e3]) return t4.push(r3);
              const s2 = n3 ? {
                [e3]: n3
              } : {};
              return t4.insert(r3.insert, __spreadValues(__spreadValues({}, s2), r3.attributes));
            }, new bn()) : t3;
          }
          function Mi(t3, e3) {
            let n3 = "";
            for (let r2 = t3.ops.length - 1; r2 >= 0 && n3.length < e3.length; --r2) {
              const e4 = t3.ops[r2];
              if ("string" != typeof e4.insert) break;
              n3 = e4.insert + n3;
            }
            return n3.slice(-1 * e3.length) === e3;
          }
          function Bi(t3, e3) {
            if (!(t3 instanceof Element)) return false;
            const n3 = e3.query(t3);
            return !(n3 && n3.prototype instanceof hn) && ["address", "article", "blockquote", "canvas", "dd", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "iframe", "li", "main", "nav", "ol", "output", "p", "pre", "section", "table", "td", "tr", "ul", "video"].includes(t3.tagName.toLowerCase());
          }
          const Ui = /* @__PURE__ */ new WeakMap();
          function Di(t3) {
            return null != t3 && (Ui.has(t3) || ("PRE" === t3.tagName ? Ui.set(t3, true) : Ui.set(t3, Di(t3.parentNode))), Ui.get(t3));
          }
          function Pi(t3, e3, n3, r2, s2) {
            return e3.nodeType === e3.TEXT_NODE ? r2.reduce((n4, r3) => r3(e3, n4, t3), new bn()) : e3.nodeType === e3.ELEMENT_NODE ? Array.from(e3.childNodes || []).reduce((i2, o2) => {
              let l2 = Pi(t3, o2, n3, r2, s2);
              return o2.nodeType === e3.ELEMENT_NODE && (l2 = n3.reduce((e4, n4) => n4(o2, e4, t3), l2), l2 = (s2.get(o2) || []).reduce((e4, n4) => n4(o2, e4, t3), l2)), i2.concat(l2);
            }, new bn()) : new bn();
          }
          function zi(t3) {
            return (e3, n3, r2) => Ii(n3, t3, true, r2);
          }
          function Hi(t3, e3, n3) {
            if (!Mi(e3, "\n")) {
              if (Bi(t3, n3) && (t3.childNodes.length > 0 || t3 instanceof HTMLParagraphElement)) return e3.insert("\n");
              if (e3.length() > 0 && t3.nextSibling) {
                let r2 = t3.nextSibling;
                for (; null != r2; ) {
                  if (Bi(r2, n3)) return e3.insert("\n");
                  const t4 = n3.query(r2);
                  if (t4 && t4.prototype instanceof Zr) return e3.insert("\n");
                  r2 = r2.firstChild;
                }
              }
            }
            return e3;
          }
          function Fi(t3, e3) {
            let n3 = e3;
            for (let e4 = t3.length - 1; e4 >= 0; e4 -= 1) {
              const r2 = t3[e4];
              t3[e4] = {
                delta: n3.transform(r2.delta, true),
                range: r2.range && $i(r2.range, n3)
              }, n3 = r2.delta.transform(n3), 0 === t3[e4].delta.length() && t3.splice(e4, 1);
            }
          }
          function $i(t3, e3) {
            if (!t3) return t3;
            const n3 = e3.transformPosition(t3.index);
            return {
              index: n3,
              length: e3.transformPosition(t3.index + t3.length) - n3
            };
          }
          class Vi extends xs {
            constructor(t3, e3) {
              super(t3, e3), t3.root.addEventListener("drop", (e4) => {
                e4.preventDefault();
                let n3 = null;
                if (document.caretRangeFromPoint) n3 = document.caretRangeFromPoint(e4.clientX, e4.clientY);
                else if (document.caretPositionFromPoint) {
                  const t4 = document.caretPositionFromPoint(e4.clientX, e4.clientY);
                  n3 = document.createRange(), n3.setStart(t4.offsetNode, t4.offset), n3.setEnd(t4.offsetNode, t4.offset);
                }
                const r2 = n3 && t3.selection.normalizeNative(n3);
                if (r2) {
                  const n4 = t3.selection.normalizedToRange(r2);
                  e4.dataTransfer?.files && this.upload(n4, e4.dataTransfer.files);
                }
              });
            }
            upload(t3, e3) {
              const n3 = [];
              Array.from(e3).forEach((t4) => {
                t4 && this.options.mimetypes?.includes(t4.type) && n3.push(t4);
              }), n3.length > 0 && this.options.handler.call(this, t3, n3);
            }
          }
          Vi.DEFAULTS = {
            mimetypes: ["image/png", "image/jpeg"],
            handler(t3, e3) {
              if (!this.quill.scroll.query("image")) return;
              const n3 = e3.map((t4) => new Promise((e4) => {
                const n4 = new FileReader();
                n4.onload = () => {
                  e4(n4.result);
                }, n4.readAsDataURL(t4);
              }));
              Promise.all(n3).then((e4) => {
                const n4 = e4.reduce((t4, e5) => t4.insert({
                  image: e5
                }), new bn().retain(t3.index).delete(t3.length));
                this.quill.updateContents(n4, ls.sources.USER), this.quill.setSelection(t3.index + e4.length, ls.sources.SILENT);
              });
            }
          };
          const Ki = Vi, Wi = ["insertText", "insertReplacementText"];
          const Zi = class extends xs {
            constructor(t3, e3) {
              super(t3, e3), t3.root.addEventListener("beforeinput", (t4) => {
                this.handleBeforeInput(t4);
              }), /Android/i.test(navigator.userAgent) || t3.on(Rs.events.COMPOSITION_BEFORE_START, () => {
                this.handleCompositionStart();
              });
            }
            deleteRange(t3) {
              Ni({
                range: t3,
                quill: this.quill
              });
            }
            replaceText(t3) {
              let e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
              if (0 === t3.length) return false;
              if (e3) {
                const n3 = this.quill.getFormat(t3.index, 1);
                this.deleteRange(t3), this.quill.updateContents(new bn().retain(t3.index).insert(e3, n3), Rs.sources.USER);
              } else this.deleteRange(t3);
              return this.quill.setSelection(t3.index + e3.length, 0, Rs.sources.SILENT), true;
            }
            handleBeforeInput(t3) {
              if (this.quill.composition.isComposing || t3.defaultPrevented || !Wi.includes(t3.inputType)) return;
              const e3 = t3.getTargetRanges ? t3.getTargetRanges()[0] : null;
              if (!e3 || true === e3.collapsed) return;
              const n3 = function(t4) {
                if ("string" == typeof t4.data) return t4.data;
                if (t4.dataTransfer?.types.includes("text/plain")) return t4.dataTransfer.getData("text/plain");
                return null;
              }(t3);
              if (null == n3) return;
              const r2 = this.quill.selection.normalizeNative(e3), s2 = r2 ? this.quill.selection.normalizedToRange(r2) : null;
              s2 && this.replaceText(s2, n3) && t3.preventDefault();
            }
            handleCompositionStart() {
              const t3 = this.quill.getSelection();
              t3 && this.replaceText(t3);
            }
          }, Gi = /Mac/i.test(navigator.platform);
          const Xi = class extends xs {
            isListening = false;
            selectionChangeDeadline = 0;
            constructor(t3, e3) {
              super(t3, e3), this.handleArrowKeys(), this.handleNavigationShortcuts();
            }
            handleArrowKeys() {
              this.quill.keyboard.addBinding({
                key: ["ArrowLeft", "ArrowRight"],
                offset: 0,
                shiftKey: null,
                handler(t3, e3) {
                  let {
                    line: n3,
                    event: r2
                  } = e3;
                  if (!(n3 instanceof rn && n3.uiNode)) return true;
                  const s2 = "rtl" === getComputedStyle(n3.domNode).direction;
                  return !!(s2 && "ArrowRight" !== r2.key || !s2 && "ArrowLeft" !== r2.key) || (this.quill.setSelection(t3.index - 1, t3.length + (r2.shiftKey ? 1 : 0), Rs.sources.USER), false);
                }
              });
            }
            handleNavigationShortcuts() {
              this.quill.root.addEventListener("keydown", (t3) => {
                !t3.defaultPrevented && ((t4) => "ArrowLeft" === t4.key || "ArrowRight" === t4.key || "ArrowUp" === t4.key || "ArrowDown" === t4.key || "Home" === t4.key || !(!Gi || "a" !== t4.key || true !== t4.ctrlKey))(t3) && this.ensureListeningToSelectionChange();
              });
            }
            ensureListeningToSelectionChange() {
              if (this.selectionChangeDeadline = Date.now() + 100, this.isListening) return;
              this.isListening = true;
              document.addEventListener("selectionchange", () => {
                this.isListening = false, Date.now() <= this.selectionChangeDeadline && this.handleSelectionChange();
              }, {
                once: true
              });
            }
            handleSelectionChange() {
              const t3 = document.getSelection();
              if (!t3) return;
              const e3 = t3.getRangeAt(0);
              if (true !== e3.collapsed || 0 !== e3.startOffset) return;
              const n3 = this.quill.scroll.find(e3.startContainer);
              if (!(n3 instanceof rn && n3.uiNode)) return;
              const r2 = document.createRange();
              r2.setStartAfter(n3.uiNode), r2.setEndAfter(n3.uiNode), t3.removeAllRanges(), t3.addRange(r2);
            }
          };
          Rs.register({
            "blots/block": Wr,
            "blots/block/embed": Zr,
            "blots/break": Hr,
            "blots/container": zs,
            "blots/cursor": Yr,
            "blots/embed": ws,
            "blots/inline": Kr,
            "blots/scroll": Vs,
            "blots/text": Fr,
            "modules/clipboard": class extends xs {
              static DEFAULTS = {
                matchers: []
              };
              constructor(t3, e3) {
                super(t3, e3), this.quill.root.addEventListener("copy", (t4) => this.onCaptureCopy(t4, false)), this.quill.root.addEventListener("cut", (t4) => this.onCaptureCopy(t4, true)), this.quill.root.addEventListener("paste", this.onCapturePaste.bind(this)), this.matchers = [], Ci.concat(this.options.matchers ?? []).forEach((t4) => {
                  let [e4, n3] = t4;
                  this.addMatcher(e4, n3);
                });
              }
              addMatcher(t3, e3) {
                this.matchers.push([t3, e3]);
              }
              convert(t3) {
                let {
                  html: e3,
                  text: n3
                } = t3, r2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                if (r2[ni.blotName]) return new bn().insert(n3 || "", {
                  [ni.blotName]: r2[ni.blotName]
                });
                if (!e3) return new bn().insert(n3 || "", r2);
                const s2 = this.convertHTML(e3);
                return Mi(s2, "\n") && (null == s2.ops[s2.ops.length - 1].attributes || r2.table) ? s2.compose(new bn().retain(s2.length() - 1).delete(1)) : s2;
              }
              normalizeHTML(t3) {
                Ti(t3);
              }
              convertHTML(t3) {
                const e3 = new DOMParser().parseFromString(t3, "text/html");
                this.normalizeHTML(e3);
                const n3 = e3.body, r2 = /* @__PURE__ */ new WeakMap(), [s2, i2] = this.prepareMatching(n3, r2);
                return Pi(this.quill.scroll, n3, s2, i2, r2);
              }
              dangerouslyPasteHTML(t3, e3) {
                let n3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : Rs.sources.API;
                if ("string" == typeof t3) {
                  const n4 = this.convert({
                    html: t3,
                    text: ""
                  });
                  this.quill.setContents(n4, e3), this.quill.setSelection(0, Rs.sources.SILENT);
                } else {
                  const r2 = this.convert({
                    html: e3,
                    text: ""
                  });
                  this.quill.updateContents(new bn().retain(t3).concat(r2), n3), this.quill.setSelection(t3 + r2.length(), Rs.sources.SILENT);
                }
              }
              onCaptureCopy(t3) {
                let e3 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                if (t3.defaultPrevented) return;
                t3.preventDefault();
                const [n3] = this.quill.selection.getRange();
                if (null == n3) return;
                const {
                  html: r2,
                  text: s2
                } = this.onCopy(n3, e3);
                t3.clipboardData?.setData("text/plain", s2), t3.clipboardData?.setData("text/html", r2), e3 && Ni({
                  range: n3,
                  quill: this.quill
                });
              }
              normalizeURIList(t3) {
                return t3.split(/\r?\n/).filter((t4) => "#" !== t4[0]).join("\n");
              }
              onCapturePaste(t3) {
                if (t3.defaultPrevented || !this.quill.isEnabled()) return;
                t3.preventDefault();
                const e3 = this.quill.getSelection(true);
                if (null == e3) return;
                const n3 = t3.clipboardData?.getData("text/html");
                let r2 = t3.clipboardData?.getData("text/plain");
                if (!n3 && !r2) {
                  const e4 = t3.clipboardData?.getData("text/uri-list");
                  e4 && (r2 = this.normalizeURIList(e4));
                }
                const s2 = Array.from(t3.clipboardData?.files || []);
                if (!n3 && s2.length > 0) this.quill.uploader.upload(e3, s2);
                else {
                  if (n3 && s2.length > 0) {
                    const t4 = new DOMParser().parseFromString(n3, "text/html");
                    if (1 === t4.body.childElementCount && "IMG" === t4.body.firstElementChild?.tagName) return void this.quill.uploader.upload(e3, s2);
                  }
                  this.onPaste(e3, {
                    html: n3,
                    text: r2
                  });
                }
              }
              onCopy(t3) {
                const e3 = this.quill.getText(t3);
                return {
                  html: this.quill.getSemanticHTML(t3),
                  text: e3
                };
              }
              onPaste(t3, e3) {
                let {
                  text: n3,
                  html: r2
                } = e3;
                const s2 = this.quill.getFormat(t3.index), i2 = this.convert({
                  text: n3,
                  html: r2
                }, s2);
                Si.log("onPaste", i2, {
                  text: n3,
                  html: r2
                });
                const o2 = new bn().retain(t3.index).delete(t3.length).concat(i2);
                this.quill.updateContents(o2, Rs.sources.USER), this.quill.setSelection(o2.length() - t3.length, Rs.sources.SILENT), this.quill.scrollSelectionIntoView();
              }
              prepareMatching(t3, e3) {
                const n3 = [], r2 = [];
                return this.matchers.forEach((s2) => {
                  const [i2, o2] = s2;
                  switch (i2) {
                    case Node.TEXT_NODE:
                      r2.push(o2);
                      break;
                    case Node.ELEMENT_NODE:
                      n3.push(o2);
                      break;
                    default:
                      Array.from(t3.querySelectorAll(i2)).forEach((t4) => {
                        if (e3.has(t4)) {
                          const n4 = e3.get(t4);
                          n4?.push(o2);
                        } else e3.set(t4, [o2]);
                      });
                  }
                }), [n3, r2];
              }
            },
            "modules/history": class extends xs {
              static DEFAULTS = {
                delay: 1e3,
                maxStack: 100,
                userOnly: false
              };
              lastRecorded = 0;
              ignoreChange = false;
              stack = {
                undo: [],
                redo: []
              };
              currentRange = null;
              constructor(t3, e3) {
                super(t3, e3), this.quill.on(Rs.events.EDITOR_CHANGE, (t4, e4, n3, r2) => {
                  t4 === Rs.events.SELECTION_CHANGE ? e4 && r2 !== Rs.sources.SILENT && (this.currentRange = e4) : t4 === Rs.events.TEXT_CHANGE && (this.ignoreChange || (this.options.userOnly && r2 !== Rs.sources.USER ? this.transform(e4) : this.record(e4, n3)), this.currentRange = $i(this.currentRange, e4));
                }), this.quill.keyboard.addBinding({
                  key: "z",
                  shortKey: true
                }, this.undo.bind(this)), this.quill.keyboard.addBinding({
                  key: ["z", "Z"],
                  shortKey: true,
                  shiftKey: true
                }, this.redo.bind(this)), /Win/i.test(navigator.platform) && this.quill.keyboard.addBinding({
                  key: "y",
                  shortKey: true
                }, this.redo.bind(this)), this.quill.root.addEventListener("beforeinput", (t4) => {
                  "historyUndo" === t4.inputType ? (this.undo(), t4.preventDefault()) : "historyRedo" === t4.inputType && (this.redo(), t4.preventDefault());
                });
              }
              change(t3, e3) {
                if (0 === this.stack[t3].length) return;
                const n3 = this.stack[t3].pop();
                if (!n3) return;
                const r2 = this.quill.getContents(), s2 = n3.delta.invert(r2);
                this.stack[e3].push({
                  delta: s2,
                  range: $i(n3.range, s2)
                }), this.lastRecorded = 0, this.ignoreChange = true, this.quill.updateContents(n3.delta, Rs.sources.USER), this.ignoreChange = false, this.restoreSelection(n3);
              }
              clear() {
                this.stack = {
                  undo: [],
                  redo: []
                };
              }
              cutoff() {
                this.lastRecorded = 0;
              }
              record(t3, e3) {
                if (0 === t3.ops.length) return;
                this.stack.redo = [];
                let n3 = t3.invert(e3), r2 = this.currentRange;
                const s2 = Date.now();
                if (this.lastRecorded + this.options.delay > s2 && this.stack.undo.length > 0) {
                  const t4 = this.stack.undo.pop();
                  t4 && (n3 = n3.compose(t4.delta), r2 = t4.range);
                } else this.lastRecorded = s2;
                0 !== n3.length() && (this.stack.undo.push({
                  delta: n3,
                  range: r2
                }), this.stack.undo.length > this.options.maxStack && this.stack.undo.shift());
              }
              redo() {
                this.change("redo", "undo");
              }
              transform(t3) {
                Fi(this.stack.undo, t3), Fi(this.stack.redo, t3);
              }
              undo() {
                this.change("undo", "redo");
              }
              restoreSelection(t3) {
                if (t3.range) this.quill.setSelection(t3.range, Rs.sources.USER);
                else {
                  const e3 = function(t4, e4) {
                    const n3 = e4.reduce((t5, e5) => t5 + (e5.delete || 0), 0);
                    let r2 = e4.length() - n3;
                    (function(t5, e5) {
                      const n4 = e5.ops[e5.ops.length - 1];
                      if (null == n4) return false;
                      if (null != n4.insert) return "string" == typeof n4.insert && n4.insert.endsWith("\n");
                      if (null != n4.attributes) return Object.keys(n4.attributes).some((e6) => null != t5.query(e6, Pe.BLOCK));
                      return false;
                    })(t4, e4) && (r2 -= 1);
                    return r2;
                  }(this.quill.scroll, t3.delta);
                  this.quill.setSelection(e3, Rs.sources.USER);
                }
              }
            },
            "modules/keyboard": gi,
            "modules/uploader": Ki,
            "modules/input": Zi,
            "modules/uiNode": Xi
          });
          const Qi = Rs;
          const Yi = new class extends Ke {
            add(t3, e3) {
              let n3 = 0;
              if ("+1" === e3 || "-1" === e3) {
                const r2 = this.value(t3) || 0;
                n3 = "+1" === e3 ? r2 + 1 : r2 - 1;
              } else "number" == typeof e3 && (n3 = e3);
              return 0 === n3 ? (this.remove(t3), true) : super.add(t3, n3.toString());
            }
            canAdd(t3, e3) {
              return super.canAdd(t3, e3) || super.canAdd(t3, parseInt(e3, 10));
            }
            value(t3) {
              return parseInt(super.value(t3), 10) || void 0;
            }
          }("indent", "ql-indent", {
            scope: Pe.BLOCK,
            whitelist: [1, 2, 3, 4, 5, 6, 7, 8]
          }), Ji = Yi;
          const to = class extends Wr {
            static blotName = "blockquote";
            static tagName = "blockquote";
          };
          const eo = class extends Wr {
            static blotName = "header";
            static tagName = ["H1", "H2", "H3", "H4", "H5", "H6"];
            static formats(t3) {
              return this.tagName.indexOf(t3.tagName) + 1;
            }
          };
          class no extends zs {
          }
          no.blotName = "list-container", no.tagName = "OL";
          class ro extends Wr {
            static create(t3) {
              const e3 = super.create();
              return e3.setAttribute("data-list", t3), e3;
            }
            static formats(t3) {
              return t3.getAttribute("data-list") || void 0;
            }
            static register() {
              Rs.register(no);
            }
            constructor(t3, e3) {
              super(t3, e3);
              const n3 = e3.ownerDocument.createElement("span"), r2 = (n4) => {
                if (!t3.isEnabled()) return;
                const r3 = this.statics.formats(e3, t3);
                "checked" === r3 ? (this.format("list", "unchecked"), n4.preventDefault()) : "unchecked" === r3 && (this.format("list", "checked"), n4.preventDefault());
              };
              n3.addEventListener("mousedown", r2), n3.addEventListener("touchstart", r2), this.attachUI(n3);
            }
            format(t3, e3) {
              t3 === this.statics.blotName && e3 ? this.domNode.setAttribute("data-list", e3) : super.format(t3, e3);
            }
          }
          ro.blotName = "list", ro.tagName = "LI", no.allowedChildren = [ro], ro.requiredContainer = no;
          const so = class extends Kr {
            static blotName = "bold";
            static tagName = ["STRONG", "B"];
            static create() {
              return super.create();
            }
            static formats() {
              return true;
            }
            optimize(t3) {
              super.optimize(t3), this.domNode.tagName !== this.statics.tagName[0] && this.replaceWith(this.statics.blotName);
            }
          };
          const io = class extends so {
            static blotName = "italic";
            static tagName = ["EM", "I"];
          };
          class oo extends Kr {
            static blotName = "link";
            static tagName = "A";
            static SANITIZED_URL = "about:blank";
            static PROTOCOL_WHITELIST = ["http", "https", "mailto", "tel", "sms"];
            static create(t3) {
              const e3 = super.create(t3);
              return e3.setAttribute("href", this.sanitize(t3)), e3.setAttribute("rel", "noopener noreferrer"), e3.setAttribute("target", "_blank"), e3;
            }
            static formats(t3) {
              return t3.getAttribute("href");
            }
            static sanitize(t3) {
              return lo(t3, this.PROTOCOL_WHITELIST) ? t3 : this.SANITIZED_URL;
            }
            format(t3, e3) {
              t3 === this.statics.blotName && e3 ? this.domNode.setAttribute("href", this.constructor.sanitize(e3)) : super.format(t3, e3);
            }
          }
          function lo(t3, e3) {
            const n3 = document.createElement("a");
            n3.href = t3;
            const r2 = n3.href.slice(0, n3.href.indexOf(":"));
            return e3.indexOf(r2) > -1;
          }
          const ao = class extends Kr {
            static blotName = "script";
            static tagName = ["SUB", "SUP"];
            static create(t3) {
              return "super" === t3 ? document.createElement("sup") : "sub" === t3 ? document.createElement("sub") : super.create(t3);
            }
            static formats(t3) {
              return "SUB" === t3.tagName ? "sub" : "SUP" === t3.tagName ? "super" : void 0;
            }
          };
          const co = class extends so {
            static blotName = "strike";
            static tagName = ["S", "STRIKE"];
          };
          const uo = class extends Kr {
            static blotName = "underline";
            static tagName = "U";
          };
          const ho = class extends ws {
            static blotName = "formula";
            static className = "ql-formula";
            static tagName = "SPAN";
            static create(t3) {
              if (null == window.katex) throw new Error("Formula module requires KaTeX.");
              const e3 = super.create(t3);
              return "string" == typeof t3 && (window.katex.render(t3, e3, {
                throwOnError: false,
                errorColor: "#f00"
              }), e3.setAttribute("data-value", t3)), e3;
            }
            static value(t3) {
              return t3.getAttribute("data-value");
            }
            html() {
              const {
                formula: t3
              } = this.value();
              return `<span>${t3}</span>`;
            }
          }, fo = ["alt", "height", "width"];
          const po = class extends hn {
            static blotName = "image";
            static tagName = "IMG";
            static create(t3) {
              const e3 = super.create(t3);
              return "string" == typeof t3 && e3.setAttribute("src", this.sanitize(t3)), e3;
            }
            static formats(t3) {
              return fo.reduce((e3, n3) => (t3.hasAttribute(n3) && (e3[n3] = t3.getAttribute(n3)), e3), {});
            }
            static match(t3) {
              return /\.(jpe?g|gif|png)$/.test(t3) || /^data:image\/.+;base64/.test(t3);
            }
            static sanitize(t3) {
              return lo(t3, ["http", "https", "data"]) ? t3 : "//:0";
            }
            static value(t3) {
              return t3.getAttribute("src");
            }
            format(t3, e3) {
              fo.indexOf(t3) > -1 ? e3 ? this.domNode.setAttribute(t3, e3) : this.domNode.removeAttribute(t3) : super.format(t3, e3);
            }
          }, go = ["height", "width"];
          const mo = class extends Zr {
            static blotName = "video";
            static className = "ql-video";
            static tagName = "IFRAME";
            static create(t3) {
              const e3 = super.create(t3);
              return e3.setAttribute("frameborder", "0"), e3.setAttribute("allowfullscreen", "true"), e3.setAttribute("src", this.sanitize(t3)), e3;
            }
            static formats(t3) {
              return go.reduce((e3, n3) => (t3.hasAttribute(n3) && (e3[n3] = t3.getAttribute(n3)), e3), {});
            }
            static sanitize(t3) {
              return oo.sanitize(t3);
            }
            static value(t3) {
              return t3.getAttribute("src");
            }
            format(t3, e3) {
              go.indexOf(t3) > -1 ? e3 ? this.domNode.setAttribute(t3, e3) : this.domNode.removeAttribute(t3) : super.format(t3, e3);
            }
            html() {
              const {
                video: t3
              } = this.value();
              return `<a href="${t3}">${t3}</a>`;
            }
          }, bo = new Ke("code-token", "hljs", {
            scope: Pe.INLINE
          });
          class yo extends Kr {
            static formats(t3, e3) {
              for (; null != t3 && t3 !== e3.domNode; ) {
                if (t3.classList && t3.classList.contains(ni.className)) return super.formats(t3, e3);
                t3 = t3.parentNode;
              }
            }
            constructor(t3, e3, n3) {
              super(t3, e3, n3), bo.add(this.domNode, n3);
            }
            format(t3, e3) {
              t3 !== yo.blotName ? super.format(t3, e3) : e3 ? bo.add(this.domNode, e3) : (bo.remove(this.domNode), this.domNode.classList.remove(this.statics.className));
            }
            optimize() {
              super.optimize(...arguments), bo.value(this.domNode) || this.unwrap();
            }
          }
          yo.blotName = "code-token", yo.className = "ql-token";
          class vo extends ni {
            static create(t3) {
              const e3 = super.create(t3);
              return "string" == typeof t3 && e3.setAttribute("data-language", t3), e3;
            }
            static formats(t3) {
              return t3.getAttribute("data-language") || "plain";
            }
            static register() {
            }
            format(t3, e3) {
              t3 === this.statics.blotName && e3 ? this.domNode.setAttribute("data-language", e3) : super.format(t3, e3);
            }
            replaceWith(t3, e3) {
              return this.formatAt(0, this.length(), yo.blotName, false), super.replaceWith(t3, e3);
            }
          }
          class xo extends ei {
            attach() {
              super.attach(), this.forceNext = false, this.scroll.emitMount(this);
            }
            format(t3, e3) {
              t3 === vo.blotName && (this.forceNext = true, this.children.forEach((n3) => {
                n3.format(t3, e3);
              }));
            }
            formatAt(t3, e3, n3, r2) {
              n3 === vo.blotName && (this.forceNext = true), super.formatAt(t3, e3, n3, r2);
            }
            highlight(t3) {
              let e3 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
              if (null == this.children.head) return;
              const n3 = `${Array.from(this.domNode.childNodes).filter((t4) => t4 !== this.uiNode).map((t4) => t4.textContent).join("\n")}
`, r2 = vo.formats(this.children.head.domNode);
              if (e3 || this.forceNext || this.cachedText !== n3) {
                if (n3.trim().length > 0 || null == this.cachedText) {
                  const e4 = this.children.reduce((t4, e5) => t4.concat(Gr(e5, false)), new bn()), s2 = t3(n3, r2);
                  e4.diff(s2).reduce((t4, e5) => {
                    let {
                      retain: n4,
                      attributes: r3
                    } = e5;
                    return n4 ? (r3 && Object.keys(r3).forEach((e6) => {
                      [vo.blotName, yo.blotName].includes(e6) && this.formatAt(t4, n4, e6, r3[e6]);
                    }), t4 + n4) : t4;
                  }, 0);
                }
                this.cachedText = n3, this.forceNext = false;
              }
            }
            html(t3, e3) {
              const [n3] = this.children.find(t3);
              return `<pre data-language="${n3 ? vo.formats(n3.domNode) : "plain"}">
${$r(this.code(t3, e3))}
</pre>`;
            }
            optimize(t3) {
              if (super.optimize(t3), null != this.parent && null != this.children.head && null != this.uiNode) {
                const t4 = vo.formats(this.children.head.domNode);
                t4 !== this.uiNode.value && (this.uiNode.value = t4);
              }
            }
          }
          xo.allowedChildren = [vo], vo.requiredContainer = xo, vo.allowedChildren = [yo, Yr, Fr, Hr];
          class No extends xs {
            static register() {
              Rs.register(yo, true), Rs.register(vo, true), Rs.register(xo, true);
            }
            constructor(t3, e3) {
              if (super(t3, e3), null == this.options.hljs) throw new Error("Syntax module requires highlight.js. Please include the library on the page before Quill.");
              this.languages = this.options.languages.reduce((t4, e4) => {
                let {
                  key: n3
                } = e4;
                return t4[n3] = true, t4;
              }, {}), this.highlightBlot = this.highlightBlot.bind(this), this.initListener(), this.initTimer();
            }
            initListener() {
              this.quill.on(Rs.events.SCROLL_BLOT_MOUNT, (t3) => {
                if (!(t3 instanceof xo)) return;
                const e3 = this.quill.root.ownerDocument.createElement("select");
                this.options.languages.forEach((t4) => {
                  let {
                    key: n3,
                    label: r2
                  } = t4;
                  const s2 = e3.ownerDocument.createElement("option");
                  s2.textContent = r2, s2.setAttribute("value", n3), e3.appendChild(s2);
                }), e3.addEventListener("change", () => {
                  t3.format(vo.blotName, e3.value), this.quill.root.focus(), this.highlight(t3, true);
                }), null == t3.uiNode && (t3.attachUI(e3), t3.children.head && (e3.value = vo.formats(t3.children.head.domNode)));
              });
            }
            initTimer() {
              let t3 = null;
              this.quill.on(Rs.events.SCROLL_OPTIMIZE, () => {
                t3 && clearTimeout(t3), t3 = setTimeout(() => {
                  this.highlight(), t3 = null;
                }, this.options.interval);
              });
            }
            highlight() {
              let t3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, e3 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
              if (this.quill.selection.composing) return;
              this.quill.update(Rs.sources.USER);
              const n3 = this.quill.getSelection();
              (null == t3 ? this.quill.scroll.descendants(xo) : [t3]).forEach((t4) => {
                t4.highlight(this.highlightBlot, e3);
              }), this.quill.update(Rs.sources.SILENT), null != n3 && this.quill.setSelection(n3, Rs.sources.SILENT);
            }
            highlightBlot(t3) {
              let e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "plain";
              if (e3 = this.languages[e3] ? e3 : "plain", "plain" === e3) return $r(t3).split("\n").reduce((t4, n4, r2) => (0 !== r2 && t4.insert("\n", {
                [ni.blotName]: e3
              }), t4.insert(n4)), new bn());
              const n3 = this.quill.root.ownerDocument.createElement("div");
              return n3.classList.add(ni.className), n3.innerHTML = ((t4, e4, n4) => {
                if ("string" == typeof t4.versionString) {
                  const r2 = t4.versionString.split(".")[0];
                  if (parseInt(r2, 10) >= 11) return t4.highlight(n4, {
                    language: e4
                  }).value;
                }
                return t4.highlight(e4, n4).value;
              })(this.options.hljs, e3, t3), Pi(this.quill.scroll, n3, [(t4, e4) => {
                const n4 = bo.value(t4);
                return n4 ? e4.compose(new bn().retain(e4.length(), {
                  [yo.blotName]: n4
                })) : e4;
              }], [(t4, n4) => t4.data.split("\n").reduce((t5, n5, r2) => (0 !== r2 && t5.insert("\n", {
                [ni.blotName]: e3
              }), t5.insert(n5)), n4)], /* @__PURE__ */ new WeakMap());
            }
          }
          No.DEFAULTS = {
            hljs: window.hljs,
            interval: 1e3,
            languages: [{
              key: "plain",
              label: "Plain"
            }, {
              key: "bash",
              label: "Bash"
            }, {
              key: "cpp",
              label: "C++"
            }, {
              key: "cs",
              label: "C#"
            }, {
              key: "css",
              label: "CSS"
            }, {
              key: "diff",
              label: "Diff"
            }, {
              key: "xml",
              label: "HTML/XML"
            }, {
              key: "java",
              label: "Java"
            }, {
              key: "javascript",
              label: "JavaScript"
            }, {
              key: "markdown",
              label: "Markdown"
            }, {
              key: "php",
              label: "PHP"
            }, {
              key: "python",
              label: "Python"
            }, {
              key: "ruby",
              label: "Ruby"
            }, {
              key: "sql",
              label: "SQL"
            }]
          };
          class wo extends Wr {
            static blotName = "table";
            static tagName = "TD";
            static create(t3) {
              const e3 = super.create();
              return t3 ? e3.setAttribute("data-row", t3) : e3.setAttribute("data-row", ko()), e3;
            }
            static formats(t3) {
              if (t3.hasAttribute("data-row")) return t3.getAttribute("data-row");
            }
            cellOffset() {
              return this.parent ? this.parent.children.indexOf(this) : -1;
            }
            format(t3, e3) {
              t3 === wo.blotName && e3 ? this.domNode.setAttribute("data-row", e3) : super.format(t3, e3);
            }
            row() {
              return this.parent;
            }
            rowOffset() {
              return this.row() ? this.row().rowOffset() : -1;
            }
            table() {
              return this.row() && this.row().table();
            }
          }
          class Eo extends zs {
            static blotName = "table-row";
            static tagName = "TR";
            checkMerge() {
              if (super.checkMerge() && null != this.next.children.head) {
                const t3 = this.children.head.formats(), e3 = this.children.tail.formats(), n3 = this.next.children.head.formats(), r2 = this.next.children.tail.formats();
                return t3.table === e3.table && t3.table === n3.table && t3.table === r2.table;
              }
              return false;
            }
            optimize(t3) {
              super.optimize(t3), this.children.forEach((t4) => {
                if (null == t4.next) return;
                const e3 = t4.formats(), n3 = t4.next.formats();
                if (e3.table !== n3.table) {
                  const e4 = this.splitAfter(t4);
                  e4 && e4.optimize(), this.prev && this.prev.optimize();
                }
              });
            }
            rowOffset() {
              return this.parent ? this.parent.children.indexOf(this) : -1;
            }
            table() {
              return this.parent && this.parent.parent;
            }
          }
          class Ao extends zs {
            static blotName = "table-body";
            static tagName = "TBODY";
          }
          class qo extends zs {
            static blotName = "table-container";
            static tagName = "TABLE";
            balanceCells() {
              const t3 = this.descendants(Eo), e3 = t3.reduce((t4, e4) => Math.max(e4.children.length, t4), 0);
              t3.forEach((t4) => {
                new Array(e3 - t4.children.length).fill(0).forEach(() => {
                  let e4;
                  null != t4.children.head && (e4 = wo.formats(t4.children.head.domNode));
                  const n3 = this.scroll.create(wo.blotName, e4);
                  t4.appendChild(n3), n3.optimize();
                });
              });
            }
            cells(t3) {
              return this.rows().map((e3) => e3.children.at(t3));
            }
            deleteColumn(t3) {
              const [e3] = this.descendant(Ao);
              null != e3 && null != e3.children.head && e3.children.forEach((e4) => {
                const n3 = e4.children.at(t3);
                null != n3 && n3.remove();
              });
            }
            insertColumn(t3) {
              const [e3] = this.descendant(Ao);
              null != e3 && null != e3.children.head && e3.children.forEach((e4) => {
                const n3 = e4.children.at(t3), r2 = wo.formats(e4.children.head.domNode), s2 = this.scroll.create(wo.blotName, r2);
                e4.insertBefore(s2, n3);
              });
            }
            insertRow(t3) {
              const [e3] = this.descendant(Ao);
              if (null == e3 || null == e3.children.head) return;
              const n3 = ko(), r2 = this.scroll.create(Eo.blotName);
              e3.children.head.children.forEach(() => {
                const t4 = this.scroll.create(wo.blotName, n3);
                r2.appendChild(t4);
              });
              const s2 = e3.children.at(t3);
              e3.insertBefore(r2, s2);
            }
            rows() {
              const t3 = this.children.head;
              return null == t3 ? [] : t3.children.map((t4) => t4);
            }
          }
          function ko() {
            return `row-${Math.random().toString(36).slice(2, 6)}`;
          }
          qo.allowedChildren = [Ao], Ao.requiredContainer = qo, Ao.allowedChildren = [Eo], Eo.requiredContainer = Ao, Eo.allowedChildren = [wo], wo.requiredContainer = Eo;
          const _o = class extends xs {
            static register() {
              Rs.register(wo), Rs.register(Eo), Rs.register(Ao), Rs.register(qo);
            }
            constructor() {
              super(...arguments), this.listenBalanceCells();
            }
            balanceTables() {
              this.quill.scroll.descendants(qo).forEach((t3) => {
                t3.balanceCells();
              });
            }
            deleteColumn() {
              const [t3, , e3] = this.getTable();
              null != e3 && (t3.deleteColumn(e3.cellOffset()), this.quill.update(Rs.sources.USER));
            }
            deleteRow() {
              const [, t3] = this.getTable();
              null != t3 && (t3.remove(), this.quill.update(Rs.sources.USER));
            }
            deleteTable() {
              const [t3] = this.getTable();
              if (null == t3) return;
              const e3 = t3.offset();
              t3.remove(), this.quill.update(Rs.sources.USER), this.quill.setSelection(e3, Rs.sources.SILENT);
            }
            getTable() {
              let t3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.quill.getSelection();
              if (null == t3) return [null, null, null, -1];
              const [e3, n3] = this.quill.getLine(t3.index);
              if (null == e3 || e3.statics.blotName !== wo.blotName) return [null, null, null, -1];
              const r2 = e3.parent;
              return [r2.parent.parent, r2, e3, n3];
            }
            insertColumn(t3) {
              const e3 = this.quill.getSelection();
              if (!e3) return;
              const [n3, r2, s2] = this.getTable(e3);
              if (null == s2) return;
              const i2 = s2.cellOffset();
              n3.insertColumn(i2 + t3), this.quill.update(Rs.sources.USER);
              let o2 = r2.rowOffset();
              0 === t3 && (o2 += 1), this.quill.setSelection(e3.index + o2, e3.length, Rs.sources.SILENT);
            }
            insertColumnLeft() {
              this.insertColumn(0);
            }
            insertColumnRight() {
              this.insertColumn(1);
            }
            insertRow(t3) {
              const e3 = this.quill.getSelection();
              if (!e3) return;
              const [n3, r2, s2] = this.getTable(e3);
              if (null == s2) return;
              const i2 = r2.rowOffset();
              n3.insertRow(i2 + t3), this.quill.update(Rs.sources.USER), t3 > 0 ? this.quill.setSelection(e3, Rs.sources.SILENT) : this.quill.setSelection(e3.index + r2.children.length, e3.length, Rs.sources.SILENT);
            }
            insertRowAbove() {
              this.insertRow(0);
            }
            insertRowBelow() {
              this.insertRow(1);
            }
            insertTable(t3, e3) {
              const n3 = this.quill.getSelection();
              if (null == n3) return;
              const r2 = new Array(t3).fill(0).reduce((t4) => {
                const n4 = new Array(e3).fill("\n").join("");
                return t4.insert(n4, {
                  table: ko()
                });
              }, new bn().retain(n3.index));
              this.quill.updateContents(r2, Rs.sources.USER), this.quill.setSelection(n3.index, Rs.sources.SILENT), this.balanceTables();
            }
            listenBalanceCells() {
              this.quill.on(Rs.events.SCROLL_OPTIMIZE, (t3) => {
                t3.some((t4) => !!["TD", "TR", "TBODY", "TABLE"].includes(t4.target.tagName) && (this.quill.once(Rs.events.TEXT_CHANGE, (t5, e3, n3) => {
                  n3 === Rs.sources.USER && this.balanceTables();
                }), true));
              });
            }
          }, Lo = is("quill:toolbar");
          class Oo extends xs {
            constructor(t3, e3) {
              if (super(t3, e3), Array.isArray(this.options.container)) {
                const e4 = document.createElement("div");
                e4.setAttribute("role", "toolbar"), function(t4, e5) {
                  Array.isArray(e5[0]) || (e5 = [e5]);
                  e5.forEach((e6) => {
                    const n3 = document.createElement("span");
                    n3.classList.add("ql-formats"), e6.forEach((t5) => {
                      if ("string" == typeof t5) To(n3, t5);
                      else {
                        const e7 = Object.keys(t5)[0], r2 = t5[e7];
                        Array.isArray(r2) ? function(t6, e8, n4) {
                          const r3 = document.createElement("select");
                          r3.classList.add(`ql-${e8}`), n4.forEach((t7) => {
                            const e9 = document.createElement("option");
                            false !== t7 ? e9.setAttribute("value", String(t7)) : e9.setAttribute("selected", "selected"), r3.appendChild(e9);
                          }), t6.appendChild(r3);
                        }(n3, e7, r2) : To(n3, e7, r2);
                      }
                    }), t4.appendChild(n3);
                  });
                }(e4, this.options.container), t3.container?.parentNode?.insertBefore(e4, t3.container), this.container = e4;
              } else "string" == typeof this.options.container ? this.container = document.querySelector(this.options.container) : this.container = this.options.container;
              this.container instanceof HTMLElement ? (this.container.classList.add("ql-toolbar"), this.controls = [], this.handlers = {}, this.options.handlers && Object.keys(this.options.handlers).forEach((t4) => {
                const e4 = this.options.handlers?.[t4];
                e4 && this.addHandler(t4, e4);
              }), Array.from(this.container.querySelectorAll("button, select")).forEach((t4) => {
                this.attach(t4);
              }), this.quill.on(Rs.events.EDITOR_CHANGE, () => {
                const [t4] = this.quill.selection.getRange();
                this.update(t4);
              })) : Lo.error("Container required for toolbar", this.options);
            }
            addHandler(t3, e3) {
              this.handlers[t3] = e3;
            }
            attach(t3) {
              let e3 = Array.from(t3.classList).find((t4) => 0 === t4.indexOf("ql-"));
              if (!e3) return;
              if (e3 = e3.slice(3), "BUTTON" === t3.tagName && t3.setAttribute("type", "button"), null == this.handlers[e3] && null == this.quill.scroll.query(e3)) return void Lo.warn("ignoring attaching to nonexistent format", e3, t3);
              const n3 = "SELECT" === t3.tagName ? "change" : "click";
              t3.addEventListener(n3, (n4) => {
                let r2;
                if ("SELECT" === t3.tagName) {
                  if (t3.selectedIndex < 0) return;
                  const e4 = t3.options[t3.selectedIndex];
                  r2 = !e4.hasAttribute("selected") && (e4.value || false);
                } else r2 = !t3.classList.contains("ql-active") && (t3.value || !t3.hasAttribute("value")), n4.preventDefault();
                this.quill.focus();
                const [s2] = this.quill.selection.getRange();
                if (null != this.handlers[e3]) this.handlers[e3].call(this, r2);
                else if (this.quill.scroll.query(e3).prototype instanceof hn) {
                  if (r2 = prompt(`Enter ${e3}`), !r2) return;
                  this.quill.updateContents(new bn().retain(s2.index).delete(s2.length).insert({
                    [e3]: r2
                  }), Rs.sources.USER);
                } else this.quill.format(e3, r2, Rs.sources.USER);
                this.update(s2);
              }), this.controls.push([e3, t3]);
            }
            update(t3) {
              const e3 = null == t3 ? {} : this.quill.getFormat(t3);
              this.controls.forEach((n3) => {
                const [r2, s2] = n3;
                if ("SELECT" === s2.tagName) {
                  let n4 = null;
                  if (null == t3) n4 = null;
                  else if (null == e3[r2]) n4 = s2.querySelector("option[selected]");
                  else if (!Array.isArray(e3[r2])) {
                    let t4 = e3[r2];
                    "string" == typeof t4 && (t4 = t4.replace(/"/g, '\\"')), n4 = s2.querySelector(`option[value="${t4}"]`);
                  }
                  null == n4 ? (s2.value = "", s2.selectedIndex = -1) : n4.selected = true;
                } else if (null == t3) s2.classList.remove("ql-active"), s2.setAttribute("aria-pressed", "false");
                else if (s2.hasAttribute("value")) {
                  const t4 = e3[r2], n4 = t4 === s2.getAttribute("value") || null != t4 && t4.toString() === s2.getAttribute("value") || null == t4 && !s2.getAttribute("value");
                  s2.classList.toggle("ql-active", n4), s2.setAttribute("aria-pressed", n4.toString());
                } else {
                  const t4 = null != e3[r2];
                  s2.classList.toggle("ql-active", t4), s2.setAttribute("aria-pressed", t4.toString());
                }
              });
            }
          }
          function To(t3, e3, n3) {
            const r2 = document.createElement("button");
            r2.setAttribute("type", "button"), r2.classList.add(`ql-${e3}`), r2.setAttribute("aria-pressed", "false"), null != n3 ? (r2.value = n3, r2.setAttribute("aria-label", `${e3}: ${n3}`)) : r2.setAttribute("aria-label", e3), t3.appendChild(r2);
          }
          Oo.DEFAULTS = {}, Oo.DEFAULTS = {
            container: null,
            handlers: {
              clean() {
                const t3 = this.quill.getSelection();
                if (null != t3) if (0 === t3.length) {
                  const t4 = this.quill.getFormat();
                  Object.keys(t4).forEach((t5) => {
                    null != this.quill.scroll.query(t5, Pe.INLINE) && this.quill.format(t5, false, Rs.sources.USER);
                  });
                } else this.quill.removeFormat(t3.index, t3.length, Rs.sources.USER);
              },
              direction(t3) {
                const {
                  align: e3
                } = this.quill.getFormat();
                "rtl" === t3 && null == e3 ? this.quill.format("align", "right", Rs.sources.USER) : t3 || "right" !== e3 || this.quill.format("align", false, Rs.sources.USER), this.quill.format("direction", t3, Rs.sources.USER);
              },
              indent(t3) {
                const e3 = this.quill.getSelection(), n3 = this.quill.getFormat(e3), r2 = parseInt(n3.indent || 0, 10);
                if ("+1" === t3 || "-1" === t3) {
                  let e4 = "+1" === t3 ? 1 : -1;
                  "rtl" === n3.direction && (e4 *= -1), this.quill.format("indent", r2 + e4, Rs.sources.USER);
                }
              },
              link(t3) {
                true === t3 && (t3 = prompt("Enter link URL:")), this.quill.format("link", t3, Rs.sources.USER);
              },
              list(t3) {
                const e3 = this.quill.getSelection(), n3 = this.quill.getFormat(e3);
                "check" === t3 ? "checked" === n3.list || "unchecked" === n3.list ? this.quill.format("list", false, Rs.sources.USER) : this.quill.format("list", "unchecked", Rs.sources.USER) : this.quill.format("list", t3, Rs.sources.USER);
              }
            }
          };
          const So = '<svg viewbox="0 0 18 18"><polyline class="ql-even ql-stroke" points="5 7 3 9 5 11"/><polyline class="ql-even ql-stroke" points="13 7 15 9 13 11"/><line class="ql-stroke" x1="10" x2="8" y1="5" y2="13"/></svg>', Co = {
            align: {
              "": '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="13" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="9" y1="4" y2="4"/></svg>',
              center: '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="14" x2="4" y1="14" y2="14"/><line class="ql-stroke" x1="12" x2="6" y1="4" y2="4"/></svg>',
              right: '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="5" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="9" y1="4" y2="4"/></svg>',
              justify: '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="3" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="3" y1="4" y2="4"/></svg>'
            },
            background: '<svg viewbox="0 0 18 18"><g class="ql-fill ql-color-label"><polygon points="6 6.868 6 6 5 6 5 7 5.942 7 6 6.868"/><rect height="1" width="1" x="4" y="4"/><polygon points="6.817 5 6 5 6 6 6.38 6 6.817 5"/><rect height="1" width="1" x="2" y="6"/><rect height="1" width="1" x="3" y="5"/><rect height="1" width="1" x="4" y="7"/><polygon points="4 11.439 4 11 3 11 3 12 3.755 12 4 11.439"/><rect height="1" width="1" x="2" y="12"/><rect height="1" width="1" x="2" y="9"/><rect height="1" width="1" x="2" y="15"/><polygon points="4.63 10 4 10 4 11 4.192 11 4.63 10"/><rect height="1" width="1" x="3" y="8"/><path d="M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z"/><path d="M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z"/><path d="M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z"/><rect height="1" width="1" x="12" y="2"/><rect height="1" width="1" x="11" y="3"/><path d="M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z"/><rect height="1" width="1" x="2" y="3"/><rect height="1" width="1" x="6" y="2"/><rect height="1" width="1" x="3" y="2"/><rect height="1" width="1" x="5" y="3"/><rect height="1" width="1" x="9" y="2"/><rect height="1" width="1" x="15" y="14"/><polygon points="13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174"/><rect height="1" width="1" x="13" y="7"/><rect height="1" width="1" x="15" y="5"/><rect height="1" width="1" x="14" y="6"/><rect height="1" width="1" x="15" y="8"/><rect height="1" width="1" x="14" y="9"/><path d="M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z"/><rect height="1" width="1" x="14" y="3"/><polygon points="12 6.868 12 6 11.62 6 12 6.868"/><rect height="1" width="1" x="15" y="2"/><rect height="1" width="1" x="12" y="5"/><rect height="1" width="1" x="13" y="4"/><polygon points="12.933 9 13 9 13 8 12.495 8 12.933 9"/><rect height="1" width="1" x="9" y="14"/><rect height="1" width="1" x="8" y="15"/><path d="M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z"/><rect height="1" width="1" x="5" y="15"/><path d="M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z"/><rect height="1" width="1" x="11" y="15"/><path d="M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z"/><rect height="1" width="1" x="14" y="15"/><rect height="1" width="1" x="15" y="11"/></g><polyline class="ql-stroke" points="5.5 13 9 5 12.5 13"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="11" y2="11"/></svg>',
            blockquote: '<svg viewbox="0 0 18 18"><rect class="ql-fill ql-stroke" height="3" width="3" x="4" y="5"/><rect class="ql-fill ql-stroke" height="3" width="3" x="11" y="5"/><path class="ql-even ql-fill ql-stroke" d="M7,8c0,4.031-3,5-3,5"/><path class="ql-even ql-fill ql-stroke" d="M14,8c0,4.031-3,5-3,5"/></svg>',
            bold: '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"/><path class="ql-stroke" d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"/></svg>',
            clean: '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="5" x2="13" y1="3" y2="3"/><line class="ql-stroke" x1="6" x2="9.35" y1="12" y2="3"/><line class="ql-stroke" x1="11" x2="15" y1="11" y2="15"/><line class="ql-stroke" x1="15" x2="11" y1="11" y2="15"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="7" x="2" y="14"/></svg>',
            code: So,
            "code-block": So,
            color: '<svg viewbox="0 0 18 18"><line class="ql-color-label ql-stroke ql-transparent" x1="3" x2="15" y1="15" y2="15"/><polyline class="ql-stroke" points="5.5 11 9 3 12.5 11"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="9" y2="9"/></svg>',
            direction: {
              "": '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="3 11 5 9 3 7 3 11"/><line class="ql-stroke ql-fill" x1="15" x2="11" y1="4" y2="4"/><path class="ql-fill" d="M11,3a3,3,0,0,0,0,6h1V3H11Z"/><rect class="ql-fill" height="11" width="1" x="11" y="4"/><rect class="ql-fill" height="11" width="1" x="13" y="4"/></svg>',
              rtl: '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="15 12 13 10 15 8 15 12"/><line class="ql-stroke ql-fill" x1="9" x2="5" y1="4" y2="4"/><path class="ql-fill" d="M5,3A3,3,0,0,0,5,9H6V3H5Z"/><rect class="ql-fill" height="11" width="1" x="5" y="4"/><rect class="ql-fill" height="11" width="1" x="7" y="4"/></svg>'
            },
            formula: '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M11.759,2.482a2.561,2.561,0,0,0-3.53.607A7.656,7.656,0,0,0,6.8,6.2C6.109,9.188,5.275,14.677,4.15,14.927a1.545,1.545,0,0,0-1.3-.933A0.922,0.922,0,0,0,2,15.036S1.954,16,4.119,16s3.091-2.691,3.7-5.553c0.177-.826.36-1.726,0.554-2.6L8.775,6.2c0.381-1.421.807-2.521,1.306-2.676a1.014,1.014,0,0,0,1.02.56A0.966,0.966,0,0,0,11.759,2.482Z"/><rect class="ql-fill" height="1.6" rx="0.8" ry="0.8" width="5" x="5.15" y="6.2"/><path class="ql-fill" d="M13.663,12.027a1.662,1.662,0,0,1,.266-0.276q0.193,0.069.456,0.138a2.1,2.1,0,0,0,.535.069,1.075,1.075,0,0,0,.767-0.3,1.044,1.044,0,0,0,.314-0.8,0.84,0.84,0,0,0-.238-0.619,0.8,0.8,0,0,0-.594-0.239,1.154,1.154,0,0,0-.781.3,4.607,4.607,0,0,0-.781,1q-0.091.15-.218,0.346l-0.246.38c-0.068-.288-0.137-0.582-0.212-0.885-0.459-1.847-2.494-.984-2.941-0.8-0.482.2-.353,0.647-0.094,0.529a0.869,0.869,0,0,1,1.281.585c0.217,0.751.377,1.436,0.527,2.038a5.688,5.688,0,0,1-.362.467,2.69,2.69,0,0,1-.264.271q-0.221-.08-0.471-0.147a2.029,2.029,0,0,0-.522-0.066,1.079,1.079,0,0,0-.768.3A1.058,1.058,0,0,0,9,15.131a0.82,0.82,0,0,0,.832.852,1.134,1.134,0,0,0,.787-0.3,5.11,5.11,0,0,0,.776-0.993q0.141-.219.215-0.34c0.046-.076.122-0.194,0.223-0.346a2.786,2.786,0,0,0,.918,1.726,2.582,2.582,0,0,0,2.376-.185c0.317-.181.212-0.565,0-0.494A0.807,0.807,0,0,1,14.176,15a5.159,5.159,0,0,1-.913-2.446l0,0Q13.487,12.24,13.663,12.027Z"/></svg>',
            header: {
              1: '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z"/></svg>',
              2: '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>',
              3: '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.65186,12.30664a2.6742,2.6742,0,0,1-2.915,2.68457,3.96592,3.96592,0,0,1-2.25537-.6709.56007.56007,0,0,1-.13232-.83594L11.64648,13c.209-.34082.48389-.36328.82471-.1543a2.32654,2.32654,0,0,0,1.12256.33008c.71484,0,1.12207-.35156,1.12207-.78125,0-.61523-.61621-.86816-1.46338-.86816H13.2085a.65159.65159,0,0,1-.68213-.41895l-.05518-.10937a.67114.67114,0,0,1,.14307-.78125l.71533-.86914a8.55289,8.55289,0,0,1,.68213-.7373V8.58887a3.93913,3.93913,0,0,1-.748.05469H11.9873a.54085.54085,0,0,1-.605-.60547V7.59863a.54085.54085,0,0,1,.605-.60547h3.75146a.53773.53773,0,0,1,.60547.59375v.17676a1.03723,1.03723,0,0,1-.27539.748L14.74854,10.0293A2.31132,2.31132,0,0,1,16.65186,12.30664ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>',
              4: '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm7.05371,7.96582v.38477c0,.39648-.165.60547-.46191.60547h-.47314v1.29785a.54085.54085,0,0,1-.605.60547h-.69336a.54085.54085,0,0,1-.605-.60547V12.95605H11.333a.5412.5412,0,0,1-.60547-.60547v-.15332a1.199,1.199,0,0,1,.22021-.748l2.56348-4.05957a.7819.7819,0,0,1,.72607-.39648h1.27637a.54085.54085,0,0,1,.605.60547v3.7627h.33008A.54055.54055,0,0,1,17.05371,11.96582ZM14.28125,8.7207h-.022a4.18969,4.18969,0,0,1-.38525.81348l-1.188,1.80469v.02246h1.5293V9.60059A7.04058,7.04058,0,0,1,14.28125,8.7207Z"/></svg>',
              5: '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.74023,12.18555a2.75131,2.75131,0,0,1-2.91553,2.80566,3.908,3.908,0,0,1-2.25537-.68164.54809.54809,0,0,1-.13184-.8252L11.73438,13c.209-.34082.48389-.36328.8252-.1543a2.23757,2.23757,0,0,0,1.1001.33008,1.01827,1.01827,0,0,0,1.1001-.96777c0-.61621-.53906-.97949-1.25439-.97949a2.15554,2.15554,0,0,0-.64893.09961,1.15209,1.15209,0,0,1-.814.01074l-.12109-.04395a.64116.64116,0,0,1-.45117-.71484l.231-3.00391a.56666.56666,0,0,1,.62744-.583H15.541a.54085.54085,0,0,1,.605.60547v.43945a.54085.54085,0,0,1-.605.60547H13.41748l-.04395.72559a1.29306,1.29306,0,0,1-.04395.30859h.022a2.39776,2.39776,0,0,1,.57227-.07715A2.53266,2.53266,0,0,1,16.74023,12.18555ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>',
              6: '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M14.51758,9.64453a1.85627,1.85627,0,0,0-1.24316.38477H13.252a1.73532,1.73532,0,0,1,1.72754-1.4082,2.66491,2.66491,0,0,1,.5498.06641c.35254.05469.57227.01074.70508-.40723l.16406-.5166a.53393.53393,0,0,0-.373-.75977,4.83723,4.83723,0,0,0-1.17773-.14258c-2.43164,0-3.7627,2.17773-3.7627,4.43359,0,2.47559,1.60645,3.69629,3.19043,3.69629A2.70585,2.70585,0,0,0,16.96,12.19727,2.43861,2.43861,0,0,0,14.51758,9.64453Zm-.23047,3.58691c-.67187,0-1.22168-.81445-1.22168-1.45215,0-.47363.30762-.583.72559-.583.96875,0,1.27734.59375,1.27734,1.12207A.82182.82182,0,0,1,14.28711,13.23145ZM10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Z"/></svg>'
            },
            italic: '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="13" y1="4" y2="4"/><line class="ql-stroke" x1="5" x2="11" y1="14" y2="14"/><line class="ql-stroke" x1="8" x2="10" y1="14" y2="4"/></svg>',
            image: '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="10" width="12" x="3" y="4"/><circle class="ql-fill" cx="6" cy="7" r="1"/><polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"/></svg>',
            indent: {
              "+1": '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-fill ql-stroke" points="3 7 3 11 5 9 3 7"/></svg>',
              "-1": '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="5 7 5 11 3 9 5 7"/></svg>'
            },
            link: '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="11" y1="7" y2="11"/><path class="ql-even ql-stroke" d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"/><path class="ql-even ql-stroke" d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"/></svg>',
            list: {
              bullet: '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="6" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="6" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="6" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="3" y1="4" y2="4"/><line class="ql-stroke" x1="3" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="3" y1="14" y2="14"/></svg>',
              check: '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="9" x2="15" y1="4" y2="4"/><polyline class="ql-stroke" points="3 4 4 5 6 3"/><line class="ql-stroke" x1="9" x2="15" y1="14" y2="14"/><polyline class="ql-stroke" points="3 14 4 15 6 13"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="3 9 4 10 6 8"/></svg>',
              ordered: '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="7" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="7" x2="15" y1="14" y2="14"/><line class="ql-stroke ql-thin" x1="2.5" x2="4.5" y1="5.5" y2="5.5"/><path class="ql-fill" d="M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z"/><path class="ql-stroke ql-thin" d="M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156"/><path class="ql-stroke ql-thin" d="M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109"/></svg>'
            },
            script: {
              sub: '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z"/><path class="ql-fill" d="M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z"/></svg>',
              super: '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,7H13.861a4.015,4.015,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.922,1.922,0,0,0,12.021,3.7a0.5,0.5,0,1,0,.957.291,0.917,0.917,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.077-1.164,1.925-1.934,2.486A1.423,1.423,0,0,0,12,7.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,7Z"/><path class="ql-fill" d="M9.651,5.241a1,1,0,0,0-1.41.108L6,7.964,3.759,5.349a1,1,0,1,0-1.519,1.3L4.683,9.5,2.241,12.35a1,1,0,1,0,1.519,1.3L6,11.036,8.241,13.65a1,1,0,0,0,1.519-1.3L7.317,9.5,9.759,6.651A1,1,0,0,0,9.651,5.241Z"/></svg>'
            },
            strike: '<svg viewbox="0 0 18 18"><line class="ql-stroke ql-thin" x1="15.5" x2="2.5" y1="8.5" y2="9.5"/><path class="ql-fill" d="M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z"/><path class="ql-fill" d="M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z"/></svg>',
            table: '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="2" width="3" x="5" y="5"/><rect class="ql-fill" height="2" width="4" x="9" y="5"/><g class="ql-fill ql-transparent"><rect height="2" width="3" x="5" y="8"/><rect height="2" width="4" x="9" y="8"/><rect height="2" width="3" x="5" y="11"/><rect height="2" width="4" x="9" y="11"/></g></svg>',
            underline: '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="12" x="3" y="15"/></svg>',
            video: '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="12" width="1" x="5" y="3"/><rect class="ql-fill" height="12" width="1" x="12" y="3"/><rect class="ql-fill" height="2" width="8" x="5" y="8"/><rect class="ql-fill" height="1" width="3" x="3" y="5"/><rect class="ql-fill" height="1" width="3" x="3" y="7"/><rect class="ql-fill" height="1" width="3" x="3" y="10"/><rect class="ql-fill" height="1" width="3" x="3" y="12"/><rect class="ql-fill" height="1" width="3" x="12" y="5"/><rect class="ql-fill" height="1" width="3" x="12" y="7"/><rect class="ql-fill" height="1" width="3" x="12" y="10"/><rect class="ql-fill" height="1" width="3" x="12" y="12"/></svg>'
          };
          let jo = 0;
          function Ro(t3, e3) {
            t3.setAttribute(e3, `${!("true" === t3.getAttribute(e3))}`);
          }
          const Io = class {
            constructor(t3) {
              this.select = t3, this.container = document.createElement("span"), this.buildPicker(), this.select.style.display = "none", this.select.parentNode.insertBefore(this.container, this.select), this.label.addEventListener("mousedown", () => {
                this.togglePicker();
              }), this.label.addEventListener("keydown", (t4) => {
                switch (t4.key) {
                  case "Enter":
                    this.togglePicker();
                    break;
                  case "Escape":
                    this.escape(), t4.preventDefault();
                }
              }), this.select.addEventListener("change", this.update.bind(this));
            }
            togglePicker() {
              this.container.classList.toggle("ql-expanded"), Ro(this.label, "aria-expanded"), Ro(this.options, "aria-hidden");
            }
            buildItem(t3) {
              const e3 = document.createElement("span");
              e3.tabIndex = "0", e3.setAttribute("role", "button"), e3.classList.add("ql-picker-item");
              const n3 = t3.getAttribute("value");
              return n3 && e3.setAttribute("data-value", n3), t3.textContent && e3.setAttribute("data-label", t3.textContent), e3.addEventListener("click", () => {
                this.selectItem(e3, true);
              }), e3.addEventListener("keydown", (t4) => {
                switch (t4.key) {
                  case "Enter":
                    this.selectItem(e3, true), t4.preventDefault();
                    break;
                  case "Escape":
                    this.escape(), t4.preventDefault();
                }
              }), e3;
            }
            buildLabel() {
              const t3 = document.createElement("span");
              return t3.classList.add("ql-picker-label"), t3.innerHTML = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke" points="7 11 9 13 11 11 7 11"/><polygon class="ql-stroke" points="7 7 9 5 11 7 7 7"/></svg>', t3.tabIndex = "0", t3.setAttribute("role", "button"), t3.setAttribute("aria-expanded", "false"), this.container.appendChild(t3), t3;
            }
            buildOptions() {
              const t3 = document.createElement("span");
              t3.classList.add("ql-picker-options"), t3.setAttribute("aria-hidden", "true"), t3.tabIndex = "-1", t3.id = `ql-picker-options-${jo}`, jo += 1, this.label.setAttribute("aria-controls", t3.id), this.options = t3, Array.from(this.select.options).forEach((e3) => {
                const n3 = this.buildItem(e3);
                t3.appendChild(n3), true === e3.selected && this.selectItem(n3);
              }), this.container.appendChild(t3);
            }
            buildPicker() {
              Array.from(this.select.attributes).forEach((t3) => {
                this.container.setAttribute(t3.name, t3.value);
              }), this.container.classList.add("ql-picker"), this.label = this.buildLabel(), this.buildOptions();
            }
            escape() {
              this.close(), setTimeout(() => this.label.focus(), 1);
            }
            close() {
              this.container.classList.remove("ql-expanded"), this.label.setAttribute("aria-expanded", "false"), this.options.setAttribute("aria-hidden", "true");
            }
            selectItem(t3) {
              let e3 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
              const n3 = this.container.querySelector(".ql-selected");
              t3 !== n3 && (null != n3 && n3.classList.remove("ql-selected"), null != t3 && (t3.classList.add("ql-selected"), this.select.selectedIndex = Array.from(t3.parentNode.children).indexOf(t3), t3.hasAttribute("data-value") ? this.label.setAttribute("data-value", t3.getAttribute("data-value")) : this.label.removeAttribute("data-value"), t3.hasAttribute("data-label") ? this.label.setAttribute("data-label", t3.getAttribute("data-label")) : this.label.removeAttribute("data-label"), e3 && (this.select.dispatchEvent(new Event("change")), this.close())));
            }
            update() {
              let t3;
              if (this.select.selectedIndex > -1) {
                const e4 = this.container.querySelector(".ql-picker-options").children[this.select.selectedIndex];
                t3 = this.select.options[this.select.selectedIndex], this.selectItem(e4);
              } else this.selectItem(null);
              const e3 = null != t3 && t3 !== this.select.querySelector("option[selected]");
              this.label.classList.toggle("ql-active", e3);
            }
          };
          const Mo = class extends Io {
            constructor(t3, e3) {
              super(t3), this.label.innerHTML = e3, this.container.classList.add("ql-color-picker"), Array.from(this.container.querySelectorAll(".ql-picker-item")).slice(0, 7).forEach((t4) => {
                t4.classList.add("ql-primary");
              });
            }
            buildItem(t3) {
              const e3 = super.buildItem(t3);
              return e3.style.backgroundColor = t3.getAttribute("value") || "", e3;
            }
            selectItem(t3, e3) {
              super.selectItem(t3, e3);
              const n3 = this.label.querySelector(".ql-color-label"), r2 = t3 && t3.getAttribute("data-value") || "";
              n3 && ("line" === n3.tagName ? n3.style.stroke = r2 : n3.style.fill = r2);
            }
          };
          const Bo = class extends Io {
            constructor(t3, e3) {
              super(t3), this.container.classList.add("ql-icon-picker"), Array.from(this.container.querySelectorAll(".ql-picker-item")).forEach((t4) => {
                t4.innerHTML = e3[t4.getAttribute("data-value") || ""];
              }), this.defaultItem = this.container.querySelector(".ql-selected"), this.selectItem(this.defaultItem);
            }
            selectItem(t3, e3) {
              super.selectItem(t3, e3);
              const n3 = t3 || this.defaultItem;
              if (null != n3) {
                if (this.label.innerHTML === n3.innerHTML) return;
                this.label.innerHTML = n3.innerHTML;
              }
            }
          };
          const Uo = class {
            constructor(t3, e3) {
              this.quill = t3, this.boundsContainer = e3 || document.body, this.root = t3.addContainer("ql-tooltip"), this.root.innerHTML = this.constructor.TEMPLATE, ((t4) => {
                const {
                  overflowY: e4
                } = getComputedStyle(t4, null);
                return "visible" !== e4 && "clip" !== e4;
              })(this.quill.root) && this.quill.root.addEventListener("scroll", () => {
                this.root.style.marginTop = -1 * this.quill.root.scrollTop + "px";
              }), this.hide();
            }
            hide() {
              this.root.classList.add("ql-hidden");
            }
            position(t3) {
              const e3 = t3.left + t3.width / 2 - this.root.offsetWidth / 2, n3 = t3.bottom + this.quill.root.scrollTop;
              this.root.style.left = `${e3}px`, this.root.style.top = `${n3}px`, this.root.classList.remove("ql-flip");
              const r2 = this.boundsContainer.getBoundingClientRect(), s2 = this.root.getBoundingClientRect();
              let i2 = 0;
              if (s2.right > r2.right && (i2 = r2.right - s2.right, this.root.style.left = `${e3 + i2}px`), s2.left < r2.left && (i2 = r2.left - s2.left, this.root.style.left = `${e3 + i2}px`), s2.bottom > r2.bottom) {
                const e4 = s2.bottom - s2.top, r3 = t3.bottom - t3.top + e4;
                this.root.style.top = n3 - r3 + "px", this.root.classList.add("ql-flip");
              }
              return i2;
            }
            show() {
              this.root.classList.remove("ql-editing"), this.root.classList.remove("ql-hidden");
            }
          }, Do = [false, "center", "right", "justify"], Po = ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"], zo = [false, "serif", "monospace"], Ho = ["1", "2", "3", false], Fo = ["small", false, "large", "huge"];
          class $o extends qs {
            constructor(t3, e3) {
              super(t3, e3);
              const n3 = (e4) => {
                document.body.contains(t3.root) ? (null == this.tooltip || this.tooltip.root.contains(e4.target) || document.activeElement === this.tooltip.textbox || this.quill.hasFocus() || this.tooltip.hide(), null != this.pickers && this.pickers.forEach((t4) => {
                  t4.container.contains(e4.target) || t4.close();
                })) : document.body.removeEventListener("click", n3);
              };
              t3.emitter.listenDOM("click", document.body, n3);
            }
            addModule(t3) {
              const e3 = super.addModule(t3);
              return "toolbar" === t3 && this.extendToolbar(e3), e3;
            }
            buildButtons(t3, e3) {
              Array.from(t3).forEach((t4) => {
                (t4.getAttribute("class") || "").split(/\s+/).forEach((n3) => {
                  if (n3.startsWith("ql-") && (n3 = n3.slice(3), null != e3[n3])) if ("direction" === n3) t4.innerHTML = e3[n3][""] + e3[n3].rtl;
                  else if ("string" == typeof e3[n3]) t4.innerHTML = e3[n3];
                  else {
                    const r2 = t4.value || "";
                    null != r2 && e3[n3][r2] && (t4.innerHTML = e3[n3][r2]);
                  }
                });
              });
            }
            buildPickers(t3, e3) {
              this.pickers = Array.from(t3).map((t4) => {
                if (t4.classList.contains("ql-align") && (null == t4.querySelector("option") && Ko(t4, Do), "object" == typeof e3.align)) return new Bo(t4, e3.align);
                if (t4.classList.contains("ql-background") || t4.classList.contains("ql-color")) {
                  const n3 = t4.classList.contains("ql-background") ? "background" : "color";
                  return null == t4.querySelector("option") && Ko(t4, Po, "background" === n3 ? "#ffffff" : "#000000"), new Mo(t4, e3[n3]);
                }
                return null == t4.querySelector("option") && (t4.classList.contains("ql-font") ? Ko(t4, zo) : t4.classList.contains("ql-header") ? Ko(t4, Ho) : t4.classList.contains("ql-size") && Ko(t4, Fo)), new Io(t4);
              });
              this.quill.on(ls.events.EDITOR_CHANGE, () => {
                this.pickers.forEach((t4) => {
                  t4.update();
                });
              });
            }
          }
          $o.DEFAULTS = De({}, qs.DEFAULTS, {
            modules: {
              toolbar: {
                handlers: {
                  formula() {
                    this.quill.theme.tooltip.edit("formula");
                  },
                  image() {
                    let t3 = this.container.querySelector("input.ql-image[type=file]");
                    null == t3 && (t3 = document.createElement("input"), t3.setAttribute("type", "file"), t3.setAttribute("accept", this.quill.uploader.options.mimetypes.join(", ")), t3.classList.add("ql-image"), t3.addEventListener("change", () => {
                      const e3 = this.quill.getSelection(true);
                      this.quill.uploader.upload(e3, t3.files), t3.value = "";
                    }), this.container.appendChild(t3)), t3.click();
                  },
                  video() {
                    this.quill.theme.tooltip.edit("video");
                  }
                }
              }
            }
          });
          class Vo extends Uo {
            constructor(t3, e3) {
              super(t3, e3), this.textbox = this.root.querySelector('input[type="text"]'), this.listen();
            }
            listen() {
              this.textbox.addEventListener("keydown", (t3) => {
                "Enter" === t3.key ? (this.save(), t3.preventDefault()) : "Escape" === t3.key && (this.cancel(), t3.preventDefault());
              });
            }
            cancel() {
              this.hide(), this.restoreFocus();
            }
            edit() {
              let t3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "link", e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
              if (this.root.classList.remove("ql-hidden"), this.root.classList.add("ql-editing"), null == this.textbox) return;
              null != e3 ? this.textbox.value = e3 : t3 !== this.root.getAttribute("data-mode") && (this.textbox.value = "");
              const n3 = this.quill.getBounds(this.quill.selection.savedRange);
              null != n3 && this.position(n3), this.textbox.select(), this.textbox.setAttribute("placeholder", this.textbox.getAttribute(`data-${t3}`) || ""), this.root.setAttribute("data-mode", t3);
            }
            restoreFocus() {
              this.quill.focus({
                preventScroll: true
              });
            }
            save() {
              let {
                value: t3
              } = this.textbox;
              switch (this.root.getAttribute("data-mode")) {
                case "link": {
                  const {
                    scrollTop: e3
                  } = this.quill.root;
                  this.linkRange ? (this.quill.formatText(this.linkRange, "link", t3, ls.sources.USER), delete this.linkRange) : (this.restoreFocus(), this.quill.format("link", t3, ls.sources.USER)), this.quill.root.scrollTop = e3;
                  break;
                }
                case "video":
                  t3 = function(t4) {
                    let e3 = t4.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/) || t4.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/);
                    if (e3) return `${e3[1] || "https"}://www.youtube.com/embed/${e3[2]}?showinfo=0`;
                    if (e3 = t4.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/)) return `${e3[1] || "https"}://player.vimeo.com/video/${e3[2]}/`;
                    return t4;
                  }(t3);
                case "formula": {
                  if (!t3) break;
                  const e3 = this.quill.getSelection(true);
                  if (null != e3) {
                    const n3 = e3.index + e3.length;
                    this.quill.insertEmbed(n3, this.root.getAttribute("data-mode"), t3, ls.sources.USER), "formula" === this.root.getAttribute("data-mode") && this.quill.insertText(n3 + 1, " ", ls.sources.USER), this.quill.setSelection(n3 + 2, ls.sources.USER);
                  }
                  break;
                }
              }
              this.textbox.value = "", this.hide();
            }
          }
          function Ko(t3, e3) {
            let n3 = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            e3.forEach((e4) => {
              const r2 = document.createElement("option");
              e4 === n3 ? r2.setAttribute("selected", "selected") : r2.setAttribute("value", String(e4)), t3.appendChild(r2);
            });
          }
          const Wo = [["bold", "italic", "link"], [{
            header: 1
          }, {
            header: 2
          }, "blockquote"]];
          class Zo extends Vo {
            static TEMPLATE = ['<span class="ql-tooltip-arrow"></span>', '<div class="ql-tooltip-editor">', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-close"></a>', "</div>"].join("");
            constructor(t3, e3) {
              super(t3, e3), this.quill.on(ls.events.EDITOR_CHANGE, (t4, e4, n3, r2) => {
                if (t4 === ls.events.SELECTION_CHANGE) if (null != e4 && e4.length > 0 && r2 === ls.sources.USER) {
                  this.show(), this.root.style.left = "0px", this.root.style.width = "", this.root.style.width = `${this.root.offsetWidth}px`;
                  const t5 = this.quill.getLines(e4.index, e4.length);
                  if (1 === t5.length) {
                    const t6 = this.quill.getBounds(e4);
                    null != t6 && this.position(t6);
                  } else {
                    const n4 = t5[t5.length - 1], r3 = this.quill.getIndex(n4), s2 = Math.min(n4.length() - 1, e4.index + e4.length - r3), i2 = this.quill.getBounds(new cs(r3, s2));
                    null != i2 && this.position(i2);
                  }
                } else document.activeElement !== this.textbox && this.quill.hasFocus() && this.hide();
              });
            }
            listen() {
              super.listen(), this.root.querySelector(".ql-close").addEventListener("click", () => {
                this.root.classList.remove("ql-editing");
              }), this.quill.on(ls.events.SCROLL_OPTIMIZE, () => {
                setTimeout(() => {
                  if (this.root.classList.contains("ql-hidden")) return;
                  const t3 = this.quill.getSelection();
                  if (null != t3) {
                    const e3 = this.quill.getBounds(t3);
                    null != e3 && this.position(e3);
                  }
                }, 1);
              });
            }
            cancel() {
              this.show();
            }
            position(t3) {
              const e3 = super.position(t3), n3 = this.root.querySelector(".ql-tooltip-arrow");
              return n3.style.marginLeft = "", 0 !== e3 && (n3.style.marginLeft = -1 * e3 - n3.offsetWidth / 2 + "px"), e3;
            }
          }
          class Go extends $o {
            constructor(t3, e3) {
              null != e3.modules.toolbar && null == e3.modules.toolbar.container && (e3.modules.toolbar.container = Wo), super(t3, e3), this.quill.container.classList.add("ql-bubble");
            }
            extendToolbar(t3) {
              this.tooltip = new Zo(this.quill, this.options.bounds), null != t3.container && (this.tooltip.root.appendChild(t3.container), this.buildButtons(t3.container.querySelectorAll("button"), Co), this.buildPickers(t3.container.querySelectorAll("select"), Co));
            }
          }
          Go.DEFAULTS = De({}, $o.DEFAULTS, {
            modules: {
              toolbar: {
                handlers: {
                  link(t3) {
                    t3 ? this.quill.theme.tooltip.edit() : this.quill.format("link", false, Rs.sources.USER);
                  }
                }
              }
            }
          });
          const Xo = [[{
            header: ["1", "2", "3", false]
          }], ["bold", "italic", "underline", "link"], [{
            list: "ordered"
          }, {
            list: "bullet"
          }], ["clean"]];
          class Qo extends Vo {
            static TEMPLATE = ['<a class="ql-preview" rel="noopener noreferrer" target="_blank" href="about:blank"></a>', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-action"></a>', '<a class="ql-remove"></a>'].join("");
            preview = this.root.querySelector("a.ql-preview");
            listen() {
              super.listen(), this.root.querySelector("a.ql-action").addEventListener("click", (t3) => {
                this.root.classList.contains("ql-editing") ? this.save() : this.edit("link", this.preview.textContent), t3.preventDefault();
              }), this.root.querySelector("a.ql-remove").addEventListener("click", (t3) => {
                if (null != this.linkRange) {
                  const t4 = this.linkRange;
                  this.restoreFocus(), this.quill.formatText(t4, "link", false, ls.sources.USER), delete this.linkRange;
                }
                t3.preventDefault(), this.hide();
              }), this.quill.on(ls.events.SELECTION_CHANGE, (t3, e3, n3) => {
                if (null != t3) {
                  if (0 === t3.length && n3 === ls.sources.USER) {
                    const [e4, n4] = this.quill.scroll.descendant(oo, t3.index);
                    if (null != e4) {
                      this.linkRange = new cs(t3.index - n4, e4.length());
                      const r2 = oo.formats(e4.domNode);
                      this.preview.textContent = r2, this.preview.setAttribute("href", r2), this.show();
                      const s2 = this.quill.getBounds(this.linkRange);
                      return void (null != s2 && this.position(s2));
                    }
                  } else delete this.linkRange;
                  this.hide();
                }
              });
            }
            show() {
              super.show(), this.root.removeAttribute("data-mode");
            }
          }
          class Yo extends $o {
            constructor(t3, e3) {
              null != e3.modules.toolbar && null == e3.modules.toolbar.container && (e3.modules.toolbar.container = Xo), super(t3, e3), this.quill.container.classList.add("ql-snow");
            }
            extendToolbar(t3) {
              null != t3.container && (t3.container.classList.add("ql-snow"), this.buildButtons(t3.container.querySelectorAll("button"), Co), this.buildPickers(t3.container.querySelectorAll("select"), Co), this.tooltip = new Qo(this.quill, this.options.bounds), t3.container.querySelector(".ql-link") && this.quill.keyboard.addBinding({
                key: "k",
                shortKey: true
              }, (e3, n3) => {
                t3.handlers.link.call(t3, !n3.format.link);
              }));
            }
          }
          Yo.DEFAULTS = De({}, $o.DEFAULTS, {
            modules: {
              toolbar: {
                handlers: {
                  link(t3) {
                    if (t3) {
                      const t4 = this.quill.getSelection();
                      if (null == t4 || 0 === t4.length) return;
                      let e3 = this.quill.getText(t4);
                      /^\S+@\S+\.\S+$/.test(e3) && 0 !== e3.indexOf("mailto:") && (e3 = `mailto:${e3}`);
                      const {
                        tooltip: n3
                      } = this.quill.theme;
                      n3.edit("link", e3);
                    } else this.quill.format("link", false, Rs.sources.USER);
                  }
                }
              }
            }
          });
          const Jo = Yo;
          Qi.register({
            "attributors/attribute/direction": ii,
            "attributors/class/align": Zs,
            "attributors/class/background": Js,
            "attributors/class/color": Qs,
            "attributors/class/direction": oi,
            "attributors/class/font": ci,
            "attributors/class/size": hi,
            "attributors/style/align": Gs,
            "attributors/style/background": ti,
            "attributors/style/color": Ys,
            "attributors/style/direction": li,
            "attributors/style/font": ui,
            "attributors/style/size": di
          }, true), Qi.register({
            "formats/align": Zs,
            "formats/direction": oi,
            "formats/indent": Ji,
            "formats/background": ti,
            "formats/color": Ys,
            "formats/font": ci,
            "formats/size": hi,
            "formats/blockquote": to,
            "formats/code-block": ni,
            "formats/header": eo,
            "formats/list": ro,
            "formats/bold": so,
            "formats/code": ri,
            "formats/italic": io,
            "formats/link": oo,
            "formats/script": ao,
            "formats/strike": co,
            "formats/underline": uo,
            "formats/formula": ho,
            "formats/image": po,
            "formats/video": mo,
            "modules/syntax": No,
            "modules/table": _o,
            "modules/toolbar": Oo,
            "themes/bubble": Go,
            "themes/snow": Jo,
            "ui/icons": Co,
            "ui/picker": Io,
            "ui/icon-picker": Bo,
            "ui/color-picker": Mo,
            "ui/tooltip": Uo
          }, true);
          const tl = Qi;
        }
      }, e = {};
      function n(r) {
        var s = e[r];
        if (void 0 !== s) return s.exports;
        var i = e[r] = {
          id: r,
          loaded: false,
          exports: {}
        };
        return t[r].call(i.exports, i, i.exports, n), i.loaded = true, i.exports;
      }
      return n.d = (t2, e2) => {
        for (var r in e2) n.o(e2, r) && !n.o(t2, r) && Object.defineProperty(t2, r, {
          enumerable: true,
          get: e2[r]
        });
      }, n.g = function() {
        if ("object" == typeof globalThis) return globalThis;
        try {
          return this || new Function("return this")();
        } catch (t2) {
          if ("object" == typeof window) return window;
        }
      }(), n.o = (t2, e2) => Object.prototype.hasOwnProperty.call(t2, e2), n.r = (t2) => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t2, Symbol.toStringTag, {
          value: "Module"
        }), Object.defineProperty(t2, "__esModule", {
          value: true
        });
      }, n.nmd = (t2) => (t2.paths = [], t2.children || (t2.children = []), t2), n(190);
    })());
  }
});
export default require_quill_htmlEditButton_min();
//# sourceMappingURL=chunk-GLRDANAY.js.map
