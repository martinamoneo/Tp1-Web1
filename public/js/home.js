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
            producto.descripcion
        );
    }
}

/* PRODUCTOS SUGERIDOS */
    const productosSugeridos = productosSugeridosData;
    let indiceSugerido = 0;

    function mostrarSugerido(indice) {
        const p = productosSugeridos[indice];
        const img = document.getElementById('sugeridoImg');
        const card = document.getElementById('sugeridoCard');

        card.style.opacity = '0';
        setTimeout(() => {
            img.src = '/img/' + p.imagen;
            document.getElementById('sugeridoNombre').textContent = p.nombre;
            document.getElementById('sugeridoPuntos').textContent = p.puntos;
            document.getElementById('sugeridoDescripcion').textContent = p.descripcion;
            card.style.opacity = '1';
        }, 150);

        document.querySelectorAll('.sugerido-dot').forEach((dot, i) => {
            dot.classList.toggle('activo', i === indice);
        });
    }

    function moverSugeridos(direccion) {
        indiceSugerido += direccion;
        if (indiceSugerido < 0) indiceSugerido = productosSugeridos.length - 1;
        if (indiceSugerido >= productosSugeridos.length) indiceSugerido = 0;
        mostrarSugerido(indiceSugerido);
    }

    const dotsSugeridos = document.getElementById('sugeridosDots');
    productosSugeridos.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.classList.add('sugerido-dot');
        if (i === 0) dot.classList.add('activo');
        dot.onclick = () => { indiceSugerido = i; mostrarSugerido(i); };
        dotsSugeridos.appendChild(dot);
    });

    mostrarSugerido(0);

/* CARRUSEL HORIZONTAL */
function scrollCarousel(direction, trackId) {
    const track = document.getElementById(trackId);
    if (!track) return;
    
    // Desplaza exactamente el 100% del contenedor visible para avanzar una "página" entera (5 tarjetas)
    const scrollAmount = 253; 
    track.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}