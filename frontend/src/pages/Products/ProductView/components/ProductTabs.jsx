import Title from '../../../../components/atoms/Title';
import './ProductTabs.css';

const ProductTabs = ({ descripcion, especificaciones }) => {
    return (
        <div className="product-details-tabs">
            <div className="tabs-header">
                <span className="tab-title activo">Descripción</span>
            </div>
            <div className="tabs-content">
                <div className="tab-pane-left">
                    <p>{descripcion}</p>
                </div>
                <div className="tab-pane-right">
                    <Title level={4} className="spec-title">Especificaciones</Title>
                    {especificaciones ? (
                        <ul className="spec-list">
                            {especificaciones.split('\n').map((line, i) => (
                                line.trim().length > 0 ? <li key={i}>{line.trim()}</li> : null
                            ))}
                        </ul>
                    ) : (
                        <p className="spec-empty">No hay especificaciones adicionales para este producto.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductTabs;
