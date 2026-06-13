import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        try {
            const storedCart = localStorage.getItem('cart');
            return storedCart ? JSON.parse(storedCart) : [];
        } catch (error) {
            console.error('Error reading cart from localStorage', error);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('cart', JSON.stringify(cart));
            // Opcional: despachar evento por si otras pestañas necesitan actualizarse
            window.dispatchEvent(new Event('cartUpdated'));
        } catch (error) {
            console.error('Error saving cart to localStorage', error);
        }
    }, [cart]);

    const addToCart = (product, quantity) => {
        if (!product || product.stock === 0) return { success: false, message: 'Producto sin stock' };

        setCart(prevCart => {
            const existingItemIndex = prevCart.findIndex(item => item.id === product.id);
            if (existingItemIndex > -1) {
                const newCart = [...prevCart];
                const existingItem = newCart[existingItemIndex];
                
                const newQuantity = existingItem.quantity + quantity;
                if (newQuantity <= product.stock) {
                    existingItem.quantity = newQuantity;
                } else {
                    existingItem.quantity = product.stock; // Cap at max stock
                }
                return newCart;
            } else {
                return [...prevCart, { ...product, quantity }];
            }
        });
        return { success: true, message: 'Producto agregado al carrito!' };
    };

    const updateQuantity = (productId, action) => {
        let message = null;
        setCart(prevCart => {
            const newCart = [...prevCart];
            const itemIndex = newCart.findIndex(item => item.id === productId);
            
            if (itemIndex > -1) {
                const item = newCart[itemIndex];
                if (action === 'increase') {
                    if (item.quantity < item.stock) {
                        item.quantity += 1;
                    } else {
                        message = `No hay más stock disponible para ${item.nombre}`;
                    }
                } else if (action === 'decrease') {
                    item.quantity -= 1;
                    if (item.quantity <= 0) {
                        newCart.splice(itemIndex, 1);
                    }
                }
            }
            return newCart;
        });
        return message;
    };

    const clearCart = () => {
        setCart([]);
    };

    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

    const value = {
        cart,
        cartItemCount,
        addToCart,
        updateQuantity,
        clearCart
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
