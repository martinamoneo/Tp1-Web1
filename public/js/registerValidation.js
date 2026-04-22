const form = document.getElementById('registerForm');
const togglePassword = document.querySelector('#togglePassword');
const passwordInput = document.querySelector('#password');

form.addEventListener('submit', (e) => {
    let hayErrores = false; 
    
    // Capturamos valores y quitamos espacios (TRIM)
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const email = document.getElementById('email').value.trim();
    const pass = document.getElementById('password').value.trim();
    const sitioNombre = "MiEcommerce"; // Reemplazá por el nombre real de tu web

    // Función auxiliar para mostrar errores
    const showError = (id, msg) => {
        const errorElement = document.getElementById(`error-${id}`);
        if (errorElement) {
            errorElement.textContent = msg;
        }
        hayErrores = true; // <--- Cambiamos esto
    };
    
    // Limpiar errores previos
    document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');

    // 1. Validar campos vacíos
    if (!nombre) showError('nombre', 'El nombre es obligatorio');
    if (!apellido) showError('apellido', 'El apellido es obligatorio');
    
    // 2. Validar Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) showError('email', 'Email inválido');
    if (nombre.toLowerCase() === email.toLowerCase()) showError('nombre', 'El nombre no puede ser igual al email');

    // 3. Validar Contraseña (Complejidad)
    const hasLetter = /[a-zA-Z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
    const forbidden = ["password", "1234", "qwerty", sitioNombre.toLowerCase()];

    if (pass.length < 8) {
        showError('password', 'Mínimo 8 caracteres');
    } else if (!hasLetter || !hasNumber || !hasSpecial) {
        showError('password', 'Debe incluir letra, número y carácter especial');
    } else if (forbidden.some(word => pass.toLowerCase().includes(word))) {
        showError('password', 'La contraseña contiene palabras prohibidas');
    }

    // SI HAY ERRORES, NO SE ENVÍA
    if (hayErrores) {
        e.preventDefault();
        console.log("Formulario detenido. Corregí los errores.");
    }
});

togglePassword.addEventListener('click', function () {
    // Obtenemos el tipo actual
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    
    // Cambiamos el atributo
    passwordInput.setAttribute('type', type);
    
    // Opcional: Cambiar el emoji del ojo
    this.textContent = type === 'password' ? '👁️' : '🙈';
});