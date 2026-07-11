// recibe las peticiones del front y decide que info enviar (no manipula datos)
const productsService = require('../services/productsService');

const controller = {
    home: (req, res) => { // home, ordena los productos (asc/desc)
    const sort = req.query.sort || null; // si no hay orden, se muestran normal
    let productos = productsService.getAllProducts(); // obtengo todos los productos

    if (sort === 'asc') { // si hay orden ascendente, se ordenan
        productos = [...productos].sort((a, b) => a.puntos - b.puntos);
    } else if (sort === 'desc') { // si hay orden descendente, se ordenan
        productos = [...productos].sort((a, b) => b.puntos - a.puntos);
    }

    // le mando los productos en JSON al frontend
    res.json({
        productos: productos,
        sort: sort
    });
    },

    search: (req, res) => { // busqueda por nombre
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
    registerProcess: (req, res) => { // registro de usuario, toma los datos del form y los muestra
        const { nombre, apellido, email, password } = req.body;
        console.log(nombre, apellido, email, password);
        res.json({ success: true, message: 'Usuario registrado exitosamente' });
    },

    productDetail: (req, res) => { // detalle de producto, muestra el producto y productos sugeridos
        const productId = req.productId;
        const producto = req.producto;

        const sugeridos = productsService.getSuggestedProducts(productId, producto.categoria);

        res.json({ 
            producto: producto,
            productosSugeridos: sugeridos
        });
    },
    category: (req, res) => { // categoria, muestra productos de una categoria especifica
        const categoryName = req.params.categoryName.toLowerCase();
        
        const productosFiltrados = productsService.getProductsByCategoryName(categoryName);

        if (!productosFiltrados) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }

        const formatCategoryName = {
            'mates': 'Mates',
            'vasos': 'Vasos',
            'llaveros': 'Llaveros',
            'soportes': 'Soportes',
            'premios': 'Premios',
            'munecos': 'Muñecos',
            'lamparas': 'Lámparas',
            'otros': 'Otros'
        };
        const displayCategoryName = formatCategoryName[categoryName] || categoryName;

        res.json({
            categoriaNombre: displayCategoryName,
            productos: productosFiltrados
        });
    },
    
    // -------------------------------------------------------------
    // CONTROLADORES CRUD ADMIN
    // -------------------------------------------------------------
    createProduct: (req, res) => {
        try {
            const newId = productsService.createProduct(req.body);
            res.status(201).json({ success: true, message: 'Producto creado exitosamente', id: newId });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al crear el producto' });
        }
    },
    
    updateProduct: (req, res) => {
        try {
            const productId = req.productId; // Gracias al middleware normalizeId
            productsService.updateProduct(productId, req.body);
            res.json({ success: true, message: 'Producto actualizado exitosamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al actualizar el producto' });
        }
    },
    
    deleteProduct: (req, res) => {
        try {
            const productId = req.productId; // Gracias al middleware normalizeId
            productsService.deleteProduct(productId);
            res.json({ success: true, message: 'Producto eliminado exitosamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al eliminar el producto' });
        }
    },

    error500: (req, res) => { // error 500
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = controller;