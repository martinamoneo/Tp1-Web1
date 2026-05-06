function cambiarImagenProducto(imgSrc, element) {
    document.getElementById('imagenPrincipalProducto').src = '/img/' + imgSrc;
    document.querySelectorAll('.thumb-img').forEach(t => t.classList.remove('activo'));
    element.classList.add('activo');
}

function cambiarCantidadProducto(delta) {
    if (typeof stockActual === 'undefined' || stockActual === 0) return;
    const input = document.getElementById('productoCantidad');
    let val = parseInt(input.value) || 1;
    val += delta;
    if (val < 1) val = 1;
    if (val > stockActual) val = stockActual;
    input.value = val;
}

function agregarAlCarritoProducto(productId) {
    if (typeof stockActual === 'undefined' || stockActual === 0) return;
    const btn = document.getElementById('btnAgregarProducto');
    const originalText = btn.textContent.trim();
    const cantidad = parseInt(document.getElementById('productoCantidad').value) || 1;

    fetch('/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'productId=' + encodeURIComponent(productId) + '&cantidad=' + encodeURIComponent(cantidad)
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            btn.textContent = '✓ AGREGADO';
            btn.disabled = true;
            btn.style.backgroundColor = '#1abc9c';

            const badge = document.getElementById('cart-badge');
            if (badge) {
                const cantidadActual = parseInt(badge.textContent) || 0;
                badge.textContent = cantidadActual + cantidad;
            }

            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
                btn.style.backgroundColor = '';
            }, 1000);
        } else {
            btn.textContent = 'SIN STOCK';
            btn.disabled = true;
            btn.style.backgroundColor = '#e74c3c';
            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
                btn.style.backgroundColor = '';
            }, 1500);
        }
    });
}
