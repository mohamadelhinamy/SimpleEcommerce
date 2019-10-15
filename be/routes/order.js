const express = require('express');
const app = express();
const config = require('../config');
app.set('superSecret', config.secret);
const router = express.Router();
const orderController = require('../controllers/orderController');
const VerifyToken = require('../controllers/auth/VerifyToken');

router.post('/', VerifyToken, orderController.addOrder);
router.get('/', orderController.getOrders);
router.get('/filter', orderController.getFilteredOrders);
router.delete('/', orderController.deleteOrder);
router.put('/', orderController.updateOrder);

module.exports = router;
