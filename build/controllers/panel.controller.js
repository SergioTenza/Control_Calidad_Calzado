"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.panelNewInsp = exports.panelListInsp = exports.panelUserInfo = exports.panelHome = void 0;

var panelHome = function panelHome(req, res) {
  res.render('panel', {
    title: 'Main panel',
    cabecera: 'Main',
    username: req.user.username
  });
};

exports.panelHome = panelHome;

var panelUserInfo = function panelUserInfo(req, res) {
  res.render('panelUser', {
    title: 'User Info',
    cabecera: 'Informacion Usuario',
    username: req.user.username
  });
};

exports.panelUserInfo = panelUserInfo;

var panelListInsp = function panelListInsp(req, res) {
  res.render('panelInspList', {
    title: 'Inspecciones',
    cabecera: 'Listar Inspecciones',
    username: req.user.username
  });
};

exports.panelListInsp = panelListInsp;

var panelNewInsp = function panelNewInsp(req, res) {
  res.render('panelInspNew', {
    title: 'Inspecciones',
    cabecera: 'Nueva Inspeccion',
    username: req.user.username
  });
};

exports.panelNewInsp = panelNewInsp;