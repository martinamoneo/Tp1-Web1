let imagenesActuales = [];
let indiceActual = 0;
let productoIdPanel = null;

function abrirPanel(productId, nombre, puntos, imagenes, descripcion) {
    if (typeof imagenes === 'string') {
        imagenes = JSON.parse(imagenes.replace(/&quot;/g, '"'));
    }

    productoIdPanel = productId;
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

    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('activo', i === indiceActual);
    });

    document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
        thumb.classList.toggle('activo', i === indiceActual);
    });
}

function generarMiniaturas() {
    const contenedor = document.getElementById('panel-thumbnails');
    if (!contenedor) return;
    contenedor.innerHTML = '';
    imagenesActuales.forEach((img, i) => {
        const miniatura = document.createElement('img');
        miniatura.src = '/img/' + img;
        miniatura.classList.add('thumbnail');
        if (i === 0) miniatura.classList.add('activo');
        miniatura.onclick = () => {
            indiceActual = i;
            actualizarFoto();
        };
        contenedor.appendChild(miniatura);
    });
}

function generarDots() {
    const contenedor = document.getElementById('slider-dots');
    if (!contenedor) return;
    contenedor.innerHTML = '';
    imagenesActuales.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('activo');
        dot.onclick = () => {
            indiceActual = i;
            actualizarFoto();
        };
        contenedor.appendChild(dot);
    });
}

function agregarAlCarrito() {
    if (productoIdPanel == null) return;

    const btn = document.querySelector('.btn-carrito');
    const textoOriginal = btn.textContent;

    fetch('/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'productId=' + encodeURIComponent(productoIdPanel)
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            btn.textContent = '✓ Agregado';
            btn.disabled = true;
            
            // Actualizar el contador del carrito en el header
            const badge = document.getElementById('cart-badge');
            if (badge) {
                const cantidadActual = parseInt(badge.textContent) || 0;
                badge.textContent = cantidadActual + 1;
            }
            
            setTimeout(() => {
                btn.textContent = textoOriginal;
                btn.disabled = false;
            }, 1000);
        }
    });
}