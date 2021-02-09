"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.about = exports.contact = exports.forgotRecover = exports.forgot = exports.logout = exports.signin = exports.signinform = exports.signup = exports.signupform = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _User = _interopRequireDefault(require("../models/User"));

var _passport = _interopRequireDefault(require("passport"));

var signupform = function signupform(req, res) {
  res.render('panelRegister');
};

exports.signupform = signupform;

var signup = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var errors, _req$body, username, email, password, confirm_password, emailUser, newUser, savedUser;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            errors = [];
            _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password, confirm_password = _req$body.confirm_password;
            console.log(req.body);

            if (password != confirm_password) {
              errors.push({
                text: 'los passwords no coinciden'
              });
            }

            if (password.length < 4) {
              errors.push({
                text: 'el password debe tener al menos 4 caracteres'
              });
            }

            if (!(errors.length > 0)) {
              _context.next = 9;
              break;
            }

            res.render('panelRegister', {
              errors: errors
            });
            _context.next = 30;
            break;

          case 9:
            _context.next = 11;
            return _User["default"].findOne({
              email: email
            });

          case 11:
            emailUser = _context.sent;

            if (!emailUser) {
              _context.next = 17;
              break;
            }

            errors.push({
              text: 'El correo ya existe'
            }); //req.flash('error_msg', 'El correo ya existe')

            res.render('panelRegister', {
              errors: errors
            });
            _context.next = 30;
            break;

          case 17:
            _context.t0 = _User["default"];
            _context.t1 = username;
            _context.t2 = email;
            _context.next = 22;
            return _User["default"].encryptPassword(password);

          case 22:
            _context.t3 = _context.sent;
            _context.t4 = {
              username: _context.t1,
              email: _context.t2,
              password: _context.t3
            };
            newUser = new _context.t0(_context.t4);
            _context.next = 27;
            return newUser.save();

          case 27:
            savedUser = _context.sent;
            req.flash('success_msg', 'Registro correcto');
            res.redirect('/login');

          case 30:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function signup(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.signup = signup;

var signinform = function signinform(req, res) {
  res.render('panelLogin');
};

exports.signinform = signinform;

var signin = _passport["default"].authenticate('local', {
  failureRedirect: '/login',
  successRedirect: '/panel',
  failureFlash: true
});

exports.signin = signin;

var logout = function logout(req, res) {
  req.logout();
  req.flash('success_msg', 'Ha hecho logout satisfactoriamente');
  res.redirect('/login');
};

exports.logout = logout;

var forgot = function forgot(req, res) {
  res.render('panelForgot', {
    title: 'Recover'
  });
};

exports.forgot = forgot;

var forgotRecover = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var email, emailUser;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            email = req.body.email;

            if (!email) {
              _context2.next = 12;
              break;
            }

            _context2.prev = 2;
            _context2.next = 5;
            return _User["default"].findOne({
              email: email
            });

          case 5:
            emailUser = _context2.sent;

            if (!emailUser) {
              req.flash('error_msg', 'no existe ese usuario');
              res.redirect('/login');
            } else {
              req.flash('success_msg', 'revise su correo para instrucciones');
              res.redirect('/login');
            }

            _context2.next = 12;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](2);
            console.error(_context2.t0);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 9]]);
  }));

  return function forgotRecover(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.forgotRecover = forgotRecover;

var contact = function contact(req, res) {
  res.render('panelContact', {
    title: 'Contacto'
  });
};

exports.contact = contact;

var about = function about(req, res) {
  res.render('panelAbout');
};

exports.about = about;