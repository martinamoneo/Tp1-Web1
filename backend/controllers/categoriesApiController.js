// maneja las peticiones de categorías y devuelve JSON
const categoriesService = require('../services/categoriesService');

const categoriesApiController = {
    getAll: (req, res) => {
        try {
            const categories = categoriesService.getAll();
            res.json(categories);
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },
    getById: (req, res, next) => {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return next(); // Si no es un número, pasamos a la siguiente ruta (que es /:categoryName)
            }
            const category = categoriesService.getById(id);
            if (!category) {
                return res.status(404).json({ error: 'Categoría no encontrada' });
            }
            res.json(category);
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },
    create: (req, res) => {
        try {
            if (!req.body.name) {
                return res.status(400).json({ error: 'El nombre es obligatorio' });
            }
            const newId = categoriesService.create(req.body);
            res.status(201).json({ success: true, message: 'Categoría creada', id: newId });
        } catch (error) {
            res.status(500).json({ error: 'Error al crear la categoría' });
        }
    },
    update: (req, res) => {
        try {
            const id = parseInt(req.params.id);
            if (!req.body.name) {
                return res.status(400).json({ error: 'El nombre es obligatorio' });
            }
            const category = categoriesService.getById(id);
            if (!category) {
                return res.status(404).json({ error: 'Categoría no encontrada' });
            }
            categoriesService.update(id, req.body);
            res.json({ success: true, message: 'Categoría actualizada' });
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar la categoría' });
        }
    },
    delete: (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const category = categoriesService.getById(id);
            if (!category) {
                return res.status(404).json({ error: 'Categoría no encontrada' });
            }
            categoriesService.delete(id);
            res.json({ success: true, message: 'Categoría eliminada' });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar la categoría' });
        }
    }
};

module.exports = categoriesApiController;
