import './ProductCard.css'; // Reutilizamos layout base
import './ProductSkeleton.css';

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

// Componente helper para renderizar múltiples skeletons fácilmente en una grilla
export const SkeletonGrid = ({ count = 4 }) => {
    return (
        <div className="skeleton-grid">
            {Array.from({ length: count }).map((_, index) => (
                <ProductSkeleton key={index} />
            ))}
        </div>
    );
};

export default ProductSkeleton;
