import './ProductsList.css';
import { useState, useEffect } from 'react';
import Title from '../../../components/atoms/Title';
import Icon from '../../../components/atoms/Icon';
import ProductCard from '../../../components/molecules/ProductCard';
import apiService from '../../../utils/api';

const ProductsList = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                setLoading(true);
                // Si tienen un endpoint getAllProducts o listProducts lo ideal seria usarlo.
                // Como placeholder, usamos el de sugeridos del home que trae productos aleatorios.
                const data = await apiService.getSuggestedProducts();
                if (data.productos) {
                    setProductos(data.productos);
                }
            } catch (error) {
                console.error("Error trayendo lista de productos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllProducts();
    }, []);

    return (
        <main className="products-list-page">
            <div className="title-container">
                <Title level={1} className="title-section">Nuestro Catálogo</Title>
                <p>Explorá todos nuestros productos.</p>
            </div>
            
            <section className="products-section products-list-section">
                {loading ? (
                    <div className="loading-state">
                        <Title level={2}>Cargando productos...</Title>
                    </div>
                ) : productos.length > 0 ? (
                    <div className="products-grid">
                        {productos.map(producto => (
                            <ProductCard key={producto.id} producto={producto} />
                        ))}
                    </div>
                ) : (
                    <div className="sugeridos-vacio products-list-vacio">
                        <Icon type="regular" name="face-frown" />
                        <p>Lo sentimos, no hay productos disponibles en este momento.</p>
                    </div>
                )}
            </section>
        </main>
    );
};

export default ProductsList;
