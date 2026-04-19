window.addEventListener('load', () => {
    if (typeof actualizarBadge === 'function') {
        actualizarBadge();
    }
});

function abrirPanelDesdeBanner(tipo) {
    const productos = window.listaProductosGlobal;
    if (!productos || !productos.length) return;

    let producto;
    if (tipo === 'novedades') {
        producto = productos.find(p => p.esNovedad) || productos[0];
    } else if (tipo === 'proximos') {
        producto = productos.find(p => p.esProximo) || productos[productos.length - 1];
    }

    if (producto) {
        abrirPanel(
            producto.nombre,
            producto.puntos,
            producto.imagenes,
            producto.descripcion
        );
    }
}