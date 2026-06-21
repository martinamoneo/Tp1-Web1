import { Link } from 'react-router-dom';
import './error.css';

const NotFound404 = () => {
    return (
        <div className="error-page-wrapper">
            <div className="error-bg-text">404</div>
            <div className="error-content">
                <h1 className="error-main-text">No se pudo encontrar esta página</h1>
                <Link to="/" className="btn-primary">Ir a la página de inicio</Link>
            </div>
        </div>
    );
};

export default NotFound404;
