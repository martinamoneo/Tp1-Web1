import React from 'react';

const Badge = ({ text, type = 'sin-stock', className = '' }) => {
    // Definimos las clases base y la clase específica del tipo
    // Por ahora el único estilo que existe en CSS es 'badge-sin-stock'
    const badgeClass = `badge-${type}`;

    return (
        <span className={`${badgeClass} ${className}`.trim()}>
            {text}
        </span>
    );
};

export default Badge;
