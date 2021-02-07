import {Router} from 'express';
const router = Router();

import * as baseCtrl from '../controllers/base.controller'

router.get('/login', baseCtrl.signinform);

router.post('/login', baseCtrl.signin);

router.get('/logout', baseCtrl.logout);

router.get('/register', baseCtrl.signupform);

router.post('/register', baseCtrl.signup);

router.get('/forgot', baseCtrl.forgot);

router.post('/forgot', baseCtrl.forgotRecover);

router.get('/about', baseCtrl.about);

router.get('/contact', baseCtrl.contact);

router.get('/400', (req, res) => {
    res.render('400',{message:'usuario no encontrado o inexistente', status:'400'});
})
router.get('/401', (req, res) => {
    res.render('401',{message:'error de inicio de sesión', status:'401'});
})
router.get('/404', (req, res) => {
    res.render('404',{message:'error recurso no encontrado', status:'404'});
})

export default router;