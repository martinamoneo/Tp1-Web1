import { useNavigate } from 'react-router-dom';
import Title from '../../components/atoms/Title';
import Button from '../../components/atoms/Button';
import Icon from '../../components/atoms/Icon';
import './Profile.css';

const Profile = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    // Si alguien entra a /profile por la URL sin estar logueado, lo mandamos al login
    if (!user) {
        navigate('/login');
        return null;
    }

    const handleLogout = () => {
        localStorage.removeItem('user'); // Borramos el usuario guardado
        window.location.href = '/'; // Recargamos para que todo el sitio se entere
    };

    return (
        <main className="profile-page">
            <div className="profile-container">
                <Title level={1} className="title-hero">Mi Perfil</Title>
                
                <section className="profile-card">
                    <div className="profile-avatar">
                        <Icon type="regular" name="user-circle" />
                    </div>
                    
                    <h2 className="profile-email">{user.email}</h2>
                    <p className="profile-welcome">¡Bienvenido a tu panel de usuario!</p>
                    
                    <div className="profile-info">
                        <div className="info-item">
                            <span className="info-label">Estado:</span>
                            <span className="info-value text-success">Activo (Simulado)</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Rol:</span>
                            <span className="info-value">Cliente</span>
                        </div>
                    </div>

                    <Button variant="submit" onClick={handleLogout} className="btn-logout">
                        <Icon name="sign-out-alt" /> Cerrar Sesión
                    </Button>
                </section>
            </div>
        </main>
    );
};

export default Profile;
