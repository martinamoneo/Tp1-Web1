import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Title from '../../components/atoms/Title';
import Icon from '../../components/atoms/Icon';
import ProductCard from '../../components/molecules/ProductCard';
import CategoryNav from '../../components/molecules/CategoryNav';
import Breadcrumb from '../../components/molecules/Breadcrumb';
import apiService from '../../utils/api';
import '../Categories/CategoryView/CategoryView.css';
import './SearchResults.css';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query') || '';
    
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            if (!query.trim()) {
                setProductos([]);
                setLoading(false);
                return;
            }
            
            try {
                setLoading(true);
                const data = await apiService.searchProducts(query);
                if (data.resultados) {
                    setProductos(data.resultados);
                }
            } catch (error) {
                console.error("Error buscando productos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [query]);

    return (
        <main className="category-page">
            <div className="category-breadcrumb-wrapper search-breadcrumb-wrapper">
                <Breadcrumb 
                    items={[
                        { label: 'Home', link: '/' },
                        { label: 'Búsqueda' }
                    ]} 
                />
            </div>

            <CategoryNav />

            <section className="products-section category-products-section">
                <Title level={2} className="title-section category-title-section search-title">
                    {query ? `Resultados para: "${query}"` : "Búsqueda vacía"}
                </Title>
                
                {loading ? (
                    <div className="category-loading"><Title level={2} className="title-hero">Buscando productos...</Title></div>
                ) : productos.length > 0 ? (
                    <div className="products-grid">
                        {productos.map(producto => (
                            <ProductCard key={producto.id} producto={producto} />
                        ))}
                    </div>
                ) : (
                    <div className="sugeridos-vacio category-vacio search-empty">
                        <Icon type="regular" name="face-frown" />
                        <p>No encontramos ningún producto que coincida con "{query}".</p>
                        <span className="search-empty-hint">Intentá usar otras palabras clave o revisá la ortografía.</span>
                    </div>
                )}
            </section>
        </main>
    );
};

export default SearchResults;
