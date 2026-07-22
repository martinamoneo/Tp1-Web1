// middleware para verificar que el id sea válido y exista en BD
const productsService = require('../services/productsService');

const normalizeId = (req, res, next) => {
    // se fija de donde viene el id si de la URL o de la pagina 
    const rawId = req.params.id || req.body.productId;

    // si es null o no existe -> error 400
    if (rawId === null || rawId === undefined || rawId === '') {
        return res.status(400).json({ success: false, message: 'ID no numérico o inválido' });
    }

    // Intentamos convertir a número entero
    const parsedId = Number(rawId);

    // número inválido -> error 400
    if (Number.isNaN(parsedId) || !Number.isInteger(parsedId) || parsedId <= 0) {
        return res.status(400).json({ success: false, message: 'ID no numérico o inválido' });
    }

    // busca el id en la BD, si no existe -> error 404
    const producto = productsService.getProductById(parsedId);
    if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Si pasamos todas las validaciones, guardamos el id y el producto 
    // en el request para no buscar de nuevo en la BD
    req.productId = parsedId;
    req.producto = producto;

    // le decimos que pase al main controller
    next();
};

module.exports = normalizeId;
