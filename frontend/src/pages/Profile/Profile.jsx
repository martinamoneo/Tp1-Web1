import './Profile.css';
import Title from '../../components/atoms/Title';
import Button from '../../components/atoms/Button';
import Icon from '../../components/atoms/Icon';
import EmptyState from '../../components/molecules/EmptyState';

const Profile = () => {
    return (
        <main className="profile-page">
            <div className="profile-container">
                <div className="profile-sidebar">
                    <div className="profile-avatar">
                        <Icon name="user" className="avatar-icon" />
                    </div>
                    <Title level={2} className="profile-name">Mi Perfil</Title>
                    <p className="profile-role">Usuario Registrado</p>
                    
                    <ul className="profile-menu">
                        <li className="active"><Icon name="circle-info" /> Mis Datos</li>
                        <li><Icon name="box" /> Mis Pedidos</li>
                        <li><Icon name="heart" /> Favoritos</li>
                        <li className="logout-item"><Icon name="right-from-bracket" /> Cerrar Sesión</li>
                    </ul>
                </div>
                
                <div className="profile-content">
                    <div className="page-header">
                        <Title level={1} className="title-section">Información Personal</Title>
                    </div>
                    <EmptyState 
                        icon="person-digging" 
                        title="Panel en Construcción" 
                        description="Próximamente podrás editar tus datos y ver tu historial de compras acá."
                    >
                        <Button variant="primary" onClick={() => window.history.back()}>
                            Volver Atrás
                        </Button>
                    </EmptyState>
                </div>
            </div>
        </main>
    );
};

export default Profile;
