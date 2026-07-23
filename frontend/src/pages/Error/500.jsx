import { Link } from 'react-router-dom';
import './Error.css';

const Error500 = () => {
    return (
        <div className="error-page-wrapper">
            <div className="error-bg-text">500</div>
            <div className="error-content">
                <h1 className="error-main-text">Error interno del servidor</h1>
                <Link to="/" className="btn-primary">Ir a la página de inicio</Link>
            </div>
        </div>
    );
};

export default Error500;
