const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/', mainController.home);
router.get('/register', mainController.register);
router.post('/register', mainController.registerProcess);
router.get('/login', mainController.login);
router.get('/cart', mainController.cart);
router.post('/cart/add', mainController.addToCart);
router.post('/cart/update', mainController.updateCart);
router.post('/cart/clear', mainController.clearCart);
router.get('/checkout', mainController.checkout);

module.exports = router;