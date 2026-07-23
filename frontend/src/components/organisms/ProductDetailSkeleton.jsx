// pagina de carga
import './ProductDetailSkeleton.css';

const ProductDetailSkeleton = () => {
    return (
        <div className="product-page">
            <div className="product-container">
                <div className="skeleton-pulse skeleton-breadcrumb"></div>

                <div className="product-main">
                    <div className="product-gallery">
                        <div className="gallery-thumbnails">
                            <div className="thumb-img skeleton-pulse"></div>
                            <div className="thumb-img skeleton-pulse"></div>
                            <div className="thumb-img skeleton-pulse"></div>
                        </div>
                        <div className="gallery-main-img skeleton-gallery-main">
                            <div className="skeleton-pulse skeleton-main-img-inner"></div>
                        </div>
                    </div>

                    <div className="detail-info">
                        <div className="detail-category skeleton-pulse skeleton-category"></div>
                        
                        <div className="detail-title skeleton-pulse skeleton-title-1"></div>
                        <div className="detail-title skeleton-pulse skeleton-title-2"></div>
                        
                        <div className="detail-price skeleton-pulse skeleton-price"></div>
                        
                        <div className="detail-stock-info skeleton-pulse skeleton-stock-info"></div>
                        
                        <div className="skeleton-pulse skeleton-divider"></div>
                        
                        <div className="detail-actions">
                            <div className="skeleton-pulse skeleton-action-btn-1"></div>
                            <div className="skeleton-pulse skeleton-action-btn-2"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailSkeleton;
