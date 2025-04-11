<?php
session_start();
header('Content-Type: application/json');

if (isset($_SESSION["usuario"])) {
    $_SESSION = []; // Limpiar variables de sesión
    session_destroy(); // Destruir la sesión
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => "No hay sesión activa."]);
}
?>
