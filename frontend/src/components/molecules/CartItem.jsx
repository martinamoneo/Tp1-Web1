import './CartItem.css';
import Image from '../atoms/Image';
import Icon from '../atoms/Icon';
import QuantitySelector from './QuantitySelector';

const CartItem = ({ item, onQuantityChange, onRemove }) => {
    return (
        <div className="cart-item">
            <div className="item-img-box">
                <Image 
                    src={item.imagenes && item.imagenes.length > 0 ? item.imagenes[0] : null} 
                    alt={item.nombre} 
                />
            </div>
            <div className="item-main-info">
                <h4>{item.nombre}</h4>
                <p className="item-points">{item.puntos} puntos</p>
            </div>
            <div className="item-actions-wrapper">
                <div className="item-controls">
                    <QuantitySelector 
                        cantidad={item.quantity}
                        alDisminuir={() => onQuantityChange(item.id, 'decrease')}
                        alAumentar={() => onQuantityChange(item.id, 'increase')}
                        className="cart-qty-selector"
                    />
                </div>
            </div>
        </div>
    );
};

export default CartItem;
