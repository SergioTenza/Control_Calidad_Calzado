import User from '../models/User';
import passport from 'passport';

export const signupform = (req, res) => {
    res.render('panelRegister');
}
export const signup = async (req, res) => {
    const errors = [];
    const {username, email, password, confirm_password} = req.body;
    console.log(req.body)
    
    if(password != confirm_password){
        errors.push({text: 'los passwords no coinciden'});
    }
    if(password.length < 4){
        errors.push({text: 'el password debe tener al menos 4 caracteres'})
    }
    if(errors.length > 0) {        
        res.render('panelRegister',{            
            errors
        })
    }else{
        const emailUser = await User.findOne({email: email});
        if(emailUser) {
            errors.push({text: 'El correo ya existe'});
            //req.flash('error_msg', 'El correo ya existe')
            res.render('panelRegister',{            
                errors
            })
        } else{
            const newUser = new User({
                username,
                email,
                password: await User.encryptPassword(password)
            });            
            const savedUser = await newUser.save();
            
            req.flash('success_msg', 'Registro correcto');
            res.redirect('/login');
        }
    }    
};

export const signinform = (req, res) => {                
    res.render('panelLogin');
}

export const signin = passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/api/panel',
        failureFlash: true        
});

export const logout = (req, res) => {
    req.logout();
    req.flash('success_msg', 'Ha hecho logout satisfactoriamente');
    res.redirect('/login')
};

export const forgot = (req, res) => {
    res.render('panelForgot',{
        title: 'Recover'
    });
}

export const forgotRecover = async (req, res) => {
    const {email} = req.body
    if(email) {
                try {
                        const emailUser = await User.findOne({email: email});
                        if(!emailUser){ 
                            req.flash('error_msg', 'no existe ese usuario');
                            res.redirect('/login');
                        }else{
                            req.flash('success_msg', 'revise su correo para instrucciones');
                            res.redirect('/login');
                        }
                } catch (error) {
                    console.error(error);
                }   
    }       
}

export const contact = (req, res) => {
    res.render('panelContact',
    {title: 'Contacto'});
}

export const about = (req, res) => {
    res.render('panelAbout');
}
