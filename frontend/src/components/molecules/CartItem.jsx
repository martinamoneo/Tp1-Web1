// producto en el carrito
import './CartItem.css';
import Image from '../atoms/Image';
import Icon from '../atoms/Icon';
import Badge from '../atoms/Badge';
import QuantitySelector from './QuantitySelector';

// recibe el producto, la cantidad y las funciones para cambiar la cantidad y eliminar
const CartItem = ({ item, onQuantityChange, onRemove }) => {
    return (
        // si no tiene stock se muestra sin stock y no se puede cambiar la cantidad
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
