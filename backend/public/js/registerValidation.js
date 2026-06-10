const form = document.getElementById('registerForm');
const togglePassword = document.querySelector('#togglePassword');
const passwordInput = document.querySelector('#password');

form.addEventListener('submit', (e) => {
    let hayErrores = false; 
    
    // Capturamos valores y quitamos espacios (TRIM)
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const sitioNombre = "MiEcommerce"; 

    // Función auxiliar para mostrar errores
    const showError = (id, msg) => {
        const errorElement = document.getElementById(`error-${id}`);
        const inputElement = document.getElementById(id);

        if (errorElement) { errorElement.textContent = msg;}
        if (inputElement) inputElement.classList.add('invalid');
        
        hayErrores = true;
    };
    
    // Limpiar errores previos
    document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');

    // 1. Validar campos vacíos
    if (!nombre) showError('nombre', 'El nombre es obligatorio');
    if (!apellido) showError('apellido', 'El apellido es obligatorio');
    
    // 2. Validar Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) showError('email', 'Email inválido');
    

    // 3. Validar Contraseña (Complejidad)
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const forbidden = ["password", "1234", "qwerty", sitioNombre.toLowerCase()];
    if (nombre.toLowerCase() === password.toLowerCase()) showError('password', 'La contraseña no puede ser igual al nombre');
    
    if (password.length < 8) {
        showError('password', 'Mínimo 8 caracteres');
    } else if (!hasLetter || !hasNumber || !hasSpecial) {
        showError('password', 'Debe incluir letra, número y carácter especial');
    } else if (forbidden.some(word => password.toLowerCase().includes(word))) {
        showError('password', 'La contraseña contiene palabras prohibidas');
    }

    // SI HAY ERRORES, NO SE ENVÍA
    if (hayErrores) {
        e.preventDefault();
        console.log("Formulario detenido. Corregí los errores.");
    }
});

togglePassword.addEventListener('click', function () {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);

    const icon = this.querySelector('i');
    if (icon) {
        if (type === 'password') {
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        } else {
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        }
    }
});