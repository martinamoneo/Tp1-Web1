const normalizeId = (id) => {
    // Si es null, undefined, o un string vacío, lo rechazamos
    if (id === null || id === undefined || id === '') return null;
    
    // Intentamos convertir a número entero
    const parsedId = Number(id);
    
    // Si no es un número válido (ej. "abc"), retornamos null
    if (Number.isNaN(parsedId) || !Number.isInteger(parsedId) || parsedId <= 0) {
        return null;
    }
    
    return parsedId;
};

module.exports = normalizeId;
