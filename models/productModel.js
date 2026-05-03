    const productos = [
        { id: 1, nombre: 'Producto 1', puntos: 15000, imagenes: ['lampara.jpeg', 'lampara2.jpeg'], 
            descripcion: 'Lámpara moderna de diseño minimalista.', esNovedad: true, stock: 5 },

        { id: 2, nombre: 'Producto 2', puntos: 29000, imagenes: ['llaveros.jpeg'], 
            descripcion: 'Llaveros personalizados de alta calidad.', stock: 10 },

        { id: 3, nombre: 'Producto 3', puntos: 1500, imagenes: ['mate.jpeg'], 
            descripcion: 'Mate tradicional con detalles únicos.', stock: 10},

        { id: 4, nombre: 'Producto 4', puntos: 22500, imagenes: ['pastillero.jpeg'], 
            descripcion: 'Pastillero práctico y elegante.', stock: 0 },

        { id: 5, nombre: 'Producto 5', puntos: 4500, imagenes: ['premio.jpeg'], 
            descripcion: 'Trofeo personalizado para eventos.', stock: 5 },

        { id: 6, nombre: 'Producto 6', puntos: 60900, imagenes: ['vasoRiver.jpeg', 'vaso2.jpeg'], 
            descripcion: 'Vaso oficial de River Plate edición especial.', esProximo: true , stock: 0},

        { id: 7, nombre: 'Producto 7', puntos: 60900, imagenes: ['producto.jpg'], 
            descripcion: 'Vaso oficial de River Plate edición especial.' , stock: 0},

        { id: 8, nombre: 'Producto 8', puntos: 60900, imagenes: ['producto.jpg'], 
            descripcion: 'Vaso oficial de River Plate edición especial.', stock: 3},

        { id: 9, nombre: 'Producto 9', puntos: 60900, imagenes: ['producto.jpg'], 
            descripcion: 'Vaso oficial de River Plate edición especial.', stock: 4},

        { id: 10, nombre: 'Producto 10', puntos: 60900, imagenes: ['producto.jpg'], 
            descripcion: 'Vaso oficial de River Plate edición especial.', stock: 5},

        { id: 11, nombre: 'Producto 11', puntos: 60900, imagenes: ['producto.jpg'], 
            descripcion: 'Vaso oficial de River Plate edición especial.', stock: 0},

        { id: 12, nombre: 'Producto 12', puntos: 60900, imagenes: ['producto.jpg'], 
            descripcion: 'Vaso oficial de River Plate edición especial.', stock: 5},

        { id: 13, nombre: 'Producto 13', puntos: 60900, imagenes: ['producto.jpg'], 
            descripcion: 'Vaso oficial de River Plate edición especial.', stock: 0},

        { id: 14, nombre: 'Producto 14', puntos: 60900, imagenes: ['producto.jpg'], 
            descripcion: 'Vaso oficial de River Plate edición especial.', stock: 5},

        { id: 15, nombre: 'Producto 15', puntos: 60900, imagenes: ['producto.jpg'], 
            descripcion: 'Vaso oficial de River Plate edición especial.', stock: 5}
    ];

    const productosSugeridos = [
        { nombre: 'Sugerido 1', puntos: 12000, imagen: 'lampara.jpeg', descripcion: 'Descripción del producto sugerido 1.' },
        { nombre: 'Sugerido 2', puntos: 8500, imagen: 'llaveros.jpeg', descripcion: 'Descripción del producto sugerido 2.' },
        { nombre: 'Sugerido 3', puntos: 19000, imagen: 'mate.jpeg', descripcion: 'Descripción del producto sugerido 3.' },
    ];

    // Exportamos funciones para que el controlador las use
    module.exports = {
    findAll: () => productos,
    findSugeridos: () => productosSugeridos
    };