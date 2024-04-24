var productos = [];

document.addEventListener("DOMContentLoaded", function() {
    var fechaActual = new Date();

    var dia = fechaActual.getDate();
    var mes = fechaActual.getMonth() + 1; 
    var anio = fechaActual.getFullYear();

    if (dia < 10) {
        dia = '0' + dia;
    }
    if (mes < 10) {
        mes = '0' + mes;
    }

    var fechaFormateada = dia + '/' + mes + '/' + anio;

    document.getElementById('fecha').textContent = fechaFormateada;

    var botonAgregar = document.getElementById('agregarProducto');
    var divProductos = document.getElementById('divProductos');

    botonAgregar.addEventListener('click', function() {
        let id = document.getElementById('productoId').value;

        // Crear un nuevo div
        var nuevoDiv = document.createElement('div');
        nuevoDiv.classList.add('producto');

        nuevoDiv.innerHTML = `
            <h4>${id}</h4>
            <label for="cantidad">Cantidad:</label>
            <input class="cantidad" type="number" name="cantidades" required>
        `;

        divProductos.appendChild(nuevoDiv);

        productos.push({
            id: id,
            cantidad: 1
        });

      
        var inputsCantidad = document.querySelectorAll('.cantidad');
        inputsCantidad.forEach(function(input, index) {
            input.addEventListener('change', function() {
                productos[index].cantidad = parseInt(input.value); 
            });
        });
    });
});

function registrarVenta() {
    let nit = document.getElementById('nit').value;
    let nombre = document.getElementById('nombre').value;
    let fecha = document.getElementById('fecha').textContent;
    let empleado = document.getElementById('empleado').textContent;

    console.log("Fecha:", fecha);
    console.log("NIT:", nit);
    console.log("Nombre:", nombre);
    console.log("Detalles del producto:", productos);

    fetch("http://localhost/TPS-Ketal/public/php/registrarVenta.php",{
      method: "POST",
      body: JSON.stringify({ nit: nit, nombre: nombre, fecha: fecha,empleado:empleado, productos: productos }),
    });
}
