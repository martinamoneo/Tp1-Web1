import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Title from '../../components/atoms/Title';
import Icon from '../../components/atoms/Icon';
import apiService from '../../utils/api';
import { getUserName } from '../../utils/formatters';

const AdminInicio = () => {
    const [productsCount, setProductsCount] = useState(null);
    const [categoriesCount, setCategoriesCount] = useState(null);
    
    useEffect(() => {
        // Ahora usamos el endpoint dedicado de estadísticas, que es muchísimo más rápido
        apiService.getStats()
            .then(data => {
                setProductsCount(data.totalProducts);
                setCategoriesCount(data.totalCategories);
            })
            .catch(error => {
                console.error("Error al obtener productos:", error);
                setProductsCount('Error');
                setCategoriesCount('Error');
            });
    }, []);

    const user = JSON.parse(localStorage.getItem('user'));
    const userName = getUserName(user);

    return (
        <>
            <div className="page-header admin-page-header">
                <Title level={1} className="title-section">¡Hola {userName}!</Title>
            </div>
            
            <div className="admin-dashboard-grid">
                
                {/* Tarjeta Productos */}
                <div className="admin-card">
                    <div className="admin-card-header">
                        <div className="admin-card-icon">
                            <Icon name="box-open" />
                        </div>
                        <div>
                            <Title level={2} className="admin-card-number">{productsCount === null ? <Icon name="spinner" className="fa-spin" /> : productsCount}</Title>
                            <span className="admin-card-label">Productos</span>
                        </div>
                    </div>
                    <div className="admin-card-actions">
                        <Link to="/admin/products" className="btn-secondary">Ver Listado</Link>
                        <Link to="/admin/products/new" className="btn-primary">Agregar Producto</Link>
                    </div>
                </div>

                {/* Tarjeta Categorías */}
                <div className="admin-card">
                    <div className="admin-card-header">
                        <div className="admin-card-icon">
                            <Icon name="tags" />
                        </div>
                        <div>
                            <Title level={2} className="admin-card-number">{categoriesCount === null ? <Icon name="spinner" className="fa-spin" /> : categoriesCount}</Title>
                            <span className="admin-card-label">Categorías</span>
                        </div>
                    </div>
                    <div className="admin-card-actions">
                        <Link to="/admin/categories" className="btn-secondary">Ver Listado</Link>
                        <Link to="/admin/categories/new" className="btn-primary">Agregar Categoría</Link>
                    </div>
                </div>

            </div>
        </>
    );
};

export default AdminInicio;
