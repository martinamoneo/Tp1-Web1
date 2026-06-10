const productsService = require('./productsService');

const cartService = {
    getCartDetails: (session) => {
        const cartSession = session.cart || [];
        
        const carritoCompleto = cartSession
            .map((item) => {
                const productData = productsService.getProductById(item.productId);
                if (!productData) return null;
                return { ...productData, cantidad: item.quantity };
            })
            .filter(Boolean);

        const totalPuntos = carritoCompleto.reduce(
            (acc, p) => acc + p.puntos * p.cantidad, 0
        );

        return {
            carritoCompleto,
            totalPuntos
        };
    },

    addProduct: (session, productId, cantidad) => {
        if (!session.cart) session.cart = [];
        const cart = session.cart;

        if (productId == null || productId === '') {
            return { success: false, message: 'ID inválido' };
        }

        const producto = productsService.getProductById(productId);
        if (!producto) {
            return { success: false, message: 'Producto no encontrado' };
        }

        const itemIndex = cart.findIndex((item) => item.productId == productId);
        const cantidadEnCarrito = itemIndex !== -1 ? cart[itemIndex].quantity : 0;

        if (cantidadEnCarrito + cantidad > producto.stock) {
            return { success: false, message: 'Stock insuficiente' };
        }

        if (itemIndex !== -1) {
            cart[itemIndex].quantity += cantidad;
        } else {
            cart.push({ productId: parseInt(productId, 10), quantity: cantidad });
        }

        return { success: true };
    },

    updateProductQuantity: (session, productId, action) => {
        if (!session.cart) return;
        const cart = session.cart;
        
        const idx = cart.findIndex((item) => item.productId == productId);
        if (idx === -1) return;

        if (action === 'increase') {
            const producto = productsService.getProductById(productId);
            if (producto && cart[idx].quantity < producto.stock) {
                cart[idx].quantity += 1;
                session.cartMessage = null;
            } else {
                session.cartMessage = 'No hay más stock disponible para este producto.';
            }
        } else if (action === 'decrease') {
            cart[idx].quantity -= 1;
            if (cart[idx].quantity <= 0) {
                cart.splice(idx, 1);
            }
            session.cartMessage = null;
        }
    },

    clearCart: (session) => {
        session.cart = [];
    }
};

module.exports = cartService;
