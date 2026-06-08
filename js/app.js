document.addEventListener("DOMContentLoaded", function () {
  const STORAGE_SESSION = "ludotecaSesion";
  const STORAGE_PROFILES = "ludotecaPerfiles";
  const usuariosBase = [
    { usuario: "usuario", clave: "Usuario1234", rol: "usuario", nombreCompleto: "Usuario Demo", correo: "usuario@ludotecaroberto.cl", fechaNacimiento: "1998-06-12", calle: "Av. Providencia", numero: "1234", deptoCasa: "Depto 404", comuna: "Santiago", region: "Metropolitana de Santiago" },
    { usuario: "roberto", clave: "Ludoteca2026", rol: "usuario", nombreCompleto: "Roberto Sánchez", correo: "roberto.asf@gmail.com", fechaNacimiento: "1990-01-01", calle: "Av. Principal", numero: "100", deptoCasa: "Casa A", comuna: "San Joaquín", region: "Metropolitana de Santiago" },
    { usuario: "admin", clave: "Admin12345", rol: "admin", nombreCompleto: "Administrador Ludoteca", correo: "admin@ludotecaroberto.cl", fechaNacimiento: "1990-01-01", calle: "Oficina Central", numero: "1", deptoCasa: "Local", comuna: "Santiago", region: "Metropolitana de Santiago" }
  ];

  const campos = document.querySelectorAll(".campo input, .campo select, .campo textarea");
  const checks = document.querySelectorAll(".campo-check input");
  const clave = document.getElementById("claveRegistro");
  const repetirClave = document.getElementById("repetirClaveRegistro");

  function obtenerPerfiles() {
    const guardados = JSON.parse(localStorage.getItem(STORAGE_PROFILES) || "{}");
    usuariosBase.forEach(function (usuario) {
      if (!guardados[usuario.usuario]) guardados[usuario.usuario] = usuario;
    });
    localStorage.setItem(STORAGE_PROFILES, JSON.stringify(guardados));
    return guardados;
  }

  function guardarPerfiles(perfiles) {
    localStorage.setItem(STORAGE_PROFILES, JSON.stringify(perfiles));
  }

  function obtenerSesion() {
    return JSON.parse(localStorage.getItem(STORAGE_SESSION) || "null");
  }

  function guardarSesion(usuario) {
    localStorage.setItem(STORAGE_SESSION, JSON.stringify({
      usuario: usuario.usuario,
      rol: usuario.rol,
      nombreCompleto: usuario.nombreCompleto,
      correo: usuario.correo
    }));
  }

  function obtenerRutaInicio() {
    const path = window.location.pathname;
    return (path.includes("/cuentas/") || path.includes("/admin/") || path.includes("/categorias/")) ? "../index.html" : "index.html";
  }

  function obtenerRutaPerfil() {
    return window.location.pathname.includes("/cuentas/") ? "perfil.html" : "cuentas/perfil.html";
  }

  function obtenerRutaAdmin() {
    if (window.location.pathname.includes("/admin/")) return "dashboard.html";
    if (window.location.pathname.includes("/cuentas/") || window.location.pathname.includes("/categorias/")) return "../admin/dashboard.html";
    return "admin/dashboard.html";
  }

  function cerrarSesion() {
    localStorage.removeItem(STORAGE_SESSION);
    window.location.href = obtenerRutaInicio();
  }

  function marcarCampo(elemento) {
    const campo = elemento.closest(".campo");
    if (!campo) return;
    campo.classList.add("tocado", "esta-escribiendo");
    window.setTimeout(function () {
      campo.classList.remove("esta-escribiendo");
    }, 360);
  }

  function validarClaves() {
    if (!clave || !repetirClave) return;
    const noCoinciden = repetirClave.value.length > 0 && clave.value !== repetirClave.value;
    repetirClave.setCustomValidity(noCoinciden ? "Las contraseñas no coinciden" : "");
    const campoRepetir = repetirClave.closest(".campo");
    if (campoRepetir) campoRepetir.classList.toggle("password-no-coincide", noCoinciden);
  }

  function alternarClase(elementos, mostrar) {
    elementos.forEach(function (elemento) {
      elemento.classList.toggle("d-none", !mostrar);
    });
  }

  function actualizarNavegacion() {
    const sesion = obtenerSesion();
    alternarClase(document.querySelectorAll("[data-auth-only]"), Boolean(sesion));
    alternarClase(document.querySelectorAll("[data-guest-only]"), !sesion);
    alternarClase(document.querySelectorAll("[data-admin-only]"), Boolean(sesion && sesion.rol === "admin"));
    document.querySelectorAll("[data-user-label]").forEach(function (elemento) {
      if (sesion) elemento.textContent = "Hola, " + sesion.usuario;
    });
  }

  function configurarGuardias() {
    const sesion = obtenerSesion();
    const requiereAuth = document.body.dataset.authRequired === "true";
    const requiereAdmin = document.body.dataset.adminRequired === "true";
    const guardMessage = document.querySelector("[data-guard-message]");
    if (!requiereAuth && !requiereAdmin) return;
    if (requiereAuth && !sesion) {
      if (guardMessage) guardMessage.innerHTML = '<span class="etiqueta">Acceso restringido</span><h2>Debes iniciar sesión.</h2><p>Para modificar tu perfil primero debes ingresar con una cuenta registrada.</p><a class="boton" href="#" data-bs-toggle="modal" data-bs-target="#loginModal">Iniciar sesión</a>';
      return;
    }
    if (requiereAdmin && (!sesion || sesion.rol !== "admin")) {
      if (guardMessage) guardMessage.innerHTML = '<span class="etiqueta">Solo administrador</span><h2>No tienes permisos suficientes.</h2><p>Esta sección es visible únicamente para usuarios con rol admin.</p><a class="boton" href="../index.html">Volver al inicio</a>';
      return;
    }
    if (guardMessage) guardMessage.classList.add("d-none");
    if (requiereAuth) alternarClase(document.querySelectorAll("[data-auth-content]"), true);
    if (requiereAdmin) alternarClase(document.querySelectorAll("[data-admin-content]"), true);
  }

  campos.forEach(function (elemento) {
    elemento.addEventListener("input", function () {
      validarClaves();
      marcarCampo(elemento);
    });
    elemento.addEventListener("blur", function () {
      const campo = elemento.closest(".campo");
      if (campo) campo.classList.add("tocado");
      validarClaves();
    });
  });

  checks.forEach(function (check) {
    check.addEventListener("change", function () {
      const campo = check.closest(".campo-check");
      if (campo) campo.classList.add("tocado");
    });
  });

  document.querySelectorAll("[data-logout]").forEach(function (boton) {
    boton.addEventListener("click", function (evento) {
      evento.preventDefault();
      cerrarSesion();
    });
  });

  const formLogin = document.getElementById("formLogin");
  const mensajeLogin = document.getElementById("mensajeLogin");

  if (formLogin && mensajeLogin) {
    formLogin.addEventListener("submit", function (evento) {
      evento.preventDefault();
      const perfiles = obtenerPerfiles();
      const usuarioInput = formLogin.elements.loginUsuario;
      const claveInput = formLogin.elements.loginClave;
      const usuarioTexto = usuarioInput.value.trim().toLowerCase();
      const claveTexto = claveInput.value.trim();
      formLogin.querySelectorAll(".campo").forEach(campo => campo.classList.add("tocado"));
      usuarioInput.setCustomValidity("");
      claveInput.setCustomValidity("");
      if (!formLogin.checkValidity()) {
        mensajeLogin.textContent = "Ingresa un usuario y una contraseña válidos.";
        mensajeLogin.className = "mensaje-formulario mensaje-error";
        return;
      }
      const usuarioEncontrado = perfiles[usuarioTexto];
      if (!usuarioEncontrado || usuarioEncontrado.clave !== claveTexto) {
        claveInput.setCustomValidity("Usuario o contraseña incorrectos");
        mensajeLogin.textContent = "Usuario o contraseña incorrectos. Prueba usuario / Usuario1234 o admin / Admin12345.";
        mensajeLogin.className = "mensaje-formulario mensaje-error";
        claveInput.value = "";
        claveInput.focus();
        return;
      }
      guardarSesion(usuarioEncontrado);
      mensajeLogin.textContent = "Inicio de sesión correcto. Rol: " + usuarioEncontrado.rol + ".";
      mensajeLogin.className = "mensaje-formulario mensaje-ok";
      actualizarNavegacion();
      window.setTimeout(function () {
        window.location.href = usuarioEncontrado.rol === "admin" ? obtenerRutaAdmin() : obtenerRutaPerfil();
      }, 650);
    });
  }

  const formRegistro = document.getElementById("formRegistro");
  const mensajeRegistro = document.getElementById("mensajeRegistro");

  if (formRegistro && mensajeRegistro) {
    formRegistro.addEventListener("reset", function () {
      window.setTimeout(function () {
        formRegistro.querySelectorAll(".campo, .campo-check").forEach(campo => campo.classList.remove("tocado", "esta-escribiendo", "password-no-coincide"));
      }, 0);
      mensajeRegistro.textContent = "";
      mensajeRegistro.className = "mensaje-formulario";
    });
    formRegistro.addEventListener("submit", function (evento) {
      evento.preventDefault();
      validarClaves();
      formRegistro.querySelectorAll(".campo, .campo-check").forEach(campo => campo.classList.add("tocado"));
      if (!formRegistro.checkValidity()) {
        mensajeRegistro.textContent = "Revisa los campos marcados en rojo antes de continuar.";
        mensajeRegistro.className = "mensaje-formulario mensaje-error";
        return;
      }
      const data = Object.fromEntries(new FormData(formRegistro).entries());
      const perfiles = obtenerPerfiles();
      const usuario = data.usuario.trim().toLowerCase();
      if (perfiles[usuario]) {
        formRegistro.elements.usuario.setCustomValidity("El usuario ya existe");
        mensajeRegistro.textContent = "Ese nombre de usuario ya existe. Prueba con otro.";
        mensajeRegistro.className = "mensaje-formulario mensaje-error";
        formRegistro.elements.usuario.focus();
        return;
      }
      perfiles[usuario] = { usuario, clave: data.clave, rol: "usuario", nombreCompleto: data.nombreCompleto, correo: data.correo, fechaNacimiento: data.fechaNacimiento, calle: data.calle, numero: data.numero, deptoCasa: data.deptoCasa, comuna: data.comuna, region: data.region };
      guardarPerfiles(perfiles);
      guardarSesion(perfiles[usuario]);
      mensajeRegistro.textContent = "Registro creado correctamente. Serás enviado a la modificación de perfil.";
      mensajeRegistro.className = "mensaje-formulario mensaje-ok";
      actualizarNavegacion();
      window.setTimeout(() => { window.location.href = "perfil.html"; }, 900);
    });
  }

  const formPerfil = document.getElementById("formPerfil");
  const mensajePerfil = document.getElementById("mensajePerfil");

  if (formPerfil && mensajePerfil) {
    const sesion = obtenerSesion();
    const perfiles = obtenerPerfiles();
    if (sesion && perfiles[sesion.usuario]) {
      const perfil = perfiles[sesion.usuario];
      Object.keys(perfil).forEach(key => { if (formPerfil.elements[key]) formPerfil.elements[key].value = perfil[key]; });
      const rol = document.querySelector("[data-profile-role]");
      if (rol) rol.textContent = "Rol: " + perfil.rol;
    }
    formPerfil.addEventListener("submit", function (evento) {
      evento.preventDefault();
      formPerfil.querySelectorAll(".campo").forEach(campo => campo.classList.add("tocado"));
      if (!formPerfil.checkValidity()) {
        mensajePerfil.textContent = "Revisa los campos marcados en rojo.";
        mensajePerfil.className = "mensaje-formulario mensaje-error";
        return;
      }
      const sesionActual = obtenerSesion();
      const perfilesActuales = obtenerPerfiles();
      const perfilActual = perfilesActuales[sesionActual.usuario];
      const data = Object.fromEntries(new FormData(formPerfil).entries());
      perfilesActuales[sesionActual.usuario] = { ...perfilActual, ...data, usuario: sesionActual.usuario };
      guardarPerfiles(perfilesActuales);
      guardarSesion(perfilesActuales[sesionActual.usuario]);
      mensajePerfil.textContent = "Perfil actualizado correctamente.";
      mensajePerfil.className = "mensaje-formulario mensaje-ok";
      actualizarNavegacion();
    });
  }

  const formRecuperar = document.getElementById("formRecuperar");
  const mensajeRecuperar = document.getElementById("mensajeRecuperar");

  if (formRecuperar && mensajeRecuperar) {
    formRecuperar.addEventListener("submit", function (evento) {
      evento.preventDefault();
      formRecuperar.querySelectorAll(".campo").forEach(campo => campo.classList.add("tocado"));
      if (!formRecuperar.checkValidity()) {
        mensajeRecuperar.textContent = "Ingresa un correo válido.";
        mensajeRecuperar.className = "mensaje-formulario mensaje-error";
        return;
      }
      mensajeRecuperar.textContent = "Solicitud enviada. En una aplicación real recibirías un correo de recuperación.";
      mensajeRecuperar.className = "mensaje-formulario mensaje-ok";
    });
  }

  const contadorUsuarios = document.querySelector("[data-admin-users]");
  if (contadorUsuarios) contadorUsuarios.textContent = Object.keys(obtenerPerfiles()).length;
  obtenerPerfiles();
  actualizarNavegacion();
  configurarGuardias();
});
