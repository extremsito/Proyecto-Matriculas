<?php
header("Content-Type: application/json; charset=UTF-8");
include "db.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $usuario = $_POST["usuario"] ?? '';
    $password = $_POST["password"] ?? '';

    // Preparar y ejecutar consulta
    $stmt = $conn->prepare("SELECT * FROM usuarios WHERE usuario = ?");
    $stmt->bind_param("s", $usuario);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result && $result->num_rows > 0) {
        $row = $result->fetch_assoc();

        // Verificar password con SHA256
        $hashed_password = hash('sha256', data: $password);

        if ($hashed_password === $row["password"]) {
            session_start();
            $_SESSION["usuario"] = $usuario;
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false, "error" => "Contraseña incorrecta"]);
        }
    } else {
        echo json_encode(["success" => false, "error" => "Usuario no encontrado"]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["success" => false, "error" => "Método no permitido"]);
}
?>
