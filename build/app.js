"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _initialSetup = require("./libs/initialSetup");

var _tasks = _interopRequireDefault(require("./routes/tasks.routes"));

var _auth = _interopRequireDefault(require("./routes/auth.routes"));

var _user = _interopRequireDefault(require("./routes/user.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.set('view engine', 'pug');
(0, _initialSetup.createRoles)();
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use('/css', _express["default"]["static"](__dirname + '/public/css'));
app.use('/plugins', _express["default"]["static"](__dirname + '/public/plugins'));
app.use('/dist', _express["default"]["static"](__dirname + '/public/dist'));
app.get('/', function (req, res) {
  res.render('userApi', {
    title: 'Hey',
    message: 'Hello there!'
  });
});
app.use('/api/tasks', _tasks["default"]);
app.use('/api/auth', _auth["default"]);
app.use('/api/users', _user["default"]);
var _default = app;
exports["default"] = _default;