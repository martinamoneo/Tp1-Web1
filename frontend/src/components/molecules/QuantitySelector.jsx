// botones para la cantidad

import Input from '../atoms/Input';
import Icon from '../atoms/Icon';
import './QuantitySelector.css'

const QuantitySelector = ({ 
    cantidad, // cantidad a mostrar
    alDisminuir, // funcion para disminuir
    alAumentar, // funcion para aumentar
    deshabilitarDisminuir = false, // deshabilitar boton menos
    deshabilitarAumentar = false, // deshabilitar boton mas
    className = '' // clase opcional para estilos extra
}) => {
    return (
        <div className={`cantidad-selector ${className}`.trim()}>
            <button 
                className="cantidad-btn"
                onClick={alDisminuir}
                disabled={deshabilitarDisminuir}
                style={deshabilitarDisminuir ? { cursor: 'not-allowed' } : {}}
            >
                <Icon name="minus" />
            </button>
            
            <Input 
                value={cantidad} 
                readOnly // hace que el num no se pueda escribir
                className="cantidad-input"
            />
            
            <button 
                className="cantidad-btn"
                onClick={alAumentar}
                disabled={deshabilitarAumentar}
                style={deshabilitarAumentar ? { cursor: 'not-allowed' } : {}}
            >
                <Icon name="plus" />
            </button>
        </div>
    );
};

export default QuantitySelector;
