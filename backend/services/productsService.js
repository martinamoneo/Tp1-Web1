// se comunica con la base datos para traer los datos de los productos
// es el unico archivo que lo hace
const db = require('../db/database');

// crea un slug seguro para URLs (sin tildes, minúsculas, espacios por guiones)
const toSlug = (text) => {
    if (!text) return '';
    return text.toString().toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-');
};

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

// Diccionario eliminado: ahora consultamos la BD dinámicamente

const productsService = {
    // le pide a la BD la lista de productos
    getAllProducts: () => {
        const rows = db.prepare(baseQuery).all();
        return rows.map(mapRowToProduct);
    },

    // obtiene la cantidad total de productos
    getCount: () => {
        const row = db.prepare('SELECT COUNT(*) as count FROM products').get();
        return row.count;
    },

    // recibe el ID y te devuelve el producto q corresponde
    getProductById: (id) => {
        const row = db.prepare(`${baseQuery} WHERE p.id = ?`).get(id);
        return mapRowToProduct(row);
    },

    // busca productos por categoria
    getProductsByCategoryName: (categorySlug) => {
        // busca todas las categorías para encontrar la que coincide con el slug
        const categorias = db.prepare('SELECT name FROM categories').all();
        const catRow = categorias.find(c => toSlug(c.name) === categorySlug);
        
        if (!catRow) return null;
        
        // busca todos los productos de esa categoría
        const rows = db.prepare(`${baseQuery} WHERE c.name = ?`).all(catRow.name);
        // devuelve los productos y el nombre real de la categoría (como está en la BD)
        return {
            categoriaNombre: catRow.name,
            productos: rows.map(mapRowToProduct)
        };
    },

    // Buscar producto por nombre (barra de busqueda)
    searchByName: (query) => {
        const rows = db.prepare(`${baseQuery} WHERE p.name LIKE ?`).all(`%${query}%`);
        return rows.map(mapRowToProduct); // convierte los productos a como los espera el código
    },

    // Productos sugeridos (misma categoría, distinto id)
    getSuggestedProducts: (productId, category) => {
        const rows = db.prepare(`${baseQuery} WHERE p.id != ? AND c.name = ? ORDER BY RANDOM() LIMIT 4`).all(productId, category);
        return rows.map(mapRowToProduct);
    },

    // busca ID de categoria para crear producto (admin)
    getCategoryId: (frontendCategory) => {
        if (!frontendCategory) return null;
        
        const row = db.prepare('SELECT id FROM categories WHERE LOWER(name) = ?').get(frontendCategory.toLowerCase());
        return row ? row.id : null;
    },

    // agregar producto (admin)
    createProduct: (data) => {
        const categoryId = productsService.getCategoryId(data.categoria);
        
        // inserta el producto en la BD
        const stmt = db.prepare(`
            INSERT INTO products (name, price, stock, short_description, description, specifications, image, category_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `);
        
        // inserta los datos del producto en la BD
        const info = stmt.run(
            data.nombre,
            data.puntos,
            data.stock || 0,
            data.descripcion_corta,
            data.descripcion || '',
            data.especificaciones || '',
            data.imagen,
            categoryId
        );
        
        return info.lastInsertRowid; // devuelve el id del nuevo producto
    },

    // actualizar producto (admin)
    updateProduct: (id, data) => {
        const categoryId = productsService.getCategoryId(data.categoria);
        
        // prepara la consulta para actualizar el producto
        const stmt = db.prepare(`
            UPDATE products 
            SET name = ?, price = ?, stock = ?, short_description = ?, description = ?, specifications = ?, image = ?, category_id = ?
            WHERE id = ?
        `);
        
        // ejecuta la consulta con las modificaciones 
        stmt.run(
            data.nombre,
            data.puntos,
            data.stock || 0, // permitimos 0 para marcar "sin stock"
            data.descripcion_corta,
            data.descripcion || '',
            data.especificaciones || '',
            data.imagen,
            categoryId,
            id
        );
        
        return true;
    },

    // eliminar producto (admin)
    deleteProduct: (id) => {
        // Borrado físico (se borra por completo de la BD)
        const stmt = db.prepare('DELETE FROM products WHERE id = ?');
        stmt.run(id); // ejecuta la consulta con el id
        return true;
    }
};

module.exports = productsService;