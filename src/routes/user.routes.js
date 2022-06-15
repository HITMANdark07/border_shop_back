import * as userController from '../controllers/user.controllers.js';
import { Router } from 'express';

const router = Router();

router.post("/login", userController.login);
router.get("/user/:userId",userController.read);
// router.get("/wallet/:userId", userController.getWallet );
// router.get("/get-profile/:userId",userController.getProfile);

router.param("userId", userController.userById);

export default router;