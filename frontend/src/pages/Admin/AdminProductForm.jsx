import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Title from '../../components/atoms/Title';
import Input from '../../components/atoms/Input';
import Button from '../../components/atoms/Button';
import Icon from '../../components/atoms/Icon';
import Image from '../../components/atoms/Image';
import Breadcrumb from '../../components/molecules/Breadcrumb';
import apiService from '../../utils/api';
import './AdminProductForm.css';

const mapCategoriaToValue = (catString) => {
    if (!catString) return '';
    const str = catString.toLowerCase();
    if (str.includes('mate')) return 'mates';
    if (str.includes('vaso')) return 'vasos';
    if (str.includes('llavero')) return 'llaveros';
    if (str.includes('soporte')) return 'soportes';
    if (str.includes('premio')) return 'premios';
    if (str.includes('muñeco') || str.includes('muneco')) return 'munecos';
    if (str.includes('lámpara') || str.includes('lampara')) return 'lamparas';
    if (str.includes('otro')) return 'otros';
    return '';
};

const AdminProductForm = () => {
    const { id } = useParams(); // Si hay id, estamos editando. Si no hay, estamos creando.
    const navigate = useNavigate();
    const isEditMode = Boolean(id);

    const [loading, setLoading] = useState(isEditMode);
    const [saving, setSaving] = useState(false);
    
    // Estado del formulario
    const [formData, setFormData] = useState({
        nombre: '',
        puntos: '',
        stock: 1,
        descripcion: '',
        categoria: '',
        imagen: ''
    });

    useEffect(() => {
        if (isEditMode) {
            // "La lista de productos tiene un estado “Cargando…” cuando la app está esperando datos desde la API."
            apiService.getProductById(id)
                .then(data => {
                    const productData = data.producto || data;
                    setFormData({
                        nombre: productData.nombre || '',
                        puntos: productData.puntos || '',
                        stock: productData.stock || 0,
                        descripcion: productData.descripcion || '',
                        categoria: mapCategoriaToValue(productData.categoria),
                        imagen: (productData.imagenes && productData.imagenes[0]) ? productData.imagenes[0] : ''
                    });
                })
                .catch(err => {
                    console.error("Error al cargar producto", err);
                    alert("No se pudo cargar el producto.");
                })
                .finally(() => setLoading(false));
        }
    }, [id, isEditMode]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: type === 'number' ? (value === '' ? '' : Number(value)) : value 
        }));
    };

    const handleStockChange = (amount) => {
        setFormData(prev => ({
            ...prev,
            stock: Math.max(0, prev.stock + amount) // El stock no puede ser negativo
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSaving(true);
        // Simulamos el guardado
        setTimeout(() => {
            alert(isEditMode ? 'Producto modificado exitosamente.' : 'Producto creado exitosamente.');
            setSaving(false);
            navigate('/admin/products');
        }, 800);
    };

    if (loading) {
        return (
            <div className="admin-product-form-view">
                <div className="admin-loading">
                    <Icon name="spinner" className="fa-spin" style={{ marginRight: '10px' }} />
                    Cargando información del producto...
                </div>
            </div>
        );
    }

    return (
        <div className="admin-product-form-view">
            <div className="page-header admin-page-header">
                <div className="title-section">
                    <Breadcrumb 
                        items={[
                            { label: 'Productos', link: '/admin/products' },
                            { label: isEditMode ? `#${id}` : 'Nuevo Producto' }
                        ]} 
                        separatorIcon="chevron-right" 
                    />
                    <Title level={1}>{isEditMode ? 'Editar Producto' : 'Nuevo Producto'}</Title>
                </div>
                {isEditMode && (
                    <div className="admin-actions">
                        <Button variant="secondary" className="btn-delete-product">
                            Eliminar
                        </Button>
                    </div>
                )}
            </div>

            {/* Banner resumen (estilo Santander mock) solo si estamos editando y tenemos nombre/imagen */}
            {isEditMode && formData.nombre && (
                <div className="admin-product-summary-card">
                    <div className="summary-image">
                        <Image src={formData.imagen} alt={formData.nombre} />
                    </div>
                    <div className="summary-details">
                        <h2 className="summary-title">{formData.nombre}</h2>
                        <div className="summary-stats">
                            <div className="stat">
                                <span className="stat-value">{formData.puntos}</span>
                                <span className="stat-label">PUNTOS<br/>SUPERCLUB</span>
                            </div>
                            <div className="stat">
                                <span className="stat-value">{formData.stock}</span>
                                <span className="stat-label">STOCK<br/>DISPONIBLE</span>
                            </div>
                            <div className="stat-badge">
                                <Icon name="store" /> {formData.categoria || 'Sin Tienda'}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <form className="admin-product-form" onSubmit={handleSubmit}>
                <section className="form-section grid-section">
                    <div className="section-header full-width">
                        <Title level={3} className="form-section-title">Información</Title>
                    </div>
                    
                    <div className="form-group">
                        <label>Nombre</label>
                        <Input 
                            type="text" 
                            name="nombre" 
                            value={formData.nombre} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label>Valor (Puntos)</label>
                        <Input 
                            type="number" 
                            name="puntos" 
                            value={formData.puntos} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label>Stock</label>
                        <div className="stock-control">
                            <button type="button" className="stock-btn" onClick={() => handleStockChange(-1)}>-</button>
                            <input 
                                type="number" 
                                name="stock" 
                                className="stock-input" 
                                value={formData.stock} 
                                onChange={handleChange}
                                min="0"
                            />
                            <button type="button" className="stock-btn" onClick={() => handleStockChange(1)}>+</button>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Categoría</label>
                        <select name="categoria" value={formData.categoria} onChange={handleChange} className="form-select">
                            <option value="">Seleccionar categoría...</option>
                            <option value="mates">Mates</option>
                            <option value="vasos">Vasos</option>
                            <option value="llaveros">Llaveros</option>
                            <option value="soportes">Soportes</option>
                            <option value="premios">Premios</option>
                            <option value="munecos">Muñecos</option>
                            <option value="lamparas">Lámparas</option>
                            <option value="otros">Otros</option>
                        </select>
                    </div>

                    <div className="form-group full-width">
                        <label>Descripción</label>
                        <textarea 
                            name="descripcion" 
                            value={formData.descripcion} 
                            onChange={handleChange} 
                            className="form-textarea"
                            rows="4"
                        ></textarea>
                    </div>
                </section>

                <section className="form-section full-width">
                    <div className="section-header">
                        <Title level={3} className="form-section-title">Galería de Imágenes</Title>
                    </div>
                    <div className="form-group">
                        <label>URL de la Imagen</label>
                        <Input 
                            type="text" 
                            name="imagen" 
                            value={formData.imagen} 
                            onChange={handleChange} 
                            placeholder="https://ejemplo.com/imagen.jpg"
                        />
                    </div>
                    {formData.imagen && (
                        <div className="image-preview">
                            <img src={formData.imagen} alt="Vista previa" onError={(e) => { e.target.style.display = 'none'; }} onLoad={(e) => { e.target.style.display = 'block'; }} />
                        </div>
                    )}
                </section>

                <div className="form-actions">
                    <Button variant="secondary" type="button" onClick={() => navigate('/admin/products')}>
                        Cancelar
                    </Button>
                    <Button variant="primary" type="submit" disabled={saving}>
                        {saving ? 'Guardando...' : (isEditMode ? 'Guardar Cambios' : 'Crear Producto')}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AdminProductForm;
