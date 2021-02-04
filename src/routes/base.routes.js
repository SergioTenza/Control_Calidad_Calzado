import {Router} from 'express';

const router = Router();

router.get('/login', (req, res) => {
    res.render('loginApi');
})
router.get('/register', (req, res) => {
    res.render('registerApi');
})
router.get('/forgot', (req, res) => {
    res.render('forgotApi');
})
router.get('/404', (req, res) => {
    res.render('404',{message:'error recurso no encontrado', status:'404'});
})

export default router;