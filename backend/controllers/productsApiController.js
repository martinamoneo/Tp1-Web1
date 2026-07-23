// Controlador dedicado a la API, siempre responde con JSON
const productsService = require('../services/productsService');

const apiController = {
    home: (req, res) => {
        const sort = req.query.sort || null;
        let productos = productsService.getAllProducts();

        if (sort === 'asc') {
            productos = [...productos].sort((a, b) => a.puntos - b.puntos);
        } else if (sort === 'desc') {
            productos = [...productos].sort((a, b) => b.puntos - a.puntos);
        }

        res.json({
            productos: productos,
            sort: sort
        });
    },

    search: (req, res) => {
        const query = req.query.query || '';
        const queryLower = query.toLowerCase().trim();

        const resultados = queryLower === ''
            ? []
            : productsService.searchByName(queryLower);

        res.json({
            query: query,
            resultados: resultados
        });
    },
    
    registerProcess: (req, res) => {
        // Registro simulado: no se guarda en la BD por ahora
        res.status(201).json({ success: true, message: 'Usuario registrado exitosamente' });
    },

    productDetail: (req, res) => {
        const productId = req.productId;
        const producto = req.producto;

        const sugeridos = productsService.getSuggestedProducts(productId, producto.categoria); 

        res.json({ 
            producto: producto,
            productosSugeridos: sugeridos
        });
    },
    
    category: (req, res) => {
        const categoryName = req.params.categoryName.toLowerCase();
        
        const result = productsService.getProductsByCategoryName(categoryName);

        if (!result) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }

        res.json({
            categoriaNombre: result.categoriaNombre,
            productos: result.productos
        });
    },

    createProduct: (req, res) => {
        try {
            const { nombre, puntos, categoria, descripcion_corta, imagen } = req.body;
            if (!nombre || !puntos || !categoria || !descripcion_corta || !imagen) {
                return res.status(400).json({ error: 'Faltan campos obligatorios' });
            }

            const newId = productsService.createProduct(req.body);
            res.status(201).json({ success: true, message: 'Producto creado exitosamente', id: newId });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al crear el producto' });
        }
    },
    
    updateProduct: (req, res) => {
        try { 
            const { nombre, puntos, categoria, descripcion_corta, imagen } = req.body;
            if (!nombre || !puntos || !categoria || !descripcion_corta || !imagen) {
                return res.status(400).json({ error: 'Faltan campos obligatorios' });
            }

            const productId = req.productId;
            productsService.updateProduct(productId, req.body);
            res.json({ success: true, message: 'Producto actualizado exitosamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al actualizar el producto' });
        }
    },
    
    deleteProduct: (req, res) => {
        try {
            const productId = req.productId;
            productsService.deleteProduct(productId);
            res.json({ success: true, message: 'Producto eliminado exitosamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al eliminar el producto' });
        }
    },

    error500: (req, res) => {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = apiController;
