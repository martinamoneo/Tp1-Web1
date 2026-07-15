// nube o espacio global para guardar la info del carrito 
// y que la puedan leer desde cualq lado usando useCart

import { createContext, useState, useContext, useEffect } from 'react';

// contexto o nube donde se guarda la info del carrito
const CartContext = createContext();

// hay 2 funciones q se exportan en este codigo, a vite no le gusta eso y tira error 
// asi q se usa esta linea para decirle a vite q ignore el error

// eslint-disable-next-line react-refresh/only-export-components
// hook q devuelve la info del carrito
export const useCart = () => {
    return useContext(CartContext);
};

// funcion q le da la info del carrito y los metodos a componentes q estan dentro de CartProvider
export const CartProvider = ({ children }) => {
    // estado para guardar el carrito 
    const [cart, setCart] = useState(() => { // el estado del carrito se guarda en el localStorage para q no se pierda si cerramos la pagina
        try {
            const storedCart = localStorage.getItem('cart');
            return storedCart ? JSON.parse(storedCart) : [];
        } catch (error) { // si hay un error al leer el carrito del localStorage
            console.error('Error leyendo carrito de localStorage', error);
            return [];
        }
    });

    // se ejecuta cada vez q cambia el carrito 
    useEffect(() => { 
        try {
            // guarda los datos en el localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            // avisa si hay un cambio en el carrito a otras pestañas
            window.dispatchEvent(new Event('cartUpdated'));
        } catch (error) { // si hay un error al guardar el carrito en el localStorage
            // muestra el error en la consola, el usuario no se entera
            console.error('Error guardando carrito en localStorage', error);
        }
    }, [cart]);

    // funcion para agregar productos al carrito
    const addToCart = (product, quantity) => {
        // si no hay producto o no tiene stock, no se ejecuta nada y devuelve un mensaje
        if (!product || product.stock === 0) return { success: false, message: 'Producto sin stock' };

        setCart(prevCart => {
            // busca si el producto ya existe en el carrito
            const existingItemIndex = prevCart.findIndex(item => item.id === product.id);
            if (existingItemIndex > -1) {
                // si el producto ya existe, aumenta la cantidad
                const newCart = [...prevCart];
                const existingItem = { ...newCart[existingItemIndex] };
                
                // si ya lo tenias suma uno pero no se pasa del stock
                const newQuantity = existingItem.quantity + quantity;
                if (newQuantity <= product.stock) {
                    existingItem.quantity = newQuantity;
                } else {
                    existingItem.quantity = product.stock;
                }
                newCart[existingItemIndex] = existingItem;
                return newCart;
            } else { // si no existe, lo agrega al carrito
                return [...prevCart, { ...product, quantity }];
            }
        });
        return { success: true, message: 'Producto agregado al carrito!' };
    };

    // funcion para actualizar la cantidad de productos en el carrito
    const updateQuantity = (productId, action) => { // recibe el id y si aumenta o disminuye
        let message = null;
        setCart(prevCart => { // recibe el carrito anterior y devuelve uno nuevo 
            const newCart = [...prevCart]; // crea una copia del carrito anterior 
            const itemIndex = newCart.findIndex(item => item.id === productId); // busca el producto en el carrito 
            
            if (itemIndex > -1) { // si el producto existe
                const item = { ...newCart[itemIndex] }; // obtenemos una copia del producto
                if (action === 'increase') { // si aumenta
                    if (item.quantity < item.stock) { // si hay stock 
                        item.quantity += 1; // aumenta la cantidad
                    } else { // si no hay stock
                        message = `No hay más stock disponible para ${item.nombre}`;
                    }
                } else if (action === 'decrease') { // si disminuye
                    item.quantity -= 1; // disminuye la cantidad 
                }
                
                if (item.quantity <= 0) { // si la cantidad es menor o igual a 0
                    newCart.splice(itemIndex, 1); // elimina el producto del carrito
                } else {
                    newCart[itemIndex] = item; // guarda el item actualizado
                }
            }
            return newCart;
        });
        return message;
    };

    // funcion para vaciar el carrito 
    const clearCart = () => {
        setCart([]); // vacia el carrito
    };

    // funcion para remover un producto especifico del carrito
    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    // funcion para sincronizar el carrito con la BD (stock y eliminaciones)
    const syncCart = (activeProducts) => {
        let changed = false;
        setCart(prevCart => {
            const newCart = prevCart.map(item => {
                const dbProduct = activeProducts.find(p => p.id === item.id);
                // Si ya no existe, o si su stock llego a 0
                if (!dbProduct || dbProduct.stock <= 0) {
                    if (!item.outOfStock) changed = true;
                    return { ...item, ...(dbProduct || {}), outOfStock: true };
                }

                // Si existe y tiene stock, actualizamos datos invisibles
                const updatedItem = { ...item, ...dbProduct, quantity: item.quantity, outOfStock: false };
                
                // Si el usuario queria mas de lo que ahora hay en stock
                if (updatedItem.quantity > dbProduct.stock) {
                    updatedItem.quantity = dbProduct.stock;
                    changed = true;
                }
                
                return updatedItem;
            });
            return newCart;
        });
        return changed; // Retornamos true si hubo algun cambio importante (fuera de stock, reduccion de cantidad)
    };

    // funcion para calcular la cantidad total de productos en el carrito (solo los que tienen stock)
    const cartItemCount = cart.filter(item => !item.outOfStock).reduce((total, item) => total + item.quantity, 0); 

    const value = {
        cart, // estado del carrito 
        cartItemCount, // cantidad de productos en el carrito 
        addToCart, // funcion para agregar productos al carrito 
        updateQuantity, // funcion para actualizar la cantidad de productos en el carrito 
        clearCart, // funcion para vaciar el carrito 
        removeFromCart, // funcion para remover un producto especifico
        syncCart // funcion para sincronizar estado con la BD
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
