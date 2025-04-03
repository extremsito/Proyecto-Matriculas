document.addEventListener("DOMContentLoaded", function () {
    const menu = document.querySelector(".menu");
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    // Efecto al hacer scroll
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            menu.classList.add("scrolled");
        } else {
            menu.classList.remove("scrolled");
        }
    });

    // Menú hamburguesa en móviles
    hamburger.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });

    // Buscador de matrículas (aún sin conexión a la BBDD)
    const searchInput = document.getElementById("search");
    searchInput.addEventListener("input", function () {
        const searchValue = searchInput.value.trim().toLowerCase();
        const matriculas = document.querySelectorAll(".matricula-item");

        let found = false;
        matriculas.forEach(item => {
            if (item.textContent.toLowerCase().includes(searchValue)) {
                item.style.display = "block";
                found = true;
            } else {
                item.style.display = "none";
            }
        });

        if (!found) {
            alert("Matrícula no encontrada");
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const matriculaList = document.getElementById("matricula-list");

    function cargarMatriculas() {
        fetch("get_matriculas.php")
            .then(response => response.json())
            .then(data => {
                matriculaList.innerHTML = "";
                data.forEach(matricula => {
                    const div = document.createElement("div");
                    div.classList.add("matricula-item");
                    div.innerHTML = `
                        <p><strong>${matricula.matricula}</strong> - ${matricula.marca} (${matricula.tipo})</p>
                        <p>Propietario: ${matricula.propietario}</p>
                    `;
                    matriculaList.appendChild(div);
                });
            })
            .catch(error => console.error("Error al cargar matrículas:", error));
    }

    cargarMatriculas();
});
document.addEventListener("DOMContentLoaded", function () {
    const addForm = document.getElementById("add-form");

    if (addForm) {
        addForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const formData = new FormData();
            formData.append("matricula", document.getElementById("matricula").value);
            formData.append("marca", document.getElementById("marca").value);
            formData.append("tipo", document.getElementById("tipo").value);
            formData.append("propietario", document.getElementById("propietario").value);

            fetch("add_matricula.php", {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("Matrícula añadida correctamente");
                    window.location.href = "index.html";
                } else {
                    alert("Error al añadir matrícula: " + data.error);
                }
            })
            .catch(error => console.error("Error:", error));
        });
    }
});
document.addEventListener("DOMContentLoaded", function () {
    // Registro de usuario
    const registerForm = document.getElementById("register-form");
    if (registerForm) {
        registerForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const formData = new FormData();
            formData.append("usuario", document.getElementById("usuario").value);
            formData.append("password", document.getElementById("password").value);

            fetch("register.php", {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("Usuario registrado correctamente");
                    window.location.href = "login.html";
                } else {
                    alert("Error: " + data.error);
                }
            });
        });
    }

    // Login de usuario
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const formData = new FormData();
            formData.append("usuario", document.getElementById("login-usuario").value);
            formData.append("password", document.getElementById("login-password").value);

            fetch("login.php", {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("Inicio de sesión exitoso");
                    window.location.href = "index.html";
                } else {
                    alert("Error: " + data.error);
                }
            });
        });
    }

    // Verificar sesión
    fetch("session.php")
        .then(response => response.json())
        .then(data => {
            if (data.loggedIn) {
                document.querySelector(".nav-links").innerHTML += 
                    `<li><a href="#" id="logout">Cerrar Sesión (${data.usuario})</a></li>`;

                document.getElementById("logout").addEventListener("click", function () {
                    fetch("logout.php")
                        .then(() => {
                            alert("Sesión cerrada");
                            window.location.href = "login.html";
                        });
                });
            }
        });
});
document.addEventListener("DOMContentLoaded", function () {
    const searchBtn = document.getElementById("search-btn");
    const searchInput = document.getElementById("search-input");
    const searchResult = document.getElementById("search-result");
    const popup = document.getElementById("popup");
    const popupText = document.getElementById("popup-text");
    const popupClose = document.getElementById("popup-close");

    if (searchBtn) {
        searchBtn.addEventListener("click", function () {
            const matricula = searchInput.value.trim();
            if (matricula === "") return;

            fetch(`search.php?matricula=${matricula}`)
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        popupText.textContent = data.error;
                        popup.style.display = "flex";
                    } else {
                        searchResult.innerHTML = `
                            <p><strong>${data.matricula}</strong> - ${data.marca} (${data.tipo})</p>
                            <p>Propietario: ${data.propietario}</p>
                        `;
                    }
                });
        });
    }

    popupClose.addEventListener("click", function () {
        popup.style.display = "none";
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const matriculasContainer = document.getElementById("matriculas-container");

    if (matriculasContainer) {
        fetch("list.php")
            .then(response => response.json())
            .then(data => {
                matriculasContainer.innerHTML = "";  
                data.forEach((matricula, index) => {
                    const div = document.createElement("div");
                    div.classList.add("matricula-item");
                    div.style.animationDelay = `${index * 0.1}s`;
                    div.innerHTML = `
                        <p><strong>${matricula.matricula}</strong> - ${matricula.marca} (${matricula.tipo})</p>
                        <p>Propietario: ${matricula.propietario}</p>
                    `;
                    matriculasContainer.appendChild(div);
                });
            });
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (hamburger) {
        hamburger.addEventListener("click", function () {
            navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
        });
    }
});
