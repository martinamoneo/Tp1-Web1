let imagenesActuales = [];
let indiceActual = 0;
let productoIdPanel = null;
let sugeridosActuales = [];

function abrirPanelDesdeElemento(elem) {
    const p = JSON.parse(decodeURIComponent(elem.dataset.producto));
    abrirPanel(p.id, p.nombre, p.puntos, p.imagenes, p.descripcionCorta || p.descripcion || '', p.stock, p.categoria || '');
}

function abrirPanel(productId, nombre, puntos, imagenes, descripcion, stock, categoria) {
    if (typeof imagenes === 'string') {
        imagenes = JSON.parse(imagenes.replace(/&quot;/g, '"'));
    }

    productoIdPanel = productId;
    imagenesActuales = imagenes;
    indiceActual = 0;

    const catElem = document.getElementById('panelCategoria');
    if(catElem) catElem.textContent = categoria || '';
    
    document.getElementById('panelNombre').textContent = nombre;
    document.getElementById('panelPuntos').textContent = puntos + ' PUNTOS';
    document.getElementById('panelDescripcion').textContent = descripcion;

    const linkElem = document.getElementById('panelDetalleLink');
    if(linkElem) linkElem.href = '/product/' + productId;

    const inputCant = document.getElementById('panelCantidad');
    if(inputCant) inputCant.value = stock > 0 ? 1 : 0;

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

    const panel = document.getElementById('panelProducto');
    panel.classList.add('activo');
}

function cerrarPanel() {
    document.getElementById('panelProducto').classList.remove('activo');
}

function actualizarFoto() {
    const img = document.getElementById('panelImagen');
    img.style.opacity = '0';
    setTimeout(() => {
        img.src = '/img/' + imagenesActuales[indiceActual];
        img.style.opacity = '1';
    }, 150);
}

function cambiarCantidadPanel(delta) {
    const input = document.getElementById('panelCantidad');
    if (!input) return;
    let val = parseInt(input.value) || 1;
    val += delta;
    if (val < 1) val = 1;
    input.value = val;
}

function agregarAlCarrito() {
    if (productoIdPanel == null) return;

    const btn = document.getElementById('btnAgregarCarrito');
    const textoOriginal = btn.textContent;
    
    const inputCant = document.getElementById('panelCantidad');
    const cantidad = inputCant ? parseInt(inputCant.value) || 1 : 1;

    fetch('/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'productId=' + encodeURIComponent(productoIdPanel) + '&cantidad=' + encodeURIComponent(cantidad)
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
                badge.textContent = cantidadActual + cantidad;
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
