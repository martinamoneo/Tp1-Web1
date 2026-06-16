import './product.css';
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Icon from '../../components/atoms/Icon';
import Image from '../../components/atoms/Image';
import Input from '../../components/atoms/Input';
import Title from '../../components/atoms/Title';
import Button from '../../components/atoms/Button';
import ProductCard from '../../components/molecules/ProductCard';
import QuantitySelector from '../../components/molecules/QuantitySelector';
import apiService from '../../services/api';
import { useCart } from '../../context/CartContext';

const ProductDetail = () => {
    const { addToCart } = useCart();
    const { id } = useParams();
    const navigate = useNavigate();
    const [producto, setProducto] = useState(null);
    const [sugeridos, setSugeridos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cantidad, setCantidad] = useState(1);
    const [imagenActiva, setImagenActiva] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const data = await apiService.getProductById(id);
                
                if (data.producto) {
                    setProducto(data.producto);
                    setSugeridos(data.productosSugeridos || []);
                    setCantidad(data.producto.stock > 0 ? 1 : 0);
                    setImagenActiva(0);
                } else {
                    navigate('/404');
                }
            } catch (error) {
                console.error('Error fetching product:', error);
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
        return <div style={{ minHeight: '60vh', padding: '2rem', textAlign: 'center' }}><Title level={2}>Cargando detalle...</Title></div>;
    }

    if (!producto) return null;

    let catDisplay = producto.categoria ? producto.categoria.replace(/colecci[oó]n/gi, '').trim() : ''; 
    catDisplay = catDisplay ? catDisplay.charAt(0).toUpperCase() + catDisplay.slice(1).toLowerCase() : '';
    let catUrl = catDisplay.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    return (
        <main className="product-page">
            <div className="product-container">
                {/* BREADCRUMB */}
                <div className="product-breadcrumb">
                    <Link to="/">Home</Link> 
                    <Icon name="angle-right" /> 
                    <Link to={`/categories/${catUrl}`}>{catDisplay}</Link>
                    <Icon name="angle-right" /> 
                    <span style={{ color: 'var(--color-turquesa)', fontWeight: 500, textTransform: 'capitalize' }}>
                        {producto.nombre.toLowerCase()}
                    </span>
                </div>

                {/* MAIN PRODUCT SECTION */}
                <div className="product-main">
                    {/* GALERIA IZQUIERDA */}
                    <div className="product-gallery">
                        <div className="gallery-thumbnails">
                            {producto.imagenes && producto.imagenes.map((img, i) => (
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
                                src={producto.imagenes && producto.imagenes.length > 0 ? producto.imagenes[imagenActiva] : null} 
                                alt={producto.nombre} 
                            />
                        </div>
                    </div>

                    {/* INFO DERECHA */}
                    <div className="detail-info">
                        <p className="detail-category">{producto.categoria || 'Sin categoría'}</p>
                        <Title level={1} className="detail-title">{producto.nombre}</Title>
                        <p className="detail-price">{producto.puntos} PUNTOS</p>
                        
                        <div className="detail-stock-info">
                            <span>Disponibilidad: </span>
                            <span className={producto.stock > 0 ? 'in-stock' : 'out-of-stock'}>
                                {producto.stock > 0 ? `${producto.stock} en stock` : 'Sin stock'}
                            </span>
                        </div>
                        
                        <hr className="detail-divisor" />

                        <div className="detail-actions">
                            <QuantitySelector 
                                quantity={cantidad}
                                onDecrease={() => handleQuantityChange(-1)}
                                onIncrease={() => handleQuantityChange(1)}
                                disabledDecrease={producto.stock === 0}
                                disabledIncrease={producto.stock === 0}
                            />
                            <Button variant="carrito" 
                                onClick={handleAddToCart}
                                disabled={producto.stock === 0}
                                style={producto.stock === 0 ? { backgroundColor: '#aaa', cursor: 'not-allowed' } : {}}
                            >
                                {producto.stock > 0 ? 'AGREGAR AL CARRITO' : 'SIN STOCK'}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* MIDDLE SECTION (DESCRIPTION) */}
                <div className="product-details-tabs">
                    <div className="tabs-header">
                        <span className="tab-title activo">Descripción y Especificaciones</span>
                    </div>
                    <div className="tabs-content">
                        <div className="tab-pane-left">
                            <p>{producto.descripcion}</p>
                        </div>
                        <div className="tab-pane-right">
                            <Title level={4} className="spec-title">Especificaciones</Title>
                            {producto.especificaciones ? (
                                <ul className="spec-list">
                                    {producto.especificaciones.split('\n').map((line, i) => (
                                        line.trim().length > 0 ? <li key={i}>{line.trim()}</li> : null
                                    ))}
                                </ul>
                            ) : (
                                <p className="spec-empty">No hay especificaciones adicionales para este producto.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* SUGGESTED PRODUCTS */}
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
