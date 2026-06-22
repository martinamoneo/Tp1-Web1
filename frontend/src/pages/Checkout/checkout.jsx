import './checkout.css';
import '../../components/atoms/Button.css';
import { Link } from 'react-router-dom';
import Title from '../../components/atoms/Title';
import Icon from '../../components/atoms/Icon';

const Checkout = () => {
    return (
        <div className="checkout-container">
            <div className="checkout-content">
                <Icon name="person-digging" className="checkout-icon" />
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
