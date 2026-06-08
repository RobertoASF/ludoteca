# Ludoteca Roberto

**Ludoteca Roberto** es un proyecto FrontEnd desarrollado como trabajo  para la asignatura **Desarrollo Full Stack II**, correspondiente a la carrera de **Ingeniería en Desarrollo de Software** de **DUOC UC**.

El proyecto consiste en una maqueta web para una PYME ficticia dedicada a la promoción y venta de juegos de mesa. El sitio permite navegar por distintas categorías de juegos, revisar fichas de productos, registrarse como usuario, iniciar sesión, modificar el perfil de usuario y acceder a un panel administrativo simulado mediante roles.


## Descripción del proyecto

La aplicación representa el sitio web de **Ludoteca Roberto**, una tienda orientada a la venta de juegos de mesa para distintos tipos de jugadores.

El catálogo está organizado en cuatro categorías principales:

- **Familiares**
- **Para dos**
- **Misterio**
- **Cooperativos**

Cada categoría contiene fichas de juegos con información básica:

- Imagen referencial del juego.
- Nombre del juego.
- Descripción breve.
- Precio de venta.
- Indicación de descuento.

Además, el sitio incorpora funcionalidades de usuario, como registro, inicio de sesión, recuperación de contraseña, modificación de perfil y acceso a dashboard administrativo.

---

## Tecnologías utilizadas

El proyecto fue construido utilizando tecnologías FrontEnd tradicionales, sin frameworks de JavaScript como Angular, React o Vue.

Tecnologías principales:

- **HTML5** para la estructura de las páginas.
- **CSS3** para estilos personalizados, variables, animaciones y diseño visual.
- **Bootstrap 5** para apoyar la responsividad, grillas, navbar, modal y componentes visuales.
- **JavaScript** para validaciones de formularios, simulación de sesión, roles y modificación de perfil.
- **LocalStorage** para simular persistencia local de sesión y datos de usuarios.

---

## Funcionalidades principales

### Catálogo de juegos

El sitio cuenta con una página principal donde se muestran las categorías disponibles. Cada categoría enlaza a una página interna con hasta tres juegos de mesa.

### Registro de usuario

La página de registro permite ingresar los siguientes datos:

- Nombre completo.
- Nombre de usuario.
- Correo electrónico.
- Contraseña y repetición de contraseña.
- Fecha de nacimiento.
- Dirección de despacho.
- Calle, número, departamento o casa, comuna y región.

El formulario utiliza validaciones en HTML y JavaScript, marcando visualmente los campos válidos e inválidos.

### Inicio de sesión

El inicio de sesión se presenta mediante un modal de Bootstrap. El usuario puede ingresar con credenciales de prueba para simular el acceso a la aplicación.

### Roles de usuario

El proyecto considera dos tipos de roles:

- **Usuario:** puede iniciar sesión y modificar su perfil.
- **Admin:** puede iniciar sesión y acceder a un dashboard administrativo.

### Modificación de perfil

La pantalla de perfil permite editar la información del usuario registrado. Esta sección se muestra solamente cuando existe una sesión iniciada.

### Dashboard administrativo

El dashboard es visible solo para usuarios con rol **admin**. Incluye indicadores simulados del sistema, una tabla de actividad y accesos rápidos de administración.

### Recuperación de contraseña

El sitio incorpora una pantalla de recuperación de contraseña mediante correo electrónico, simulando el flujo básico de recuperación de acceso.

---

## Usuarios de prueba

| Rol | Usuario | Contraseña |
| --- | --- | --- |
| Usuario | `usuario` | `Usuario1234` |
| Usuario | `roberto` | `Ludoteca2026` |
| Administrador | `admin` | `Admin12345` |

---

## Estructura general del proyecto

```text
ludoteca/
├── index.html
├── admin/
│   └── dashboard.html
├── categorias/
│   ├── familiares.html
│   ├── para-dos.html
│   ├── misterio.html
│   └── cooperativos.html
├── cuentas/
│   ├── registro.html
│   ├── perfil.html
│   └── recuperar.html
├── css/
│   ├── styles.css
│   └── auth.css
├── js/
│   └── app.js
└── img/
    ├── categorias/
    ├── juegos/
    └── logo.png