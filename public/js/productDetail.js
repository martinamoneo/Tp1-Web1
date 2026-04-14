let imagenesActuales = [];
let indiceActual = 0;

function abrirPanel(nombre, puntos, imagenes, descripcion) {

    if (typeof imagenes === 'string') {
    imagenes = JSON.parse(imagenes.replace(/&quot;/g, '"'));
    }

    imagenesActuales = imagenes;
    indiceActual = 0;

    document.getElementById('panelNombre').textContent = nombre;
    document.getElementById('panelPuntos').textContent = puntos;
    document.getElementById('panelDescripcion').textContent = descripcion;

    actualizarFoto();
    generarDots();
    generarMiniaturas();

    const panel = document.getElementById('panelProducto');
    panel.classList.add('activo');
    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

function cerrarPanel() {
    document.getElementById('panelProducto').classList.remove('activo');
    }

function cambiarFoto(direccion) {
    indiceActual += direccion;

    if (indiceActual < 0) indiceActual = imagenesActuales.length - 1;
    if (indiceActual >= imagenesActuales.length) indiceActual = 0;

    actualizarFoto();
    }

function actualizarFoto() {
    const img = document.getElementById('panelImagen');
    img.style.opacity = '0';
    setTimeout(() => {
        img.src = '/img/' + imagenesActuales[indiceActual];
        img.style.opacity = '1';
    }, 150);

    // Actualizar dots
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('activo', i === indiceActual);
        });

    // Actualizar thumbnails
        document.querySelectorAll('.miniaturaProducto').forEach((thumb, i) => {
        thumb.classList.toggle('activo', i === indiceActual);
    });
    }

function generarMiniaturas() {
    const contenedor = document.getElementById('miniatura-producto');
    contenedor.innerHTML = '';
    imagenesActuales.forEach((img, i) => {
        const miniatura = document.createElement('img');
        miniatura.src = '/img/' + img;
        miniatura.classList.add('miniaturaProducto');
        if (i === 0) miniatura.classList.add('activo');
        miniatura.onclick = () => { indiceActual = i; actualizarFoto(); };
        contenedor.appendChild(miniatura);
    });
}

function generarDots() {
    const contenedor = document.getElementById('slider-dots');
    contenedor.innerHTML = '';
    imagenesActuales.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('activo');
        dot.onclick = () => { indiceActual = i; actualizarFoto(); };
        contenedor.appendChild(dot);
    });
}

function agregarAlCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    const nombre = document.getElementById('panelNombre').textContent;
    const puntos = parseInt(document.getElementById('panelPuntos').textContent);

    const existe = carrito.find(item => item.nombre === nombre);
    if (existe) {
        existe.cantidad += 1;
    } else {
        carrito.push({
            nombre: nombre,
            puntos: puntos,
            imagen: imagenesActuales[0],
            cantidad: 1
        });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarBadge();

    // Feedback visual
    const btn = document.querySelector('.btn-carrito');
    btn.textContent = '✓ Agregado!';
    btn.style.backgroundColor = '#1abc9c';
    setTimeout(() => {
        btn.textContent = 'Agregar al Carrito';
        btn.style.backgroundColor = '';
    }, 1500);
}

function actualizarBadge() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const badge = document.querySelector('.cart-badge');
    if (badge) badge.textContent = total;
}

// Al cargar la página actualizamos el badge
actualizarBadge();