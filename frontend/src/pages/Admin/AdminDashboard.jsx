import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Title from '../../components/atoms/Title';
import Icon from '../../components/atoms/Icon';
import apiService from '../../utils/api';

const AdminDashboard = () => {
    const [productsCount, setProductsCount] = useState('...');
    const [categoriesCount, setCategoriesCount] = useState('...');
    
    useEffect(() => {
        // Obtenemos los productos reales de la API para mostrar la cantidad
        apiService.getProducts()
            .then(data => {
                const productsArray = data.productos || (Array.isArray(data) ? data : []);
                if (productsArray.length > 0) {
                    setProductsCount(productsArray.length);
                    const uniqueCategories = new Set(productsArray.map(p => p.categoria).filter(Boolean));
                    setCategoriesCount(uniqueCategories.size);
                } else {
                    setProductsCount(0);
                    setCategoriesCount(0);
                }
            })
            .catch(error => {
                console.error("Error al obtener productos:", error);
                setProductsCount('Error');
                setCategoriesCount('Error');
            });
    }, []);

    return (
        <>
            <div className="page-header">
                <Title level={1} className="title-section">¡Hola Administrador!</Title>
            </div>
            
            <div className="admin-dashboard-grid">
                
                {/* Tarjeta Productos */}
                <div className="admin-card">
                    <div className="admin-card-header">
                        <div className="admin-card-icon">
                            <Icon name="box-open" />
                        </div>
                        <div>
                            <Title level={2} className="admin-card-number">{productsCount}</Title>
                            <span className="admin-card-label">Productos</span>
                        </div>
                    </div>
                    <div className="admin-card-actions">
                        <Link to="/admin/products" className="btn-secondary">Ver Listado</Link>
                        <Link to="/products/new" className="btn-primary">Agregar Producto</Link>
                    </div>
                </div>

                {/* Tarjeta Categorías */}
                <div className="admin-card">
                    <div className="admin-card-header">
                        <div className="admin-card-icon">
                            <Icon name="tags" />
                        </div>
                        <div>
                            <Title level={2} className="admin-card-number">{categoriesCount}</Title>
                            <span className="admin-card-label">Categorías</span>
                        </div>
                    </div>
                    <div className="admin-card-actions">
                        <Link to="/admin/categories" className="btn-secondary">Ver Listado</Link>
                        <button className="btn-primary">Agregar Categoría</button>
                    </div>
                </div>

                {/* Tarjeta Tiendas */}
                <div className="admin-card">
                    <div className="admin-card-header">
                        <div className="admin-card-icon">
                            <Icon name="shop" />
                        </div>
                        <div>
                            <Title level={2} className="admin-card-number">3</Title>
                            <span className="admin-card-label">Tiendas</span>
                        </div>
                    </div>
                    <div className="admin-card-actions">
                        <Link to="/admin/stores" className="btn-secondary">Ver Listado</Link>
                        <button className="btn-primary">Agregar Tienda</button>
                    </div>
                </div>

            </div>
        </>
    );
};

export default AdminDashboard;
