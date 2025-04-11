<?php
session_start();
if (!isset($_SESSION["usuario"])) {
    echo json_encode(["loggedIn" => false]);
    exit;
}
echo json_encode(["loggedIn" => true, "usuario" => $_SESSION["usuario"]]);
?>