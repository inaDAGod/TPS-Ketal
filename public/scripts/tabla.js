// Datos de ejemplo que podrían venir de una base de datos o una API
var usuarios = [
    { codigo: '001', nombre: 'Juan Pérez', id: 'JP123', contraseña: 'contraseña123' },
    { codigo: '002', nombre: 'Maria López', id: 'ML456', contraseña: 'pass456' },
    // Más usuarios...
  ];
  
  // Función para crear un botón con un ícono de Font Awesome
  function crearBoton(icono) {
    var boton = document.createElement('button');
    boton.className = 'btn btn-secondary';
    var icon = document.createElement('i');
    icon.className = 'fa ' + icono;
    boton.appendChild(icon);
    return boton;
  }
  
  // Función para agregar una fila a la tabla
  function agregarFila(usuario) {
    var fila = document.createElement('tr');
    
    // Celda de opciones con botones
    var celdaOpciones = document.createElement('td');
    var grupoBotones = document.createElement('div');
    grupoBotones.className = 'btn-group';
    grupoBotones.setAttribute('role', 'group');
    grupoBotones.setAttribute('aria-label', 'Opciones');
    grupoBotones.appendChild(crearBoton('fa-edit'));
    grupoBotones.appendChild(crearBoton('fa-save'));
    grupoBotones.appendChild(crearBoton('fa-trash'));
    celdaOpciones.appendChild(grupoBotones);
    fila.appendChild(celdaOpciones);
    
    // Celda de código
    var celdaCodigo = document.createElement('td');
    celdaCodigo.textContent = usuario.codigo;
    fila.appendChild(celdaCodigo);
    
    // Celda de nombre
    var celdaNombre = document.createElement('td');
    celdaNombre.textContent = usuario.nombre;
    fila.appendChild(celdaNombre);
    
    // Celda de ID
    var celdaID = document.createElement('td');
    celdaID.textContent = usuario.id;
    fila.appendChild(celdaID);
    
    // Celda de contraseña
    var celdaContraseña = document.createElement('td');
    celdaContraseña.textContent = usuario.contraseña;
    fila.appendChild(celdaContraseña);
    
    // Agregar la fila a la tabla
    document.getElementById('tablaUsuarios').appendChild(fila);
  }
  
  // Agregar todas las filas al cargar la página
  document.addEventListener('DOMContentLoaded', function() {
    usuarios.forEach(agregarFila);
  });
  