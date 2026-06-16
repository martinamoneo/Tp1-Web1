// maneja todo lo del servidor: rutas, middleware y puertos
const express = require('express'); // libreria express
const app = express(); // inicializa express
const mainRoutes = require('./routes/mainRoutes'); // importa el mapa de rutas
const session = require('express-session'); // libreria para sesiones

// cors permite que el back y el front se comuniquen
const cors = require('cors'); 
app.use(cors());

app.use(express.urlencoded({ extended: true })); // obtener datos del front
app.use(express.json()); // traducir datos del JSON
app.use('/products', express.static('public/products')); // archivo estatico de img para q el front las pueda ver/usar


app.use(session({
    secret: 'martinaynico:)', // frase para encriptar la sesión
    resave: false, // si no se modifico nada, no guardes nada
    saveUninitialized: true // si es nuevo, guardalo
}));

// middleware para el carrito exista siempre
app.use((req, res, next) => {
    if (!req.session.cart) {
        req.session.cart = [];
    }
    next();
});

// si dotenv no está instalado, no rompe el servidor.
// dotenv crea un archivo oculto para guardar datos sensibles
try {
    require('dotenv').config();
} catch (err) {
    console.log("⚠️  dotenv no está instalado.");
}

// agrupa todas las rutas de mainRoutes para que empiecen con /api
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