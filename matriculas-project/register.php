<?php
include "db.php";

$usuario = $_POST["usuario"];
$password = password_hash($_POST["password"], algo: PASSWORD_DEFAULT);

$sql = "INSERT INTO usuarios (usuario, password) VALUES ('$usuario', '$password')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $conn->error]);
}

$conn->close();
?>
