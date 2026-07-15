// controla las rutas, es decir segun el / que llegue llama a la función
// que corresponda del mainController

const express = require('express'); // importo express
const router = express.Router(); // creo un router para manejar las rutas 
const mainController = require('../controllers/mainController'); // importo el mainController
const normalizeId = require('../utils/normalizeId'); // importo el middleware normalizeId


router.get('/', mainController.home);
router.post('/register', mainController.registerProcess);

router.get('/product/:id', normalizeId, mainController.productDetail);
router.get('/categories/:categoryName', mainController.category);
router.get('/500', mainController.error500);
router.get('/search', mainController.search);

// Rutas Admin
router.post('/products/new', mainController.createProduct);
router.put('/products/:id/edit', normalizeId, mainController.updateProduct);
router.delete('/products/:id/delete', normalizeId, mainController.deleteProduct);

module.exports = router; 