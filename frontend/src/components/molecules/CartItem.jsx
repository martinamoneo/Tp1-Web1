import './CartItem.css';
import Image from '../atoms/Image';
import Icon from '../atoms/Icon';
import Badge from '../atoms/Badge';
import QuantitySelector from './QuantitySelector';

const CartItem = ({ item, onQuantityChange, onRemove }) => {
    return (
        <div className={`cart-item ${item.outOfStock ? 'item-out-of-stock' : ''}`}>
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
                    {item.outOfStock ? (
                        <Badge text="SIN STOCK" type="sin-stock" />
                    ) : (
                        <QuantitySelector 
                            cantidad={item.quantity}
                            alDisminuir={() => onQuantityChange(item.id, 'decrease')}
                            alAumentar={() => onQuantityChange(item.id, 'increase')}
                            className="cart-qty-selector"
                        />
                    )}
                </div>
                <button className="btn-remove-item" onClick={() => onRemove(item.id)} title="Eliminar del carrito">
                    <Icon name="trash" />
                </button>
            </div>
        </div>
    );
};

export default CartItem;
