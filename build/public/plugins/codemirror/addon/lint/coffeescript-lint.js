"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE
// Depends on coffeelint.js from http://www.coffeelint.org/js/coffeelint.js
// declare global: coffeelint
(function (mod) {
  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) == "object" && (typeof module === "undefined" ? "undefined" : _typeof(module)) == "object") // CommonJS
    mod(require("../../lib/codemirror"));else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);else // Plain browser env
    mod(CodeMirror);
})(function (CodeMirror) {
  "use strict";

  CodeMirror.registerHelper("lint", "coffeescript", function (text) {
    var found = [];

    if (!window.coffeelint) {
      if (window.console) {
        window.console.error("Error: window.coffeelint not defined, CodeMirror CoffeeScript linting cannot run.");
      }

      return found;
    }

    var parseError = function parseError(err) {
      var loc = err.lineNumber;
      found.push({
        from: CodeMirror.Pos(loc - 1, 0),
        to: CodeMirror.Pos(loc, 0),
        severity: err.level,
        message: err.message
      });
    };

    try {
      var res = coffeelint.lint(text);

      for (var i = 0; i < res.length; i++) {
        parseError(res[i]);
      }
    } catch (e) {
      found.push({
        from: CodeMirror.Pos(e.location.first_line, 0),
        to: CodeMirror.Pos(e.location.last_line, e.location.last_column),
        severity: 'error',
        message: e.message
      });
    }

    return found;
  });
});