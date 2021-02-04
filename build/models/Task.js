"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var taskSchema = new _mongoose.Schema({
  fecha: String,
  horaInicio: String,
  horaFinal: String,
  logo: String,
  skin: String,
  tema: String,
  texto: String
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)('Task', taskSchema);

exports["default"] = _default;