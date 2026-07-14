# Ludoteca Roberto

**Ludoteca Roberto** es una aplicación FrontEnd desarrollada en Angular para la asignatura **Desarrollo Full Stack II** de **DUOC UC**.

La aplicación representa una tienda ficticia de juegos de mesa. Permite navegar por categorías, revisar productos, registrar usuarios, iniciar sesión, modificar perfil, recuperar contraseña y acceder a un panel administrativo con roles diferenciados.

---

## Tecnologías utilizadas

- Angular 22.
- Bootstrap 5.
- TypeScript.
- Reactive Forms.
- Firebase Realtime Database mediante API REST JSON.
- Docker para imagen y contenedor.
- LocalStorage para simulación de sesión y perfiles.

---

## Semana 8 - API REST JSON

En esta iteración se incorporó consumo de datos desde **Firebase Realtime Database**. Los juegos se cargan desde el nodo `/juegos` y se manipulan desde una pantalla administrativa protegida.

Ruta del mantenedor:

```text
/admin/juegos
```

Operaciones implementadas:

| Método | Funcionalidad |
| --- | --- |
| GET | Listar juegos desde Firebase |
| POST | Crear un nuevo juego |
| PUT | Actualizar un juego existente |
| DELETE | Eliminar un juego |

---

## Configuración de Firebase

La URL de Firebase se configura en:

```text
src/environments/environment.ts
src/environments/environment.prod.ts
```

El archivo inicial para importar datos es:

```text
firebase-seed/juegos.json
```

Debe importarse dentro del nodo:

```text
/juegos
```

---

## Funcionalidades principales

- Página de inicio.
- Categorías de juegos.
- Catálogo cargado desde Firebase.
- Registro de usuarios.
- Inicio de sesión.
- Recuperación de contraseña.
- Modificación de perfil.
- Roles de usuario y administrador.
- Dashboard administrativo.
- Mantenedor CRUD de juegos.
- Validaciones de formularios.
- Validaciones de seguridad para contraseña.

---

## Instalación local

```bash
npm install
npm run start
```

Abrir:

```text
http://localhost:4200
```

---

## Build de producción

```bash
npm run build
```

---

## Docker

Construir imagen:

```bash
docker build -t ludoteca-roberto:semana8 .
```

Ejecutar contenedor:

```bash
docker run -d --name ludoteca-roberto -p 4000:4000 ludoteca-roberto:semana8
```

Abrir:

```text
http://localhost:4000
```

---

## Estructura relevante

```text
ludoteca/
├── Dockerfile
├── .dockerignore
├── firebase-seed/
│   └── juegos.json
├── public/
├── src/
│   ├── app/
│   │   ├── guards/
│   │   ├── layout/
│   │   ├── models/
│   │   ├── pages/
│   │   │   ├── admin-juegos/
│   │   │   ├── categoria/
│   │   │   ├── dashboard/
│   │   │   ├── perfil/
│   │   │   ├── recuperar/
│   │   │   └── registro/
│   │   ├── services/
│   │   │   ├── auth.ts
│   │   │   ├── catalogo.ts
│   │   │   └── juegos-api.ts
│   │   └── validators/
│   └── environments/
└── package.json
```

---

## Checklist sumativa semana 8

- [x] Aplicación Angular actual.
- [x] Bootstrap integrado.
- [x] Login, registro, recuperación y perfil.
- [x] Roles usuario/admin.
- [x] Validaciones de formularios.
- [x] Validaciones de contraseña segura.
- [x] Consumo de JSON desde Firebase.
- [x] GET, POST, PUT y DELETE.
- [x] Dashboard administrativo.
- [x] Dockerfile para despliegue cloud.
- [x] Seed JSON para Firebase.
