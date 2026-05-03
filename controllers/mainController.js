const productModel = require('../models/productModel');

const controller = {
    home: (req, res) => {
        const productos = productModel.findAll();
        const sugeridos = productModel.findSugeridos();
        res.render('pages/home', {
            esInicio: true,
            esCarrito: false,
            listaProductos: productos,
            productosSugeridos: sugeridos
        });
    },
    register: (req, res) => {
        res.render('pages/register', { esInicio: false, esCarrito: false });
    },
    registerProcess: (req, res) => {
        const { nombre, apellido, email, password } = req.body;
        console.log(nombre, apellido, email, password);
        res.redirect('/login');
    },
    login: (req, res) => {
        res.render('pages/login', { esInicio: false, esCarrito: false });
    },
    cart: (req, res) => {
        const cartSession = req.session.cart;
        const allProducts = productModel.findAll();

        const carritoCompleto = cartSession
            .map((item) => {
                const productData = allProducts.find((p) => p.id == item.productId);
                if (!productData) return null;
                return { ...productData, cantidad: item.quantity };
            })
            .filter(Boolean);

        const totalPuntos = carritoCompleto.reduce(
            (acc, p) => acc + p.puntos * p.cantidad, 0
        );

        const mensaje = req.session.cartMessage || null;
        req.session.cartMessage = null;

        res.render('pages/cart', {
            esInicio: false,
            esCarrito: true,
            carrito: carritoCompleto,
            total: totalPuntos,
            mensaje: mensaje
        });
    },
    addToCart: (req, res) => {
        const productId = req.body.productId;
        if (productId == null || productId === '') {
            return res.json({ success: false, message: 'ID inválido' });
        }

        const allProducts = productModel.findAll();
        const producto = allProducts.find(p => p.id == productId);

        if (!producto) {
            return res.json({ success: false, message: 'Producto no encontrado' });
        }

        const cart = req.session.cart;
        const itemIndex = cart.findIndex((item) => item.productId == productId);
        const cantidadEnCarrito = itemIndex !== -1 ? cart[itemIndex].quantity : 0;

        if (cantidadEnCarrito >= producto.stock) {
            return res.json({ success: false, message: 'Stock insuficiente' });
        }

        if (itemIndex !== -1) {
            cart[itemIndex].quantity += 1;
        } else {
            cart.push({ productId: parseInt(productId, 10), quantity: 1 });
        }

        res.json({ success: true });
    },
    updateCart: (req, res) => {
        const { productId, action } = req.body;
        const cart = req.session.cart;
        const idx = cart.findIndex((item) => item.productId == productId);
        if (idx === -1) return res.redirect('/cart');

        if (action === 'increase') {
            const allProducts = productModel.findAll();
            const producto = allProducts.find(p => p.id == productId);

            if (producto && cart[idx].quantity < producto.stock) {
                cart[idx].quantity += 1;
                req.session.cartMessage = null;
            } else {
                req.session.cartMessage = 'No hay más stock disponible para este producto.';
            }
        } else if (action === 'decrease') {
            cart[idx].quantity -= 1;
            if (cart[idx].quantity <= 0) {
                cart.splice(idx, 1);
            }
            req.session.cartMessage = null;
        }
        res.redirect('/cart');
    },
    clearCart: (req, res) => {
        req.session.cart = [];
        res.redirect('/cart');
    },
    checkout: (req, res) => {
        res.render('pages/checkout', { esInicio: false, esCarrito: false });
    }
};

module.exports = controller;