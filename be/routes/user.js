const express = require('express');
const app = express();
const config = require('../config');
app.set('superSecret', config.secret);
const router = express.Router();
const md5 = require('md5');
const userController = require('../controllers/userController');
const VerifyToken = require('../controllers/auth/VerifyToken');

router.post('/login', userController.login);
router.post('/register', userController.register);
router.get('/', userController.getUsers);
router.delete('/', userController.deleteUser);
router.put('/', userController.updateUser);

module.exports = router;
