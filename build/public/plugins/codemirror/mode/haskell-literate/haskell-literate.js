"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE
(function (mod) {
  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) == "object" && (typeof module === "undefined" ? "undefined" : _typeof(module)) == "object") // CommonJS
    mod(require("../../lib/codemirror"), require("../haskell/haskell"));else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror", "../haskell/haskell"], mod);else // Plain browser env
    mod(CodeMirror);
})(function (CodeMirror) {
  "use strict";

  CodeMirror.defineMode("haskell-literate", function (config, parserConfig) {
    var baseMode = CodeMirror.getMode(config, parserConfig && parserConfig.base || "haskell");
    return {
      startState: function startState() {
        return {
          inCode: false,
          baseState: CodeMirror.startState(baseMode)
        };
      },
      token: function token(stream, state) {
        if (stream.sol()) {
          if (state.inCode = stream.eat(">")) return "meta";
        }

        if (state.inCode) {
          return baseMode.token(stream, state.baseState);
        } else {
          stream.skipToEnd();
          return "comment";
        }
      },
      innerMode: function innerMode(state) {
        return state.inCode ? {
          state: state.baseState,
          mode: baseMode
        } : null;
      }
    };
  }, "haskell");
  CodeMirror.defineMIME("text/x-literate-haskell", "haskell-literate");
});