<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tabla de Usuario</title>
</head>
<body>
    <h1>Tabla de Registro</h1>
    <!-- Formulario con un botón para enviar la solicitud de mostrar el query -->
    <form action="" method="post">
        <input type="submit" name="submit" value="Mostrar Query">
    </form>
    
</body>
</html>
<?php
if(isset($_POST['submit'])){
    $conexion = pg_connect("dbname=ketal user=postgres password=9104677");//para conectar
    if (!$conexion) {
        die("Error al conectar a la base de datos: " . pg_last_error());
    }

    $resultado = pg_query($conexion, 'SELECT * FROM empleado');

    if (!$resultado) {
        echo "Error al ejecutar la consulta.";
        exit;
    }

    // Imprimir los resultados aquí
    while ($fila = pg_fetch_assoc($resultado)) {
        echo "ID Empleado: " . $fila["id_empleado"] . ", Nombre: " . $fila["nombre"] . "<br>";
    }

    pg_close($conexion); // para cerrar conexion
}
?>
