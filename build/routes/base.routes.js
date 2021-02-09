"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var baseCtrl = _interopRequireWildcard(require("../controllers/base.controller"));

var router = (0, _express.Router)();
router.get('/login', baseCtrl.signinform);
router.post('/login', baseCtrl.signin);
router.get('/logout', baseCtrl.logout);
router.get('/register', baseCtrl.signupform);
router.post('/register', baseCtrl.signup);
router.get('/forgot', baseCtrl.forgot);
router.post('/forgot', baseCtrl.forgotRecover);
router.get('/about', baseCtrl.about);
router.get('/contact', baseCtrl.contact);
router.get('/400', function (req, res) {
  res.render('400', {
    message: 'usuario no encontrado o inexistente',
    status: '400'
  });
});
router.get('/401', function (req, res) {
  res.render('401', {
    message: 'error de inicio de sesión',
    status: '401'
  });
});
router.get('/404', function (req, res) {
  res.render('404', {
    message: 'error recurso no encontrado',
    status: '404'
  });
});
var _default = router;
exports["default"] = _default;