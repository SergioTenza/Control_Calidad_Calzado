var express = require('express');
var fs = require('fs');
var app = express();
const pug = require('pug');

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded());
app.use(express.json());

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

app.post('/signin', function(peticion, respuesta){
    respuesta.render('user.pug', {
        
        petition : peticion.body.user.email,
        petition2 : peticion.body.user.password
    });
});

app.listen(3000, function(){
    console.log('escuchando en puerto 3000');
});