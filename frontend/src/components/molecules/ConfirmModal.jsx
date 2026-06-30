import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
import './Modal.css';

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, confirmText = "Sí, continuar", cancelText = "Cancelar", type = "warning" }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className={`modal-icon-container ${type}`}>
                    <Icon name={type === 'warning' ? 'exclamation-triangle' : 'info-circle'} />
                </div>
                <h3>{title}</h3>
                <p>{message}</p>
                <div className="modal-actions">
                    <Button variant="secondary" onClick={onCancel}>
                        {cancelText}
                    </Button>
                    <Button 
                        variant="eliminar" 
                        onClick={onConfirm} 
                    >
                        {confirmText}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
