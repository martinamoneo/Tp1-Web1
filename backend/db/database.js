const Database = require('better-sqlite3'); // importa la libreria better-sqlite3
const path = require('path'); // importa path para manejar las rutas de los archivos
const fs = require('fs'); // importa filesystem para leer archivos desde el disco

const dbPath = path.join(__dirname, 'ecommerce.db'); // hace la ruta completa hacia el archivo de la base de datos
const db = new Database(dbPath); // abre el archivo ecommerce.db

// inicializa la base de datos usando schema.sql
const schemaPath = path.join(__dirname, 'schema.sql'); // hace la ruta hacia el archivo schema.sql
const schema = fs.readFileSync(schemaPath, 'utf8'); // lee el archivo schema.sql y lo convierte en un string
db.exec(schema); // ejecuta el archivo schema.sql para crear las tablas y relaciones

module.exports = db; // exporta la base de datos