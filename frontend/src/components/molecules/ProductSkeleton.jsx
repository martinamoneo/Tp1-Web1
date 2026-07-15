// skeleton de la tarjeta de producto
import './ProductCard.css';
import './ProductSkeleton.css';

// componente que crea un skeleton con la misma logica de product card
const ProductSkeleton = () => {
    return (
        <article className="product-card skeleton-card">
            <div className="product-image">
                <div className="skeleton-pulse skeleton-image"></div>
            </div>
            <div className="product-info">
                <div className="skeleton-pulse skeleton-title"></div>
                <div className="skeleton-pulse skeleton-title short"></div>
                <div className="product-footer">
                    <div className="skeleton-pulse skeleton-price"></div>
                </div>
            </div>
        </article>
    );
};

// sirve para crear una cantidad determinada de skeletons dependiendo de lo que se necesite
export const SkeletonGrid = ({ count = 4 }) => {
    return (
        // elijo que cantidad de skeletons se muestren
        <div className="skeleton-grid">
            {Array.from({ length: count }).map((_, index) => (
                <ProductSkeleton key={index} />
            ))}
        </div>
    );
};

export default ProductSkeleton;
