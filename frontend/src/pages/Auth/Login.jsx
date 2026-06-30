import './login-register.css';
import { useState } from 'react'; // hook para q react se acuerde de lo q el usuario escribe
import { Link, useNavigate } from 'react-router-dom'; // hook para navegar entre rutas sin recargar página
import apiService from '../../utils/api'; // para comunicarse con el back
import Title from '../../components/atoms/Title'; // componente title
import Input from '../../components/atoms/Input';
import Button from '../../components/atoms/Button';

const Login = () => { // componente login
    const [email, setEmail] = useState(''); // hook para guardar el email
    const [password, setPassword] = useState(''); // hook para guardar la contraseña
    const [errors, setErrors] = useState({}); // hook para guardar los errores
    const navigate = useNavigate(); // hook para navegar entre rutas sin recargar página

    const validate = () => {
        const newErrors = {};
        if (!email) {
            newErrors.email = 'El email es requerido';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email inválido';
        }
        if (!password) newErrors.password = 'La contraseña es requerida';
        return newErrors;
    };

    const handleSubmit = async (e) => { // función que se ejecuta cuando se presiona enviar
        e.preventDefault(); // evita que el formulario se envíe solo
        
        const validationErrors = validate(); // valida que los campos esten llenos y que el email sea valido
        if (Object.keys(validationErrors).length > 0) { // si hay errores
            setErrors(validationErrors); // guarda los errores para mostrarlos
            return; // no continua
        }
        
        try { // inicio de sesion simulado, en realidad no va a llegar nunca al back 
            await apiService.login({ email, password }); // intenta iniciar sesión
            
            // Login exitoso
            localStorage.setItem('user', JSON.stringify({ email }));
            window.location.href = '/';
        } catch (error) {
            console.error('Error logging in:', error);
            // por mas que haya un error te va a mostrar que se inicio sesion
            localStorage.setItem('user', JSON.stringify({ email }));
            window.location.href = '/';
        }
    };

    return (
        <main className="login-container">
            <div className="top-banner"></div>

            <div className="login-wrapper">
                <section className="login-card">
                    <Title level={1} className="title-hero">¡Hola!</Title>
                    
                    <form onSubmit={handleSubmit} className="login-form" noValidate>
                        <div className="form-group">
                            <Input 
                                type="email" 
                                id="email" 
                                name="email" 
                                placeholder="Tu mail" 
                                value={email}
                                className={errors.email ? 'invalid' : ''}
                                onChange={(e) => {
                                    setEmail(e.target.value); 
                                    if (errors.email) setErrors(prev => ({ ...prev, email: null }));
                                }}
                            />
                            {errors.email && <small className="error-msg">{errors.email}</small>}
                        </div>

                        <div className="form-group">
                            <Input 
                                type="password" 
                                id="password" 
                                name="password" 
                                placeholder="Tu contraseña" 
                                value={password}
                                className={errors.password ? 'invalid' : ''}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    if (errors.password) setErrors(prev => ({ ...prev, password: null }));
                                }}
                            />
                            {errors.password && <small className="error-msg">{errors.password}</small>}
                        </div>

                        <Button variant="submit" type="submit">Iniciar Sesión</Button>
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
