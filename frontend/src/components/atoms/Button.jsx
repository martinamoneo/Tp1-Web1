import React from 'react';

const Button = ({ children, variant, className = '', onClick, type = 'button', ...props }) => {
    // Definimos las clases base según la variante solicitada
    let variantClass = '';
    
    switch (variant) {
        case 'carrito':
            variantClass = 'btn-carrito';
            break;
        case 'cantidad':
            variantClass = 'btn-cantidad';
            break;
        case 'close':
            variantClass = 'panel-close';
            break;
        case 'sugeridos':
        case 'carousel':
            variantClass = 'sugeridos-btn carousel-btn';
            break;
        case 'sort':
            variantClass = 'sort-btn';
            break;
        case 'sort-clear':
            variantClass = 'sort-btn sort-btn-clear';
            break;
        default:
            variantClass = '';
    }

    return (
        <button 
            type={type} 
            className={`${variantClass} ${className}`.trim()} 
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
