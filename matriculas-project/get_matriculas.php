<?php
include "db.php";

$sql = "SELECT * FROM matriculas";
$result = $conn->query($sql);

$matriculas = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $matriculas[] = $row;
    }
}

echo json_encode($matriculas);
$conn->close();
?>
