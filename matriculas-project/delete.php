<?php
session_start();
if (!isset($_SESSION["usuario"])) {
    header("Location: index.html");
    exit();
}
require_once "db.php"; // Conexión a la base de datos
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Eliminar Matrícula</title>
    <link rel="stylesheet" href="styles.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>
<body>
<header>
    <nav class="menu">
        <div class="logo-container">
            <img src="./imgs/ESDI_250x138.png" alt="150" width="75" class="logo-img">
            <div class="menu-title">MATRÍCULAS</div>
        </div>

        <div>
            <!-- Botón del menú hamburguesa -->
            <button class="menu-toggle" id="menu-toggle">☰ Menú</button>

            <!-- Menú desplegable -->
            <ul class="dropdown-menu" id="menu">
                <li class="welcome">Bienvenido, <?php echo htmlspecialchars($_SESSION["usuario"]); ?>!</li>
                <li><a href="index_old.php">Inicio</a></li>
                <li><a href="add.php">Añadir Matrícula</a></li>
                <li><a href="edit.php">Editar Matrícula</a></li>
                <li><a href="delete.php">Eliminar Matrícula</a></li>
                <li><a href="index.html" id="logout">Cerrar Sesión (<?php echo htmlspecialchars($_SESSION["usuario"]); ?>)</a></li>
            </ul>
        </div>
    </nav>
</header>

    <main>
        <h1>Eliminar Matrícula</h1>
        <table>
            <thead>
                <tr>
                    <th>Matrícula</th>
                    <th>Marca</th>
                    <th>Tipo</th>
                    <th>Propietario</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>
                <?php
                $query = "SELECT * FROM matriculas";
                $result = $conn->query($query);

                while ($row = $result->fetch_assoc()) {
                    echo "<tr>
                            <td>" . htmlspecialchars($row['matricula']) . "</td>
                            <td>" . htmlspecialchars($row['marca']) . "</td>
                            <td>" . htmlspecialchars($row['tipo']) . "</td>
                            <td>" . htmlspecialchars($row['propietario']) . "</td>
                            <td><button class='btn-eliminar' data-matricula='" . $row['matricula'] . "'>Eliminar</button></td>
                          </tr>";
                }
                ?>
            </tbody>
        </table>
    </main>
    <script src="script.js"></script>
    <script>
    // Función para desplegar el menú
        document.getElementById("menu-toggle").addEventListener("click", function() {
            document.getElementById("menu").classList.toggle("active");
        });
    </script>
</body>
</html>
