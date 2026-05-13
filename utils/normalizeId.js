const productsService = require('../services/productsService');

const normalizeId = (req, res, next) => {
    // Obtenemos el ID de los parámetros de la URL o del body (para el carrito)
    const rawId = req.params.id || req.body.productId;

    // Si es null, undefined, o un string vacío, lo rechazamos
    if (rawId === null || rawId === undefined || rawId === '') {
        if (req.xhr || req.headers.accept.indexOf('json') > -1 || req.path.includes('/cart/add')) {
            return res.status(400).json({ success: false, message: 'ID no numérico o inválido' });
        }
        return res.status(400).render('pages/400', { esInicio: false, esCarrito: false });
    }

    // Intentamos convertir a número entero
    const parsedId = Number(rawId);

    // Si no es un número válido
    if (Number.isNaN(parsedId) || !Number.isInteger(parsedId) || parsedId <= 0) {
        if (req.xhr || req.headers.accept.indexOf('json') > -1 || req.path.includes('/cart/add')) {
            return res.status(400).json({ success: false, message: 'ID no numérico o inválido' });
        }
        return res.status(400).render('pages/400', { esInicio: false, esCarrito: false });
    }

    // Validar en la base de datos (SQLite)
    const producto = productsService.getProductById(parsedId);
    if (!producto) {
        if (req.xhr || req.headers.accept.indexOf('json') > -1 || req.path.includes('/cart/add')) {
            return res.status(404).json({ success: false, message: 'Producto no encontrado' });
        }
        return res.status(404).render('pages/404', { esInicio: false, esCarrito: false });
    }

    // Si pasamos todas las validaciones, inyectamos los datos en req
    // para que el controlador no tenga que buscarlos de nuevo.
    req.productId = parsedId;
    req.producto = producto;

    // Pasamos el control a la siguiente función (el controlador)
    next();
};

module.exports = normalizeId;
