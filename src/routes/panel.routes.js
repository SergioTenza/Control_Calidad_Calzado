import {Router} from 'express';
import * as panelCtrl from '../controllers/panel.controller'
import { isAuthenticated } from '../helpers/auth';

const router = Router();

router.get('/', isAuthenticated, panelCtrl.panelHome);
router.get('/userinfo', isAuthenticated, panelCtrl.panelUserInfo);
router.get('/listinsp', isAuthenticated, panelCtrl.panelListInsp);

export default router;