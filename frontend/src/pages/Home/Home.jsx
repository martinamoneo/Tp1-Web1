import './Home.css';
import { useState, useEffect } from 'react'; 
import { useSearchParams } from 'react-router-dom';
import CategoryNav from '../../components/molecules/CategoryNav'; 
import ProductCard from '../../components/molecules/ProductCard';
import { SkeletonGrid } from '../../components/molecules/ProductSkeleton';
import ProductPopup from '../../components/organisms/ProductPopup';
import Button from '../../components/atoms/Button';
import Title from '../../components/atoms/Title';
import Icon from '../../components/atoms/Icon';
import apiService from '../../utils/api';
import HeroBanners from '../../components/organisms/HeroBanners';
import ProductCarousel from '../../components/organisms/ProductCarousel';
import useDelayedLoading from '../../hooks/useDelayedLoading';

const Home = () => {
    // cada variable va a usar useState y set para guardar y modificar el estado
    const [productos, setProductos] = useState([]);
    const [productosMasPedidos, setProductosMasPedidos] = useState([]);
    const [productosInteres, setProductosInteres] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleCardClick = (producto) => { 
        setSelectedProduct(producto);
        setIsPopupOpen(true);
    };

    const [loading, setLoading] = useState(true);
    const showLoading = useDelayedLoading(loading, 200);
    const [searchParams, setSearchParams] = useSearchParams();
    
    const sortParam = searchParams.get('sort');

    useEffect(() => { // hook para buscar los productos apenas se abre la pagina
        const fetchProducts = async () => {
            try {
                setLoading(true); // mientras carga, se muestra el skeleton
                const params = sortParam ? { sort: sortParam } : {};
                const data = await apiService.getProducts(params);
                
                if (data.productos) {
                    setProductos(data.productos);
                    
                    setProductosMasPedidos(prev => prev.length > 0 ? prev : [...data.productos].sort(() => 0.5 - Math.random()).slice(0, 10));
                    setProductosInteres(prev => prev.length > 0 ? prev : [...data.productos].sort(() => 0.5 - Math.random()).slice(0, 5));
                }
            } catch (error) {
                console.error('Error trayendo productos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();

    }, [sortParam]); // se ejecuta cada vez que cambia sortParam

    const handleSort = (type) => {
        if (type) {
            setSearchParams({ sort: type });
        } else {
            setSearchParams({});
        }
    };

    return (
        <div>
            <CategoryNav />

            <HeroBanners />

            <ProductCarousel 
                title="Lo más pedido" 
                products={productosMasPedidos} 
                onCardClick={handleCardClick} 
                loading={showLoading}
            />

            {/* Te puede interesar */}
            <section className="products-section home-products-section">
                <Title level={2} className="title-section">Te puede interesar</Title>
                {showLoading && productos.length === 0 ? (
                    <SkeletonGrid count={5} />
                ) : (
                    <div className="products-grid">
                        {productosInteres.map(producto => (
                            <ProductCard key={`interes-${producto.id}`} producto={producto} onCardClick={handleCardClick} />
                        ))}
                    </div>
                )}
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
                {showLoading && productos.length === 0 ? (
                    <SkeletonGrid count={10} />
                ) : (
                    <div className="products-grid">
                        {productos.map(producto => (
                            <ProductCard key={producto.id} producto={producto} onCardClick={handleCardClick} />
                        ))}
                    </div>
                )}
            </section>

            <ProductPopup 
                producto={selectedProduct} 
                isOpen={isPopupOpen} 
                onClose={() => setIsPopupOpen(false)} 
            />
        </div>
    );
};

export default Home;
