<?php
    $json = file_get_contents('php://input');
    $data = json_decode($json);
    $nit = $data->nit;
    $nombre = $data->nombre;
    $fecha = $data->fecha;
    $empleado = $data->empleado;
    $productos = $data->productos;
    echo $json;
?>