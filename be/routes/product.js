const express = require('express');
const app = express();
const config = require('../config');
app.set('superSecret', config.secret);
const router = express.Router();
const productController = require('../controllers/productController');
const VerifyToken = require('../controllers/auth/VerifyToken');

router.post('/', VerifyToken, productController.addProduct);
router.put('/', VerifyToken, productController.updateProduct);
router.delete('/', VerifyToken, productController.deleteProduct);
router.get('/', VerifyToken, productController.getProducts);
router.get('/filter', productController.getFilteredProducts);

module.exports = router;
