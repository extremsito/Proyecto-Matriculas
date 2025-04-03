<?php
include "db.php";

$usuario = $_POST["usuario"];
$password = $_POST["password"];

$sql = "SELECT * FROM usuarios WHERE usuario = '$usuario'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    if (password_verify($password, $row["password"])) {
        session_start();
        $_SESSION["usuario"] = $usuario;
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => "Contraseña incorrecta"]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Usuario no encontrado"]);
}

$conn->close();
?>
