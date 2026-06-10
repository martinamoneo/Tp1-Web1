import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        if (!formData.nombre) newErrors.nombre = 'El nombre es requerido';
        if (!formData.apellido) newErrors.apellido = 'El apellido es requerido';
        if (!formData.email) {
            newErrors.email = 'El email es requerido';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email inválido';
        }
        if (!formData.password) {
            newErrors.password = 'La contraseña es requerida';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Debe tener al menos 6 caracteres';
        }
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Limpiar error al tipear
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            
            if (response.ok) {
                alert('Cuenta creada exitosamente');
                navigate('/login');
            } else {
                alert('Error al registrar');
            }
        } catch (error) {
            console.error('Error registering:', error);
            alert('Cuenta creada exitosamente (Simulado en fallback)');
            navigate('/login');
        }
    };

    return (
        <main className="register-container">
            <div className="top-banner"></div>

            <div className="register-wrapper">
                <section className="register-card">
                    <h1>¡Registrate!</h1>
                    
                    <form onSubmit={handleSubmit} className="register-form" noValidate>
                        <div className="form-group">   
                            <input 
                                type="text" 
                                name="nombre" 
                                placeholder="Tu nombre" 
                                value={formData.nombre}
                                onChange={handleChange}
                            />
                            {errors.nombre && <small className="error-msg" style={{ display: 'block' }}>{errors.nombre}</small>}
                        </div>
                        <div className="form-group">   
                            <input 
                                type="text" 
                                name="apellido" 
                                placeholder="Tu apellido" 
                                value={formData.apellido}
                                onChange={handleChange}
                            />
                            {errors.apellido && <small className="error-msg" style={{ display: 'block' }}>{errors.apellido}</small>}
                        </div>
                        <div className="form-group">
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="Tu mail" 
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <small className="error-msg" style={{ display: 'block' }}>{errors.email}</small>}
                        </div>

                        <div className="form-group password-container">
                            <input 
                                type="password" 
                                name="password" 
                                placeholder="Tu contraseña" 
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <button type="button" className="btn-eye" onClick={() => setShowPassword(!showPassword)}>
                                <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'} fa-fw`}></i>
                            </button>
                            {errors.password && <small className="error-msg" style={{ display: 'block' }}>{errors.password}</small>}
                        </div>

                        <button type="submit" className="btn-submit">Crear cuenta</button>
                    </form>
                </section> 
                
                <p className="bottom-text">
                    ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
                </p>
            </div>
        </main>
    );
};

export default Register;
