import { NavLink, Outlet } from 'react-router-dom';
import Icon from '../../components/atoms/Icon';
import { getUserName } from '../../utils/formatters';
import './AdminPanel.css';

const AdminPanel = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userName = getUserName(user);

    return (
        <main className="admin-page">
            <div className="admin-container">
                {/* Sidebar */}
                <div className="admin-sidebar">
                    <ul className="admin-menu">
                        <li>
                            <NavLink to="/admin" end className={({ isActive }) => isActive ? "active-link" : ""}>
                                <Icon name="house" /> Inicio
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/products" className={({ isActive }) => isActive ? "active-link" : ""}>
                                <Icon name="box" /> Productos
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/categories" className={({ isActive }) => isActive ? "active-link" : ""}>
                                <Icon name="tags" /> Categorías
                            </NavLink>
                        </li>
                    </ul>
                    
                    <div className="admin-user-info">
                        <div className="admin-avatar-small">
                            <Icon name="user-tie" />
                        </div>
                        <span className="admin-name">{userName}</span>
                    </div>
                </div>
                
                {/* Contenido Principal */}
                <div className="admin-content">
                    <Outlet />
                </div>
            </div>
        </main>
    );
};

export default AdminPanel;
