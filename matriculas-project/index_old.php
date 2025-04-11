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
    <title>Matrículas</title>
    <link rel="stylesheet" href="styles.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>
<body>

<header>
    <nav class="menu">
        <div class="nav-left">
            <img src="./imgs/ESDI_250x138.png" alt="150" width="75" class="logo-img">
        </div>

        <div class="nav-center">
            <div class="menu-title">MATRÍCULAS</div>
        </div>

        <div class="nav-right">
            <!-- Botón del menú hamburguesa -->
            <button class="menu-toggle" id="menu-toggle">☰ Menú</button>
            <!-- Menú desplegable -->
            <ul class="dropdown-menu" id="menu">
                <li class="welcome">Bienvenido, <?php echo htmlspecialchars($_SESSION["usuario"]); ?>!</li>
                <li><a href="index_old.php">Inicio</a></li>
                <li><a href="matriculas.php">Matrículas</a></li>
                <li><a href="nueva_matricula.php">Nueva Matrícula</a></li>
                <li><a href="index.html" id="logout">Cerrar Sesión (<?php echo htmlspecialchars($_SESSION["usuario"]); ?>)</a></li>
            </ul>
        </div>
    </nav>
</header>

<main>
    <h2>Listado de Matrículas</h2>
    <input type="text" id="search" placeholder="Buscar matrícula...">
    <table>
        <thead>
            <tr>
                <th>Matrícula</th>
                <th>Marca</th>
                <th>Tipo</th>
                <th>Propietario</th>
            </tr>
        </thead>
        <tbody id="matricula-list"></tbody>
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
