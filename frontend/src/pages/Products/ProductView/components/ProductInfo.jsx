import Title from '../../../../components/atoms/Title';
import Button from '../../../../components/atoms/Button';
import QuantitySelector from '../../../../components/molecules/QuantitySelector';
import './ProductInfo.css';

const ProductInfo = ({ producto, cantidad, onQuantityChange, onAddToCart }) => {
    return (
        <div className="detail-info">
            <p className="detail-category">{producto.categoria || 'Sin categoría'}</p>
            <Title level={1} className="detail-title">{producto.nombre}</Title>
            <p className="detail-price">{producto.puntos} PUNTOS</p>
            
            <div className="detail-stock-info">
                <span>Disponibilidad: </span>
                <span className={producto.stock > 0 ? 'in-stock' : 'out-of-stock'}>
                    {producto.stock > 0 ? `${producto.stock} en stock` : 'Sin stock'}
                </span>
            </div>
            
            <hr className="detail-divisor" />

            <div className="detail-actions">
                <QuantitySelector 
                    cantidad={cantidad}
                    alDisminuir={() => onQuantityChange(-1)}
                    alAumentar={() => onQuantityChange(1)}
                    deshabilitarDisminuir={producto.stock === 0}
                    deshabilitarAumentar={producto.stock === 0}
                />
                <Button variant="carrito" 
                    onClick={onAddToCart}
                    disabled={producto.stock === 0}
                    style={producto.stock === 0 ? { backgroundColor: '#aaa', cursor: 'not-allowed' } : {}}
                >
                    {producto.stock > 0 ? 'AGREGAR AL CARRITO' : 'SIN STOCK'}
                </Button>
            </div>
        </div>
    );
};

export default ProductInfo;
