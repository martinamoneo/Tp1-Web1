import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Title from '../../components/atoms/Title';
import Input from '../../components/atoms/Input';
import Button from '../../components/atoms/Button';
import Image from '../../components/atoms/Image';
import Icon from '../../components/atoms/Icon';
import Loader from '../../components/atoms/Loader';
import useDelayedLoading from '../../hooks/useDelayedLoading';
import Breadcrumb from '../../components/molecules/Breadcrumb';
import ConfirmModal from '../../components/molecules/ConfirmModal';
import AlertModal from '../../components/molecules/AlertModal';
import apiService from '../../utils/api';
import { formatCategory } from '../../utils/formatters';
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
    const showLoading = useDelayedLoading(loading, 200);
    const [saving, setSaving] = useState(false);
    
    // Estados para los modales
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showImageDeleteConfirm, setShowImageDeleteConfirm] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('success');
    
    // Estado del formulario
    const [formData, setFormData] = useState({
        nombre: '',
        puntos: '',
        stock: 1,
        descripcion_corta: '',
        descripcion: '',
        especificaciones: '',
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
                        descripcion_corta: productData.descripcionCorta || '',
                        descripcion: productData.descripcion || '',
                        especificaciones: productData.especificaciones || productData.specifications || '',
                        categoria: mapCategoriaToValue(productData.categoria),
                        imagen: (productData.imagenes && productData.imagenes[0]) ? productData.imagenes[0] : ''
                    });
                })
                .catch(err => {
                    console.error("Error al cargar producto", err);
                    setAlertMessage("No se pudo cargar el producto.");
                    setAlertType("warning");
                    setShowAlert(true);
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


    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (isEditMode) {
                await apiService.updateProduct(id, formData);
                setAlertMessage('Producto modificado exitosamente.');
            } else {
                await apiService.createProduct(formData);
                setAlertMessage('Producto creado exitosamente.');
            }
            setAlertType('success');
            setShowAlert(true);
        } catch (error) {
            console.error('Error guardando producto:', error);
            setAlertMessage('Ocurrió un error al guardar el producto.');
            setAlertType('warning');
            setShowAlert(true);
        } finally {
            setSaving(false);
        }
    };

    const closeAlertAndNavigate = () => {
        setShowAlert(false);
        // Si fue una operacion de guardado o eliminacion exitosa, redirigir
        if (alertType === 'success') {
            navigate('/admin/products');
        }
    };

    const handleDelete = () => {
        setShowDeleteConfirm(true);
    };

    const confirmDelete = async () => {
        setShowDeleteConfirm(false);
        setSaving(true);
        try {
            await apiService.deleteProduct(id);
            setAlertMessage('Producto eliminado exitosamente.');
            setAlertType('success');
            setShowAlert(true);
        } catch (error) {
            console.error('Error eliminando producto:', error);
            setAlertMessage('Ocurrió un error al eliminar el producto.');
            setAlertType('warning');
            setShowAlert(true);
        } finally {
            setSaving(false);
        }
    };

    if (showLoading) {
        return (
            <div className="admin-product-form-view">
                <Loader 
                    text="Cargando" 
                    words={['información', 'categorías', 'imágenes', 'detalles']} 
                />
            </div>
        );
    }

    return (
        <>
            <div className="admin-breadcrumb-container" style={{ marginBottom: '10px' }}>
                <Breadcrumb 
                    items={[
                        { label: 'Productos', link: '/admin/products' },
                        { label: isEditMode ? `#${id}` : 'Nuevo Producto' }
                    ]} 
                    separatorIcon="chevron-right" 
                />
            </div>
            
            <div className="page-header admin-page-header">
                <Title level={1} className="title-section">{isEditMode ? 'Editar Producto' : 'Nuevo Producto'}</Title>
                
                {isEditMode && (
                    <div className="admin-actions">
                        <Button variant="secondary" className="btn-delete-product" onClick={handleDelete}>
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
                                <span className="stat-label">PUNTOS</span>
                            </div>
                            <div className="stat">
                                <span className="stat-value">{formData.stock}</span>
                                <span className="stat-label">STOCK<br/>DISPONIBLE</span>
                            </div>
                            <div className="stat-badge">
                                <Icon name="tag" /> {formatCategory(formData.categoria) || 'Sin categoría'}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <form className="admin-product-form" onSubmit={handleSubmit}>
                <div className="admin-form-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                    
                    {/* Columna Izquierda (Información General) */}
                    <div className="admin-form-column-main">
                        <section className="form-card">
                            <Title level={3} className="form-section-title">Información General</Title>
                            
                            <div className="form-group">
                                <label>Nombre del Producto</label>
                                <Input 
                                    type="text" 
                                    name="nombre" 
                                    value={formData.nombre} 
                                    onChange={handleChange} 
                                    required 
                                    placeholder="Ej. Vaso Térmico 3D"
                                />
                            </div>

                            <div className="form-group">
                                <label>Descripción Corta</label>
                                <textarea 
                                    name="descripcion_corta" 
                                    value={formData.descripcion_corta} 
                                    onChange={handleChange} 
                                    className="form-textarea"
                                    rows="3"
                                    placeholder="Resumen breve del producto..."
                                    required
                                ></textarea>
                            </div>
                        </section>
                    </div>

                    {/* Columna Derecha (Organización e Inventario) */}
                    <div className="admin-form-column-side">
                        <section className="form-card">
                            <Title level={3} className="form-section-title">Inventario</Title>
                            
                            <div className="form-group">
                                <label>Categoría</label>
                                <select name="categoria" value={formData.categoria} onChange={handleChange} className="form-select" required>
                                    <option value="">Seleccionar categoría</option>
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

                            <div className="form-row">
                                <div className="form-group" style={{ flex: 1 }}>
                                    <label>Stock Disponible</label>
                                    <Input 
                                        type="number" 
                                        name="stock" 
                                        value={formData.stock} 
                                        onChange={handleChange} 
                                        required 
                                        min="0"
                                        step="1"
                                        placeholder="1"
                                    />
                                </div>
                                <div className="form-group" style={{ flex: 1 }}>
                                    <label>Valor en Puntos</label>
                                    <div className="input-with-icon">
                                        <Input 
                                            type="number" 
                                            name="puntos" 
                                            value={formData.puntos} 
                                            onChange={handleChange} 
                                            required 
                                            min="0"
                                            step="1"
                                            placeholder="Puntos"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

                {/* Detalles del Producto (Full width) */}
                <div className="admin-form-column-full">
                    <section className="form-card">
                        <Title level={3} className="form-section-title">Detalles del Producto</Title>
                        
                        <div className="form-row">
                            <div className="form-group" style={{ flex: 1 }}>
                                <label>Especificaciones Técnicas</label>
                                <textarea 
                                    name="especificaciones" 
                                    value={formData.especificaciones} 
                                    onChange={handleChange} 
                                    className="form-textarea"
                                    rows="4"
                                    placeholder="Materiales, dimensiones, peso..."
                                ></textarea>
                            </div>
                            <div className="form-group" style={{ flex: 1 }}>
                                <label>Descripción Completa</label>
                                <textarea 
                                    name="descripcion" 
                                    value={formData.descripcion} 
                                    onChange={handleChange} 
                                    className="form-textarea"
                                    rows="4"
                                    placeholder="Detalles completos del producto..."
                                ></textarea>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Columna Ancha Inferior (Multimedia) */}
                <div className="admin-form-column-full">
                    <section className="form-card">
                        <Title level={3} className="form-section-title">Multimedia</Title>
                        
                        <div className="image-upload-area">
                            {formData.imagen ? (
                                <div className="image-preview-large">
                                    <Image src={formData.imagen} alt="Vista previa" />
                                    <button type="button" className="btn-remove-image" onClick={() => setShowImageDeleteConfirm(true)}>
                                        <Icon name="times" /> Quitar imagen
                                    </button>
                                </div>
                            ) : (
                                <div className="image-placeholder">
                                    <Icon name="image" className="placeholder-icon" />
                                    <p>Pegá la URL de la imagen aquí</p>
                                </div>
                            )}
                            
                            <div className="form-group" style={{ marginTop: '1rem' }}>
                                <Input 
                                    type="text" 
                                    name="imagen" 
                                    value={formData.imagen} 
                                    onChange={handleChange} 
                                    placeholder="https://ejemplo.com/imagen.jpg"
                                    required
                                />
                            </div>
                        </div>
                    </section>
                </div>

                <div className="form-actions sticky-actions">
                    <Button variant="secondary" type="button" onClick={() => navigate('/admin/products')}>
                        Descartar
                    </Button>
                    <Button variant="primary" type="submit" disabled={saving}>
                        {saving ? 'Guardando...' : (isEditMode ? 'Guardar Cambios' : 'Publicar Producto')}
                    </Button>
                </div>
            </form>

            <ConfirmModal 
                isOpen={showDeleteConfirm}
                title="¿Eliminar producto?"
                message="Estás a punto de borrar permanentemente este producto del catálogo. Esta acción no se puede deshacer."
                onConfirm={confirmDelete}
                onCancel={() => setShowDeleteConfirm(false)}
                confirmText="Sí, eliminar"
                type="warning"
            />
            
            <ConfirmModal 
                isOpen={showImageDeleteConfirm}
                title="¿Quitar imagen?"
                message="¿Estás seguro que deseas quitar la imagen principal de este producto?"
                onConfirm={() => {
                    setFormData(prev => ({...prev, imagen: ''}));
                    setShowImageDeleteConfirm(false);
                }}
                onCancel={() => setShowImageDeleteConfirm(false)}
                confirmText="Sí, quitar"
            />

            <AlertModal 
                isOpen={showAlert}
                title={alertType === 'success' ? '¡Éxito!' : 'Aviso'}
                message={alertMessage}
                onConfirm={closeAlertAndNavigate}
                type={alertType}
            />
        </>
    );
};

export default AdminProductForm;
