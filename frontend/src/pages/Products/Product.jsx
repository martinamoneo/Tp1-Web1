import './product.css';
import { useState, useEffect } from 'react'; // useState ->  manejar estado, useEffect ->  manejar efectos secundarios
import { useParams, Link, useNavigate } from 'react-router-dom';
// useParams -> obtener ID del producto de la URL
// Link -> crear enlaces
// useNavigate -> navegar entre rutas
import Icon from '../../components/atoms/Icon';
import Image from '../../components/atoms/Image';
import Title from '../../components/atoms/Title';
import Button from '../../components/atoms/Button';
import ProductCard from '../../components/molecules/ProductCard';
import QuantitySelector from '../../components/molecules/QuantitySelector';
import apiService from '../../services/api'; // objeto apiService para manejar peticiones a la API
import { useCart } from '../../context/CartContext'; // funcion useCart para hablar con la memoria del carrito

const ProductDetail = () => {
    const { addToCart } = useCart(); // funcion addToCart para agregar productos al carrito
    const { id } = useParams(); // useParams para obtener el id del producto
    const navigate = useNavigate(); // funcion navigate para navegar entre rutas
    const [producto, setProducto] = useState(null); // estado para guardar el producto
    const [sugeridos, setSugeridos] = useState([]); // estado para guardar los productos sugeridos
    const [loading, setLoading] = useState(true); // estado para guardar el estado de carga
    const [cantidad, setCantidad] = useState(1); // estado para guardar la cantidad 
    const [imagenActiva, setImagenActiva] = useState(0); // estado para guardar la imagen activa

    useEffect(() => { // esto sucede cada vez q el ID de la URL cambia
        const fetchProduct = async () => { // funcion asincronica para obtener el producto
            try {
                setLoading(true); // inicio la carga
                const data = await apiService.getProductById(id); // obtengo el producto
                
                if (data.producto) { // si se obtiene el producto
                    setProducto(data.producto); // guardo el producto
                    setSugeridos(data.productosSugeridos || []); // guardo los productos sugeridos
                    setCantidad(data.producto.stock > 0 ? 1 : 0); // guardo la cantidad
                    setImagenActiva(0); // guardo la imagen activa
                } else { // si no se obtiene el producto
                    navigate('/404'); // navego a la pagina 404
                }
            } catch (error) { // si hay un error
                console.error('Error fetching product:', error); // muestro el error
                navigate('/404'); // navego a la pagina 404
            } finally { // despues de todo
                setLoading(false); // deja de cargar
            }
        };

        fetchProduct(); // llamo a la funcion
    }, [id, navigate]); // cuando cambia el id o navigate

    // manejar cantidad de producto en general
    const handleQuantityChange = (delta) => { // delta puede ser +1 o -1
        if (!producto || producto.stock === 0) return; // si no hay producto o no hay stock no hace nada
        
        const newQty = cantidad + delta; // nueva cantidad 
        if (newQty >= 1 && newQty <= producto.stock) { // si la nueva cantidad es mayor o igual a 1 y menor o igual al stock
            setCantidad(newQty); // guardo la nueva cantidad
        }
    };

    // agregar producto al carrito
    const handleAddToCart = () => {
        const result = addToCart(producto, cantidad); // se agrega el producto al carrito
        alert(result.message); // se muestra el mensaje de confirmacion o error
    };

    if (loading) { // si se esta cargando
        // muestra el msj de carga
        return <div style={{ minHeight: '60vh', padding: '2rem', textAlign: 'center' }}><Title level={2}>Cargando detalle...</Title></div>;
    }

    if (!producto) return null; // si no se obtiene el producto, no se muestra nada

    // borra el "colección" del nombre de la categoria
    let catDisplay = producto.categoria ? producto.categoria.replace(/colecci[oó]n/gi, '').trim() : ''; 
    // deja solo la primera letra mayuscula y el resto minuscula
    catDisplay = catDisplay ? catDisplay.charAt(0).toUpperCase() + catDisplay.slice(1).toLowerCase() : '';
    // URL compatible con el servidor (minuscula, sin tildes)
    let catUrl = catDisplay.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    return (
        <main className="product-page">
            <div className="product-container">
                {/* home -> categoria -> producto */}
                <div className="product-breadcrumb">
                    <Link to="/">Home</Link> 
                    <Icon name="angle-right" /> 
                    <Link to={`/categories/${catUrl}`}>{catDisplay}</Link>
                    <Icon name="angle-right" /> 
                    <span style={{ color: 'var(--color-turquesa)', fontWeight: 500, textTransform: 'capitalize' }}>
                        {producto.nombre.toLowerCase()}
                    </span>
                </div>

                {/* pagina de producto */}
                <div className="product-main">
                    {/* lado izq - fotos */}
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

                    {/* lado derecho - info */}
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

                {/* descripcion */}
                <div className="product-details-tabs">
                    <div className="tabs-header">
                        <span className="tab-title activo">Descripción</span>
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

                {/* productos sugeridos en la pag producto */}
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
