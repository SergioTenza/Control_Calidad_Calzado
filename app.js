var express = require('express');
var fs = require('fs');
var app = express();
const pug = require('pug');

app.use(express.static(__dirname + '/public'));

app.get('/', function(peticion, respuesta ){
    respuesta.render('index.pug', {
        titulo: "TEST",
        textoParrafo: "XXX"
    });

});

app.get('/login.html', function(peticion, respuesta ){
    respuesta.render('login.pug', {
        
    });

});

app.listen(3000, function(){
    console.log('escuchando en puerto 3000');
});