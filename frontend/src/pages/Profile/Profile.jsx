import './Profile.css';
import Title from '../../components/atoms/Title';
import Button from '../../components/atoms/Button';
import Icon from '../../components/atoms/Icon';

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
                        <li className="logout-btn"><Icon name="right-from-bracket" /> Cerrar Sesión</li>
                    </ul>
                </div>
                
                <div className="profile-content">
                    <Title level={1}>Información Personal</Title>
                    <div className="placeholder-box">
                        <Icon name="person-digging" className="construction-icon" />
                        <Title level={3}>Panel en Construcción</Title>
                        <p>Próximamente podrás editar tus datos y ver tu historial de compras acá.</p>
                        <Button variant="primary" className="btn-volver" onClick={() => window.history.back()}>
                            Volver Atrás
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Profile;
