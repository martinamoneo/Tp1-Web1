// para poner sin stock en los productos

import './Badge.css';

// recibe texto, tipo prederminado sin stock y una clase opcional
const Badge = ({ text, type = 'sin-stock', className = '' }) => {
    // badge - type (en este caso sin stock)
    const badgeClass = `badge-${type}`;

    return (
        <span className={`${badgeClass} ${className}`.trim()}>
            {text}
        </span>
    );
};

export default Badge;
