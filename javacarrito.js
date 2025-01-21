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
        id: 1, // Cambia este ID por el que corresponda al producto
        nombre: "T-Shirt Hypemode Cartoon",
        precio: 159.90,
        talla: tallaSeleccionada,
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

document.querySelectorAll('.tallas button').forEach(boton => {
    boton.addEventListener('click', function () {
        document.querySelectorAll('.tallas button').forEach(b => b.classList.remove('seleccionada'));

        this.classList.add('seleccionada');
    });
});
