const productModel = require('../models/productModel');

const productsService = {
    getAllProducts: () => {
        return productModel.findAll();
    },

    getProductById: (id) => {
        const allProducts = productModel.findAll();
        return allProducts.find(p => p.id == id);
    },

    getProductsByCategoryName: (categoryName) => {
        const mapCategory = {
            'mates': 'COLECCION MATES',
            'vasos': 'COLECCION VASOS',
            'llaveros': 'COLECCION LLAVEROS',
            'soportes': 'COLECCION SOPORTES',
            'premios': 'COLECCION PREMIOS',
            'munecos': 'COLECCION MUÑECOS',
            'lamparas': 'COLECCIÓN LAMPARAS',
            'otros': 'COLECCION OTROS'
        };

        const mappedCategory = mapCategory[categoryName];
        if (!mappedCategory) return null;

        const allProducts = productModel.findAll();
        return allProducts.filter(p => p.categoria === mappedCategory);
    },

    getSuggestedProducts: (productId, category) => {
        const allProducts = productModel.findAll();
        return allProducts
            .filter(p => p.id != productId && p.categoria === category)
            .sort(() => 0.5 - Math.random())
            .slice(0, 4);
    },

    getRandomProducts: (count) => {
        const allProducts = productModel.findAll();
        return [...allProducts].sort(() => 0.5 - Math.random()).slice(0, count);
    }
};

module.exports = productsService;
