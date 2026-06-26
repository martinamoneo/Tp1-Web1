// recibe las peticiones del front y decide que info enviar (no manipula datos)
const productsService = require('../services/productsService');
const cartService = require('../services/cartService');

const controller = {
    home: (req, res) => { // home, ordena los productos (asc/desc)
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
    register: (req, res) => { // registro, muestra mensaje de que la vista la maneja react
        res.json({ message: 'Endpoint de registro (vista manejada por React)' });
    },
    registerProcess: (req, res) => { // registro de usuario, toma los datos del form y los muestra
        const { nombre, apellido, email, password } = req.body;
        console.log(nombre, apellido, email, password);
        res.json({ success: true, message: 'Usuario registrado exitosamente' });
    },
    login: (req, res) => { // login, muestra mensaje de que la vista la maneja react
        res.json({ message: 'Endpoint de login (vista manejada por React)' });
    },
    cart: (req, res) => { // carrito, muestra el carrito y el total
        const cartDetails = cartService.getCartDetails(req.session);
        
        const mensaje = req.session.cartMessage || null;
        req.session.cartMessage = null;

        res.json({
            carrito: cartDetails.carritoCompleto,
            total: cartDetails.totalPuntos,
            mensaje: mensaje
        });
    },
    addToCart: (req, res) => { // carrito, agrega productos al carrito
        const productId = req.productId;
        const cantidadEnviada = parseInt(req.body.cantidad) || 1;

        const result = cartService.addProduct(req.session, productId, cantidadEnviada);
        if (!result.success && result.message === 'Producto no encontrado') {
            return res.status(404).json(result);
        }
        res.json(result);
    },
    updateCart: (req, res) => { // carrito, actualiza la cantidad de productos
        const productId = req.productId;
        const { action } = req.body;
        cartService.updateProductQuantity(req.session, productId, action);
        
        res.json({ success: true, message: 'Carrito actualizado' });
    },
    clearCart: (req, res) => { // carrito, vacia el carrito
        cartService.clearCart(req.session);
        res.json({ success: true, message: 'Carrito vaciado' });
    },
    checkout: (req, res) => { // checkout, muestra mensaje de que la vista la maneja react
        res.json({ message: 'Endpoint de checkout (vista manejada por React)' });
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
    error500: (req, res) => { // error 500
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = controller;