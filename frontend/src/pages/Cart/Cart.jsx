import './cart.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Title from '../../components/atoms/Title';
import Icon from '../../components/atoms/Icon';
import Button from '../../components/atoms/Button';
import CartItem from '../../components/molecules/CartItem';
import CartSummary from '../../components/molecules/CartSummary';
import EmptyState from '../../components/molecules/EmptyState';

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
            <div className="page-wrapper">
                
                <div className="page-header">
                    <Title level={1} className="title-section">Tu Carrito</Title>
                    {carrito.length > 0 && (
                        <div className="page-header-actions">
                            <Link to="/" className="btn-volver">
                                <Icon name="arrow-left" /> Seguir comprando
                            </Link>
                            <Button variant="vaciar" onClick={clearCart}>
                                <Icon name="trash" /> Vaciar todo
                            </Button>
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
                    <EmptyState 
                        icon="bag-shopping" 
                        title="Tu carrito está vacío" 
                        description="¿No sabés qué comprar? ¡Miles de productos te esperan!"
                    >
                        <Link to="/" className="btn-primary">Descubrir productos</Link>
                    </EmptyState>
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
