CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT, -- integer = numero entero
    name TEXT NOT NULL,
    icon TEXT
);

CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    short_description TEXT,
    specifications TEXT,
    price REAL NOT NULL, -- real = numero real con decimales
    image TEXT,
    category_id INTEGER,
    stock INTEGER DEFAULT 0,
    FOREIGN KEY (category_id) REFERENCES categories (id)
);
