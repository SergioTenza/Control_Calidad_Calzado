"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _path = _interopRequireDefault(require("path"));

var _morgan = _interopRequireDefault(require("morgan"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _connectFlash = _interopRequireDefault(require("connect-flash"));

var _passport = _interopRequireDefault(require("passport"));

var _initialSetup = require("./libs/initialSetup");

var _base = _interopRequireDefault(require("./routes/base.routes"));

var _panel = _interopRequireDefault(require("./routes/panel.routes"));

var app = (0, _express["default"])();

require('./config/passport');

app.set('views', _path["default"].join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 5001);
(0, _initialSetup.createRoles)();
app.use((0, _expressSession["default"])({
  secret: 'ccc.mebn',
  resave: true,
  saveUninitialized: true
}));
app.use(_passport["default"].initialize());
app.use(_passport["default"].session());
app.use((0, _connectFlash["default"])()); //Global Variables

app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use(_express["default"]["static"](_path["default"].join(__dirname, 'public')));
app.get('/', function (req, res) {
  res.render('index');
});
app.use('/', _base["default"]);
app.use('/panel', _panel["default"]);
var _default = app;
exports["default"] = _default;