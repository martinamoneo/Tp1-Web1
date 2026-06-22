import './Home.css';
import { useState, useEffect, useRef } from 'react';
// useState -> hook para manejar estados
// useEffect -> hook para efectos secundarios
// useRef -> hook para referencias
import { useSearchParams } from 'react-router-dom'; // hook para manejar parametros de busqueda
import CategoryNav from '../../components/molecules/CategoryNav'; 
import ProductCard from '../../components/molecules/ProductCard';
import ProductPopup from '../../components/organisms/ProductPopup';
import Button from '../../components/atoms/Button';
import Title from '../../components/atoms/Title';
import Icon from '../../components/atoms/Icon';
import apiService from '../../utils/api'; // servicio para hablar con el back

const Home = () => {
    const [productos, setProductos] = useState([]); // guardar productos
    const [productosMasPedidos, setProductosMasPedidos] = useState([]); // guardar productos mas pedidos
    const [productosInteres, setProductosInteres] = useState([]); // guardar productos de interes
    const [selectedProduct, setSelectedProduct] = useState(null); // guardar producto seleccionado para mostrar el pop up
    const [isPopupOpen, setIsPopupOpen] = useState(false); // controlar si el popup esta abierto
    const carouselRef = useRef(null); // referencia al carrusel

    // funcion para que se abra el pop up al hacer click en una tarjeta
    const handleCardClick = (producto) => { 
        setSelectedProduct(producto);
        setIsPopupOpen(true);
    };

    // funcion para q el carrosuel se mueva al tocar las flechas
    const scrollCarousel = (direction) => {
        if (carouselRef.current && carouselRef.current.children.length > 0) { // si el carrusel existe y tiene productos
            const cardWidth = carouselRef.current.children[0].offsetWidth; // calcula el ancho de una tarjeta
            const gap = 30; 
            const scrollAmount = cardWidth + gap; // calcula el ancho total de una tarjeta + gap
            
            carouselRef.current.scrollBy({ // mueve el carrusel a la izquierda o derecha
                left: direction === 'left' ? -scrollAmount : scrollAmount, // si es izquierda mueve a la izquierda, si es derecha mueve a la derecha
                behavior: 'smooth' // hace que el movimiento sea suave
            });
        }
    };

    const [loading, setLoading] = useState(true); // para mostrar que esta cargando
    const [searchParams, setSearchParams] = useSearchParams(); // para ordenar los productos
    
    const sortParam = searchParams.get('sort'); // para saber si esta ordenado

    useEffect(() => { // hook para efectos secundarios (cuando cambia el sort)
        const fetchProducts = async () => { // funcion asincronica para obtener los productos
            try {
                setLoading(true); // muestra que esta cargando
                const params = sortParam ? { sort: sortParam } : {}; // si esta ordenado, lo guarda
                const data = await apiService.getProducts(params); // obtiene los productos
                
                if (data.productos) { // si hay productos
                    setProductos(data.productos); // guarda los productos
                    
                    // Solo calculamos las secciones aleatorias la primera vez que carga la página
                    // mezcla los productos, toma los primeros 10 y los guarda
                    setProductosMasPedidos(prev => prev.length > 0 ? prev : [...data.productos].sort(() => 0.5 - Math.random()).slice(0, 10));
                    // mezcla los productos, toma los primeros 5 y los guarda
                    setProductosInteres(prev => prev.length > 0 ? prev : [...data.productos].sort(() => 0.5 - Math.random()).slice(0, 5));
                }
            } catch (error) { // si hay error
                console.error('Error fetching products:', error); // muestra el error
            } finally { // finalmente
                setLoading(false); // muestra que ya no esta cargando
            }
        };

        fetchProducts(); // llama a la funcion para obtener los productos
    }, [sortParam]); // hook para efectos secundarios (cuando cambia el sort)

    const handleSort = (type) => { // mayor o menor precio
        if (type) { // si esta ordenado
            setSearchParams({ sort: type }); // lo guarda
        } else { // si no esta ordenado
            setSearchParams({}); // lo guarda
        }
    };

    if (loading && productos.length === 0) { // si esta cargando y no hay productos
        // muestra que esta cargando
        return <div style={{ minHeight: '60vh', padding: '2rem', textAlign: 'center' }}><Title level={2} className="title-hero">Cargando productos...</Title></div>;
    }

    return (
        <main>
            <CategoryNav />

            {/* Novedades e Ingresos */}
            <section className="banner-section">
                <div className="banner-container">
                    <article className="banner-card banner-card1">
                        <div className="banner-content">
                            <div className="banner-text">
                                <Title level={3}>Novedades</Title>
                                <p>Descubre lo último que llegó</p>
                            </div>
                        </div>
                    </article>

                    <article className="banner-card banner-card2">
                        <div className="banner-content">
                            <div className="banner-text">
                                <Title level={3}>Próximos Ingresos</Title>
                                <p>Lo que pronto estará disponible</p>
                            </div>
                        </div>
                    </article>
                </div>
            </section>

            {/* Lo más pedido */}
            <section className="products-section lo-mas-pedido-section" style={{ paddingBottom: '10px' }}>
                <Title level={2} className="title-section">Lo más pedido</Title>
                <div className="carousel-wrapper">
                    <Button variant="carousel" className="izquierda" onClick={() => scrollCarousel('left')}>
                        <Icon name="angle-left" />
                    </Button>
                    <div className="carousel-grid" id="loMasPedidoTrack" ref={carouselRef}>
                        {productosMasPedidos.map(producto => (
                            <ProductCard key={`pedido-${producto.id}`} producto={producto} onCardClick={handleCardClick} />
                        ))}
                    </div>
                    <Button variant="carousel" className="derecha" onClick={() => scrollCarousel('right')}>
                        <Icon name="angle-right" />
                    </Button>
                </div>
            </section>

            {/* Te puede interesar */}
            <section className="products-section" style={{ paddingBottom: '10px' }}>
                <Title level={2} className="title-section">Te puede interesar</Title>
                <div className="products-grid">
                    {productosInteres.map(producto => (
                        <ProductCard key={`interes-${producto.id}`} producto={producto} onCardClick={handleCardClick} />
                    ))}
                </div>
            </section>

            {/* Todos los Productos */}
            <section className="products-section" id="productos">
                <div className="products-section-header">
                    <Title level={2} className="title-section">Mira nuestros productos!</Title>
                    <div className="sort-controls">
                        <span>Ordenar por precio:</span>
                        <Button variant="sort" onClick={() => handleSort('asc')} className={sortParam === 'asc' ? 'activo' : ''}>
                            <Icon name="arrow-up" /> Menor precio
                        </Button>
                        <Button variant="sort" onClick={() => handleSort('desc')} className={sortParam === 'desc' ? 'activo' : ''}>
                            <Icon name="arrow-down" /> Mayor precio
                        </Button>
                        {sortParam && (
                            <Button variant="sort-clear" onClick={() => handleSort(null)}>
                                <Icon name="times" /> Quitar orden
                            </Button>
                        )}
                    </div>
                </div>
                <div className="products-grid">
                    {productos.map(producto => (
                        <ProductCard key={producto.id} producto={producto} onCardClick={handleCardClick} />
                    ))}
                </div>
            </section>

            <ProductPopup 
                producto={selectedProduct} 
                isOpen={isPopupOpen} 
                onClose={() => setIsPopupOpen(false)} 
            />
        </main>
    );
};

export default Home;
