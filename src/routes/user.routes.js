import {Router} from 'express'
const router = Router();

import * as userCtrl from '../controllers/user.controller'
import {authJwt} from '../middlewares'

router.get('/', userCtrl.getUsers)

router.post('/', [authJwt.verifyToken, authJwt.isAdmin], userCtrl.createUser)

router.get('/:userId', userCtrl.getUserById)

router.put('/:userId', [authJwt.verifyToken, authJwt.isAdmin], userCtrl.updateUserById)

router.delete('/:userId', [authJwt.verifyToken, authJwt.isAdmin], userCtrl.deleteUserById)

export default router;