import express from 'express';
import session from 'express-session';
import path from 'path';
import morgan from'morgan';
import bodyParser from 'body-parser';
import flash from 'connect-flash';
import passport from 'passport';
import {createRoles} from './libs/initialSetup';
import baseRoutes from './routes/base.routes';
import panelRoutes from './routes/panel.routes';


const app = express();
require('./config/passport');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 5001);

createRoles();

app.use(session({
    secret: 'ccc.mebn',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null; 
    next();
})

app.use(morgan('dev'));
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
})

app.use('/', baseRoutes);
app.use('/panel', panelRoutes);

export default app;