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
  "use strict";

  CodeMirror.defineOption("autoRefresh", false, function (cm, val) {
    if (cm.state.autoRefresh) {
      stopListening(cm, cm.state.autoRefresh);
      cm.state.autoRefresh = null;
    }

    if (val && cm.display.wrapper.offsetHeight == 0) startListening(cm, cm.state.autoRefresh = {
      delay: val.delay || 250
    });
  });

  function startListening(cm, state) {
    function check() {
      if (cm.display.wrapper.offsetHeight) {
        stopListening(cm, state);
        if (cm.display.lastWrapHeight != cm.display.wrapper.clientHeight) cm.refresh();
      } else {
        state.timeout = setTimeout(check, state.delay);
      }
    }

    state.timeout = setTimeout(check, state.delay);

    state.hurry = function () {
      clearTimeout(state.timeout);
      state.timeout = setTimeout(check, 50);
    };

    CodeMirror.on(window, "mouseup", state.hurry);
    CodeMirror.on(window, "keyup", state.hurry);
  }

  function stopListening(_cm, state) {
    clearTimeout(state.timeout);
    CodeMirror.off(window, "mouseup", state.hurry);
    CodeMirror.off(window, "keyup", state.hurry);
  }
});