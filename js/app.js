document.addEventListener("DOMContentLoaded", function () {
  const campos = document.querySelectorAll(".campo input, .campo select, .campo textarea");
  const checks = document.querySelectorAll(".campo-check input");
  const clave = document.getElementById("claveRegistro");
  const repetirClave = document.getElementById("repetirClaveRegistro");

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
    if (campoRepetir) {
      campoRepetir.classList.toggle("password-no-coincide", noCoinciden);
    }
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

  function resetearEstadosFormulario(formulario) {
    window.setTimeout(function () {
      formulario.querySelectorAll(".campo, .campo-check").forEach(function (campo) {
        campo.classList.remove("tocado", "esta-escribiendo", "password-no-coincide");
      });
    }, 0);
  }

  const formRegistro = document.getElementById("formRegistro");
  const mensajeRegistro = document.getElementById("mensajeRegistro");

  if (formRegistro && mensajeRegistro) {
    formRegistro.addEventListener("reset", function () {
      resetearEstadosFormulario(formRegistro);
      mensajeRegistro.textContent = "";
      mensajeRegistro.className = "mensaje-formulario";
    });

    formRegistro.addEventListener("submit", function (evento) {
      evento.preventDefault();
      validarClaves();

      formRegistro.querySelectorAll(".campo, .campo-check").forEach(function (campo) {
        campo.classList.add("tocado");
      });

      if (formRegistro.checkValidity()) {
        mensajeRegistro.textContent = "Registro validado correctamente. En una aplicación real, aquí se enviarían los datos al servidor.";
        mensajeRegistro.className = "mensaje-formulario mensaje-ok";
      } else {
        mensajeRegistro.textContent = "Revisa los campos marcados en rojo antes de continuar.";
        mensajeRegistro.className = "mensaje-formulario mensaje-error";
      }
    });
  }

  // const formLogin = document.getElementById("formLogin");
  // const mensajeLogin = document.getElementById("mensajeLogin");

  // if (formLogin && mensajeLogin) {
  //   formLogin.addEventListener("submit", function (evento) {
  //     evento.preventDefault();
  
  //     formLogin.querySelectorAll(".campo").forEach(function (campo) {
  //       campo.classList.add("tocado");
  //     });
  
  //     if (formLogin.checkValidity()) {
  //       mensajeLogin.textContent = "Inicio de sesión OK.";
  //       mensajeLogin.className = "mensaje-formulario mensaje-ok";
  //     } else {
  //       mensajeLogin.textContent = "Ingresa un usuario y una contraseña válidos.";
  //       mensajeLogin.className = "mensaje-formulario mensaje-error";
  //     }
  //   });
  // }
  const usuariosPrueba = [
    {
      usuario: "roberto",
      clave: "Ludoteca2026"
    },
    {
      usuario: "cliente",
      clave: "Cliente123"
    },
    {
      usuario: "admin",
      clave: "Admin12345"
    }
  ];
  
  const $formLogin = $("#formLogin");
  const $mensajeLogin = $("#mensajeLogin");
  
  if ($formLogin.length && $mensajeLogin.length) {
    if (!$formLogin.find(".login-demo").length) {
      $("<small>")
        .addClass("login-demo")
        .text("Usuarios de prueba: roberto / Ludoteca2026, cliente / Cliente123, admin / Admin12345.")
        .css({
          color: "var(--muted)",
          lineHeight: "1.45"
        })
        .insertBefore($mensajeLogin);
    }
  
    $formLogin.on("submit", function (evento) {
      evento.preventDefault();
  
      const $usuario = $formLogin.find("[name='loginUsuario']");
      const $clave = $formLogin.find("[name='loginClave']");
  
      const usuario = $.trim($usuario.val());
      const clave = $.trim($clave.val());
  
      $usuario[0].setCustomValidity("");
      $clave[0].setCustomValidity("");
  
      $formLogin.find(".campo").addClass("tocado");
  
      if (!this.checkValidity()) {
        $mensajeLogin
          .text("Ingresa un usuario y una contraseña válidos.")
          .removeClass("mensaje-ok")
          .addClass("mensaje-error");
  
        return;
      }
  
      const usuarioEncontrado = usuariosPrueba.find(function (item) {
        return item.usuario.toLowerCase() === usuario.toLowerCase() && item.clave === clave;
      });
  
      if (usuarioEncontrado) {
        $mensajeLogin
          .text("Inicio de sesión correcto. Bienvenido/a, " + usuarioEncontrado.usuario + ".")
          .removeClass("mensaje-error")
          .addClass("mensaje-ok");
  
        if ($formLogin.find("[name='recordar']").is(":checked")) {
          localStorage.setItem("ludotecaUsuario", usuarioEncontrado.usuario);
        } else {
          localStorage.removeItem("ludotecaUsuario");
        }
  
        $formLogin.find("button[type='submit']").text("Acceso validado");
      } else {
        $clave[0].setCustomValidity("Usuario o contraseña incorrectos");
  
        $mensajeLogin
          .text("Usuario o contraseña incorrectos. Usa los datos de prueba indicados.")
          .removeClass("mensaje-ok")
          .addClass("mensaje-error");
  
        $clave.val("").trigger("focus");
      }
    });
  }

});
