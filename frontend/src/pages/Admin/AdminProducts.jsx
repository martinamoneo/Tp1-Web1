import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Title from '../../components/atoms/Title';
import Input from '../../components/atoms/Input';
import Icon from '../../components/atoms/Icon';
import Image from '../../components/atoms/Image';
import Loader from '../../components/atoms/Loader';
import useDelayedLoading from '../../hooks/useDelayedLoading';
import apiService from '../../utils/api';
import './AdminProducts.css';

const AdminProducts = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const showLoading = useDelayedLoading(loading, 200);
    const [busqueda, setBusqueda] = useState('');

    useEffect(() => {
        apiService.getProducts()
            .then(data => {
                const productsArray = data.productos || (Array.isArray(data) ? data : []);
                setProductos(productsArray);
            })
            .catch(err => console.error("Error cargando productos", err))
            .finally(() => setLoading(false));
    }, []);

    const productosFiltrados = productos.filter(p => 
        p.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
        p.id.toString().includes(busqueda)
    );

    return (
        <>
            <div className="page-header admin-page-header">
                <Title level={1} className="title-section">Productos</Title>
                <div className="admin-products-actions">
                    <div className="admin-search-wrapper">
                        <Input 
                            type="text" 
                            placeholder="Buscar productos..." 
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                        <Icon name="search" className="admin-search-icon" />
                    </div>
                    <Link to="/admin/products/new" className="btn-primary">Agregar Producto</Link>
                </div>
            </div>

            <div className="admin-products-list">
                {showLoading ? (
                    <Loader 
                        text="Buscando" 
                        words={['productos', 'precios', 'stock', 'imágenes']} 
                    />
                ) : productosFiltrados.length > 0 ? (
                    productosFiltrados.map(producto => (
                        <Link to={`/admin/products/${producto.id}`} key={producto.id} className="admin-product-row" style={{ textDecoration: 'none' }}>
                            <div className="admin-row-left">
                                <div className="admin-product-thumb">
                                    <Image 
                                        src={producto.imagenes && producto.imagenes[0] ? producto.imagenes[0] : null} 
                                        alt={producto.nombre} 
                                    />
                                </div>
                                <div className="admin-product-info">
                                    <h3 className="admin-product-title">{producto.nombre}</h3>
                                    <span className="admin-product-id">#{producto.id}</span>
                                </div>
                            </div>
                            <div className="admin-row-right">
                                <Icon name="chevron-right" />
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="admin-empty">No se encontraron productos.</div>
                )}
            </div>
        </>
    );
};

export default AdminProducts;
