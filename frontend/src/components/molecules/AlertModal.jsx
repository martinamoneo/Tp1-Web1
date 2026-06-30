import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
import './Modal.css';

const AlertModal = ({ isOpen, title, message, onConfirm, confirmText = "Entendido", type = "success" }) => {
    if (!isOpen) return null;

    let iconName = 'check-circle';
    if (type === 'warning') iconName = 'exclamation-triangle';
    if (type === 'info') iconName = 'info-circle';

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className={`modal-icon-container ${type}`}>
                    <Icon name={iconName} />
                </div>
                <h3>{title}</h3>
                <p>{message}</p>
                <div className="modal-actions">
                    <Button variant="primary" onClick={onConfirm} style={{ width: '100%' }}>
                        {confirmText}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AlertModal;
