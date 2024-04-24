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
