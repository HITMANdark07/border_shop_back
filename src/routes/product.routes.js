import * as productController from '../controllers/product.controllers.js';
import { Router } from 'express';

const router = Router();

router.get("/product/:slug", productController.readProductData);
router.get("/list",productController.listAllProducts);
router.get("/categories/:category", productController.listProductByCategory);


router.param("slug", productController.getProductById);

export default router;