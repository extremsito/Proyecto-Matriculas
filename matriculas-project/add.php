<?php
session_start();
if (!isset($_SESSION["usuario"])) {
    header("Location: index.html");
    exit();
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Añadir Matrícula</title>
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
        <h1>Añadir Nueva Matrícula</h1>
        <form id="matricula-form">
            <input type="text" id="matricula" placeholder="Matrícula" required>
            <input type="text" id="marca" placeholder="Marca" required>
            <select id="tipo" name="tipo" required>
                <option value="Coche">Coche</option>
                <option value="Moto">Moto</option>
            </select>
            <input type="text" id="propietario" placeholder="Propietario" required>
            <button type="submit">Guardar Matrícula</button>
        </form>
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