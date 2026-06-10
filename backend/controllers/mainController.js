const productsService = require('../services/productsService');
const cartService = require('../services/cartService');

const controller = {
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

        const allProducts = productsService.getAllProducts();

     const resultados = queryLower === ''
        ? []
        : allProducts.filter(p =>
            p.nombre.toLowerCase().includes(queryLower)
        );

    res.json({
        query: query,
        resultados: resultados
    });
    },
    register: (req, res) => {
        res.json({ message: 'Endpoint de registro (vista manejada por React)' });
    },
    registerProcess: (req, res) => {
        const { nombre, apellido, email, password } = req.body;
        console.log(nombre, apellido, email, password);
        res.json({ success: true, message: 'Usuario registrado exitosamente' });
    },
    login: (req, res) => {
        res.json({ message: 'Endpoint de login (vista manejada por React)' });
    },
    cart: (req, res) => {
        const cartDetails = cartService.getCartDetails(req.session);
        
        const mensaje = req.session.cartMessage || null;
        req.session.cartMessage = null;

        res.json({
            carrito: cartDetails.carritoCompleto,
            total: cartDetails.totalPuntos,
            mensaje: mensaje
        });
    },
    addToCart: (req, res) => {
        const productId = req.productId;
        const cantidadEnviada = parseInt(req.body.cantidad) || 1;

        const result = cartService.addProduct(req.session, productId, cantidadEnviada);
        if (!result.success && result.message === 'Producto no encontrado') {
            return res.status(404).json(result);
        }
        res.json(result);
    },
    updateCart: (req, res) => {
        const productId = req.productId;
        const { action } = req.body;
        cartService.updateProductQuantity(req.session, productId, action);
        
        res.json({ success: true, message: 'Carrito actualizado' });
    },
    clearCart: (req, res) => {
        cartService.clearCart(req.session);
        res.json({ success: true, message: 'Carrito vaciado' });
    },
    checkout: (req, res) => {
        res.json({ message: 'Endpoint de checkout (vista manejada por React)' });
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
    error500: (req, res) => {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = controller;