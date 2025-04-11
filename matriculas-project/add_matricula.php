<?php
session_start();
header("Content-Type: application/json");

if (!isset($_SESSION["usuario"])) {
    echo json_encode(["success" => false, "error" => "No autenticado"]);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $conn = new mysqli("localhost", "root", "", "matriculas_db");

    if ($conn->connect_error) {
        echo json_encode(["success" => false, "error" => "Error de conexión"]);
        exit();
    }

    $matricula = trim($_POST["matricula"] ?? "");
    $marca = trim($_POST["marca"] ?? "");
    $tipo = trim($_POST["tipo"] ?? "");
    $propietario = trim($_POST["propietario"] ?? "");

    if ($matricula === "" || $marca === "" || $tipo === "" || $propietario === "") {
        echo json_encode(["success" => false, "error" => "Faltan datos"]);
        exit();
    }

    if (!in_array($tipo, ["Coche", "Moto"])) {
        echo json_encode(["success" => false, "error" => "Tipo inválido"]);
        exit();
    }

    // Verificar si la matrícula ya existe
    $checkStmt = $conn->prepare("SELECT COUNT(*) FROM matriculas WHERE matricula = ?");
    $checkStmt->bind_param("s", $matricula);
    $checkStmt->execute();
    $checkStmt->bind_result($count);
    $checkStmt->fetch();
    $checkStmt->close();

    if ($count > 0) {
        echo json_encode(["success" => false, "error" => "La matrícula ya está registrada."]);
        $conn->close();
        exit();
    }

    // Insertar si no existe
    $stmt = $conn->prepare("INSERT INTO matriculas (matricula, marca, tipo, propietario) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $matricula, $marca, $tipo, $propietario);

    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => "Error al guardar en base de datos"]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["success" => false, "error" => "Método no permitido"]);
}
?>
