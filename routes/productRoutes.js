const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/get-stock', productController.getStock);
router.post('/submit-form', productController.addProduct);
router.put('/update-product/:productId', productController.updateProduct);
router.delete('/delete-product/:productId', productController.deleteProduct);
router.get('/get-product-details/:productId',productController.getModal);

module.exports = router;
