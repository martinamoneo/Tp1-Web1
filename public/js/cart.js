// Cargamos el carrito desde localStorage
let carrito = JSON.parse(localStorage.getItem('carrito')) || []; // Usamos 'let' para poder modificarlo

function actualizarBadgeHeader() {
    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const badge = document.querySelector('.cart-badge');
    if (badge) {
        badge.textContent = totalItems;
    }
}

function renderCarrito() {
    const contenedor = document.getElementById('cart-items');
    const cartVacio = document.getElementById('cart-vacio');
    const cartContenido = document.getElementById('cart-contenido');

    if (carrito.length === 0) {
        cartVacio.style.display = 'flex';
        cartContenido.style.display = 'none';
        return;
    }

    cartVacio.style.display = 'none';
    cartContenido.style.display = 'block';

    contenedor.innerHTML = '';
    let total = 0;

    carrito.forEach((item, index) => {
        total += item.puntos * item.cantidad;
        contenedor.innerHTML += `
            <div class="cart-item">
                <img src="/img/${item.imagen}" alt="${item.nombre}">
                <div class="cart-item-info">
                    <h4>${item.nombre}</h4>
                    <p>${item.puntos} PUNTOS</p>
                </div>
                <div class="cart-item-cantidad">
                    <button onclick="cambiarCantidad(${index}, -1)">➖</button>
                    <span>${item.cantidad}</span>
                    <button onclick="cambiarCantidad(${index}, 1)">➕</button>
                </div>
                <p class="cart-item-subtotal">${item.puntos * item.cantidad} PUNTOS</p>
            </div>
        `;
    });

    document.getElementById('cart-total-puntos').textContent = total + ' PUNTOS';
}

function cambiarCantidad(index, valor) {
    carrito[index].cantidad += valor;
    
    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
    }
    
    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    renderCarrito();         // Actualiza la lista en pantalla
    actualizarBadgeHeader(); // ¡ESTO es lo que te faltaba!
}

// Ejecutamos ambas al cargar la página por primera vez
renderCarrito();
actualizarBadgeHeader();