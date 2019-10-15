const express = require('express');
const app = express();
const config = require('../config');
app.set('superSecret', config.secret);
const router = express.Router();
const productCategoryController = require('../controllers/productCategoryController');
const VerifyToken = require('../controllers/auth/VerifyToken');

router.post('/', VerifyToken, productCategoryController.addProductCategory);
router.put('/', VerifyToken, productCategoryController.updateProductCategory);
router.delete('/', VerifyToken, productCategoryController.deleteProductCategory);
router.get('/', VerifyToken, productCategoryController.getProductCategories);

module.exports = router;
