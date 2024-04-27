<?php
$conexion = pg_connect("dbname=ketal user=postgres password=admin");

if (!$conexion) {
    die("Error al conectar a la base de datos: " . pg_last_error());
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST["nombre"];
    $correo = $_POST["correo"];
    $password = $_POST["password"];
    //$superadmi = isset($_POST["superadmi"]) && $_POST["superadmi"] ? 't' : 'f'; recibir boolean
    $superadmi = isset($_POST["superadmi"]) && $_POST["superadmi"] === 'true' ? 't' : 'f';


    
    $sql = "INSERT INTO empleado (nombre,correo , password, superadmi) VALUES ($1, $2, $3, $4::boolean)";
    $params = array($nombre,$correo, $password, $superadmi);

    // Ejecuta la consulta SQL con consultas preparadas
    $resultado = pg_query_params($conexion, $sql, $params);

    if (!$resultado) {
        echo "Error al ejecutar la consulta.";
        exit;
    }

    echo '<script>alert("Los datos se han insertado correctamente.");</script>';
    header("Location: ../html/gerente.html");
    exit; 
}

pg_close($conexion);
?>
