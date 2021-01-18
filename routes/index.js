const express = require('express');
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');
const path = require('path');
const auth = require('http-auth');

const router = express.Router();
const Registration = mongoose.model('Registration');
const basic = auth.basic({
    file: path.join(__dirname, '../users.htpasswd'),
  });

var user = null;

router.get('/', (req, res) => {
    if( user === null) {        
        res.render('index', { 
            title: 'Bienvenido', 
            cabecera: 'Bienvenido a Control de Calidad Calzado', 
            user: 'Visitante'});
    }
    else if(user === 'Visitante'){
        res.render('index', { 
            title: 'Bienvenido', 
            cabecera: 'Bienvenido a Control de Calidad Calzado', 
            user: 'Visitante'});        
    }else{
        res.render('userDashboard', {
            title: 'Bienvenido',
            cabecera: 'Panel de control de usuario',
            user: user});
    }
    
});

router.post('/',[
    check('email')
      .isLength({ min: 1 })
      .withMessage('Please enter a valid email'),
    check('password')
      .isLength({ min: 8 })
      .withMessage('Please enter at least 8 characters password'),
  ], (req, res) => {    
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        
        Registration.findOne(req.email)
          .then(() => { res.render('userDashboard', {
            title: 'Bienvenido',
            cabecera: 'Panel de control de usuario',
            user: req.user
          }); })
          .catch((err) => {
            console.log(err);
            res.render('error',{
                title: 'Sorry!',
                cabecera: 'Sorry! Something went wrong.'
            });
          });
    } else {
      res.render('index', {
        title: 'Bienvenido',
        errors: errors.array(),
        data: req.body,
      });
    }
});

router.get('/register', (req, res) => {
    res.render('formRegistration', { title: 'Registration Form', cabecera: 'Bienvenido a Control de Calidad Calzado', user: user});
});

router.post('/register',[
    check('name')
      .isLength({ min: 1 })
      .withMessage('Please enter a name'),
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email'),
    check('password')
      .isLength({ min: 8 })
      .withMessage('Please enter a password at least 8 characters'),
  ], (req, res) => {    
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        const registration = new Registration(req.body);
        registration.save()
          .then(() => { res.send('Thank you for your registration!'); })
          .catch((err) => {
            console.log(err);
            res.send('Sorry! Something went wrong.');
          });
    } else {
      res.render('formRegistration', {
        title: 'Registration form',
        errors: errors.array(),
        data: req.body,
      });
    }
});

router.get('/passrecovery', (req, res) => {
    res.render('forgottenPassword', { title: 'Pass Recovery', cabecera: 'Introduce tu email para restablecer password', user: user });
});

router.post('/passrecovery', [        
        check('email')
        .isEmail()
        .withMessage('Please enter a valid email'),
    ],(req, res) => {
        const errors = validationResult(req);

        if (errors.isEmpty()) {
            const registration = new Registration(req.body);
            registration.save()
            .then(() => { res.send('Thank you for your registration!'); })
            .catch((err) => {
                console.log(err);
                res.send('Sorry! Something went wrong.');
            });
        } else {
        res.render('formRegistration', {
            title: 'Registration form',
            errors: errors.array(),
            data: req.body,
        });
        }
    res.render('forgottenPassword', { title: 'Pass Recovery', cabecera: 'comprueba tu email para instrucciones', user: user });
});

router.get('/registrations', basic.check((req, res) => {
    user = req.user;       
    Registration.find()
        .then( (registrations) => {                                                  
            res.render('users', { title: 'Listing registrations', cabecera: 'Listado de Usuarios Activos', user: user, registrations});            
        })
        .catch(() => { res.send('Sorry something went wrong.'); });    
}));



module.exports = router;