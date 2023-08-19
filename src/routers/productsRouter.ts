import express from 'express';
import ProductsController from '../controllers/productsController';

const productsController = new ProductsController();
 
const router = express.Router();
 
router.get('/', productsController.getProducts);
 
router.put('/:code', productsController.updateProduct);

router.delete('/:code', productsController.deleteProducts);

router.get('/:code', productsController.getProductsByCode);
 
export default router;