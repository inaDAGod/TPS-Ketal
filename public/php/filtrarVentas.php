<?php
header('Content-Type: application/json');

// Obtener los datos JSON enviados desde JavaScript
$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);

// Establecer la conexión con la base de datos
$conexion = pg_connect("dbname=ketal user=postgres password=admin");

if (!$conexion) {
    die(json_encode(["error" => "Error de conexión a la base de datos"]));
}

// Verificar si se recibieron las fechas de inicio y fin
if (isset($data['fechaInicio']) && isset($data['fechaFin'])) {
    // Obtener las fechas de inicio y fin del formulario
    $fechaInicio = $data['fechaInicio'];
    $fechaFin = $data['fechaFin'];

    // Consulta SQL para obtener las ventas dentro del rango de fechas
    $query = "SELECT id_venta, id_empleado, nit_cliente, tipo_pago, fecha_venta, total FROM ventas WHERE fecha_venta BETWEEN $1 AND $2";
    $params = array($fechaInicio, $fechaFin);
    $resultado = pg_query_params($conexion, $query, $params);

    if (!$resultado) {
        // Error si la consulta falla
        echo json_encode(["error" => "Error en la consulta: " . pg_last_error($conexion)]);
        exit;
    }

    // Obtener los resultados de la consulta como un array asociativo
    $ventas = pg_fetch_all($resultado);

    // Convertir el campo "total" a números
    foreach ($ventas as &$venta) {
        $venta['total'] = floatval(str_replace(',', '.', $venta['total']));
    }

    // Cerrar la conexión a la base de datos
    pg_close($conexion);

    // Devolver los datos en formato JSON
    echo json_encode(["ventas" => $ventas]);
} else {
    // Si no se recibieron las fechas del formulario, devolver un mensaje de error
    echo json_encode(["error" => "No se recibieron fechas para filtrar"]);
}
?>
