document.addEventListener('DOMContentLoaded', function() {
    // Define la ruta al script PHP que devuelve los datos en formato JSON
    const url = 'http://localhost/TPS-Ketal/public/php/obtener_ventas.php';

    // Realiza la solicitud al servidor para obtener los datos
    fetch(url)
        .then(response => {
            // Si la respuesta no es exitosa, lanza un error
            if (!response.ok) {
                throw new Error('Error en la respuesta de la red: ' + response.statusText);
            }
            // Convierte la respuesta en JSON
            return response.json();
        })
        .then(datosVentas => {
            // Obtiene el cuerpo de la tabla HTML
            const tablaVentasBody = document.querySelector('#tabla-ventas tbody');

            // Limpia cualquier contenido existente en el cuerpo de la tabla
            tablaVentasBody.innerHTML = '';

            // Itera sobre cada venta y crea una fila en la tabla para cada una
            datosVentas.forEach(venta => {
                const fila = document.createElement('tr');

                fila.innerHTML = `
                    <td>${venta.id_venta}</td>
                    <td>${venta.id_empleado}</td>
                    <td>${venta.nit_cliente}</td>
                    <td>${venta.tipo_pago}</td>
                    <td>${venta.fecha_venta}</td>
                    <td>${venta.total}</td>
                `;

                // Añade la fila al cuerpo de la tabla
                tablaVentasBody.appendChild(fila);
            });
        })
        .catch(error => {
            // Maneja cualquier error que ocurra durante la solicitud o procesamiento de los datos
            console.error('Error al cargar los datos de ventas:', error);
            // Podrías actualizar la interfaz de usuario aquí para reflejar que ocurrió un error
        });
});
