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
            id: parseInt(id),
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
    let nit = parseInt( document.getElementById('nit').value);
    let nombre = document.getElementById('nombre').value;
    let fecha = document.getElementById('fecha').textContent;
    let empleado = parseInt(document.getElementById('empleado').textContent);
    let select = document.getElementById('tipo_pago');
    var tipo_pago = select.value;

    console.log("Fecha:", fecha);
    console.log("NIT:", nit);
    console.log("Tipo Pago:", tipo_pago);
    console.log("Nombre:", nombre);
    console.log("Detalles del producto:", productos);

    fetch("http://localhost/TPS-Ketal/public/php/registrarVenta.php", {
        method: "POST",
        body: JSON.stringify({ nit: nit, nombre: nombre, fecha: fecha, empleado: empleado, tipo_pago: tipo_pago, productos: productos }),
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error al registrar la venta');
        }
    })
    .then(data => {
        console.log(data);
        alert('Venta registrada correctamente. ID de venta: ' + data.id_venta);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al registrar la venta');
    });
}

document.addEventListener("DOMContentLoaded", function() {
  var botonBuscarCliente = document.getElementById('buscarCliente');
  var inputNit = document.getElementById('nit');
  var inputNombre = document.getElementById('nombre');

  botonBuscarCliente.addEventListener('click', function() {
      var nitCliente = inputNit.value.trim(); // Obtener el valor del NIT
      nitCliente = parseInt(nitCliente);
      if (nitCliente !== '') {
          // Realizar la solicitud al servidor
          fetch('http://localhost/TPS-Ketal/public/php/busquedaVentas.php', { // Cambiado a 'busquedaVentas.php' según tu archivo PHP
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ nit_cliente: nitCliente })
          })
          .then(response => response.json())
          .then(data => {
              if (data.estado === 'encontrado') {
                  // Autocompletar el campo de nombre
                  inputNombre.value = data.nombre;
              } else {
                  alert('Cliente no encontrado');
                  inputNombre.value = ''; // Limpiar el campo de nombre si el cliente no se encuentra
              }
          })
          .catch(error => console.error('Error:', error));
      } else {
          alert('Ingrese un NIT válido');
      }
  });
});


