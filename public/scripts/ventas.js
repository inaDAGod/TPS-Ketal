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

