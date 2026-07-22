import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Title from '../../components/atoms/Title';
import Input from '../../components/atoms/Input';
import Button from '../../components/atoms/Button';
import Icon from '../../components/atoms/Icon';
import Loader from '../../components/atoms/Loader';
import useDelayedLoading from '../../hooks/useDelayedLoading';
import Breadcrumb from '../../components/molecules/Breadcrumb';
import ConfirmModal from '../../components/molecules/ConfirmModal';
import AlertModal from '../../components/molecules/AlertModal';
import apiService from '../../utils/api';
import './AdminProductForm.css'; // Usamos el mismo CSS para aprovechar la grilla

const AdminCategoryForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = Boolean(id);

    const [loading, setLoading] = useState(isEditMode);
    const showLoading = useDelayedLoading(loading, 200);
    const [saving, setSaving] = useState(false);
    
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('success');
    
    const [formData, setFormData] = useState({
        name: '',
        icon: ''
    });

    useEffect(() => {
        if (isEditMode) {
            apiService.getCategoryById(id)
                .then(data => {
                    const categoryData = data.category || data;
                    setFormData({
                        name: categoryData.name || '',
                        icon: categoryData.icon || ''
                    });
                })
                .catch(err => {
                    console.error("Error al cargar categoría", err);
                    setAlertMessage("No se pudo cargar la categoría.");
                    setAlertType("warning");
                    setShowAlert(true);
                })
                .finally(() => setLoading(false));
        }
    }, [id, isEditMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (isEditMode) {
                await apiService.updateCategory(id, formData);
                setAlertMessage('Categoría modificada exitosamente.');
            } else {
                await apiService.createCategory(formData);
                setAlertMessage('Categoría creada exitosamente.');
            }
            setAlertType('success');
            setShowAlert(true);
        } catch (error) {
            console.error('Error guardando categoría:', error);
            setAlertMessage('Ocurrió un error al guardar la categoría.');
            setAlertType('warning');
            setShowAlert(true);
        } finally {
            setSaving(false);
        }
    };

    const closeAlertAndNavigate = () => {
        setShowAlert(false);
        if (alertType === 'success') {
            navigate('/admin/categories');
        }
    };

    const handleDelete = () => {
        setShowDeleteConfirm(true);
    };

    const confirmDelete = async () => {
        setShowDeleteConfirm(false);
        setSaving(true);
        try {
            await apiService.deleteCategory(id);
            setAlertMessage('Categoría eliminada exitosamente.');
            setAlertType('success');
            setShowAlert(true);
        } catch (error) {
            console.error('Error eliminando categoría:', error);
            setAlertMessage('Ocurrió un error al eliminar la categoría.');
            setAlertType('warning');
            setShowAlert(true);
        } finally {
            setSaving(false);
        }
    };

    if (showLoading) {
        return (
            <div className="admin-product-form-view">
                <Loader text="Cargando" words={['información', 'datos']} />
            </div>
        );
    }

    return (
        <>
            <div className="admin-breadcrumb-container" style={{ marginBottom: '10px' }}>
                <Breadcrumb 
                    items={[
                        { label: 'Categorías', link: '/admin/categories' },
                        { label: isEditMode ? `#${id}` : 'Nueva Categoría' }
                    ]} 
                    separatorIcon="chevron-right" 
                />
            </div>
            
            <div className="page-header admin-page-header">
                <Title level={1} className="title-section">{isEditMode ? 'Editar Categoría' : 'Nueva Categoría'}</Title>
                
                {isEditMode && (
                    <div className="admin-actions">
                        <Button variant="secondary" className="btn-delete-product" onClick={handleDelete}>
                            Eliminar
                        </Button>
                    </div>
                )}
            </div>

            <form className="admin-product-form" onSubmit={handleSubmit}>
                <div className="admin-form-grid" style={{ gridTemplateColumns: '1fr' }}>
                    <section className="form-card">
                        <Title level={3} className="form-section-title">Información de la Categoría</Title>
                        
                        <div className="form-group">
                            <label>Nombre de la Categoría</label>
                            <Input 
                                type="text" 
                                name="name" 
                                value={formData.name} 
                                onChange={handleChange} 
                                required 
                                placeholder="Ej. Vasos"
                            />
                        </div>

                        <div className="form-row" style={{ alignItems: 'flex-start', marginTop: '20px' }}>
                            <div className="form-group" style={{ flex: 1, marginRight: '20px' }}>
                                <label>Ícono (FontAwesome)</label>
                                <Input 
                                    type="text" 
                                    name="icon" 
                                    value={formData.icon} 
                                    onChange={handleChange} 
                                    placeholder="Ej. beer, mug-hot"
                                />
                                <small style={{ display: 'block', marginTop: '5px', color: '#666' }}>
                                    Nombre del ícono de FontAwesome
                                </small>
                            </div>
                            
                            <div className="form-group" style={{ width: '100px' }}>
                                <label style={{ textAlign: 'center', display: 'block' }}>Vista Previa</label>
                                <div style={{ 
                                    width: '80px', height: '80px', 
                                    backgroundColor: '#f0f0f0', borderRadius: '12px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    margin: '0 auto'
                                }}>
                                    <Icon name={formData.icon || 'tags'} style={{ fontSize: '32px', color: 'var(--color-turquesa)' }} />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="form-actions sticky-actions">
                    <Button variant="secondary" type="button" onClick={() => navigate('/admin/categories')}>
                        Descartar
                    </Button>
                    <Button variant="primary" type="submit" disabled={saving}>
                        {saving ? 'Guardando...' : (isEditMode ? 'Guardar Cambios' : 'Crear Categoría')}
                    </Button>
                </div>
            </form>

            <ConfirmModal 
                isOpen={showDeleteConfirm}
                title="¿Eliminar categoría?"
                message="Estás a punto de borrar permanentemente esta categoría. Asegurate de que no tenga productos asociados."
                onConfirm={confirmDelete}
                onCancel={() => setShowDeleteConfirm(false)}
                confirmText="Sí, eliminar"
                type="warning"
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

export default AdminCategoryForm;
