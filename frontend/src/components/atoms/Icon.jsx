// traduce los iconos de font awesome a iconos de react

//recibe nombre del icono, tipo, clase default y props
const Icon = ({ name, type = 'solid', className = '', ...props }) => {
    return (
        <i className={`fa-${type} fa-${name} ${className}`.trim()} {...props}></i>
        // tipo, nombre, clase por defecto, props
    );
};

export default Icon;
