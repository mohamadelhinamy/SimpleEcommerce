const express = require('express');
const app = express();
const config = require('../config');
app.set('superSecret', config.secret);
const router = express.Router();
const md5 = require('md5');
const adminController = require('../controllers/adminController');
const VerifyToken = require('../controllers/auth/VerifyToken');

router.post('/login', adminController.login);
router.post('/', VerifyToken, adminController.addAdmin);
router.get('/', adminController.getAdmins);

module.exports = router;
