import React from 'react';
import { useNavigate } from 'react-router-dom';
import Badge from '../atoms/Badge';
import Image from '../atoms/Image';
import Title from '../atoms/Title';

const ProductCard = ({ producto, onCardClick }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (onCardClick) {
            onCardClick(producto);
        } else {
            navigate(`/product/${producto.id}`);
        }
    };

    const imageUrl = producto.imagenes && producto.imagenes[0] ? `/img/${producto.imagenes[0]}` : '/img/no-image.png';
    const isOutOfStock = producto.stock === 0;

    return (
        <article 
            className={`product-card ${isOutOfStock ? 'sin-stock' : ''}`}
            onClick={handleClick}
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
        </article>
    );
};

export default ProductCard;
