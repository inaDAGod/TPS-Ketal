<?php
$json = file_get_contents('php://input');
$data = json_decode($json);

$nit = $data->nit;
$nombre = $data->nombre;
$fecha = $data->fecha;
$empleado = $data->empleado;
$tipo_pago = $data->tipo_pago;
$productos = $data->productos;

$conexion = pg_connect("dbname=ketal user=postgres password=admin");
if (!$conexion) {
    die(json_encode(["estado" => "error_conexion"]));
}

pg_query($conexion, "BEGIN");

// Verificar si el cliente ya existe en la tabla clientes
$sql_verificar_cliente = "SELECT * FROM cliente WHERE nit_cliente = $1";
$resultado_verificar_cliente = pg_query_params($conexion, $sql_verificar_cliente, array($nit));
if (!$resultado_verificar_cliente) {
    pg_query($conexion, "ROLLBACK");
    die(json_encode(["estado" => "error_verificar_cliente"]));
}

if (pg_num_rows($resultado_verificar_cliente) == 0) {
    // Si el cliente no existe, insertarlo en la tabla clientes
    $sql_insertar_cliente = "INSERT INTO cliente (nit_cliente, nombre) VALUES ($1, $2)";
    $resultado_insertar_cliente = pg_query_params($conexion, $sql_insertar_cliente, array($nit, $nombre));
    if (!$resultado_insertar_cliente) {
        pg_query($conexion, "ROLLBACK");
        die(json_encode(["estado" => "error_insertar_cliente"]));
    }
}

// Insertar la venta en la tabla ventas
$sql_venta = "INSERT INTO ventas (id_empleado, nit_cliente, tipo_pago, fecha_venta) VALUES ($empleado, $nit, '$tipo_pago', '$fecha') RETURNING id_venta";
$resultado_venta = pg_query($conexion, $sql_venta);
if (!$resultado_venta) {
    pg_query($conexion, "ROLLBACK");
    die(json_encode(["estado" => "error_insertar_venta"]));
}

$id_venta = pg_fetch_result($resultado_venta, 0);

$total_venta = 0;

foreach ($productos as $producto) {
    $id_producto = $producto->id;
    $cantidad = $producto->cantidad;

    // Obtener el precio unitario del producto
    $sql_precio = "SELECT sum(precio_unitario) FROM productos WHERE id_producto = $id_producto";
    $resultado_precio = pg_query($conexion, $sql_precio);
    if (!$resultado_precio) {
        pg_query($conexion, "ROLLBACK");
        die(json_encode(["estado" => "error_obtener_precio"]));
    }
    $precio_unitario = pg_fetch_result($resultado_precio, 0);
    $precio_unitario = floatval($precio_unitario);
    $cantidad = floatval($cantidad);
    
    $subtotal = $precio_unitario * $cantidad;

    // Sumar el subtotal al total_venta
    $total_venta += $subtotal;

    $sql_detalle = "INSERT INTO ventas_productos (id_venta, id_producto, cantidad, subtotal) VALUES ($id_venta, $id_producto, $cantidad, $subtotal)";
    $resultado_detalle = pg_query($conexion, $sql_detalle);
    if (!$resultado_detalle) {
        pg_query($conexion, "ROLLBACK");
        die(json_encode(["estado" => "error_insertar_detalle"]));
    }
}

// Actualizar el total de la venta en la tabla ventas
$sql_actualizar_total = "UPDATE ventas SET total = $total_venta WHERE id_venta = $id_venta";
$resultado_actualizar_total = pg_query($conexion, $sql_actualizar_total);
if (!$resultado_actualizar_total) {
    pg_query($conexion, "ROLLBACK");
    die(json_encode(["estado" => "error_actualizar_total"]));
}

pg_query($conexion, "COMMIT");

pg_close($conexion);

echo json_encode(["estado" => "venta_registrada_correctamente", "id_venta" => $id_venta, "total" => $total_venta ]);
?>
