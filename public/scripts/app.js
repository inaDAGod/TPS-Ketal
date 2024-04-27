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
        .then(data => {
            // Obtiene el cuerpo de la tabla HTML
            const tablaVentasBody = document.querySelector('#tabla-ventas tbody');

            // Limpia cualquier contenido existente en el cuerpo de la tabla
            tablaVentasBody.innerHTML = '';

            // Itera sobre cada venta y crea una fila en la tabla para cada una
            data.ventas.forEach(venta => {
                const fila = document.createElement('tr');
                // Inserta los datos de la venta en la fila
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

function todo(){
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
        .then(data => {
            // Obtiene el cuerpo de la tabla HTML
            const tablaVentasBody = document.querySelector('#tabla-ventas tbody');

            // Limpia cualquier contenido existente en el cuerpo de la tabla
            tablaVentasBody.innerHTML = '';

            // Itera sobre cada venta y crea una fila en la tabla para cada una
            data.ventas.forEach(venta => {
                const fila = document.createElement('tr');
                // Inserta los datos de la venta en la fila
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
}

function filtrar() {
    // Obtener las fechas de inicio y fin
    const fechaInicio = document.getElementById('fechaInicio').value;
    const fechaFin = document.getElementById('fechaFin').value;

    // Verificar que se hayan seleccionado ambas fechas
    if (fechaInicio && fechaFin) {
        const url = 'http://localhost/TPS-Ketal/public/php/filtrarVentas.php';

        // Realizar la solicitud al servidor para filtrar las ventas por fechas
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fechaInicio: fechaInicio, fechaFin: fechaFin })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta de la red: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Actualizar la tabla de ventas con los datos filtrados
            const tablaVentasBody = document.querySelector('#tabla-ventas tbody');
            tablaVentasBody.innerHTML = '';

            data.ventas.forEach(venta => {
                const fila = document.createElement('tr');
                // Inserta los datos de la venta en la fila
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
            console.error('Error al filtrar los datos de ventas:', error);
        });
    } else {
        alert('Por favor, seleccione una fecha de inicio y una fecha de fin.');
    }
}
