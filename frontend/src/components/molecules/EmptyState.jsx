// estado para cuando la pagina no tiene nada para mostrar
import Title from '../atoms/Title';
import Icon from '../atoms/Icon';
import './EmptyState.css';

// recibe icono, titulo, descripcion e hijos (botones, links, etc)
const EmptyState = ({ icon, title, description, children }) => {
    return (
        <div className="empty-state">
            {icon && (
                <div className="empty-state-icon">
                    <Icon name={icon} />
                </div>
            )}
            {title && <Title level={2} className="empty-state-title">{title}</Title>}
            {description && <p className="empty-state-desc">{description}</p>}
            {children && <div className="empty-state-actions">{children}</div>}
        </div>
    );
};

export default EmptyState;
