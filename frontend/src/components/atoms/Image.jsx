// para que no haya errores si no se encuentra la imagen

import { SERVER_URL } from '../../services/api';

const Image = ({ src, alt, className = '', defaultImage = '/ui/no-image.png', ...props }) => {
    
    // Función para asegurar que la ruta tenga el dominio del servidor si es relativa
    const getFullUrl = (url) => {
        if (!url) return defaultImage; // No usar SERVER_URL para la UI porque ahora está en el front
        if (url.startsWith('/products/')) return `${SERVER_URL}${url}`; // Si es producto, viene del back
        return url;
    };

    return (
        <img
            src={getFullUrl(src)} // si no hay img se muestra el fallback por defecto
            alt={alt} // texto alternativo
            className={className} // clase por defecto
            onError={(e) => { // si hay error al cargar la imagen
                e.target.onerror = null; // se evita el bucle infinito
                e.target.src = defaultImage; // se muestra el fallback por defecto
            }}
            {...props}
        />
    );
};

export default Image;
