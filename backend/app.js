const express = require('express');
const path = require('path');
const app = express();
const mainRoutes = require('./routes/mainRoutes');
const session = require('express-session');

const cors = require('cors');

// Middleware básicos
app.use(cors());

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



// si dotenv no está instalado, no rompe el servidor.
try {
    require('dotenv').config();
} catch (err) {
    console.log("⚠️  dotenv no está instalado.");
}

app.use('/api', mainRoutes);

// 404
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint no encontrado' });
});

// 500
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
});

// usa un puerto asignado por la web si no usa el 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});