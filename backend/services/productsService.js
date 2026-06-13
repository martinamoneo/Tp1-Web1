// se comunica con la base datos para traer los datos de los productos
// es el unico archivo que lo hace
const db = require('../db/database');

// traduce lo q que está en la BD a lo que el código espera
const mapRowToProduct = (row) => {
    if (!row) return null;
    return {
        // codigo : BD
        id: row.id, 
        nombre: row.nombre,
        puntos: row.puntos,
        imagenes: [row.imagen], // se pasa a un vector para cuando hay más de una img
        descripcion: row.descripcion,
        descripcionCorta: row.short_description,
        especificaciones: row.specifications,
        stock: row.stock,
        categoria: row.categoria
    };
};

// consulta en SQL para traer los datos de los productos
const baseQuery = `
    SELECT p.id, p.name as nombre, p.price as puntos, p.image as imagen, p.description as descripcion, p.short_description, p.specifications, p.stock, c.name as categoria 
    FROM products p 
    LEFT JOIN categories c ON p.category_id = c.id
`;

const productsService = {
    // le pide a la BD la lista de productos
    getAllProducts: () => {
        const rows = db.prepare(baseQuery).all();
        return rows.map(mapRowToProduct);
    },

    // recibe el ID y te devuelve el producto q corresponde
    getProductById: (id) => {
        const row = db.prepare(`${baseQuery} WHERE p.id = ?`).get(id);
        return mapRowToProduct(row);
    },

    // recibe la categoria del código y la traduce a como está guardado en la BD
    getProductsByCategoryName: (categoryName) => {
        const mapCategory = {
            'mates': 'COLECCIÓN MATES',
            'vasos': 'COLECCIÓN VASOS',
            'llaveros': 'COLECCIÓN LLAVEROS',
            'soportes': 'COLECCIÓN SOPORTES',
            'premios': 'COLECCIÓN PREMIOS',
            'munecos': 'COLECCIÓN MUÑECOS',
            'lamparas': 'COLECCIÓN LÁMPARAS',
            'otros': 'COLECCIÓN OTROS'
        };
        const mappedCategory = mapCategory[categoryName];
        if (!mappedCategory) return null;

        const rows = db.prepare(`${baseQuery} WHERE c.name = ?`).all(mappedCategory);
        return rows.map(mapRowToProduct);
    },

    // Buscar por nombre
    searchByName: (query) => {
        const rows = db.prepare(`${baseQuery} WHERE p.name LIKE ?`).all(`%${query}%`);
        return rows.map(mapRowToProduct);
    },

    // Ordenar por precio
    sortByPrice: (order = 'ASC') => {
        const sortOrder = order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
        const rows = db.prepare(`${baseQuery} ORDER BY p.price ${sortOrder}`).all();
        return rows.map(mapRowToProduct);
    },

    // Productos sugeridos (misma categoría, distinto id)
    getSuggestedProducts: (productId, category) => {
        const rows = db.prepare(`${baseQuery} WHERE p.id != ? AND c.name = ? ORDER BY RANDOM() LIMIT 4`).all(productId, category);
        return rows.map(mapRowToProduct);
    },
};

module.exports = productsService;