import * as cartController from '../controllers/cart.controllers.js';
import { Router } from 'express';

const router = Router();

router.post("/create", cartController.createNewCart);
router.put("/update/:cartId",cartController.updateCartById);
router.get("/get/:cartId", cartController.read);


router.param("cartId", cartController.cartById);

export default router;