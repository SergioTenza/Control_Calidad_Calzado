import express from 'express';
import morgan from'morgan';

import {createRoles} from './libs/initialSetup';

import tasksRoutes from './routes/tasks.routes';
import authRoutes from './routes/auth.routes';
import usersRoutes from './routes/user.routes'

const app = express();

app.set('view engine', 'pug');

createRoles();

app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) =>{
    res.render('loginApi', { title: 'Hey', message: 'Hello there!'});
})

app.use(express.static('public'));
app.use('/api/tasks', tasksRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);

export default app;