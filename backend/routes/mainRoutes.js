// controla las rutas, es decir segun el / que llegue llama a la pagina
// que corresponda del mainController

const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const normalizeId = require('../utils/normalizeId');


router.get('/', mainController.home);
router.post('/register', mainController.registerProcess);

router.get('/product/:id', normalizeId, mainController.productDetail);
router.get('/categories/:categoryName', mainController.category);
router.get('/500', mainController.error500);
router.get('/search', mainController.search);

// Rutas Admin CRUD (Productos)
router.post('/products/new', mainController.createProduct);
router.put('/products/:id/edit', normalizeId, mainController.updateProduct);
router.delete('/products/:id/delete', normalizeId, mainController.deleteProduct);

module.exports = router; 