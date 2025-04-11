<?php
require_once "db.php";
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $matricula = $_POST['matricula'] ?? '';

    if (!empty($matricula)) {
        $stmt = $conn->prepare("DELETE FROM matriculas WHERE matricula = ?");
        $stmt->bind_param("s", $matricula);

        if ($stmt->execute()) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false, "error" => "Error al eliminar"]);
        }
    } else {
        echo json_encode(["success" => false, "error" => "Matrícula vacía"]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Método no permitido"]);
}
?>
