"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE
(function (mod) {
  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) == "object" && (typeof module === "undefined" ? "undefined" : _typeof(module)) == "object") // CommonJS
    mod(require("../../lib/codemirror"));else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);else // Plain browser env
    mod(CodeMirror);
})(function (CodeMirror) {
  CodeMirror.defineOption("showTrailingSpace", false, function (cm, val, prev) {
    if (prev == CodeMirror.Init) prev = false;
    if (prev && !val) cm.removeOverlay("trailingspace");else if (!prev && val) cm.addOverlay({
      token: function token(stream) {
        for (var l = stream.string.length, i = l; i && /\s/.test(stream.string.charAt(i - 1)); --i) {}

        if (i > stream.pos) {
          stream.pos = i;
          return null;
        }

        stream.pos = l;
        return "trailingspace";
      },
      name: "trailingspace"
    });
  });
});