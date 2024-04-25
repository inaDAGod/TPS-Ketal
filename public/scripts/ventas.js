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
});

document.addEventListener("DOMContentLoaded", function() {
  var botonAgregar = document.getElementById('agregarProducto');
  var divProductos = document.getElementById('divProductos');

  botonAgregar.addEventListener('click', function() {
      // Crear un nuevo div
      var nuevoDiv = document.createElement('div');
      nuevoDiv.classList.add('producto');

      // Agregar contenido al nuevo div
      nuevoDiv.innerHTML = `
          <h4>Nombre del producto</h4>
          <label for="cantidad">Cantidad:</label>
          <input class="cantidad" type="number" name="cantidades" required>
      `;

      // Añadir el nuevo div como hijo del divProductos
      divProductos.appendChild(nuevoDiv);
  });
});

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

