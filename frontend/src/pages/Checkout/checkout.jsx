import { Link } from 'react-router-dom';
import Title from '../../components/atoms/Title';
import EmptyState from '../../components/molecules/EmptyState';

const Checkout = () => {
    return (
        <div className="checkout-container">
            <div className="page-wrapper">
                <div className="page-header">
                    <Title level={1} className="title-section">Checkout</Title>
                </div>
                
                <EmptyState 
                    icon="person-digging" 
                    title="¡Estamos en obra!" 
                    description={<>Seguimos trabajando en esta página por ahora.<br/>¡Vuelve más tarde!</>}
                >
                    <Link to="/cart" className="btn-primary">Volver al carrito</Link>
                    <Link to="/" className="btn-secondary">Ir al Home</Link>
                </EmptyState>
            </div>
        </div>
    );
};

export default Checkout;
