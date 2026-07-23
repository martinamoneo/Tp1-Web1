import './ProductCard.css';
import { useNavigate } from 'react-router-dom'; // hook para navegar entre rutas
import Badge from '../atoms/Badge'; // etiqueta para mostrar info
import Image from '../atoms/Image'; // componente para mostrar imagenes
import Title from '../atoms/Title'; // componente para mostrar titulos

// recibe toda la info del producto y el click para q abra el pop up
const ProductCard = ({ producto, onCardClick }) => {
    const navigate = useNavigate();

    // si me pasan onCardClick abro el pop up, si no abro la pag de producto
    const handleClick = () => {
        if (onCardClick) { 
            onCardClick(producto);
        } else {
            navigate(`/products/${producto.id}`);
        }
    };

    // si se manda imagen usar esa, si no usar fallback
    const imageUrl = producto.imagenes && producto.imagenes[0] ? producto.imagenes[0] : null;
    // verifico si hay stock
    const isOutOfStock = producto.stock === 0;

    return (
        <article 
            className={`product-card ${isOutOfStock ? 'sin-stock' : ''}`}
        >
            <div className="product-image">
                <Image 
                    src={imageUrl} 
                    alt={producto.nombre} 
                />
                {isOutOfStock && (
                    <Badge text="Sin stock" />
                )}
            </div>
            <div className="product-info">
                <Title level={4} className="product-name">{producto.nombre}</Title>
                <div className="product-footer">
                    <p className="product-price">{producto.puntos} PUNTOS</p>
                </div>
            </div>
            
            {/* Botón que aparece en hover */}
            <button className="product-card-btn" onClick={handleClick}>Ver detalle</button>
        </article>
    );
};

export default ProductCard;
