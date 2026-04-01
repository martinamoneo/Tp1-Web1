const express = require('express');
const path = require('path'); // Esta librería ayuda con las rutas de carpetas
const app = express();

// --- CONFIGURACIÓN ---

// 1. Le decimos a Express que use EJS
app.set('view engine', 'ejs');

// 2. Le decimos dónde están tus páginas (basado en tu carpeta views/pages)
app.set('views', path.join(__dirname, 'views/pages'));

// 3. Carpeta para archivos estáticos (CSS, Imágenes, etc.)
// Esto hace que tu carpeta 'assets' sea pública
app.use(express.static(path.join(__dirname, 'assets')));


// 1. Página de Inicio
app.get('/', (req, res) => {
    res.render('index'); 
});

// 2. Detalle de Producto
app.get('/products', (req, res) => {
    res.render('product');
});

// 3. Carrito de Compras
app.get('/cart', (req, res) => {
    res.render('cart');
});

// 4. Proceso de Pago
app.get('/checkout', (req, res) => {
    res.render('checkout');
});

// 5. Registro de Usuario
app.get('/register', (req, res) => {
    res.render('register');
});

// 6. Inicio de Sesión
app.get('/login', (req, res) => {
    res.render('login');
});

// Iniciamos el servidor
app.listen(3000, 
	()=> console.log("Server is Ready! 🫡")
)