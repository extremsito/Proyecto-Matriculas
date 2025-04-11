document.addEventListener("DOMContentLoaded", function () {
    const menu = document.querySelector(".menu");
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    // Cambiar el estilo del menú al hacer scroll
    if (menu) {
        window.addEventListener("scroll", function () {
            menu.classList.toggle("scrolled", window.scrollY > 50);
        });
    }

    // Menú hamburguesa para pantallas pequeñas
    if (hamburger && navLinks) {
        hamburger.addEventListener("click", function () {
            if (navLinks.classList.contains("active")) {
                navLinks.classList.remove("active");
            } else {
                navLinks.classList.remove("active"); // Reinicio por si acaso
                void navLinks.offsetWidth; // Truco para reiniciar la animación
                navLinks.classList.add("active");
            }
        });

        // Cerrar el menú al hacer clic en un enlace
        navLinks.addEventListener("click", function (e) {
            if (e.target.tagName === "A") {
                navLinks.classList.remove("active");
            }
        });
    }

        // Cerrar menú al hacer clic fuera
    document.addEventListener("click", function (e) {
        if (
            navLinks.classList.contains("active") &&
            !navLinks.contains(e.target) &&
            !hamburger.contains(e.target)
        ) {
            navLinks.classList.remove("active");
        }
    });

    // Cerrar menú al hacer scroll
    window.addEventListener("scroll", function () {
        if (navLinks.classList.contains("active")) {
            navLinks.classList.remove("active");
        }
    });

    const matriculaList = document.getElementById("matricula-list");

    function cargarMatriculas() {
        fetch("get_matriculas.php")
            .then(response => response.json())
            .then(data => {
                matriculaList.innerHTML = "";
                const errorMessage = document.getElementById("error-message");

                if (data.error) {
                    if (errorMessage) {
                        errorMessage.textContent = data.error;
                    }
                } else {
                    data.forEach(matricula => {
                        const row = document.createElement("tr");
                        let html = `
                            <td>${matricula.matricula}</td>
                            <td>${matricula.marca}</td>
                            <td>${matricula.tipo}</td>
                            <td>${matricula.propietario}</td>
                        `;

                        if (!window.location.href.includes("index_old.php")) {
                            html += `
                                <td>
                                    <button class="btn-editar" 
                                        data-matricula="${matricula.matricula}" 
                                        data-marca="${matricula.marca}" 
                                        data-tipo="${matricula.tipo}" 
                                        data-propietario="${matricula.propietario}">
                                        Editar
                                    </button>
                                    <button class="btn-eliminar" 
                                        data-matricula="${matricula.matricula}">
                                        Eliminar
                                    </button>
                                </td>
                            `;
                        }

                        row.innerHTML = html;
                        matriculaList.appendChild(row);
                    });
                }
            })
            .catch(error => {
                console.error("Error al cargar matrículas:", error);
                const errorMessage = document.getElementById("error-message");
                if (errorMessage) {
                    errorMessage.textContent = "Error al cargar matrículas.";
                }
            });
    }

    if (matriculaList) {
        cargarMatriculas();

        const searchInput = document.getElementById("search");
        if (searchInput) {
            searchInput.addEventListener("input", function () {
                const searchValue = searchInput.value.trim().toLowerCase();
                const rows = matriculaList.getElementsByTagName("tr");

                for (let i = 0; i < rows.length; i++) {
                    const cells = rows[i].getElementsByTagName("td");
                    let found = false;

                    // Solo filtrar por la primera columna (Matrícula)
                    if (cells.length > 0) {
                        const matriculaText = cells[0].textContent.trim().toLowerCase();
                        
                        // Eliminar acentos y espacios extra
                        const normalizedMatriculaText = matriculaText.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, " ");
                        const normalizedSearchValue = searchValue.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, " ");

                        found = normalizedMatriculaText.includes(normalizedSearchValue);
                    }

                    rows[i].style.display = found ? "" : "none";
                }
            });
        }
    }

    const addForm = document.getElementById("matricula-form");
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
                const formError = document.getElementById("form-error");

                if (data.success) {
                    Swal.fire({
                        icon: "success",
                        title: "¡Añadido!",
                        text: "Matrícula añadida correctamente",
                        confirmButtonText: "OK"
                    }).then(() => {
                        if (typeof cargarMatriculas === "function") {
                            cargarMatriculas();
                        }
                        addForm.reset();
                        if (formError) formError.textContent = "";
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: data.error || "Error desconocido"
                    });
                    if (formError) formError.textContent = "";
                }
            })
            .catch(error => {
                console.error("Error de red o JSON:", error);
                const formError = document.getElementById("form-error");
                if (formError) {
                    formError.textContent = "Error del servidor al intentar añadir.";
                }
            });
        });
    }

    document.addEventListener('click', async function(e) {
        if (e.target.classList.contains('btn-editar')) {
            const button = e.target;
            const matricula = button.dataset.matricula;
            const marca = button.dataset.marca;
            const tipo = button.dataset.tipo;
            const propietario = button.dataset.propietario;

            const { value: formValues } = await Swal.fire({
                title: 'Editar Matrícula',
                html: 
                    `<input id="swal-matricula" class="swal2-input" placeholder="Matrícula" value="${matricula}">
                    <input id="swal-marca" class="swal2-input" placeholder="Marca" value="${marca}">
                    <input id="swal-tipo" class="swal2-input" placeholder="Tipo" value="${tipo}">
                    <input id="swal-propietario" class="swal2-input" placeholder="Propietario" value="${propietario}">`,
                focusConfirm: false,
                showCancelButton: true,
                preConfirm: () => {
                    return {
                        matricula: document.getElementById('swal-matricula').value,
                        marca: document.getElementById('swal-marca').value,
                        tipo: document.getElementById('swal-tipo').value,
                        propietario: document.getElementById('swal-propietario').value
                    };
                }
            });

            if (formValues) {
                const formData = new FormData();
                formData.append('matricula_original', matricula);
                formData.append('matricula_nueva', formValues.matricula);
                formData.append('marca', formValues.marca);
                formData.append('tipo', formValues.tipo);
                formData.append('propietario', formValues.propietario);

                try {
                    const response = await fetch('edit_matricula.php', {
                        method: 'POST',
                        body: formData
                    });

                    const result = await response.json();

                    if (result.success) {
                        Swal.fire('Editado', 'La matrícula ha sido actualizada.', 'success')
                            .then(() => location.reload());
                    } else {
                        Swal.fire('Error', result.error || 'No se pudo editar.', 'error');
                    }

                } catch (error) {
                    Swal.fire('Error', 'Error de conexión con el servidor.', 'error');
                }
            }
        }
    });

    document.addEventListener("click", function (e) {
        if (e.target.classList.contains("btn-eliminar")) {
            const matricula = e.target.dataset.matricula;

            Swal.fire({
                title: '¿Estás seguro?',
                text: `Vas a eliminar la matrícula: ${matricula}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch('delete_matricula.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body: `matricula=${encodeURIComponent(matricula)}`
                    })
                    .then(res => res.json())
                    .then(data => {
                        if (data.success) {
                            Swal.fire('¡Eliminado!', data.message, 'success')
                                .then(() => location.reload());
                        } else {
                            Swal.fire('Error', data.message, 'error');
                        }
                    })
                    .catch(() => {
                        Swal.fire('Error', 'No se pudo conectar con el servidor', 'error');
                    });
                }
            });
        }
    });

    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const formData = new FormData();
            formData.append("usuario", document.getElementById("login-usuario").value);
            formData.append("password", document.getElementById("login-password").value);

            const button = loginForm.querySelector("button");
            button.disabled = true;
            button.textContent = "Cargando...";

            fetch("login.php", {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                button.disabled = false;
                button.textContent = "Iniciar Sesión";

                if (data.success) {
                    Swal.fire({
                        icon: "success",
                        title: "¡Bienvenido!",
                        text: "Inicio de sesión exitoso",
                        confirmButtonText: "Continuar"
                    }).then(() => {
                        window.location.href = "index_old.php";
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error de inicio de sesión",
                        text: data.error,
                        confirmButtonText: "Intentar de nuevo"
                    });
                }
            })
            .catch(error => {
                console.error("Error:", error);
                Swal.fire({
                    icon: "error",
                    title: "Error del servidor",
                    text: "No se pudo completar el inicio de sesión.",
                    confirmButtonText: "Ok"
                });
                button.disabled = false;
                button.textContent = "Iniciar Sesión";
            });
        });
    }

    // Logout con SweetAlert
    const logoutBtn = document.getElementById("logout");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function (e) {
            e.preventDefault(); // Previene la navegación directa

            Swal.fire({
                title: '¿Cerrar sesión?',
                text: '¿Estás seguro de que deseas salir?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Sí, salir',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch("logout.php")
                        .then(response => response.json())
                        .then(data => {
                            if (data.success) {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Sesión cerrada',
                                    text: 'Has cerrado sesión correctamente.',
                                    confirmButtonText: 'Ok'
                                }).then(() => {
                                    window.location.href = "index.html";
                                });
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Error',
                                    text: 'No se pudo cerrar la sesión.'
                                });
                            }
                        })
                        .catch(error => {
                            console.error("Error en el proceso de logout:", error);
                            Swal.fire({
                                icon: 'error',
                                title: 'Error del servidor',
                                text: 'Ocurrió un error al cerrar sesión.'
                            });
                        });
                }
            });
        });
    }


    fetch("session.php")
    .then(response => response.json())
    .then(data => {
        if (data.loggedIn && navLinks) {
            const existingLogoutBtn = document.getElementById("logout");
            if (existingLogoutBtn) {
                existingLogoutBtn.remove();
            }

            navLinks.innerHTML += `
                <li><a href="#" id="logout">Cerrar Sesión (${data.usuario})</a></li>
            `;

            const logoutBtn = document.getElementById("logout");
            if (logoutBtn) {
                logoutBtn.addEventListener("click", function () {
                    Swal.fire({
                        title: '¿Cerrar sesión?',
                        text: '¿Estás seguro de que deseas salir?',
                        icon: 'question',
                        showCancelButton: true,
                        confirmButtonText: 'Sí, salir',
                        cancelButtonText: 'Cancelar'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            fetch("logout.php")
                                .then(response => response.json())
                                .then(data => {
                                    if (data.success) {
                                        Swal.fire({
                                            icon: 'success',
                                            title: 'Sesión cerrada',
                                            text: 'Has cerrado sesión correctamente.',
                                            confirmButtonText: 'Ok'
                                        }).then(() => {
                                            window.location.href = "index.html";
                                        });
                                    } else {
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Error',
                                            text: 'No se pudo cerrar la sesión.'
                                        });
                                    }
                                })
                                .catch(error => {
                                    console.error("Error en el proceso de logout:", error);
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Error del servidor',
                                        text: 'Ocurrió un error al cerrar sesión.'
                                    });
                                });
                        }
                    });
                });
            }
        }
    });
});
