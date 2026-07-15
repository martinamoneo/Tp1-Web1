// recibe las peticiones del front y decide que info enviar (no manipula datos)
// declaro productoService para que el controlador pueda usarlo para acceder a los datos
const productsService = require('../services/productsService');
const { categoryMap } = require('../services/productsService');

// funciones de la API juntas en un objeto para exportarlas más fácil
const controller = {
    home: (req, res) => { // home, ordena los productos (asc/desc)
    const sort = req.query.sort || null; // si no hay orden, se muestran normal
    let productos = productsService.getAllProducts(); // obtengo todos los productos

    if (sort === 'asc') { // si hay orden ascendente, se ordenan
        productos = [...productos].sort((a, b) => a.puntos - b.puntos);
    } else if (sort === 'desc') { // si hay orden descendente, se ordenan
        productos = [...productos].sort((a, b) => b.puntos - a.puntos);
    }

    // le mando los productos en JSON al frontend
    res.json({
        productos: productos,
        sort: sort
    });
    },

    search: (req, res) => { // busqueda por nombre
        const query = req.query.query || ''; // si no hay query, es string vacío
        const queryLower = query.toLowerCase().trim(); // convierto a minúsculas y quito espacios

        const resultados = queryLower === '' // si está vacío, devuelve array vacío
            ? []
            : productsService.searchByName(queryLower); // si no, busco por nombre

    res.json({
        query: query,
        resultados: resultados
    });
    },
    registerProcess: (req, res) => { // registro de usuario, toma los datos del form y los muestra en consola
        const { nombre, apellido, email, password } = req.body; // declaro las variables con los datos del form
        console.log(nombre, apellido, email, password); // muestro en consola
        res.json({ success: true, message: 'Usuario registrado exitosamente' }); // mando respuesta al front
    },

    productDetail: (req, res) => { // detalle de producto, muestra el producto y productos sugeridos
        const productId = req.productId; // tomo el id del producto del request
        const producto = req.producto; // tomo el producto del request

        // obtengo productos sugeridos por categoria
        const sugeridos = productsService.getSuggestedProducts(productId, producto.categoria); 

        // mando los productos al front
        res.json({ 
            producto: producto,
            productosSugeridos: sugeridos
        });
    },
    category: (req, res) => { // categoria, muestra productos de una categoria especifica
        const categoryName = req.params.categoryName.toLowerCase(); // tomo la categoria de los parámetros
        
        const productosFiltrados = productsService.getProductsByCategoryName(categoryName); // filtro los productos por categoria

        if (!productosFiltrados) { // si no hay productos, devuelvo error 404
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }

        // usamos el diccionario del servicio para mostrar el nombre con tildes y eñes
        const displayCategoryName = categoryMap[categoryName] || categoryName;

        // mando los productos al front
        res.json({
            categoriaNombre: displayCategoryName,
            productos: productosFiltrados
        });
    },

    createProduct: (req, res) => { // crear un producto (admin)
        try {
            const { nombre, puntos, categoria, descripcion_corta, imagen } = req.body;
            // Validación de campos obligatorios (UX Real)
            if (!nombre || !puntos || !categoria || !descripcion_corta || !imagen) {
                return res.status(400).json({ error: 'Faltan campos obligatorios: nombre, precio (puntos), categoría, descripción corta o imagen' });
            }

            const newId = productsService.createProduct(req.body); // tomo el nuevo id
            res.status(201).json({ success: true, message: 'Producto creado exitosamente', id: newId }); // mando el nuevo id
        } catch (error) { // si hay error, devuelvo error 500
            console.error(error);
            res.status(500).json({ error: 'Error al crear el producto' });
        }
    },
    
    updateProduct: (req, res) => { // actualizar un producto (admin)
        try { 
            const { nombre, puntos, categoria, descripcion_corta, imagen } = req.body;
            // Validación de campos obligatorios (UX Real)
            if (!nombre || !puntos || !categoria || !descripcion_corta || !imagen) {
                return res.status(400).json({ error: 'Faltan campos obligatorios: nombre, precio (puntos), categoría, descripción corta o imagen' });
            }

            const productId = req.productId; // tomo el id del producto del request
            productsService.updateProduct(productId, req.body); // actualizo el producto
            res.json({ success: true, message: 'Producto actualizado exitosamente' }); // mando mensaje de exito
        } catch (error) { // si hay error, devuelvo error 500
            console.error(error);
            res.status(500).json({ error: 'Error al actualizar el producto' });
        }
    },
    
    deleteProduct: (req, res) => { // eliminar un producto (admin)
        try {
            const productId = req.productId; // tomo el id del producto del request
            productsService.deleteProduct(productId); // elimino el producto
            res.json({ success: true, message: 'Producto eliminado exitosamente' }); // mando mensaje de exito
        } catch (error) { // si hay error, devuelvo error 500
            console.error(error);
            res.status(500).json({ error: 'Error al eliminar el producto' });
        }
    },

    error500: (req, res) => { // error 500
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = controller;