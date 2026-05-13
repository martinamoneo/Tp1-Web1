const db = require('../db/database');

// Mapeamos de la base de datos a la estructura que esperan las vistas/controladores
const mapRowToProduct = (row) => {
    if (!row) return null;
    return {
        id: row.id,
        nombre: row.nombre,
        puntos: row.puntos,
        imagenes: [row.imagen], // Lo convertimos a array porque las vistas iteran o toman el [0]
        descripcion: row.descripcion,
        descripcionCorta: row.short_description,
        especificaciones: row.specifications,
        stock: row.stock,
        categoria: row.categoria
    };
};

const baseQuery = `
    SELECT p.id, p.name as nombre, p.price as puntos, p.image as imagen, p.description as descripcion, p.short_description, p.specifications, p.stock, c.name as categoria 
    FROM products p 
    LEFT JOIN categories c ON p.category_id = c.id
`;

const productsService = {
    // Obtener todos los productos desde SQLite
    getAllProducts: () => {
        const rows = db.prepare(baseQuery).all();
        return rows.map(mapRowToProduct);
    },

    // Obtener un producto por ID
    getProductById: (id) => {
        const row = db.prepare(`${baseQuery} WHERE p.id = ?`).get(id);
        return mapRowToProduct(row);
    },

    // Filtrar por categoría
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

    // Obtener productos sugeridos (misma categoría pero distinto id)
    getSuggestedProducts: (productId, category) => {
        const rows = db.prepare(`${baseQuery} WHERE p.id != ? AND c.name = ? ORDER BY RANDOM() LIMIT 4`).all(productId, category);
        return rows.map(mapRowToProduct);
    },

    // Obtener productos relacionados
    getRelatedProducts: (productId, category) => {
        // Asumimos que relacionados funciona igual que sugeridos para esta estructura
        return productsService.getSuggestedProducts(productId, category);
    },

    // Mantenemos getRandomProducts por si algún controlador antiguo lo llama
    getRandomProducts: (count) => {
        const rows = db.prepare(`${baseQuery} ORDER BY RANDOM() LIMIT ?`).all(count);
        return rows.map(mapRowToProduct);
    }
};

module.exports = productsService;
