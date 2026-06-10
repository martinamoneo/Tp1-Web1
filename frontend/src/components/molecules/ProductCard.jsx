import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ producto }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        // En el futuro podemos volver a implementar el panel lateral, 
        // por ahora navegamos a la vista del producto
        navigate(`/product/${producto.id}`);
    };

    const imageUrl = producto.imagenes && producto.imagenes[0] ? `/img/${producto.imagenes[0]}` : '/img/no-image.png';
    const isOutOfStock = producto.stock === 0;

    return (
        <article 
            className={`product-card ${isOutOfStock ? 'sin-stock' : ''}`}
            onClick={handleClick}
        >
            <div className="product-image">
                <img 
                    src={imageUrl} 
                    alt={producto.nombre} 
                    onError={(e) => { e.target.onerror = null; e.target.src = '/img/no-image.png'; }}
                />
                {isOutOfStock && (
                    <span className="badge-sin-stock">Sin stock</span>
                )}
            </div>
            <div className="product-info">
                <h4 className="product-name">{producto.nombre}</h4>
                <div className="product-footer">
                    <p className="product-price">{producto.puntos} PUNTOS</p>
                </div>
            </div>
        </article>
    );
};

export default ProductCard;
