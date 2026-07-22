// controla las rutas de la API, devolviendo siempre JSON
const express = require('express');
const router = express.Router();
const productsApiController = require('../controllers/productsApiController');
const categoriesApiController = require('../controllers/categoriesApiController');
const statsApiController = require('../controllers/statsApiController');
const normalizeId = require('../utils/normalizeId');

router.get('/products', productsApiController.home);
router.post('/register', productsApiController.registerProcess);
router.post('/login', (req, res) => {
    // Login simulado
    res.json({ success: true, message: 'Login simulado' });
});

router.get('/products/:id', normalizeId, productsApiController.productDetail);

// Rutas Estadísticas (Dashboard)
router.get('/stats', statsApiController.getStats);

// Rutas Categories
router.get('/categories', categoriesApiController.getAll);
router.get('/categories/:id', categoriesApiController.getById); // Usamos next() en el controlador si no es número
router.post('/categories', categoriesApiController.create);
router.put('/categories/:id', categoriesApiController.update);
router.delete('/categories/:id', categoriesApiController.delete);

router.get('/categories/:categoryName', productsApiController.category);
router.get('/500', productsApiController.error500);
router.get('/search', productsApiController.search);

// Rutas Admin
router.post('/products', productsApiController.createProduct);
router.put('/products/:id', normalizeId, productsApiController.updateProduct);
router.delete('/products/:id', normalizeId, productsApiController.deleteProduct);

module.exports = router;
