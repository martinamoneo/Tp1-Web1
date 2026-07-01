import '../../pages/Products/ProductView/ProductView.css';
import '../../pages/Products/ProductView/components/ProductGallery.css';
import '../../pages/Products/ProductView/components/ProductInfo.css';
import '../molecules/ProductSkeleton.css';

const ProductDetailSkeleton = () => {
    return (
        <main className="product-page">
            <div className="product-container">
                <div className="skeleton-pulse" style={{ width: '250px', height: '18px', marginBottom: '30px', borderRadius: '4px' }}></div>

                <div className="product-main">
                    <div className="product-gallery">
                        <div className="gallery-thumbnails">
                            <div className="thumb-img skeleton-pulse" style={{ border: 'none' }}></div>
                            <div className="thumb-img skeleton-pulse" style={{ border: 'none' }}></div>
                            <div className="thumb-img skeleton-pulse" style={{ border: 'none' }}></div>
                        </div>
                        <div className="gallery-main-img" style={{ border: 'none', boxShadow: 'none' }}>
                            <div className="skeleton-pulse" style={{ minWidth: '400px', minHeight: '500px', width: '100%', height: '100%', borderRadius: '5px' }}></div>
                        </div>
                    </div>

                    <div className="detail-info">
                        <div className="detail-category skeleton-pulse" style={{ width: '100px', height: '14px', borderRadius: '2px', marginBottom: '15px' }}></div>
                        
                        <div className="detail-title skeleton-pulse" style={{ width: '90%', height: '48px', borderRadius: '4px', margin: '0 0 10px 0' }}></div>
                        <div className="detail-title skeleton-pulse" style={{ width: '60%', height: '48px', borderRadius: '4px', margin: '0 0 25px 0' }}></div>
                        
                        <div className="detail-price skeleton-pulse" style={{ width: '250px', height: '38px', borderRadius: '4px', margin: '0 0 30px 0' }}></div>
                        
                        <div className="detail-stock-info skeleton-pulse" style={{ width: '180px', height: '18px', borderRadius: '2px', margin: '0 0 25px 0' }}></div>
                        
                        <div className="skeleton-pulse" style={{ width: '70%', height: '4px', margin: '0 0 30px 0' }}></div>
                        
                        <div className="detail-actions">
                            <div className="skeleton-pulse" style={{ width: '130px', height: '45px', borderRadius: '25px' }}></div>
                            <div className="skeleton-pulse" style={{ flex: 1, height: '45px', borderRadius: '25px' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProductDetailSkeleton;
