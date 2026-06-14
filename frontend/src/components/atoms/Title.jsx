import './Title.css';

// genera titulos automaticamente

// recibe el nivel (1-6), el texto a mostrar, y estilos de css
const Title = ({ level = 2, children, className = '', ...props }) => {
    const Tag = `h${level}`; // crea H+nivel
    
    return (
        <Tag className={className} {...props}>
            {children}
        </Tag>
    );
};

export default Title;
