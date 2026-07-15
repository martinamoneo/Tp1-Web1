// alerta personalizada para mostrar mensajes al usuario
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
import './Modal.css';

const AlertModal = ({ isOpen, title, message, onConfirm, confirmText = "Entendido", type = "success" }) => {
    if (!isOpen) return null; // si no esta abierto no muestra nada

    let iconName = 'check-circle'; // icono de exito por defecto
    if (type === 'warning') iconName = 'exclamation-triangle'; // si es warning muestra icono de advertencia
    if (type === 'info') iconName = 'info-circle'; // si es info muestra icono de informacion

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className={`modal-icon-container ${type}`}>
                    <Icon name={iconName} />
                </div>
                <h3>{title}</h3>
                <p>{message}</p>
                <div className="modal-actions">
                    <Button variant="primary" onClick={onConfirm}>
                        {confirmText}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AlertModal;
