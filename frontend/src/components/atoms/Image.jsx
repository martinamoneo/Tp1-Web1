// para que no haya errores si no se encuentra la imagen

const Image = ({ src, alt, className = '', defaultImage = '/img/ui/no-image.png', ...props }) => {
    return (
        <img
            src={src || defaultImage} // si no hay img se muestra el fallback por defecto
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
