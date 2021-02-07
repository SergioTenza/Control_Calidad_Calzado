import {Router} from 'express';
import * as panelCtrl from '../controllers/panel.controller'
import { isAuthenticated } from '../helpers/auth';

const router = Router();

router.get('/', isAuthenticated, panelCtrl.panelHome);

export default router;