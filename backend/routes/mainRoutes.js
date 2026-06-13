// controla las rutas, es decir segun el / que llegue llama a la pagina
// que corresponda del mainController

const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const normalizeId = require('../utils/normalizeId');


router.get('/', mainController.home);
router.get('/register', mainController.register);
router.post('/register', mainController.registerProcess);
router.get('/login', mainController.login);
router.get('/cart', mainController.cart);
router.post('/cart/add', normalizeId, mainController.addToCart);
router.post('/cart/update', normalizeId, mainController.updateCart);
router.post('/cart/clear', mainController.clearCart);
router.get('/checkout', mainController.checkout);
router.get('/product/:id', normalizeId, mainController.productDetail);
router.get('/categories/:categoryName', mainController.category);
router.get('/500', mainController.error500);
router.get('/search', mainController.search);

module.exports = router; 