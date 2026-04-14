const express = require('express');
const path = require('path'); // Esta librería ayuda con las rutas de carpetas
const app = express();

// --- CONFIGURACIÓN ---
app.set('view engine', 'ejs');// 1. Le decimos a Express que use EJS

app.set('views', path.join(__dirname, 'views'));// 2. Le decimos dónde están tus páginas (basado en tu carpeta views/pages)

app.use(express.static(path.join(__dirname, 'public')));// Esto hace que tu carpeta 'public' sea pública


// HOME
app.get('/', (req, res) => {
    const productos = [
    { 
        id: 1,
        nombre: 'Producto 1', 
        puntos: 15000, 
        imagenes: ['lampara.jpeg', 'lampara2.jpeg'],
        descripcion: 'Descripción.'
    },
    { 
        id: 2,
        nombre: 'Producto 2', 
        puntos: 29000, 
        imagenes: ['llaveros.jpeg'],
        descripcion: 'Descripción.'
    },
    {
        id: 3,
        nombre: 'Producto 3', 
        puntos: 1500, 
        imagenes: ['mate.jpeg'],
        descripcion: 'Descripción.'
    },
    {
        id: 4,
        nombre: 'Producto 4', 
        puntos: 22500, 
        imagenes: ['pastillero.jpeg'],
        descripcion: 'Descripción.'
    },
    {
        id: 5,
        nombre: 'Producto 5', 
        puntos: 4500, 
        imagenes: ['premio.jpeg'],
        descripcion: 'Descripción.'
    },
    {
        id: 6,
        nombre: 'Producto 6', 
        puntos: 60900, 
        imagenes: ['vasoRiver.jpeg', 'vaso2.jpeg'],
        descripcion: 'Descripción.'
    },

];
        
    res.render('pages/home', { 
        esInicio: true, 
        listaProductos: productos // Le pasamos la lista a la vista
    });
});

// REGISTER
app.get('/register', (req, res) => {
    res.render('pages/register', { esInicio: false });
});

// LOGIN
app.get('/login', (req, res) => {
    res.render('pages/login' , { esInicio: false });
});

// CART
app.get('/cart', (req, res) => {
    res.render('pages/cart', { esInicio: true });
});

// CHECKOUT
app.get('/checkout', (req, res) => {
    res.render('pages/checkout', { esInicio: true });
});

// Iniciamos el servidor
app.listen(3000, 
	()=> console.log("Server is Ready! 🫡")
)

