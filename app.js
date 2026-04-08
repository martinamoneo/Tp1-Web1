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
        { nombre: 'Producto', precio: 19900, imagen: 'pinterest.jpg' },
        { nombre: 'Producto', precio: 19900, imagen: 'pinterest.jpg' },
        { nombre: 'Producto', precio: 19900, imagen: 'pinterest.jpg' },
        { nombre: 'Producto', precio: 19900, imagen: 'pinterest.jpg' },
        { nombre: 'Producto', precio: 19900, imagen: 'pinterest.jpg' },
        { nombre: 'Producto', precio: 19900, imagen: 'pinterest.jpg' },
        { nombre: 'Producto', precio: 19900, imagen: 'pinterest.jpg' },
        { nombre: 'Producto', precio: 19900, imagen: 'pinterest.jpg' }
    ];
        
    res.render('pages/index', { 
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

// Iniciamos el servidor
app.listen(3000, 
	()=> console.log("Server is Ready! 🫡")
)