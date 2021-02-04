import {Router} from 'express';

const router = Router();

router.get('/', (req, res) => {
    let name = a => a != null ? req.body.username : 'Visitante';        
    res.render('panel', {
        cabecera: 'Main',
        username: name(req.body.username),
        title: 'Main panel'
    });
})
router.get('/dev', (req, res) => {
    let name = a => a != null ? req.body.username : 'Visitante';        
    res.render('BpanelDEVx', {
        cabecera: 'Usuario',
        username: name(req.body.username)
    });
})
router.get('/new', (req, res) => {
    let name = a => a != null ? req.body.username : 'Visitante';        
    res.render('panelInspeccion', {
        cabecera: 'Nueva inspeccion',
        username: name(req.body.username)
    });
})

export default router;