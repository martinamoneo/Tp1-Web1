    const productos = [
        { id: 1, nombre: 'Lampara D10S', puntos: 15000, imagenes: ['lampara.jpeg', 'lampara2.jpeg'], 
            descripcion: 'Lámpara led 22cm de alto, ideal para decorar tu habitacion', esNovedad: true, stock: 5, categoria: 'COLECCIÓN LAMPARAS' },

        { id: 2, nombre: 'Llaveros Personalizados', puntos: 29000, imagenes: ['llaveros.jpeg'], 
            descripcion: 'Llaveros con logo de tu marca de vehiculos favorita', stock: 10, categoria: 'COLECCION LLAVEROS' },

        { id: 3, nombre: 'Mate hexagonal', puntos: 1500, imagenes: ['mate.jpeg'], 
            descripcion: 'Mate de Los Angles Lakers', stock: 10, categoria: 'COLECCION MATES'},

        { id: 4, nombre: 'Pastillero', puntos: 22500, imagenes: ['pastillero.jpeg'], 
            descripcion: 'Pastillero revatible y practico.', stock: 0, categoria: 'COLECCION OTROS' },

        { id: 5, nombre: 'Trofeo padel', puntos: 4500, imagenes: ['premio.jpeg'], 
            descripcion: 'Trofeo personalizado para eventos.', stock: 5, categoria: 'COLECCION TROFEOS'},

        { id: 6, nombre: 'Vaso CARP', puntos: 60900, imagenes: ['vasoRiver.jpeg', 'vaso2.jpeg'], 
            descripcion: 'Vaso oficial de River Plate edición especial.', esProximo: true , stock: 0, categoria: 'COLECCION VASOS' },

        { id: 7, nombre: 'Cartel alias', puntos: 60900, imagenes: ['cartel transfer 1.jpeg', 'cartel transfer 2.jpeg'], 
            descripcion: 'letrero personalizado para mostrar los datos de tu billetera virtual o banco' , stock: 2, categoria: 'COLECCION OTROS'},

        { id: 8, nombre: 'Lampara led circular', puntos: 15000, imagenes: ['lampara redonda 2.jpeg', 'lampara redonda 1.jpeg'], 
            descripcion: 'Lámpara led de 24cm de diametro', esNovedad: true, stock: 5, categoria: 'COLECCIÓN LAMPARAS' },

        { id: 9, nombre: 'busto Mr. Darcy', puntos: 60900, imagenes: ['mr darcy.jpeg'], 
            descripcion: 'Busto personaje de 15cm', stock: 4, categoria: 'COLECCION MUÑECOS'},

        { id: 10, nombre: 'Vaso CJN', puntos: 60900, imagenes: ['vaso new escudo.jpeg'], 
            descripcion: 'Vaso de 600cc con el logo del club jorge newbery', stock: 5, categoria: 'COLECCION VASOS'},

        { id: 11, nombre: 'Porta llaves trompa gol', puntos: 60900, imagenes: ['portallaves trompa gol 1.jpeg', 'portallaves trompa gol 2.jpeg'], 
            descripcion: 'Porta llaves de 18cm para 5 llaveros.', stock: 0, categoria: 'COLECCION OTROS'},

        { id: 12, nombre: 'Soporte para notebook generico', puntos: 60900, imagenes: ['soporte notebook.jpeg'], 
            descripcion: 'Soporte revatible para notebook 15" o 17"', stock: 5, categoria: 'COLECCION SOPORTES'},

        { id: 13, nombre: 'Vaso CABJ', puntos: 60900, imagenes: ['vaso boca 1905.jpeg'], 
            descripcion: 'Vaso oficial Boca Juniors edicion limitada', stock: 4, categoria: 'COLECCION VASOS'},

        { id: 14, nombre: 'Muñeco Dummy', puntos: 60900, imagenes: ['muñeco articulado 1.jpeg', 'muñeco articulado 2.jpeg'], 
            descripcion: 'Muñeco articulado a medida', stock: 5, categoria: 'COLECCION MUÑECOS'},

        { id: 15, nombre: 'Vaso copa del mundo', puntos: 60900, imagenes: ['vaso copa del mundo.jpeg'], 
            descripcion: 'Vaso oficial copa del mundo de 1 litro', stock: 5, categoria: 'COLECCION VASOS'}
    ];

    // Exportamos funciones para que el controlador las use
    module.exports = {
    findAll: () => productos
    };