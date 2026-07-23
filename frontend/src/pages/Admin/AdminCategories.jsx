import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Title from '../../components/atoms/Title';
import Input from '../../components/atoms/Input';
import Icon from '../../components/atoms/Icon';
import Loader from '../../components/atoms/Loader';
import useDelayedLoading from '../../hooks/useDelayedLoading';

import apiService from '../../utils/api';
import './AdminTable.css';

const AdminCategories = () => {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const showLoading = useDelayedLoading(loading, 200);
    const [busqueda, setBusqueda] = useState('');

    useEffect(() => {
        apiService.getCategories()
            .then(data => setCategorias(Array.isArray(data) ? data : []))
            .catch(err => console.error("Error cargando categorías", err))
            .finally(() => setLoading(false));
    }, []);

    const categoriasFiltradas = categorias.filter(c => 
        c.name.toLowerCase().includes(busqueda.toLowerCase()) || 
        c.id.toString().includes(busqueda)
    );

    return (
        <div className="admin-products-view">
            <div className="page-header admin-page-header">
                <Title level={1} className="title-section">Categorías</Title>
                <div className="admin-table-actions">
                    <div className="admin-search-wrapper">
                        <Input 
                            type="text" 
                            placeholder="Buscar categorías..." 
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                        <Icon name="search" className="admin-search-icon" />
                    </div>
                    <Link to="/admin/categories/new" className="btn-primary">Agregar Categoría</Link>
                </div>
            </div>

            <div className="admin-table-list">
                {showLoading ? (
                    <Loader text="Buscando" words={['categorías', 'íconos', 'nombres']} />
                ) : categoriasFiltradas.length > 0 ? (
                    categoriasFiltradas.map(categoria => (
                        <Link to={`/admin/categories/${categoria.id}`} key={categoria.id} className="admin-table-row" style={{ textDecoration: 'none' }}>
                            <div className="admin-row-left">
                                <div className="admin-table-thumb" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
                                    <Icon name={categoria.icon || 'tags'} type={categoria.icon === 'lightbulb' ? 'regular' : 'solid'} style={{ fontSize: '24px', color: 'var(--color-turquesa)' }} />
                                </div>
                                <div className="admin-product-info">
                                    <h3 className="admin-table-title">{categoria.name}</h3>
                                    <span className="admin-table-id">#{categoria.id}</span>
                                </div>
                            </div>
                            <div className="admin-row-right">
                                <Icon name="chevron-right" />
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="admin-empty">No se encontraron categorías.</div>
                )}
            </div>
        </div>
    );
};

export default AdminCategories;
