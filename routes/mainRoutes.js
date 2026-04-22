const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/', mainController.home);
router.get('/register', mainController.register);
router.get('/login', mainController.login);
router.get('/cart', mainController.cart);
router.get('/checkout', mainController.checkout);

module.exports = router;