<?php
include "db.php";

$matricula = $_POST["matricula"];
$marca = $_POST["marca"];
$tipo = $_POST["tipo"];
$propietario = $_POST["propietario"];

$sql = "INSERT INTO matriculas (matricula, marca, tipo, propietario) VALUES ('$matricula', '$marca', '$tipo', '$propietario')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $conn->error]);
}

$conn->close();
?>
