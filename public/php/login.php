<?php
// Verifica si se recibieron datos del formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $correo = $_POST["correo"];
    $password = $_POST["password"];

    $conexion = pg_connect("dbname=ketal user=postgres password=admin");
    if (!$conexion) {
        die("Error al conectar a la base de datos: " . pg_last_error());
    }

    $sql = "SELECT * FROM empleado WHERE correo = $1 AND password = $2";
    $params = array($correo, $password);

    $resultado = pg_query_params($conexion, $sql, $params);
    if (!$resultado) {
        echo '<script>alert("La contraseña o usuario son incorrectos.");</script>';
        header("Location: ../html/login.html");
        exit;
    }

    //comparar credenciales
    if (pg_num_rows($resultado) == 1) {
        $fila = pg_fetch_assoc($resultado);
        $superadmi = $fila['superadmi'];
    
        if ($superadmi == 't') {
            header("Location: ../html/gerente.html");
            exit; 
        } else {
            header("Location: ../html/cajero.html");
            exit; 
        }
    
    } else {
        echo '<script>alert("La contraseña o usuario son incorrectos.");</script>';
        header("Location: ../html/login.html");
        exit;
    }

    pg_close($conexion);
}
?>
