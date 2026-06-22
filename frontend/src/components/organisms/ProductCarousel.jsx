import './ProductCarousel.css';
import { useRef } from 'react';
import Title from '../atoms/Title';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
import ProductCard from '../molecules/ProductCard';

const ProductCarousel = ({ title, products, onCardClick }) => {
    const carouselRef = useRef(null);

    const scrollCarousel = (direction) => {
        if (carouselRef.current && carouselRef.current.children.length > 0) {
            const cardWidth = carouselRef.current.children[0].offsetWidth;
            const gap = 30; 
            const scrollAmount = cardWidth + gap;
            
            carouselRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="products-section lo-mas-pedido-section home-products-section">
            {title && <Title level={2} className="title-section">{title}</Title>}
            <div className="carousel-wrapper">
                <Button variant="carousel" className="izquierda" onClick={() => scrollCarousel('left')}>
                    <Icon name="chevron-left" />
                </Button>
                <div className="carousel-grid" ref={carouselRef}>
                    {products.map((producto, index) => (
                        <ProductCard key={`carousel-${producto.id}-${index}`} producto={producto} onCardClick={onCardClick} />
                    ))}
                </div>
                <Button variant="carousel" className="derecha" onClick={() => scrollCarousel('right')}>
                    <Icon name="chevron-right" />
                </Button>
            </div>
        </section>
    );
};

export default ProductCarousel;
