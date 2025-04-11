<?php
header("Content-Type: application/json");
include "db.php";

$matriculas = [];

$sql = "SELECT * FROM matriculas";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $matriculas[] = [
            "id" => $row["id"],
            "matricula" => $row["matricula"],
            "marca" => $row["marca"],
            "tipo" => $row["tipo"],
            "propietario" => $row["propietario"]
        ];
    }
    echo json_encode($matriculas);
} else if ($result) {
    echo json_encode([]); // No hay resultados pero no hay error
} else {
    echo json_encode(["error" => "Error al obtener las matrículas: " . $conn->error]);
}

$conn->close();
?>
