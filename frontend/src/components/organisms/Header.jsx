import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [query, setQuery] = useState('');
    const [cartItemCount, setCartItemCount] = useState(0);

    useEffect(() => {
        const updateCartCount = () => {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            const count = cart.reduce((total, item) => total + item.quantity, 0);
            setCartItemCount(count);
        };

        updateCartCount();
        window.addEventListener('cartUpdated', updateCartCount);

        return () => window.removeEventListener('cartUpdated', updateCartCount);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?query=${encodeURIComponent(query)}`);
        }
    };


    // En el EJS original, la barra de búsqueda se mostraba según 'esInicio'
    // Aquí podemos mostrarla siempre o solo en el home. La mostraremos en el Home.
    const esInicio = location.pathname === '/';

    return (
        <header className="main-header">
            <div className="header-container">
                <Link to="/" className="logo">
                    <span className="logo-bold">Mi</span><span className="logo-light">Ecommerce</span>
                </Link>

                {esInicio && (
                    <form className="header-search" onSubmit={handleSearch}>
                        <input 
                            type="text" 
                            name="query" 
                            placeholder="Buscar productos..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button type="submit"><i className="fas fa-search"></i></button>
                    </form>
                )}

                <div className="header-user-actions">
                    <Link to="/cart" className="header-cart">
                        <i className="fas fa-shopping-cart"></i>
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
