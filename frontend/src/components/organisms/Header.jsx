import './Header.css';
import { useState } from 'react'; // memoria a corto plazo de react
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Icon from '../atoms/Icon';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import LogoSVG from '../atoms/LogoSVG';
import { useCart } from '../../context/CartContext';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [query, setQuery] = useState(''); // se guarda lo q el usuario pone en la busqueda
    const { cartItemCount } = useCart(); // pregunta cuantos productos hay en el carrito

    const handleSearch = (e) => {
        e.preventDefault(); // para q la pagina no se recargue
        if (query.trim()) { // si no escribio nada no hace nada
            navigate(`/search?query=${encodeURIComponent(query)}`); // te lleva a la pag de busqueda
        }
    };

    // si estamos en el inicio muestra la barra de busqueda, si no no
    const esInicio = location.pathname === '/';

    return (
        <header className="main-header">
            <div className="header-container">
                <Link to="/" className="logo"> {/* tocando te lleva al inicio */}
                    <LogoSVG color="var(--color-turquesa, #1abc9c)" width="48px" height="48px" />
                    <div><span className="logo-light">IDEA </span><span className="logo-bold">3D</span></div>
                </Link>

                {esInicio && ( // si es inicio muestra la barra de busqueda
                    <form className="header-search" onSubmit={handleSearch}>
                        <Input 
                            name="query" 
                            placeholder="Buscar productos..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <Button variant="search" type="submit"><Icon name="search" /></Button>
                    </form>
                )}

                <div className="header-user-actions">
                    <Link to="/cart" className="header-cart">
                        <Icon name="shopping-cart" />
                        <span className="cart-badge" id="cart-badge">
                            {cartItemCount}
                        </span>
                    </Link>

                    <div className="user-profile">
                        <Link to="/login">Iniciar Sesión</Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
