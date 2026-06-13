import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import CategoryNav from '../components/molecules/CategoryNav';
import ProductCard from '../components/molecules/ProductCard';
import apiService from '../services/api';

const Categories = () => {
    const { categoryName } = useParams();
    const [productos, setProductos] = useState([]);
    const [categoriaNombre, setCategoriaNombre] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                setLoading(true);
                const data = await apiService.getCategoryProducts(categoryName);
                
                if (data.productos) {
                    setProductos(data.productos);
                    setCategoriaNombre(data.categoriaNombre || categoryName);
                } else {
                    setProductos([]);
                    setCategoriaNombre(categoryName);
                }
            } catch (error) {
                console.error('Error fetching category:', error);
                setProductos([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCategory();
    }, [categoryName]);

    return (
        <main className="category-page">
            <div className="category-breadcrumb-container">
                <div className="product-breadcrumb" style={{ marginBottom: 0 }}>
                    <Link to="/">Home</Link> 
                    <i className="fa-solid fa-angle-right"></i> 
                    <span className="category-breadcrumb-active" style={{ textTransform: 'capitalize' }}>
                        {categoriaNombre}
                    </span>
                </div>
            </div>

            <CategoryNav />

            <section className="products-section" style={{ minHeight: '50vh' }}>
                <h2 style={{ textTransform: 'capitalize' }}>Categoría: {categoriaNombre}</h2>
                
                {loading ? (
                    <div style={{ padding: '2rem', textAlign: 'center' }}><h3>Cargando categoría...</h3></div>
                ) : productos.length > 0 ? (
                    <div className="products-grid">
                        {productos.map(producto => (
                            <ProductCard key={producto.id} producto={producto} />
                        ))}
                    </div>
                ) : (
                    <div className="sugeridos-vacio" style={{ marginBottom: '50px' }}>
                        <i className="fa-regular fa-face-frown"></i>
                        <p>Lo sentimos, no hay productos en esta categoría en este momento.</p>
                    </div>
                )}
            </section>
        </main>
    );
};

export default Categories;
