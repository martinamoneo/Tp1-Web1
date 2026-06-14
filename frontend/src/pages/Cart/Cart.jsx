import './cart.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import QuantitySelector from '../../components/molecules/QuantitySelector';
import { useCart } from '../../context/CartContext';
import Title from '../../components/atoms/Title';

const Cart = () => {
    const { cart: carrito, updateQuantity, clearCart } = useCart();
    const [mensaje, setMensaje] = useState(null);
    const navigate = useNavigate();

    const handleQuantityChange = (productId, action) => {
        const resultMsg = updateQuantity(productId, action);
        setMensaje(resultMsg);
    };

    const total = carrito.reduce((acc, item) => acc + (item.puntos * item.quantity), 0);

    return (
        <main className="cart-container">
            <div className="cart-wrapper">
                <Title level={1} className="title-cart">Tu Carrito</Title>
                
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
                            <button onClick={clearCart} className="btn-vaciar">Vaciar carrito</button>
                        </div>

                        <div className="cart-items">
                            {carrito.map(item => (
                                <div className="cart-item" key={item.id}>
                                    <div className="item-img-box">
                                        <img 
                                            src={item.imagenes && item.imagenes.length > 0 ? `/img/products/${item.imagenes[0]}` : '/img/ui/no-image.png'} 
                                            alt={item.nombre} 
                                        />
                                    </div>
                                    <div className="item-main-info">
                                        <h4>{item.nombre}</h4>
                                        <p>{item.puntos} puntos</p>
                                    </div>
                                    <div className="item-controls">
                                        <QuantitySelector 
                                            quantity={item.quantity}
                                            onDecrease={() => handleQuantityChange(item.id, 'decrease')}
                                            onIncrease={() => handleQuantityChange(item.id, 'increase')}
                                            className="cart-qty-selector"
                                        />
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
