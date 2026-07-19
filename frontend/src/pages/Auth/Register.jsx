import './login-register.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiService from '../../utils/api';
import Title from '../../components/atoms/Title';
import Input from '../../components/atoms/Input';
import Button from '../../components/atoms/Button';
import Icon from '../../components/atoms/Icon';

const Register = () => { // componente register
    const [formData, setFormData] = useState({ // hook para guardar los datos del formulario
        nombre: '',
        apellido: '',
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false); // hook para mostrar/ocultar contraseña
    const [errors, setErrors] = useState({}); // hook para guardar errores
    const navigate = useNavigate(); // hook para navegar entre rutas

    // Función auxiliar para validar la contraseña
    const getPasswordErrors = (pwd, email, nombre) => {
        if (!pwd) return ['La contraseña es requerida'];
        
        const errors = []; // vector para guardar errores porque pueden ser varios
        const lowerPwd = pwd.toLowerCase(); // guardo la contraseña en minúsculas para comparar
        const userName = nombre ? nombre.toLowerCase() : '';
        const forbiddenStrings = ["password", "1234", "qwerty", "idea 3d", "idea3d"]; // palabras prohibidas
        if (userName) forbiddenStrings.push(userName); // si se ingresa nombre, se agrega a la lista de palabras prohibidas

        if (pwd.length < 8) errors.push('Debe tener al menos 8 caracteres'); // verifico que tenga al menos 8 caracteres
        if (!/[a-zA-Z]/.test(pwd)) errors.push('Debe incluir al menos una letra'); // verifico que incluya al menos una letra
        if (!/\d/.test(pwd)) errors.push('Debe incluir al menos un número'); // verifico que incluya al menos un número
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) errors.push('Debe incluir un carácter especial (!@#$...)'); // verifico que incluya al menos un carácter especial
        if (pwd.toLowerCase() === email.toLowerCase()) errors.push('No puede ser igual a tu email'); // verifico que no sea igual al email
        if (forbiddenStrings.some(word => word && lowerPwd.includes(word))) errors.push('Contiene una palabra prohibida'); // verifico que no contenga palabras prohibidas
        
        return errors; // devuelvo los errores
    };

    const validate = () => { // función para validar el formulario
        const newErrors = {};
        if (!formData.nombre) newErrors.nombre = 'El nombre es requerido';
        if (!formData.apellido) newErrors.apellido = 'El apellido es requerido';
        if (!formData.email) {
            newErrors.email = 'El email es requerido';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email inválido';
        }
        // llamo a la funcion para validar la contraseña
        const passwordErrors = getPasswordErrors(formData.password, formData.email, formData.nombre);
        if (passwordErrors.length > 0) { // si hay errores
            newErrors.password = passwordErrors; // los guardo
        }
        
        return newErrors; // devuelvo los errores
    };

    const handleChange = (e) => { // función para manejar cambios en el formulario
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Limpio el error al tipear
        if (errors[name]) {
            if (name === 'password') {
                const passwordErrors = getPasswordErrors(value, formData.email, formData.nombre);
                setErrors(prev => ({ ...prev, password: passwordErrors.length > 0 ? passwordErrors : null }));
            } else {
                setErrors(prev => ({ ...prev, [name]: null }));
            }
        }
    };

    // funcion para manejar el envio del formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // evito que se recargue la página
        const validationErrors = validate(); // valido el formulario
        if (Object.keys(validationErrors).length > 0) { // si hay errores
            setErrors(validationErrors); // los guardo
            return;
        }

        // try catch para manejar errores, aunq el inicio sucede igual
        try {
            await apiService.register(formData); // llamo al servicio de registro
            navigate('/login');
        } catch (error) {
            console.error('Error al registrarse:', error); // muestro error en consola
            navigate('/login');
        }
    };

    return (
        <div className="register-container">
            <div className="top-banner"></div>

            <div className="register-wrapper">
                <section className="register-card">
                    <Title level={1} className="title-hero">¡Registrate!</Title>
                    
                    <form onSubmit={handleSubmit} className="register-form" noValidate>
                        <div className="form-group">   
                            <Input 
                                type="text" 
                                name="nombre" 
                                placeholder="Tu nombre" 
                                value={formData.nombre}
                                className={errors.nombre ? 'invalid' : ''}
                                onChange={handleChange}
                            />
                            {errors.nombre && <small className="error-msg">{errors.nombre}</small>}
                        </div>
                        <div className="form-group">   
                            <Input 
                                type="text" 
                                name="apellido" 
                                placeholder="Tu apellido" 
                                value={formData.apellido}
                                className={errors.apellido ? 'invalid' : ''}
                                onChange={handleChange}
                            />
                            {errors.apellido && <small className="error-msg">{errors.apellido}</small>}
                        </div>
                        <div className="form-group">
                            <Input 
                                type="email" 
                                name="email" 
                                placeholder="Tu mail" 
                                value={formData.email}
                                className={errors.email ? 'invalid' : ''}
                                onChange={handleChange}
                            />
                            {errors.email && <small className="error-msg">{errors.email}</small>}
                        </div>

                        <div className="form-group password-container">
                            <Input 
                                type={showPassword ? "text" : "password"} 
                                name="password" 
                                placeholder="Tu contraseña" 
                                value={formData.password}
                                className={errors.password ? 'invalid' : ''}
                                onChange={handleChange}
                            />
                            <Button variant="eye" type="button" onClick={() => setShowPassword(!showPassword)}>
                                <Icon type="regular" name={showPassword ? 'eye-slash' : 'eye'} className="fa-fw" />
                            </Button>
                            {errors.password && (
                                <div className="register-password-requirements">
                                    {Array.isArray(errors.password) ? (
                                        errors.password.map((err, idx) => (
                                            <small key={idx} className="error-msg">{err}</small>
                                        ))
                                    ) : (
                                        <small className="error-msg">{errors.password}</small>
                                    )}
                                </div>
                            )}
                        </div>

                        <Button variant="submit" type="submit">Crear cuenta</Button>
                    </form>
                </section> 
                
                <p className="bottom-text">
                    ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
