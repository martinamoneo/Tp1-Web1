const express = require('express');
const path = require('path'); // Esta librería ayuda con las rutas de carpetas
const app = express();


// --- CONFIGURACIÓN ---

// 1. Le decimos a Express que use EJS
app.set('view engine', 'ejs');

// 2. Le decimos dónde están tus páginas (basado en tu carpeta views/pages)
app.set('views', path.join(__dirname, 'views'));

// 3. Carpeta para archivos estáticos (CSS, Imágenes, etc.)
// Esto hace que tu carpeta 'assets' sea pública
app.use(express.static(path.join(__dirname, 'assets')));


// 1. Página de Inicio
app.get('/', (req, res) => {
    res.render('pages/index', { esInicio: true }); 
});

// 2. Registro de Usuario
app.get('/register', (req, res) => {
    res.render('pages/register', { esInicio: false });
});

// 3. Inicio de Sesión
app.get('/login', (req, res) => {
    res.render('pages/login' , { esInicio: false });
});

// Iniciamos el servidor
app.listen(3000, 
	()=> console.log("Server is Ready! 🫡")
)