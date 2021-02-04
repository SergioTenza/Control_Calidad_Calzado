import express from 'express';
import path from 'path';
import morgan from'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'

import {createRoles} from './libs/initialSetup';

import tasksRoutes from './routes/tasks.routes';
import authRoutes from './routes/auth.routes';
import usersRoutes from './routes/user.routes';
import baseRoutes from './routes/base.routes';
import panelRoutes from './routes/panel.routes';

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

createRoles();

app.use(morgan('dev'));
app.use(express.json());
// for parsing application/json
app.use(bodyParser.json());
// for parsing application/xwww-
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(cookieParser()); 
app.use(express.static(path.join(__dirname, 'public')));
//app.post('/signin', upload.none(), (req, res) => {    
//    res.status(200).json({message:'data Received'})    
//});
app.get('/', (req, res) => {
    res.render('index');
})

app.use('/ccc', baseRoutes);
app.use('/ccc/panel', panelRoutes);
app.use('/api/tasks', tasksRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);

export default app;