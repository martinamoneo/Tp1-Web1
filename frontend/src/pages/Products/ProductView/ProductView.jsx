import './ProductView.css';
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Icon from '../../../components/atoms/Icon';
import Title from '../../../components/atoms/Title';
import ProductCard from '../../../components/molecules/ProductCard';
import apiService from '../../../utils/api';
import { useCart } from '../../../context/CartContext';

// Importamos los nuevos componentes
import ProductGallery from './components/ProductGallery';
import ProductInfo from './components/ProductInfo';
import ProductTabs from './components/ProductTabs';
import Breadcrumb from '../../../components/molecules/Breadcrumb';

const ProductDetail = () => {
    const { addToCart } = useCart();
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [producto, setProducto] = useState(null);
    const [sugeridos, setSugeridos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cantidad, setCantidad] = useState(1);

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
                console.error('Error fetching product:', error);
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
        const result = addToCart(producto, cantidad);
        alert(result.message);
    };

    if (loading) {
        return <div className="product-loading"><Title level={2}>Cargando detalle...</Title></div>;
    }

    if (!producto) return null;

    let catDisplay = producto.categoria ? producto.categoria.replace(/colecci[oó]n/gi, '').trim() : ''; 
    catDisplay = catDisplay ? catDisplay.charAt(0).toUpperCase() + catDisplay.slice(1).toLowerCase() : '';
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
