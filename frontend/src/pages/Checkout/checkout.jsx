import './checkout.css';
import '../../components/atoms/Button.css';
import { Link } from 'react-router-dom';
import Title from '../../components/atoms/Title';

const Checkout = () => {
    return (
        <div className="checkout-container">
            <div className="checkout-content">
                <i className="fa-solid fa-person-digging checkout-icon"></i>
                <Title level={1} className="title-checkout">¡Estamos en obra!</Title>
                <p className="checkout-message">
                    Seguimos trabajando en esta página por ahora.<br/>
                    ¡Vuelve más tarde!
                </p>
                
                <div className="checkout-actions">
                    <Link to="/cart" className="btn-primary">Volver al carrito</Link>
                    <Link to="/" className="btn-secondary">Ir al Home</Link>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
