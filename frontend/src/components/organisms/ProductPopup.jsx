import { useState } from 'react'; // memoria a corto plazo de react
import { Link } from 'react-router-dom'; // para poder navegar entre paginas
import Button from '../atoms/Button';
import Icon from '../atoms/Icon'; 
import Image from '../atoms/Image';
import Title from '../atoms/Title'; 
import QuantitySelector from '../molecules/QuantitySelector';
import { useCart } from '../../context/CartContext'; // para poder usar el carrito
import { formatCategory } from '../../utils/formatters';
import './ProductPopup.css'; 

// funcion q recibe producto, si esta abierto y si esta cerrado
const ProductPopup = ({ producto, isOpen, onClose }) => {
    const { addToCart } = useCart(); // constante para usar el carrito
    const [cantidad, setCantidad] = useState(1); // constante para guardar la cantidad
    
    // Estado para feedback visual en el botón
    const [isAdded, setIsAdded] = useState(false);

    if (!producto) return null; // si el producto no existe no se muestra nada del popup

    const imageUrl = producto.imagenes && producto.imagenes[0] ? producto.imagenes[0] : null; // constante para guardar la imagen

    const handleIncrement = () => setCantidad(c => c + 1); // funcion para aumentar la cantidad
    const handleDecrement = () => setCantidad(c => (c > 1 ? c - 1 : 1)); // funcion para disminuir la cantidad

    return (
        <div className={`panel-producto ${isOpen ? 'activo' : ''}`} onClick={(e) => {
            // cierra el popup si se hace click fuera de él
            if (e.target.classList.contains('panel-producto')) {
                onClose();
            }
        }}>
            <div className="panel-contenido">
                <Button variant="close" onClick={onClose}> {/* boton para cerrar */}
                    <Icon name="xmark" />
                </Button>
                
                <div className="panel-info-row">
                    <div className="panel-izquierda">
                        <div className="slider-container">
                            <Image className="panel-img-principal" src={imageUrl} alt={producto.nombre} />
                        </div>
                    </div>
                    
                    <div className="panel-derecha">
                        <p className="panel-categoria">{formatCategory(producto.categoria) || 'Categoría'}</p>
                        <Title level={2}>{producto.nombre}</Title>
                        <p className="panel-puntos">{producto.puntos} PUNTOS</p>
                        <p className="panel-descripcion"> {/* descripcion corta y descripcion fallback */}
                            {producto.descripcionCorta || "Un producto excelente que se ajusta a tus necesidades. Con detalles únicos y una gran calidad en sus materiales."}
                        </p>
                        
                        <hr className="panel-divisor" /> {/* linea separadora */}
                        
                        <Link to={`/products/${producto.id}`} className="panel-detalle-link popup-detalle-link"> 
                            Más información sobre este producto <Icon name="arrow-right" className="popup-detalle-icon" />
                        </Link>
                        
                        <div className="panel-acciones">
                            <QuantitySelector 
                                cantidad={cantidad}
                                alDisminuir={handleDecrement}
                                alAumentar={handleIncrement}
                                deshabilitarDisminuir={producto.stock === 0}
                                deshabilitarAumentar={producto.stock === 0 || cantidad >= producto.stock}
                            />
                            <Button 
                                variant="carrito" 
                                onClick={() => {
                                    addToCart(producto, cantidad);
                                    setIsAdded(true);
                                    setTimeout(() => setIsAdded(false), 2000);
                                }}
                                disabled={producto.stock === 0 || isAdded}
                                className={isAdded ? 'btn-agregado' : ''}
                            >
                                {producto.stock === 0 ? 'SIN STOCK' : (isAdded ? '¡AGREGADO!' : 'AGREGAR AL CARRITO')}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPopup;
