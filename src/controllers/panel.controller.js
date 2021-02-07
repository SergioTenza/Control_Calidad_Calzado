export const panelHome = (req, res) => {    
    res.render('panel', {
        title: 'Main panel',
        cabecera: 'Main',
        username: req.user.username        
    });
}
export const panelUserInfo = (req, res) => {    
    res.render('panelUser', {
        title: 'User Info',
        cabecera: 'Informacion Usuario',
        username: req.user.username        
    });
}

export const panelListInsp = (req, res) => {    
    res.render('panelInspList', {
        title: 'Inspecciones',
        cabecera: 'Listar Inspecciones',
        username: req.user.username        
    });
}

export const panelNewInsp = (req, res) => {    
    res.render('panelInspNew', {
        title: 'Inspecciones',
        cabecera: 'Nueva Inspeccion',
        username: req.user.username        
    });
}


