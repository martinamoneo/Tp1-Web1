import './ProductCreate.css';
import Title from '../../../components/atoms/Title';
import Button from '../../../components/atoms/Button';
import Icon from '../../../components/atoms/Icon';

const ProductCreate = () => {
    return (
        <main className="product-create-page">
            <div className="product-create-container">
                <div className="create-header">
                    <Icon name="box-open" className="header-icon" />
                    <Title level={1}>Agregar Nuevo Producto</Title>
                    <p>Completa los datos para dar de alta un producto en el catálogo.</p>
                </div>
                
                <div className="placeholder-box">
                    <Icon name="person-digging" className="construction-icon" />
                    <Title level={2}>Sección en Construcción</Title>
                    <p>Acá irá el formulario de alta de productos para el panel administrativo.</p>
                    <Button variant="primary" onClick={() => window.history.back()}>
                        Volver Atrás
                    </Button>
                </div>
            </div>
        </main>
    );
};

export default ProductCreate;
