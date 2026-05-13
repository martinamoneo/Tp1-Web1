const productsService = require('../services/productsService');
const cartService = require('../services/cartService');

const controller = {
    home: (req, res) => {
        const productos = productsService.getAllProducts();
        res.render('pages/home', {
            esInicio: true,
            listaProductos: productos
        });
    },
    register: (req, res) => {
        res.render('pages/register', { esInicio: false, layout: false });
    },
    registerProcess: (req, res) => {
        const { nombre, apellido, email, password } = req.body;
        console.log(nombre, apellido, email, password);
        res.redirect('/login');
    },
    login: (req, res) => {
        res.render('pages/login', { esInicio: false, layout: false });
    },
    cart: (req, res) => {
        const cartDetails = cartService.getCartDetails(req.session);
        
        const mensaje = req.session.cartMessage || null;
        req.session.cartMessage = null;

        res.render('pages/cart', {
            esInicio: true,
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
        
        res.redirect('/cart');
    },
    clearCart: (req, res) => {
        cartService.clearCart(req.session);
        res.redirect('/cart');
    },
    checkout: (req, res) => {
        res.render('pages/checkout', { esInicio: true });
    },
    productDetail: (req, res) => {
        const productId = req.productId;
        const producto = req.producto;

        const sugeridos = productsService.getSuggestedProducts(productId, producto.categoria);

        res.render('pages/product', { 
            esInicio: true,
            producto: producto,
            productosSugeridos: sugeridos
        });
    },
    category: (req, res) => {
        const categoryName = req.params.categoryName.toLowerCase();
        
        const productosFiltrados = productsService.getProductsByCategoryName(categoryName);

        if (!productosFiltrados) {
            return res.status(404).render('pages/404', { esInicio: false, esCarrito: false });
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

        res.render('pages/categories', {
            esInicio: true,
            categoriaNombre: displayCategoryName,
            productos: productosFiltrados
        });
    },
    error500: (req, res) => {
        res.status(500).render('pages/500', { esInicio: false, esCarrito: false });
    }
};

module.exports = controller;