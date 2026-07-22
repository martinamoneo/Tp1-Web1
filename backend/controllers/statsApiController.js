// maneja las peticiones de estadísticas y devuelve JSON
const productsService = require('../services/productsService');
const categoriesService = require('../services/categoriesService');

const statsApiController = {
    getStats: (req, res) => {
        try {
            const totalProducts = productsService.getCount();
            const totalCategories = categoriesService.getCount();

            res.json({
                totalProducts: totalProducts,
                totalCategories: totalCategories
            });
        } catch (error) {
            console.error('Error al obtener estadísticas:', error);
            res.status(500).json({ error: 'Error interno del servidor al calcular estadísticas' });
        }
    }
};

module.exports = statsApiController;
