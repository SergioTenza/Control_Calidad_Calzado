export const panelHome = (req, res) => {    
    res.render('panel', {
        title: 'Main panel',
        cabecera: 'Main',
        username: req.user.username        
    });
}



