import Title from '../../../components/atoms/Title';
import Button from '../../../components/atoms/Button';
import EmptyState from '../../../components/molecules/EmptyState';

const ProductCreate = () => {
    return (
        <main className="product-create-page">
            <div className="page-wrapper">
                <div className="page-header">
                    <Title level={1} className="title-section">Administración</Title>
                </div>
                
                <EmptyState 
                    icon="person-digging" 
                    title="Sección en Construcción" 
                    description="Acá irá el formulario de alta de productos para el panel administrativo."
                >
                    <Button variant="primary" onClick={() => window.history.back()}>
                        Volver Atrás
                    </Button>
                </EmptyState>
            </div>
        </main>
    );
};

export default ProductCreate;
