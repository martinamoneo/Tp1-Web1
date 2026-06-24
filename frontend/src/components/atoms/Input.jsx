import './Input.css';

// input personalizado
// type = por default es texto, 
// id, 
// value = texto q escribe el usuario
// onChange = para guardar lo q el usuario escribe
// className = para aplicar estilos de css
// placeholder = texto q se muestra cuando el input esta vacio
const Input = ({ type = 'text', id, value, onChange, className = '', placeholder, ...props }) => {
    return (
        <input
            type={type} // tipo de input por defecto text
            id={id} 
            value={value} 
            onChange={onChange} 
            className={`custom-input ${className}`.trim()} // todos los input van a tener la clase de css custom-input
            placeholder={placeholder}
            {...props} 
        />
    );
};

export default Input;
