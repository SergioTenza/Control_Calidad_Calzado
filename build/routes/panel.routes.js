"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var panelCtrl = _interopRequireWildcard(require("../controllers/panel.controller"));

var _auth = require("../helpers/auth");

var router = (0, _express.Router)();
router.get('/', _auth.isAuthenticated, panelCtrl.panelHome);
router.get('/userinfo', _auth.isAuthenticated, panelCtrl.panelUserInfo);
router.get('/listinsp', _auth.isAuthenticated, panelCtrl.panelListInsp);
router.get('/newinsp', _auth.isAuthenticated, panelCtrl.panelNewInsp);
var _default = router;
exports["default"] = _default;