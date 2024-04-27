<?php
header('Content-Type: application/json');

// Establecer la conexión con la base de datos
$conexion = pg_connect("dbname=ketal user=postgres password=admin");

if (!$conexion) {
    die(json_encode(["error" => "error_conexion"]));
}

// Consulta SQL para obtener los datos de la tabla "ventas"
$query = "SELECT id_venta, id_empleado, nit_cliente, tipo_pago, fecha_venta, total FROM ventas";
$resultado = pg_query($conexion, $query);

if (!$resultado) {
    // Error si la consulta falla
    echo json_encode(["error" => "Error en la consulta: " . pg_last_error()]);
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
?>
