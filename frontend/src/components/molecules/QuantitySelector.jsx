// botones para la cantidad

import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Icon from '../atoms/Icon';
import './QuantitySelector.css'

const QuantitySelector = ({ 
    quantity, // cantidad a mostrar
    onDecrease, // funcion para disminuir
    onIncrease, // funcion para aumentar
    disabledDecrease = false, // deshabilitar boton menos
    disabledIncrease = false, // deshabilitar boton mas
    className = '' // clase opcional para estilos extra
}) => {
    return (
        <div className={`cantidad-selector ${className}`.trim()}>
            <Button 
                variant="cantidad" 
                onClick={onDecrease}
                disabled={disabledDecrease}
                style={disabledDecrease ? { cursor: 'not-allowed' } : {}}
            >
                <Icon name="minus" />
            </Button>
            
            <Input 
                value={quantity} 
                readOnly // hace que el num no se pueda escribir
                className="qty-input"
            />
            
            <Button 
                variant="cantidad" 
                onClick={onIncrease}
                disabled={disabledIncrease}
                style={disabledIncrease ? { cursor: 'not-allowed' } : {}}
            >
                <Icon name="plus" />
            </Button>
        </div>
    );
};

export default QuantitySelector;
