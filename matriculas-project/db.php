<?php
$servername = "localhost";
$username = "root";  // Cambia esto si tienes otro usuario
$password = "";  // Si tienes una contraseña en MySQL, ponla aquí
$database = "matriculas_db";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}
?>