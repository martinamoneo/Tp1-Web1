// home > categoría > producto
import { Link } from 'react-router-dom';
import Icon from '../atoms/Icon';
import './Breadcrumb.css';

// recibe la lista de items (links) y el ícono separador
const Breadcrumb = ({ items, separatorIcon = 'angle-right' }) => {
    if (!items || items.length === 0) return null; // si no hay items no muestra nada

    return (
        <nav className="breadcrumb-molecule"> 
            {items.map((item, index) => { // hace un map sobre cada item del breadcrumb
                const isLast = index === items.length - 1; // se fija si es el último elemento

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
