"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE
(function (mod) {
  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) == "object" && (typeof module === "undefined" ? "undefined" : _typeof(module)) == "object") // CommonJS
    mod(require("../../lib/codemirror"));else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);else // Plain browser env
    mod(CodeMirror);
})(function (CodeMirror) {
  "use strict";

  CodeMirror.defineMode("elm", function () {
    function switchState(source, setState, f) {
      setState(f);
      return f(source, setState);
    }

    var lowerRE = /[a-z]/;
    var upperRE = /[A-Z]/;
    var innerRE = /[a-zA-Z0-9_]/;
    var digitRE = /[0-9]/;
    var hexRE = /[0-9A-Fa-f]/;
    var symbolRE = /[-&*+.\\/<>=?^|:]/;
    var specialRE = /[(),[\]{}]/;
    var spacesRE = /[ \v\f]/; // newlines are handled in tokenizer

    function normal() {
      return function (source, setState) {
        if (source.eatWhile(spacesRE)) {
          return null;
        }

        var _char = source.next();

        if (specialRE.test(_char)) {
          return _char === '{' && source.eat('-') ? switchState(source, setState, chompMultiComment(1)) : _char === '[' && source.match('glsl|') ? switchState(source, setState, chompGlsl) : 'builtin';
        }

        if (_char === '\'') {
          return switchState(source, setState, chompChar);
        }

        if (_char === '"') {
          return source.eat('"') ? source.eat('"') ? switchState(source, setState, chompMultiString) : 'string' : switchState(source, setState, chompSingleString);
        }

        if (upperRE.test(_char)) {
          source.eatWhile(innerRE);
          return 'variable-2';
        }

        if (lowerRE.test(_char)) {
          var isDef = source.pos === 1;
          source.eatWhile(innerRE);
          return isDef ? "def" : "variable";
        }

        if (digitRE.test(_char)) {
          if (_char === '0') {
            if (source.eat(/[xX]/)) {
              source.eatWhile(hexRE); // should require at least 1

              return "number";
            }
          } else {
            source.eatWhile(digitRE);
          }

          if (source.eat('.')) {
            source.eatWhile(digitRE); // should require at least 1
          }

          if (source.eat(/[eE]/)) {
            source.eat(/[-+]/);
            source.eatWhile(digitRE); // should require at least 1
          }

          return "number";
        }

        if (symbolRE.test(_char)) {
          if (_char === '-' && source.eat('-')) {
            source.skipToEnd();
            return "comment";
          }

          source.eatWhile(symbolRE);
          return "keyword";
        }

        if (_char === '_') {
          return "keyword";
        }

        return "error";
      };
    }

    function chompMultiComment(nest) {
      if (nest == 0) {
        return normal();
      }

      return function (source, setState) {
        while (!source.eol()) {
          var _char2 = source.next();

          if (_char2 == '{' && source.eat('-')) {
            ++nest;
          } else if (_char2 == '-' && source.eat('}')) {
            --nest;

            if (nest === 0) {
              setState(normal());
              return 'comment';
            }
          }
        }

        setState(chompMultiComment(nest));
        return 'comment';
      };
    }

    function chompMultiString(source, setState) {
      while (!source.eol()) {
        var _char3 = source.next();

        if (_char3 === '"' && source.eat('"') && source.eat('"')) {
          setState(normal());
          return 'string';
        }
      }

      return 'string';
    }

    function chompSingleString(source, setState) {
      while (source.skipTo('\\"')) {
        source.next();
        source.next();
      }

      if (source.skipTo('"')) {
        source.next();
        setState(normal());
        return 'string';
      }

      source.skipToEnd();
      setState(normal());
      return 'error';
    }

    function chompChar(source, setState) {
      while (source.skipTo("\\'")) {
        source.next();
        source.next();
      }

      if (source.skipTo("'")) {
        source.next();
        setState(normal());
        return 'string';
      }

      source.skipToEnd();
      setState(normal());
      return 'error';
    }

    function chompGlsl(source, setState) {
      while (!source.eol()) {
        var _char4 = source.next();

        if (_char4 === '|' && source.eat(']')) {
          setState(normal());
          return 'string';
        }
      }

      return 'string';
    }

    var wellKnownWords = {
      "case": 1,
      of: 1,
      as: 1,
      "if": 1,
      then: 1,
      "else": 1,
      "let": 1,
      "in": 1,
      type: 1,
      alias: 1,
      module: 1,
      where: 1,
      "import": 1,
      exposing: 1,
      port: 1
    };
    return {
      startState: function startState() {
        return {
          f: normal()
        };
      },
      copyState: function copyState(s) {
        return {
          f: s.f
        };
      },
      token: function token(stream, state) {
        var type = state.f(stream, function (s) {
          state.f = s;
        });
        var word = stream.current();
        return wellKnownWords.hasOwnProperty(word) ? 'keyword' : type;
      }
    };
  });
  CodeMirror.defineMIME("text/x-elm", "elm");
});