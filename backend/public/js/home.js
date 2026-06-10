function abrirPanelDesdeBanner(tipo) {
    const productos = window.listaProductosGlobal;
    if (!productos || !productos.length) return;

    let producto;
    if (tipo === 'novedades') {
        producto = productos.find((p) => p.esNovedad) || productos[0];
    } else if (tipo === 'proximos') {
        producto = productos.find((p) => p.esProximo) || productos[productos.length - 1];
    }

    if (producto) {
        abrirPanel(
            producto.id,
            producto.nombre,
            producto.puntos,
            producto.imagenes,
            producto.descripcion,
            producto.stock,
            producto.categoria
        );
    }
}



/* CARRUSEL HORIZONTAL */
function scrollCarousel(direction, trackId) {
    const track = document.getElementById(trackId);
    if (!track) return;
    
    // Desplaza exactamente el 100% del contenedor visible para avanzar una "página" entera (5 tarjetas)
    const scrollAmount = 253; 
    track.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}