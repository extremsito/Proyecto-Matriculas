<?php
session_start();
if (!isset($_SESSION["usuario"])) {
    header("Location: index.html");
    exit();
}
require_once "db.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $matricula_original = $_POST['matricula_original'] ?? '';
    $matricula_nueva = $_POST['matricula_nueva'] ?? '';
    $marca = $_POST['marca'] ?? '';
    $tipo = $_POST['tipo'] ?? '';
    $propietario = $_POST['propietario'] ?? '';

    if ($matricula_original && $matricula_nueva && $marca && $tipo && $propietario) {
        if ($matricula_original !== $matricula_nueva) {
            // Solo verificar duplicados si la matrícula ha cambiado
            $stmt_check = $conn->prepare("SELECT COUNT(*) FROM matriculas WHERE matricula = ?");
            $stmt_check->bind_param("s", $matricula_nueva);
            $stmt_check->execute();
            $stmt_check->bind_result($count);
            $stmt_check->fetch();
            $stmt_check->close();

            if ($count > 0) {
                echo json_encode(["success" => false, "error" => "La matrícula nueva ya está registrada."]);
                exit;
            }
        }

        // Proceder con la actualización
        $stmt = $conn->prepare("UPDATE matriculas SET matricula=?, marca=?, tipo=?, propietario=? WHERE matricula=?");
        $stmt->bind_param("sssss", $matricula_nueva, $marca, $tipo, $propietario, $matricula_original);

        if ($stmt->execute()) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false, "error" => "No se pudo actualizar la matrícula."]);
        }
        $stmt->close();
    } else {
        echo json_encode(["success" => false, "error" => "Faltan datos."]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Método no permitido."]);
}
