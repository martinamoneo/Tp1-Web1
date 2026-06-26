import { Link } from 'react-router-dom';
import Icon from '../atoms/Icon';
import './Breadcrumb.css';

/**
 * Componente Breadcrumb (Molécula)
 * 
 * @param {Array} items - Arreglo de objetos con forma { label: 'Texto', link: '/ruta' (opcional) }
 * @param {String} separatorIcon - Nombre del ícono de FontAwesome a usar como separador (por defecto 'angle-right')
 */
const Breadcrumb = ({ items, separatorIcon = 'angle-right' }) => {
    if (!items || items.length === 0) return null;

    return (
        <nav className="breadcrumb-molecule" aria-label="breadcrumb">
            {items.map((item, index) => {
                const isLast = index === items.length - 1;

                return (
                    <div key={index} className="breadcrumb-item-container">
                        {item.link ? (
                            <Link to={item.link} className="breadcrumb-link">
                                {item.label}
                            </Link>
                        ) : (
                            <span className={isLast ? "breadcrumb-current" : "breadcrumb-text"}>
                                {item.label}
                            </span>
                        )}

                        {/* Mostrar el separador si no es el último elemento */}
                        {!isLast && (
                            <Icon name={separatorIcon} className="breadcrumb-separator" />
                        )}
                    </div>
                );
            })}
        </nav>
    );
};

export default Breadcrumb;
