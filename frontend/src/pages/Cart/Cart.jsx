import './cart.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Title from '../../components/atoms/Title';
import Icon from '../../components/atoms/Icon';
import CartItem from '../../components/molecules/CartItem';
import CartSummary from '../../components/molecules/CartSummary';

const Cart = () => {
    const { cart: carrito, updateQuantity, clearCart, removeFromCart } = useCart(); 
    const [mensaje, setMensaje] = useState(null); 

    const handleQuantityChange = (productId, action) => {
        const resultMsg = updateQuantity(productId, action);
        setMensaje(resultMsg); 
    };

    const total = carrito.reduce((acc, item) => acc + (item.puntos * item.quantity), 0);

    return (
        <main className="cart-container">
            <div className="cart-wrapper">
                
                <div className="cart-header">
                    <Title level={1} className="title-section">Tu Carrito</Title>
                    {carrito.length > 0 && (
                        <div className="cart-header-actions">
                            <Link to="/" className="btn-volver">
                                <Icon name="arrow-left" /> Seguir comprando
                            </Link>
                            <button onClick={clearCart} className="btn-vaciar">
                                <Icon name="trash" /> Vaciar todo
                            </button>
                        </div>
                    )}
                </div>
                
                {mensaje && (
                    <div className="cart-mensaje-error"> 
                        <Icon name="triangle-exclamation" /> 
                        {mensaje}
                    </div>
                )}
                
                {carrito.length === 0 ? (
                    <div className="cart-vacio">
                        <div className="cart-vacio-icon">
                            <Icon name="bag-shopping" />
                        </div>
                        <Title level={2} className="title-empty">Tu carrito está vacío</Title>
                        <p>¿No sabés qué comprar? ¡Miles de productos te esperan!</p>
                        <Link to="/" className="btn-primary">Descubrir productos</Link>
                    </div>
                ) : (
                    <div className="cart-grid">
                        {/* COLUMNA IZQUIERDA: PRODUCTOS */}
                        <div className="cart-items-column">
                            
                            <div className="cart-items-list">
                                {carrito.map(item => (
                                    <CartItem 
                                        key={item.id} 
                                        item={item} 
                                        onQuantityChange={handleQuantityChange}
                                        onRemove={removeFromCart} 
                                    />
                                ))}
                            </div>
                        </div>
                        
                        {/* COLUMNA DERECHA: RESUMEN */}
                        <div className="cart-summary-column">
                            <CartSummary total={total} />
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};

export default Cart;
