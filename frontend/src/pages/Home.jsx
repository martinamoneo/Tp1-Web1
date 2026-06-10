import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CategoryNav from '../components/molecules/CategoryNav';
import ProductCard from '../components/molecules/ProductCard';

const Home = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    
    const sortParam = searchParams.get('sort');

    useEffect(() => {
        // Obtenemos los productos desde nuestro backend Express
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const url = sortParam ? `http://localhost:3000/api/?sort=${sortParam}` : 'http://localhost:3000/api/';
                const response = await fetch(url);
                const data = await response.json();
                
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

    if (loading) {
        return <div style={{ minHeight: '60vh', padding: '2rem', textAlign: 'center' }}><h2>Cargando productos...</h2></div>;
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
                                <h3>Novedades</h3>
                                <p>Descubre lo último que llegó</p>
                            </div>
                        </div>
                    </article>

                    <article className="banner-card banner-card2">
                        <div className="banner-content">
                            <div className="banner-text">
                                <h3>Próximos Ingresos</h3>
                                <p>Lo que pronto estará disponible</p>
                            </div>
                        </div>
                    </article>
                </div>
            </section>

            {/* Lo más pedido */}
            <section className="products-section lo-mas-pedido-section" style={{ paddingBottom: '10px' }}>
                <h2>Lo más pedido</h2>
                <div className="carousel-wrapper">
                    <button className="sugeridos-btn izquierda carousel-btn">
                        <i className="fa-solid fa-angle-left"></i>
                    </button>
                    <div className="carousel-grid" id="loMasPedidoTrack">
                        {productosMasPedidos.map(producto => (
                            <ProductCard key={`pedido-${producto.id}`} producto={producto} />
                        ))}
                    </div>
                    <button className="sugeridos-btn derecha carousel-btn">
                        <i className="fa-solid fa-angle-right"></i>
                    </button>
                </div>
            </section>

            {/* Te puede interesar */}
            <section className="products-section" style={{ paddingBottom: '10px' }}>
                <h2>Te puede interesar</h2>
                <div className="products-grid">
                    {productosInteres.map(producto => (
                        <ProductCard key={`interes-${producto.id}`} producto={producto} />
                    ))}
                </div>
            </section>

            {/* Todos los Productos */}
            <section className="products-section" id="productos">
                <div className="products-section-header">
                    <h2>Mira nuestros productos!</h2>
                    <div className="sort-controls">
                        <span>Ordenar por precio:</span>
                        <button onClick={() => handleSort('asc')} className={`sort-btn ${sortParam === 'asc' ? 'activo' : ''}`}>
                            <i className="fas fa-arrow-up"></i> Menor precio
                        </button>
                        <button onClick={() => handleSort('desc')} className={`sort-btn ${sortParam === 'desc' ? 'activo' : ''}`}>
                            <i className="fas fa-arrow-down"></i> Mayor precio
                        </button>
                        {sortParam && (
                            <button onClick={() => handleSort(null)} className="sort-btn sort-btn-clear">
                                <i className="fas fa-times"></i> Quitar orden
                            </button>
                        )}
                    </div>
                </div>
                <div className="products-grid">
                    {productos.map(producto => (
                        <ProductCard key={producto.id} producto={producto} />
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Home;
