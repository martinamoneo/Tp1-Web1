// busca todo lo q tiene que ver con categorias en la BD (DAOcategorias)
const db = require('../db/database');

const categoriesService = {
    getAll: () => {
        return db.prepare('SELECT * FROM categories').all();
    },
    getCount: () => {
        const row = db.prepare('SELECT COUNT(*) as count FROM categories').get();
        return row.count;
    },
    getById: (id) => {
        return db.prepare('SELECT * FROM categories WHERE id = ?').get(id);
    },
    create: (data) => {
        const stmt = db.prepare('INSERT INTO categories (name, icon) VALUES (?, ?)');
        const info = stmt.run(data.name, data.icon || '');
        return info.lastInsertRowid;
    },
    update: (id, data) => {
        const stmt = db.prepare('UPDATE categories SET name = ?, icon = ? WHERE id = ?');
        stmt.run(data.name, data.icon || '', id);
        return true;
    },
    delete: (id) => {
        const stmt = db.prepare('DELETE FROM categories WHERE id = ?');
        stmt.run(id);
        return true;
    }
};

module.exports = categoriesService;
