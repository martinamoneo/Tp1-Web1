import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
    const [carrito, setCarrito] = useState([]);
    const [mensaje, setMensaje] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const cartData = JSON.parse(localStorage.getItem('cart') || '[]');
        setCarrito(cartData);
    }, []);

    const updateCartStorage = (newCart) => {
        localStorage.setItem('cart', JSON.stringify(newCart));
        setCarrito(newCart);
        window.dispatchEvent(new Event('cartUpdated'));
    };

    const handleClearCart = () => {
        updateCartStorage([]);
    };

    const handleQuantityChange = (productId, action) => {
        const newCart = [...carrito];
        const itemIndex = newCart.findIndex(item => item.id === productId);
        
        if (itemIndex > -1) {
            const item = newCart[itemIndex];
            
            if (action === 'increase') {
                if (item.quantity < item.stock) {
                    item.quantity += 1;
                    setMensaje(null);
                } else {
                    setMensaje(`No hay más stock disponible para ${item.nombre}`);
                }
            } else if (action === 'decrease') {
                item.quantity -= 1;
                setMensaje(null);
                if (item.quantity <= 0) {
                    newCart.splice(itemIndex, 1);
                }
            }
            updateCartStorage(newCart);
        }
    };

    const total = carrito.reduce((acc, item) => acc + (item.puntos * item.quantity), 0);

    return (
        <main className="cart-container">
            <div className="cart-wrapper">
                <h1 className="cart-title">Tu Carrito</h1>
                
                {mensaje && (
                    <div className="cart-mensaje-error">
                        <i className="fa-solid fa-triangle-exclamation"></i>
                        {mensaje}
                    </div>
                )}
                
                {carrito.length === 0 ? (
                    <div className="cart-vacio">
                        <p>No hay productos por aquí...</p>
                        <Link to="/" className="btn-gris">Volver al inicio</Link>
                    </div>
                ) : (
                    <>
                        <div className="cart-header-actions">
                            <Link to="/" className="btn-volverInicio">← Volver al inicio</Link>
                            <button onClick={handleClearCart} className="btn-vaciar">Vaciar carrito</button>
                        </div>

                        <div className="cart-items">
                            {carrito.map(item => (
                                <div className="cart-item" key={item.id}>
                                    <div className="item-img-box">
                                        <img 
                                            src={`/img/${item.imagenes && item.imagenes.length > 0 ? item.imagenes[0] : 'no-image.png'}`} 
                                            alt={item.nombre} 
                                        />
                                    </div>
                                    <div className="item-main-info">
                                        <h4>{item.nombre}</h4>
                                        <p>{item.puntos} puntos</p>
                                    </div>
                                    <div className="item-controls">
                                        <div className="form-qty">
                                            <button 
                                                onClick={() => handleQuantityChange(item.id, 'decrease')} 
                                                className="btn-qty"
                                            >
                                                <i className="fa-solid fa-minus"></i>
                                            </button>
                                            <span className="qty-num">{item.quantity}</span>
                                            <button 
                                                onClick={() => handleQuantityChange(item.id, 'increase')} 
                                                className="btn-qty"
                                            >
                                                <i className="fa-solid fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="cart-total-bar">
                            <p className="total-text">Total: {total} puntos</p>
                            <Link to="/checkout" className="btn-pagar">Pagar</Link>
                        </div>
                    </>
                )}
            </div>
        </main>
    );
};

export default Cart;
