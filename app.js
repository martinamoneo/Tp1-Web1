const express = require('express');
const path = require('path');
const app = express();
const mainRoutes = require('./routes/mainRoutes');
const session = require('express-session');

// configura el motor de plantillas ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//
app.use(session({
    secret: 'mi-secreto-super-seguro', // frase para encriptar la sesión
    resave: false,
    saveUninitialized: true
}));

// Middleware para asegurar que req.session.cart siempre exista
app.use((req, res, next) => {
    if (!req.session.cart) {
        req.session.cart = [];
    }
    next();
});

// Cantidad total de ítems en carrito (para el badge del header)
app.use((req, res, next) => {
    const cart = req.session.cart || [];
    res.locals.cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    next();
});

// si dotenv no está instalado, no rompe el servidor.
try {
    require('dotenv').config();
} catch (err) {
    console.log("⚠️  dotenv no está instalado.");
}

app.use(mainRoutes);

// 404
app.use((req, res) => {
    res.status(404).render('pages/404', { esInicio: false, esCarrito: false });
});

// usa un puerto asignado por la web si no usa el 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});