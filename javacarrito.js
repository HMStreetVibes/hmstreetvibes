const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function agregarAlCarrito() {
    const botonesTalla = document.querySelectorAll('.tallas button');
    let tallaSeleccionada = null;

    botonesTalla.forEach(boton => {
        if (boton.classList.contains('seleccionada')) {
            tallaSeleccionada = boton.innerText;
        }
    });

    if (!tallaSeleccionada) {
        alert("Por favor, selecciona una talla antes de agregar al carrito.");
        return;
    }

    const producto = {
        id: 1, 
        nombre: "T-Shirt Hypemode Cartoon",
        precio: 159.90,
        talla: tallaSeleccionada,
        estado: null 
    };

    const existe = carrito.find(item => item.id === producto.id && item.talla === producto.talla);

    if (existe) {
        alert("Este producto ya está en el carrito con la misma talla.");
    } else {
        carrito.push(producto);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        alert("Producto agregado al carrito.");
    }
}

function mostrarCarrito() {
    const carritoContenido = document.getElementById('carrito-contenido');
    const totalElemento = document.getElementById('total');
    carritoContenido.innerHTML = '';
    let total = 0;

    carrito.forEach((producto, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'carrito-item';
        itemDiv.innerHTML = `
            <input type="checkbox" id="producto-${index}" class="checkbox-producto" ${producto.estado ? 'disabled' : ''}>
            <p>${producto.nombre} (Talla: ${producto.talla})</p>
            <p>$${producto.precio.toFixed(2)} MXN</p>
            ${producto.estado ? `<p class="en-proceso">En proceso de compra</p>` : ''}
            ${producto.estado ? `<button class="disabled" onclick="cancelarCompra(${index})" disabled>Cancelar Compra</button>` : 
            `<button onclick="eliminarProducto(${index})">Eliminar</button>`}
        `;
        carritoContenido.appendChild(itemDiv);
        total += producto.precio;
    });

    totalElemento.textContent = `Total: $${total.toFixed(2)} MXN`;

    if (carrito.length === 0) {
        carritoContenido.innerHTML = '<p>El carrito está vacío.</p>';
        totalElemento.textContent = 'Total: $0.00 MXN';
    }
}

function eliminarProducto(index) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    if (!carrito[index].estado) {
        carrito.splice(index, 1);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito();
    }
}

function vaciarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoFiltrado = carrito.filter(producto => producto.estado);
    localStorage.setItem('carrito', JSON.stringify(carritoFiltrado));
    mostrarCarrito();
}

function comprarSeleccionados() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const productosSeleccionados = [];
    const checkboxes = document.querySelectorAll('.checkbox-producto');

    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked && !carrito[index].estado) {
            productosSeleccionados.push(carrito[index]);
            carrito[index].estado = "En proceso de compra";
        }
    });

    if (productosSeleccionados.length > 0) {
        localStorage.setItem('carrito', JSON.stringify(carrito)); 
        alert('Los siguientes productos están en proceso de compra: ' + productosSeleccionados.map(p => p.nombre).join(', '));
        mostrarCarrito();
    } else {
        alert('No has seleccionado productos para comprar');
    }
}

let productoCancelar = null;

function cancelarCompra(index) {
    productoCancelar = index; 
    document.getElementById('popup-cancelar').style.display = 'flex';
}

function cerrarPopup() {
    document.getElementById('popup-cancelar').style.display = 'none';
    productoCancelar = null;
}

function cancelarCompraConfirmada() {
    if (productoCancelar !== null) {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito[productoCancelar].estado = null; 
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito();
        cerrarPopup();
    }
}

mostrarCarrito();

document.querySelector('.btn-compra').addEventListener('click', comprarSeleccionados);
