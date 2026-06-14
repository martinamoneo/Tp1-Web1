import './home.css';
import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import CategoryNav from '../../components/molecules/CategoryNav';
import ProductCard from '../../components/molecules/ProductCard';
import ProductPopup from '../../components/organisms/ProductPopup';
import Button from '../../components/atoms/Button';
import Title from '../../components/atoms/Title';
import Icon from '../../components/atoms/Icon';
import apiService from '../../services/api';

const Home = () => {
    const [productos, setProductos] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const carouselRef = useRef(null);

    const handleCardClick = (producto) => {
        setSelectedProduct(producto);
        setIsPopupOpen(true);
    };

    const scrollCarousel = (direction) => {
        if (carouselRef.current && carouselRef.current.children.length > 0) {
            // Calculamos el ancho de una tarjeta + el gap (30px según el CSS)
            const cardWidth = carouselRef.current.children[0].offsetWidth;
            const gap = 30; 
            const scrollAmount = cardWidth + gap;
            
            carouselRef.current.scrollBy({ 
                left: direction === 'left' ? -scrollAmount : scrollAmount, 
                behavior: 'smooth' 
            });
        }
    };
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    
    const sortParam = searchParams.get('sort');

    useEffect(() => {
        // Obtenemos los productos desde nuestro backend Express
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const params = sortParam ? { sort: sortParam } : {};
                const data = await apiService.getProducts(params);
                
                if (data.productos) {
                    setProductos(data.productos);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [sortParam]);

    // Calculamos las secciones "Lo más pedido" y "Te puede interesar" mezclando los productos
    const productosMasPedidos = [...productos].sort(() => 0.5 - Math.random()).slice(0, 10);
    const productosInteres = [...productos].sort(() => 0.5 - Math.random()).slice(0, 5);

    const handleSort = (type) => {
        if (type) {
            setSearchParams({ sort: type });
        } else {
            setSearchParams({});
        }
    };

    if (loading && productos.length === 0) {
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
