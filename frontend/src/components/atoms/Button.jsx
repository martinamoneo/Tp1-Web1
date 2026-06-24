import './Button.css';

// children = cualq cosa q pongas entre button
//variant = palabra clave para aplicar el css
//classname = clase opcional
//onclick = funcion que se ejecuta al hacer click
//type = le dice q es un boton normal
//...props = cualquier cosa q le pasen va aca

const Button = ({ children, variant, className = '', onClick, type = 'button', ...props }) => {
    // diferentes clases segun lo q le pases
    let variantClass;
    switch (variant) {
        case 'carrito':
            variantClass = 'btn-carrito'; // agregar al carrito
            break;
        case 'close':
            variantClass = 'panel-close'; // cerrar panel del pop up
            break;
        case 'carousel':
            variantClass = 'carousel-btn'; // flechas < > en el carrousel
            break;
        case 'sort':
            variantClass = 'sort-btn'; // menor y mayor precio
            break;
        case 'sort-clear':
            variantClass = 'sort-btn sort-btn-clear'; // quitar orden (home)
            break;
        case 'primary':
            variantClass = 'btn-primary';
            break;
        case 'secondary':
            variantClass = 'btn-secondary';
            break;
        case 'submit':
            variantClass = 'btn-submit';
            break;
        case 'eye':
            variantClass = 'btn-eye';
            break;
        case 'remove':
            variantClass = 'btn-remove-item';
            break;
        case 'cantidad':
            variantClass = 'cantidad-btn';
            break;
        case 'search':
            variantClass = 'btn-search';
            break;
        case 'logout':
            variantClass = 'logout-btn';
            break;
        case 'vaciar':
            variantClass = 'btn-vaciar';
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
