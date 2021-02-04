import {Router} from 'express';
const router = Router();

import * as tasksCtrl from '../controllers/tasks.controller'
import {authJwt} from '../middlewares'

router.post('/', [authJwt.verifyToken, authJwt.isCustomer],tasksCtrl.createTask);
router.get('/', tasksCtrl.getTasks);
router.get('/:taskId', tasksCtrl.getTaskById);
router.put('/:taskId', [authJwt.verifyToken, authJwt.isAdmin], tasksCtrl.updateTaskById);
router.delete('/:taskId', [authJwt.verifyToken,authJwt.isAdmin], tasksCtrl.deleteTaskById);

export default router;