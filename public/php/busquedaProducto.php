<?php
header('Content-Type: application/json');

$json = file_get_contents('php://input');
$data = json_decode($json);

$id_producto = $data->id_producto;
$conexion = pg_connect("dbname=ketal user=postgres password=admin");

if (!$conexion) {
    die(json_encode(["estado" => "error_conexion"]));
}
// Consulta SQL para buscar el producto por ID y obtener su nombre y precio unitario
$query = "SELECT nombre, precio_unitario FROM productos WHERE id_producto = '$id_producto'";
$result = pg_query($conexion, $query);

if ($result) {
    if (pg_num_rows($result) > 0) {
        $row = pg_fetch_assoc($result);
        $nombre_producto = $row['nombre'];
        $precio_unitario = $row['precio_unitario'];
        echo json_encode(["estado" => "encontrado", "nombre" => $nombre_producto, "precio_unitario" => $precio_unitario]);
    } else {
        echo json_encode(["estado" => "no_encontrado"]);
    }
} else {
    echo json_encode(["estado" => "error_consulta"]);
}

pg_close($conexion);

?>


