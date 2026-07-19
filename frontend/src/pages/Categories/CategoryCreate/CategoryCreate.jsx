import Title from '../../../components/atoms/Title';
import Button from '../../../components/atoms/Button';
import EmptyState from '../../../components/molecules/EmptyState';

const CategoryCreate = () => {
    return (
        <div className="category-create-page">
            <div className="page-wrapper">
                <div className="page-header">
                    <Title level={1} className="title-section">Nueva Categoría</Title>
                </div>
                
                <EmptyState 
                    icon="person-digging" 
                    title="Sección en Construcción" 
                    description="Todavía esta sección no está terminada :("
                >
                    <Button variant="primary" onClick={() => window.history.back()}>
                        Volver atrás
                    </Button>
                </EmptyState>
            </div>
        </div>
    );
};

export default CategoryCreate;
