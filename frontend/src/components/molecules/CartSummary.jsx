// tarjeta que muestra el total del carrito y un botón para ir a pagar
import { Link } from 'react-router-dom';
import Title from '../atoms/Title';
import './CartSummary.css';

const CartSummary = ({ total }) => {
    return (
        <div className="cart-summary-card">
            <Title level={2} className="summary-title">Resumen de Compra</Title>
            
            <div className="summary-details">
                <div className="summary-row">
                    <span>Subtotal</span>
                    <span>{total} puntos</span>
                </div>
            </div>
            
            <div className="summary-total">
                <h3>Total</h3>
                <h3 className="total-points">{total} puntos</h3>
            </div>
            
            <Link to="/checkout" className="btn-primary pagar full-width">
                Ir a pagar
            </Link>
        </div>
    );
};

export default CartSummary;
