import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const ProductDetail = () => {
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
                const response = await fetch(`http://localhost:3000/api/product/${id}`);
                const data = await response.json();
                
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
        if (!producto || producto.stock === 0) return;
        
        // Aquí implementaremos la lógica del carrito en localStorage
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existingItem = cart.find(item => item.id === producto.id);
        
        if (existingItem) {
            existingItem.quantity += cantidad;
            if (existingItem.quantity > producto.stock) existingItem.quantity = producto.stock;
        } else {
            cart.push({ ...producto, quantity: cantidad });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Producto agregado al carrito!');
        // Opcionalmente despachar un evento personalizado para actualizar el badge del header
        window.dispatchEvent(new Event('cartUpdated'));
    };

    if (loading) {
        return <div style={{ minHeight: '60vh', padding: '2rem', textAlign: 'center' }}><h2>Cargando detalle...</h2></div>;
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
                    <i className="fa-solid fa-angle-right"></i> 
                    <Link to={`/categories/${catUrl}`}>{catDisplay}</Link>
                    <i className="fa-solid fa-angle-right"></i> 
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
                                <img 
                                    key={i}
                                    src={`/img/${img}`} 
                                    alt={`Thumbnail ${i}`} 
                                    className={`thumb-img ${i === imagenActiva ? 'activo' : ''}`} 
                                    onClick={() => setImagenActiva(i)}
                                    onError={(e) => { e.target.onerror = null; e.target.src = '/img/no-image.png'; }}
                                />
                            ))}
                        </div>
                        <div className="gallery-main-img">
                            <img 
                                src={producto.imagenes && producto.imagenes.length > 0 ? `/img/${producto.imagenes[imagenActiva]}` : '/img/no-image.png'} 
                                alt={producto.nombre} 
                                onError={(e) => { e.target.onerror = null; e.target.src = '/img/no-image.png'; }}
                            />
                        </div>
                    </div>

                    {/* INFO DERECHA */}
                    <div className="detail-info">
                        <p className="detail-category">{producto.categoria || 'Sin categoría'}</p>
                        <h1 className="detail-title">{producto.nombre}</h1>
                        <p className="detail-price">{producto.puntos} PUNTOS</p>
                        
                        <div className="detail-stock-info">
                            <span>Disponibilidad: </span>
                            <span className={producto.stock > 0 ? 'in-stock' : 'out-of-stock'}>
                                {producto.stock > 0 ? `${producto.stock} en stock` : 'Sin stock'}
                            </span>
                        </div>
                        
                        <hr className="detail-divisor" />

                        <div className="detail-actions">
                            <div className="cantidad-selector">
                                <button className="btn-cantidad" 
                                    onClick={() => handleQuantityChange(-1)}
                                    disabled={producto.stock === 0}
                                    style={producto.stock === 0 ? { cursor: 'not-allowed' } : {}}
                                >
                                    <i className="fa-solid fa-minus"></i>
                                </button>
                                <input type="text" value={cantidad} readOnly />
                                <button className="btn-cantidad" 
                                    onClick={() => handleQuantityChange(1)}
                                    disabled={producto.stock === 0}
                                    style={producto.stock === 0 ? { cursor: 'not-allowed' } : {}}
                                >
                                    <i className="fa-solid fa-plus"></i>
                                </button>
                            </div>
                            <button className="btn-carrito" 
                                onClick={handleAddToCart}
                                disabled={producto.stock === 0}
                                style={producto.stock === 0 ? { backgroundColor: '#aaa', cursor: 'not-allowed' } : {}}
                            >
                                {producto.stock > 0 ? 'AGREGAR AL CARRITO' : 'SIN STOCK'}
                            </button>
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
                            <h4 className="spec-title">Especificaciones</h4>
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
                    <h2>También te puede interesar</h2>
                    {sugeridos && sugeridos.length > 0 ? (
                        <div className={`sugeridos-grid ${sugeridos.length < 3 ? 'pocos-productos' : ''}`}>
                            {sugeridos.map(sug => (
                                <div key={sug.id} className="sug-card" onClick={() => navigate(`/product/${sug.id}`)}>
                                    <div className="sug-img-box">
                                        <img 
                                            src={sug.imagenes && sug.imagenes.length > 0 ? `/img/${sug.imagenes[0]}` : '/img/no-image.png'} 
                                            alt={sug.nombre} 
                                            onError={(e) => { e.target.onerror = null; e.target.src = '/img/no-image.png'; }}
                                        />
                                    </div>
                                    <p className="sug-title">{sug.nombre}</p>
                                    <p className="sug-price">{sug.puntos} PUNTOS</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="sugeridos-vacio">
                            <i className="fa-regular fa-face-frown"></i>
                            <p>Lo sentimos, no hay productos similares en este momento.</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default ProductDetail;
