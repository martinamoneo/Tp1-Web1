import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [nombre, setNombre] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre, password }),
            });
            
            if (response.ok) {
                // Simulamos login exitoso
                alert('Sesión iniciada con éxito (Simulado)');
                navigate('/');
            } else {
                alert('Error al iniciar sesión');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            // Fallback since API might not handle POST /login cleanly yet
            alert('Sesión iniciada con éxito (Simulado en fallback)');
            navigate('/');
        }
    };

    return (
        <main className="login-container">
            <div className="top-banner"></div>

            <div className="login-wrapper">
                <section className="login-card">
                    <h1>¡Hola!</h1>
                    
                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <input 
                                type="text" 
                                id="nombre" 
                                name="nombre" 
                                placeholder="Tu nombre de usuario" 
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required 
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                placeholder="Tu contraseña" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                            />
                        </div>

                        <button type="submit" className="btn-submit">Iniciar Sesión</button>
                    </form>
                </section> 
                <p className="bottom-text">
                    ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
                </p>
            </div>
        </main>
    );
};

export default Login;
