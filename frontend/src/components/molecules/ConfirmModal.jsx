// cartel de confirmacion
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
import './Modal.css';

// recibe el titulo, mensaje, y las funciones para confirmar y cancelar
// el tipo define si es de advertencia o informativo
const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, confirmText = "Sí, continuar", cancelText = "Cancelar", type = "warning" }) => {
    if (!isOpen) return null; // si no está abierto no muestra nada

    return (
        <div className="modal-overlay"> {/* Overlay que cubre todo */}
            <div className="modal-content"> {/* Contenedor del modal */}
                <div className={`modal-icon-container ${type}`}> {/* Icono que cambia segun el tipo */}
                    <Icon name={type === 'warning' ? 'exclamation-triangle' : 'info-circle'} />
                </div>
                <h3>{title}</h3> {/* Titulo del modal */}
                <p>{message}</p> {/* Mensaje del modal */}
                <div className="modal-actions"> {/* Acciones del modal */}
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
