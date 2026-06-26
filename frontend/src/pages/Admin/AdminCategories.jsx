import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Title from '../../components/atoms/Title';
import Input from '../../components/atoms/Input';
import Icon from '../../components/atoms/Icon';
import './AdminProducts.css'; // Reutilizamos los estilos de productos para mantener consistencia

// Simulamos las categorías ya que el backend aún no tiene endpoint para listarlas solas con imagen
const mockCategorias = [
    { id: 1, nombre: 'Mates', icon: 'whiskey-glass' },
    { id: 2, nombre: 'Vasos', icon: 'beer' },
    { id: 3, nombre: 'Llaveros', icon: 'key' },
    { id: 4, nombre: 'Soportes', icon: 'crop-simple' },
    { id: 5, nombre: 'Premios', icon: 'trophy' },
    { id: 6, nombre: 'Muñecos', icon: 'snowman' },
    { id: 7, nombre: 'Lámparas', icon: 'lightbulb' },
    { id: 8, nombre: 'Otros', icon: 'gift' }
];

const AdminCategories = () => {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [busqueda, setBusqueda] = useState('');

    useEffect(() => {
        setCategorias(mockCategorias);
        setLoading(false);
    }, []);

    const categoriasFiltradas = categorias.filter(c => 
        c.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
        c.id.toString().includes(busqueda)
    );

    return (
        <div className="admin-products-view">
            <div className="page-header admin-page-header">
                <Title level={1} className="title-section">Categorías</Title>
                <div className="admin-products-actions">
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

            <div className="admin-products-list">
                {loading ? (
                    <div className="admin-loading">Cargando categorías...</div>
                ) : categoriasFiltradas.length > 0 ? (
                    categoriasFiltradas.map(categoria => (
                        <div key={categoria.id} className="admin-product-row">
                            <div className="admin-row-left">
                                <div className="admin-product-thumb" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
                                    <Icon name={categoria.icon} type={categoria.icon === 'lightbulb' ? 'regular' : 'solid'} style={{ fontSize: '24px', color: 'var(--color-turquesa)' }} />
                                </div>
                                <div className="admin-product-info">
                                    <h3 className="admin-product-title">{categoria.nombre}</h3>
                                    <span className="admin-product-id">#{categoria.id}</span>
                                </div>
                            </div>
                            <div className="admin-row-right">
                                <Icon name="chevron-right" />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="admin-empty">No se encontraron categorías.</div>
                )}
            </div>
        </div>
    );
};

export default AdminCategories;
