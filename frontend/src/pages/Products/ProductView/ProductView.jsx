import './ProductView.css';
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Icon from '../../../components/atoms/Icon';
import Title from '../../../components/atoms/Title';
import ProductCard from '../../../components/molecules/ProductCard';
import apiService from '../../../utils/api';
import { useCart } from '../../../context/CartContext';
import useDelayedLoading from '../../../hooks/useDelayedLoading';
import ProductDetailSkeleton from '../../../components/organisms/ProductDetailSkeleton';

// Importamos los nuevos componentes
import ProductGallery from './components/ProductGallery';
import ProductInfo from './components/ProductInfo';
import ProductTabs from './components/ProductTabs';
import Breadcrumb from '../../../components/molecules/Breadcrumb';
import { formatCategory } from '../../../utils/formatters';

const ProductDetail = () => {
    const { addToCart } = useCart();
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [producto, setProducto] = useState(null);
    const [sugeridos, setSugeridos] = useState([]);
    const [loading, setLoading] = useState(true);
    const showLoading = useDelayedLoading(loading, 200);
    const [cantidad, setCantidad] = useState(1);
    
    // Estado para feedback visual en el botón
    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const data = await apiService.getProductById(id);
                
                if (data.producto) {
                    setProducto(data.producto);
                    setSugeridos(data.productosSugeridos || []);
                    setCantidad(data.producto.stock > 0 ? 1 : 0);
                } else {
                    navigate('/404');
                }
            } catch (error) {
                console.error('Error trayendo producto:', error);
                navigate('/404');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id, navigate]);

    const handleQuantityChange = (delta) => {
        if (!producto || producto.stock === 0) return;
        
        const newQty = cantidad + delta;
        if (newQty >= 1 && newQty <= producto.stock) {
            setCantidad(newQty);
        }
    };

    const handleAddToCart = () => {
        addToCart(producto, cantidad);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    if (showLoading) {
        return <ProductDetailSkeleton />;
    }

    if (!producto) return null;

    let catDisplay = formatCategory(producto.categoria); 
    let catUrl = catDisplay.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    return (
        <main className="product-page">
            <div className="product-container">
                <Breadcrumb 
                    items={[
                        { label: 'Home', link: '/' },
                        { label: catDisplay, link: `/categories/${catUrl}` },
                        { label: producto.nombre.toLowerCase() }
                    ]} 
                />

                <div className="product-main">
                    <ProductGallery 
                        imagenes={producto.imagenes} 
                        nombre={producto.nombre} 
                    />

                    <ProductInfo 
                        producto={producto} 
                        cantidad={cantidad} 
                        onQuantityChange={handleQuantityChange} 
                        onAddToCart={handleAddToCart} 
                        isAdded={isAdded}
                    />
                </div>

                <ProductTabs 
                    descripcion={producto.descripcion} 
                    especificaciones={producto.especificaciones} 
                />

                <div className="product-sugeridos">
                    <Title level={2}>También te puede interesar</Title>
                    {sugeridos && sugeridos.length > 0 ? (
                        <div className={`sugeridos-grid ${sugeridos.length < 3 ? 'pocos-productos' : ''}`}>
                            {sugeridos.map(sug => (
                                <ProductCard key={sug.id} producto={sug} />
                            ))}
                        </div>
                    ) : (
                        <div className="sugeridos-vacio">
                            <Icon type="regular" name="face-frown" />
                            <p>Lo sentimos, no hay productos similares en este momento.</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default ProductDetail;
