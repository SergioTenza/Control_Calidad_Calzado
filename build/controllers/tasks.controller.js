"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteTaskById = exports.updateTaskById = exports.getTaskById = exports.getTasks = exports.createTask = void 0;

var _Task = _interopRequireDefault(require("../models/Task"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createTask = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, fecha, horaInicio, horaFinal, logo, skin, tema, texto, newTask, taskSaved;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, fecha = _req$body.fecha, horaInicio = _req$body.horaInicio, horaFinal = _req$body.horaFinal, logo = _req$body.logo, skin = _req$body.skin, tema = _req$body.tema, texto = _req$body.texto;
            newTask = new _Task["default"]({
              fecha: fecha,
              horaInicio: horaInicio,
              horaFinal: horaFinal,
              logo: logo,
              skin: skin,
              tema: tema,
              texto: texto
            });
            _context.next = 4;
            return newTask.save();

          case 4:
            taskSaved = _context.sent;
            res.status(201).json(taskSaved);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createTask(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createTask = createTask;

var getTasks = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var tasks;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _Task["default"].find();

          case 2:
            tasks = _context2.sent;
            res.status(200).json(tasks);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getTasks(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getTasks = getTasks;

var getTaskById = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var task;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _Task["default"].findById(req.params.taskId);

          case 2:
            task = _context3.sent;
            res.status(200).json(task);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getTaskById(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getTaskById = getTaskById;

var updateTaskById = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var updatedTask;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _Task["default"].findByIdAndUpdate(req.params.taskId, req.body, {
              "new": true
            });

          case 2:
            updatedTask = _context4.sent;
            res.status(200).json(updatedTask);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function updateTaskById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateTaskById = updateTaskById;

var deleteTaskById = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var taskId;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            taskId = req.params.taskId;
            _context5.next = 3;
            return _Task["default"].findByIdAndDelete(taskId);

          case 3:
            res.status(204).json();

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function deleteTaskById(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deleteTaskById = deleteTaskById;