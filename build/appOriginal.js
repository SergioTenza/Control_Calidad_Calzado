"use strict";

var express = require('express');

var pug = require('pug');

var app = express();
app.set('view engine', 'pug');

var Gallery = require('express-photo-gallery');

var options = {
  title: 'Mi galeria'
};
app.use('/photoGallery', Gallery('public/media/Album1', options));
app.use(express["static"]('public'));
app.get('/', function (req, res) {
  //res.sendFile(__dirname + '/views/index.html');
  res.render('index');
});
app.listen(5000, function () {
  console.log('App listening on port 5000!');
});