let imagenesActuales = [];
let indiceActual = 0;
let productoIdPanel = null;
let sugeridosActuales = [];

function abrirPanel(productId, nombre, puntos, imagenes, descripcion, stock) {
    if (typeof imagenes === 'string') {
        imagenes = JSON.parse(imagenes.replace(/&quot;/g, '"'));
    }

    productoIdPanel = productId;
    imagenesActuales = imagenes;
    indiceActual = 0;

    document.getElementById('panelNombre').textContent = nombre;
    document.getElementById('panelPuntos').textContent = puntos;
    document.getElementById('panelDescripcion').textContent = descripcion;

    // Manejar stock
    const btn = document.getElementById('btnAgregarCarrito');
    if (btn){
    if (stock === 0) {
        btn.textContent = 'Sin stock';
        btn.disabled = true;
        btn.style.backgroundColor = '#aaa';
        btn.style.cursor = 'not-allowed';
    } else {
        btn.textContent = 'Agregar al Carrito';
        btn.disabled = false;
        btn.style.backgroundColor = '';
        btn.style.cursor = '';
    }}

    actualizarFoto();
    generarDots();
    generarMiniaturas();
    generarSugeridos(productId);

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

    const btn = document.getElementById('btnAgregarCarrito');
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
            btn.style.backgroundColor = '#1abc9c';

            const badge = document.getElementById('cart-badge');
            if (badge) {
                const cantidadActual = parseInt(badge.textContent) || 0;
                badge.textContent = cantidadActual + 1;
            }

            setTimeout(() => {
                btn.textContent = textoOriginal;
                btn.disabled = false;
                btn.style.backgroundColor = '';
            }, 1000);

        } else {
            // Sin stock suficiente
            btn.textContent = '¡Sin stock suficiente!';
            btn.disabled = true;
            btn.style.backgroundColor = '#e74c3c';

            setTimeout(() => {
                btn.textContent = textoOriginal;
                btn.disabled = false;
                btn.style.backgroundColor = '';
            }, 1500);
        }
    });
}

function generarSugeridos(productoActualId) {
    const contenedor = document.getElementById('panelSugeridosGrid');
    if (!contenedor) return;

    let todos = window.listaProductosGlobal || [];
    if (typeof todos === 'string') {
        try { todos = JSON.parse(todos); } catch(e) { return; }
    }

    // Solo regeneramos si cambió el producto principal
    const yaGenerados = sugeridosActuales.some(p => p.id == productoActualId);
    if (!yaGenerados) {
        sugeridosActuales = todos
            .filter(p => p.id != productoActualId)
            .sort(() => 0.5 - Math.random())
            .slice(0, 4);
    }

    contenedor.innerHTML = '';
    sugeridosActuales.forEach(p => {
        const card = document.createElement('div');
        card.classList.add('panel-sugerido-card');
        card.innerHTML = `
            <img src="/img/${p.imagenes[0]}" alt="${p.nombre}" onerror="this.onerror=null;this.src='/img/no-image.png'">
            <p class="panel-sugerido-nombre">${p.nombre}</p>
            <p class="panel-sugerido-puntos">${p.puntos} PUNTOS</p>
        `;
        card.onclick = () => abrirPanel(p.id, p.nombre, p.puntos, p.imagenes, p.descripcion, p.stock);
        contenedor.appendChild(card);
    });
}