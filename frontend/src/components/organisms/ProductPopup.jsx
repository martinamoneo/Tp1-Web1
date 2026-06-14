import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
import Image from '../atoms/Image';
import Title from '../atoms/Title';
import QuantitySelector from '../molecules/QuantitySelector';
import { useCart } from '../../context/CartContext';

const ProductPopup = ({ producto, isOpen, onClose }) => {
    const { addToCart } = useCart();
    const [cantidad, setCantidad] = useState(1);

    if (!producto) return null;

    const imageUrl = producto.imagenes && producto.imagenes[0] ? `/img/products/${producto.imagenes[0]}` : '/img/ui/no-image.png';

    const handleIncrement = () => setCantidad(c => c + 1);
    const handleDecrement = () => setCantidad(c => (c > 1 ? c - 1 : 1));

    return (
        <div className={`panel-producto ${isOpen ? 'activo' : ''}`} onClick={(e) => {
            // Close if clicking outside the modal content
            if (e.target.classList.contains('panel-producto')) {
                onClose();
            }
        }}>
            <div className="panel-contenido">
                <Button variant="close" onClick={onClose}>
                    <Icon name="xmark" />
                </Button>
                
                <div className="panel-info-row">
                    <div className="panel-izquierda">
                        <div className="slider-container">
                            <Image className="panel-img-principal" src={imageUrl} alt={producto.nombre} />
                        </div>
                    </div>
                    
                    <div className="panel-derecha">
                        <p className="panel-categoria">{producto.categoria || 'Categoría'}</p>
                        <Title level={2}>{producto.nombre}</Title>
                        <p className="panel-puntos">{producto.puntos} PUNTOS</p>
                        <p className="panel-descripcion">
                            {producto.descripcionCorta || producto.descripcion || "Un producto excelente que se ajusta a tus necesidades. Con detalles únicos y una gran calidad en sus materiales."}
                        </p>
                        
                        <hr className="panel-divisor" />
                        
                        <Link to={`/product/${producto.id}`} className="panel-detalle-link">
                            Ver más detalles
                        </Link>
                        
                        <div className="panel-acciones">
                            <QuantitySelector 
                                quantity={cantidad}
                                onDecrease={handleDecrement}
                                onIncrease={handleIncrement}
                                disabledDecrease={producto.stock === 0}
                                disabledIncrease={producto.stock === 0 || cantidad >= producto.stock}
                            />
                            <Button 
                                variant="carrito" 
                                onClick={() => {
                                    const result = addToCart(producto, cantidad);
                                    alert(result.message);
                                }}
                                disabled={producto.stock === 0}
                            >
                                {producto.stock === 0 ? 'SIN STOCK' : 'AGREGAR AL CARRITO'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPopup;
