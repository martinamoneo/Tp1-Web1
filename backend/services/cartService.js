// se maneja la logica del carrito por separado para que sea más fácil
// detectar un error
const productsService = require('./productsService');

const cartService = {
    getCartDetails: (session) => { // 
        const cartSession = session.cart || [];
        
        const carritoCompleto = cartSession
            .map((item) => { 
                // busca todos los datos del producto
                const productData = productsService.getProductById(item.productId);
                if (!productData) return null; // si no existe el producto, devuelve null
                return { ...productData, cantidad: item.quantity }; // devuelve el producto con la cantidad
            })
            .filter(Boolean); // filtra los productos que no existen (por si se borran del catálogo)

        const totalPuntos = carritoCompleto.reduce( // suma los puntos de cada producto
            (acc, p) => acc + p.puntos * p.cantidad, 0 
        // (acumulador, producto) => acumulador + producto.puntos * producto.cantidad, valor inicial
        );

        return { // devuelve el carrito completo y el total de puntos
            carritoCompleto,
            totalPuntos
        };
    },

    addProduct: (session, productId, cantidad) => {
        // si no existe el carrito se crea
        if (!session.cart) session.cart = [];
        const cart = session.cart;

        // valida que el id del producto exista
        if (productId == null || productId === '') {
            return { success: false, message: 'ID inválido' };
        }

        // busca el producto por id, si no existe se muestra un msj
        const producto = productsService.getProductById(productId);
        if (!producto) {
            return { success: false, message: 'Producto no encontrado' };
        }

        // anota o guarda la info de la cantidad de prod. en el carrito. NO modifica
        const itemIndex = cart.findIndex((item) => item.productId == productId);
        const cantidadEnCarrito = itemIndex !== -1 ? cart[itemIndex].quantity : 0;

        // se fija si la cantidad que queres agregar no supera el stock
        if (cantidadEnCarrito + cantidad > producto.stock) { 
            return { success: false, message: 'Stock insuficiente' };
        }

        if (itemIndex !== -1) { // si el producto ya existe en el carrito
            cart[itemIndex].quantity += cantidad; // aumenta la cantidad
        } else { // si el producto no existe en el carrito
            cart.push({ productId: parseInt(productId, 10), quantity: cantidad }); // agrega el producto al carrito
        }

        return { success: true };
    },

    updateProductQuantity: (session, productId, action) => {
        if (!session.cart) return; // si no hay carrito, no hace nada
        const cart = session.cart;
        
        // busca la posicion del producto en la lista del carrito
        const idx = cart.findIndex((item) => item.productId == productId);
        if (idx === -1) return; // si no lo encuentra, no hace nada

        if (action === 'increase') { // si la accion es aumentar
            const producto = productsService.getProductById(productId);
            // si el producto existe y la cantidad es menor al stock
            if (producto && cart[idx].quantity < producto.stock) {
                cart[idx].quantity += 1; // aumenta la cantidad
                session.cartMessage = null; // borra cualquier msj de error previo
            } else { // si no hay mas stock
                session.cartMessage = 'No hay más stock disponible para este producto.';
            }
        } else if (action === 'decrease') { // si la accion es disminuir
            cart[idx].quantity -= 1; // disminuye la cantidad
            if (cart[idx].quantity <= 0) { // si la cantidad es menor o igual a 0
                cart.splice(idx, 1); // saca el producto del carrito
            }
            session.cartMessage = null; // borra cualquier msj de error previo
        }
    },

    clearCart: (session) => {
        session.cart = []; // vacia el carrito
    }
};

module.exports = cartService;
