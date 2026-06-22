import { useState } from 'react';
import Image from '../../../../components/atoms/Image';
import './ProductGallery.css';

const ProductGallery = ({ imagenes, nombre }) => {
    const [imagenActiva, setImagenActiva] = useState(0);

    return (
        <div className="product-gallery">
            <div className="gallery-thumbnails">
                {imagenes && imagenes.map((img, i) => (
                    <Image 
                        key={i}
                        src={img} 
                        alt={`Thumbnail ${i}`} 
                        className={`thumb-img ${i === imagenActiva ? 'activo' : ''}`} 
                        onClick={() => setImagenActiva(i)}
                    />
                ))}
            </div>
            <div className="gallery-main-img">
                <Image 
                    src={imagenes && imagenes.length > 0 ? imagenes[imagenActiva] : null} 
                    alt={nombre} 
                />
            </div>
        </div>
    );
};

export default ProductGallery;
