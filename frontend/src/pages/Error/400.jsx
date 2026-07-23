import { Link } from 'react-router-dom';
import './Error.css';

const Error400 = () => {
    return (
        <div className="error-page-wrapper">
            <div className="error-bg-text">400</div>
            <div className="error-content">
                <h1 className="error-main-text">Solicitud incorrecta</h1>
                <Link to="/" className="btn-primary">Ir a la página de inicio</Link>
            </div>
        </div>
    );
};

export default Error400;
