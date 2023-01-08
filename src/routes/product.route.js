import { Router } from "express";
import * as productController from '../controllers/product.controller.js';
import { verifyToken, isModerator, isAdmin} from '../middlewares/index.js';
const router = Router();

router.get('/', productController.getProducts);

router.get('/:id', productController.getProductById);

router.post('/', [verifyToken, isModerator],productController.createProduct);

router.put('/:id',[verifyToken, isModerator],productController.updateProductById);

router.delete('/:id',[verifyToken, isAdmin],productController.deleteProductById);


export default router;