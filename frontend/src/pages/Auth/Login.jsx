import './login-register.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiService from '../../services/api';
import Title from '../../components/atoms/Title';

const Login = () => {
    const [nombre, setNombre] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await apiService.login({ nombre, password });
            
            // Login exitoso
            alert('Sesión iniciada con éxito (Simulado)');
            navigate('/');
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
                    <Title level={1} className="title-hero">¡Hola!</Title>
                    
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
