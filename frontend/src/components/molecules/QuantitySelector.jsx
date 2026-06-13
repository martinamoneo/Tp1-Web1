import React from 'react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Icon from '../atoms/Icon';

const QuantitySelector = ({ 
    quantity, 
    onDecrease, 
    onIncrease, 
    disabledDecrease = false, 
    disabledIncrease = false,
    className = ''
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
                readOnly 
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
