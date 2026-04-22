const productModel = require('../models/productModel'); // Importás tu array de productos

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
    login: (req, res) => {
        res.render('pages/login', { esInicio: falsees, Carrito: false });
    },
    cart: (req, res) => {
        res.render('pages/cart', { esInicio: false, esCarrito: true });
    },
    checkout: (req, res) => {
        res.render('pages/checkout', { esInicio: false, esCarrito: false });
    }
};

module.exports = controller;