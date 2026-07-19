import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Title from '../../components/atoms/Title';
import Button from '../../components/atoms/Button';
import Icon from '../../components/atoms/Icon';
import './Profile.css';

const Profile = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    // Si alguien entra a /profile por la URL sin estar logueado, lo mandamos al login
    useEffect(() => {
        if (!user) navigate('/login');
    }, [user, navigate]);

    if (!user) return null;

    const handleLogout = () => {
        localStorage.removeItem('user'); // Borramos el usuario guardado
        window.location.href = '/'; // Recargamos para que todo el sitio se entere
    };

    return (
        <div className="profile-page">
            <div className="page-wrapper">
                <div className="page-header">
                    <Title level={1} className="title-section">Mi Perfil</Title>
                </div>
                
                <div className="profile-container">
                    <section className="profile-card">
                    <div className="profile-avatar">
                        <Icon type="regular" name="user-circle" />
                    </div>
                    
                    <h2 className="profile-email">{user.email}</h2>
                    <p className="profile-welcome">Sesión iniciada</p>

                    <Button variant="submit" onClick={handleLogout} className="btn-logout">
                        <Icon name="sign-out-alt" /> Cerrar Sesión
                    </Button>
                </section>
                </div>
            </div>
        </div>
    );
};

export default Profile;
