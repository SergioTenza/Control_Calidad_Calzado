import passport from 'passport';
import User from '../models/User';

const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) =>{
    //Check Email exists
    try {
        const user = await User.findOne({email})
        
        if (!user) {
            return done(null, false, {message: 'No existe el usuario'});
        } else {
            // Check user password match
            
            const matchFound = await User.comparePassword(password, user.password);
            if (matchFound) {
                return done(null, user);
            } else {
                return done(null, false, {message: 'password incorrecto'});
            }
        }        
    } catch (error) {
        console.error(error)
    }   
}))

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    })
})

