<?php
header('Content-Type: application/json');

$json = file_get_contents('php://input');
$data = json_decode($json);

$nit_cliente = $data->nit_cliente;
$conexion = pg_connect("dbname=ketal user=postgres password=admin");

if (!$conexion) {
    die(json_encode(["estado" => "error_conexion"]));
}

// Consulta SQL para buscar el cliente por NIT
$query = "SELECT nombre FROM cliente WHERE nit_cliente = '$nit_cliente'";
$result = pg_query($conexion, $query);

if ($result) {
    if (pg_num_rows($result) > 0) {
        $row = pg_fetch_assoc($result);
        $nombre_cliente = $row['nombre'];
        echo json_encode(["estado" => "encontrado", "nombre" => $nombre_cliente]);
    } else {
        echo json_encode(["estado" => "no_encontrado"]);
    }
} else {
    echo json_encode(["estado" => "error_consulta"]);
}

pg_close($conexion);
?>
