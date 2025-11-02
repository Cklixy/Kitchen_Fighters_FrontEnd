# Kitchen Fighters - Frontend

Aplicación frontend desarrollada en **React + Vite** para la gestión y visualización de torneos de cocina. Este proyecto consume una API RESTful para permitir a usuarios y administradores interactuar con el sistema: registrar chefs, crear torneos, inscribir participantes, subir resultados y visualizar rankings.

## 📋 Tabla de Contenidos

- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecución](#ejecución)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Rutas y Funcionalidades](#rutas-y-funcionalidades)
- [Integración con la API](#integración-con-la-api)
- [Características Implementadas](#características-implementadas)
- [Validaciones y Manejo de Errores](#validaciones-y-manejo-de-errores)
- [Scripts Disponibles](#scripts-disponibles)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)

---

## 🔧 Requisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** >= 16.x (se recomienda usar la última versión LTS)
- **npm** >= 8.x (o **yarn** >= 1.22)
- **Backend API** corriendo en `http://localhost:5000` (ver documentación del backend)

### Verificar Versión de Node

```bash
node --version
npm --version
```

---

## 📦 Instalación

1. **Clona el repositorio** (si aún no lo has hecho):
   ```bash
   git clone <url-del-repositorio>
   cd Kitchen_Fighters_FrontEnd
   ```

2. **Instala las dependencias**:

   Puedes usar cualquiera de estos gestores de paquetes:

   **Con npm:**
   ```bash
   npm install
   ```

   **Con yarn:**
   ```bash
   yarn install
   ```

   **Con pnpm:**
   ```bash
   pnpm install
   ```

   Esto instalará todas las dependencias necesarias definidas en `package.json`:

   **Dependencias de producción:**
   - `react` ^18.3.1 - Biblioteca para construir interfaces de usuario
   - `react-dom` ^18.3.1 - React renderer para DOM
   - `react-router-dom` ^6.30.1 - Enrutamiento del lado del cliente

   **Dependencias de desarrollo:**
   - `vite` ^7.1.12 - Herramienta de build y servidor de desarrollo
   - `@vitejs/plugin-react` ^4.3.1 - Plugin de Vite para React

   Y todas sus dependencias relacionadas.

---

## ⚙️ Configuración

### Variables de Entorno

Por defecto, la aplicación está configurada para conectarse al backend en:
```
http://localhost:5000
```

Si necesitas cambiar la URL del backend, puedes:
1. Buscar y reemplazar todas las instancias de `http://localhost:5000` en los archivos del proyecto
2. O crear un archivo `.env` en la raíz con:
   ```
   VITE_API_URL=http://localhost:5000
   ```
   Y actualizar los archivos para usar `import.meta.env.VITE_API_URL`

---

## 🚀 Ejecución

### Modo Desarrollo

Inicia el servidor de desarrollo con recarga automática:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173` (o el puerto que Vite asigne automáticamente).

### Modo Producción

Para generar una build optimizada:

```bash
npm run build
```

Esto creará una carpeta `dist/` con los archivos listos para desplegar.

### Vista Previa de Producción

Para previsualizar la build de producción localmente:

```bash
npm run preview
```

---

## 📁 Estructura del Proyecto

```
Kitchen_Fighters_FrontEnd/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── Navbar.jsx       # Barra de navegación
│   │   ├── ProtectedRoute.jsx  # Ruta protegida para usuarios autenticados
│   │   ├── AdminRoute.jsx   # Ruta protegida para administradores
│   │   └── CreateChefForm.jsx  # Formulario para crear chef
│   │
│   ├── pages/               # Páginas/Vistas principales
│   │   ├── HomePage.jsx     # Landing page
│   │   ├── TournamentsListPage.jsx    # Listado de torneos
│   │   ├── TournamentDetailPage.jsx  # Detalle de torneo
│   │   ├── ChefsPage.jsx    # Listado de chefs
│   │   ├── ChefDetailPage.jsx        # Detalle de chef
│   │   ├── RegisterChefPage.jsx      # Registro de chef
│   │   ├── LoginPage.jsx    # Inicio de sesión
│   │   ├── AdminPage.jsx    # Panel de administración
│   │   ├── ProfilePage.jsx  # Perfil de usuario
│   │   ├── ForgotPasswordPage.jsx    # Recuperación de contraseña
│   │   └── ResetPasswordPage.jsx     # Reset de contraseña
│   │
│   ├── css/                 # Estilos CSS modulares
│   │   ├── index.css       # Estilos globales
│   │   ├── homepage.css    # Estilos del home
│   │   ├── tournaments.css  # Estilos de listado de torneos
│   │   ├── tournament-detail.css  # Estilos de detalle de torneo
│   │   ├── chefs.css       # Estilos de chefs
│   │   ├── chef-detail.css # Estilos de detalle de chef
│   │   ├── forms.css       # Estilos de formularios
│   │   ├── navbar.css      # Estilos de navegación
│   │   ├── admin.css       # Estilos de panel admin
│   │   └── profile.css     # Estilos de perfil
│   │
│   ├── App.jsx             # Componente principal con rutas
│   └── main.jsx            # Punto de entrada de la aplicación
│
├── index.html              # HTML principal
├── package.json            # Dependencias y scripts
└── README.md               # Este archivo
```

---

## 🗺️ Rutas y Funcionalidades

### Rutas Públicas (sin autenticación)

| Ruta | Componente | Descripción |
|------|------------|-------------|
| `/` | `HomePage` | Landing page con información del sistema y enlaces |
| `/tournaments` | `TournamentsListPage` | Listado de todos los torneos disponibles |
| `/tournaments/:id` | `TournamentDetailPage` | Detalle de un torneo específico con participantes y ranking |
| `/chefs` | `ChefsPage` | Listado de todos los chefs registrados |
| `/chefs/:id` | `ChefDetailPage` | Perfil detallado de un chef |
| `/chefs/register` | `RegisterChefPage` | Formulario de registro de nuevo chef |
| `/login` | `LoginPage` | Inicio de sesión |
| `/forgot-password` | `ForgotPasswordPage` | Recuperación de contraseña |
| `/reset-password/:token` | `ResetPasswordPage` | Reset de contraseña con token |

### Rutas Protegidas (requieren autenticación)

| Ruta | Componente | Requisito | Descripción |
|------|------------|-----------|-------------|
| `/profile` | `ProfilePage` | Usuario autenticado | Perfil del usuario logueado |

### Rutas de Administración (requieren rol admin)

| Ruta | Componente | Requisito | Descripción |
|------|------------|-----------|-------------|
| `/admin` | `AdminPage` | Rol admin | Panel de administración para gestionar chefs, torneos y resultados |

---

## 🔌 Integración con la API

La aplicación consume los siguientes endpoints del backend:

### Endpoints de Chefs

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| `GET` | `/api/chefs` | Obtener lista de chefs | No |
| `GET` | `/api/chefs/:id` | Obtener chef por ID | No |
| `POST` | `/api/chefs` | Registrar nuevo chef | No |
| `POST` | `/api/chefs/login` | Iniciar sesión | No |
| `GET` | `/api/chefs/me` | Obtener perfil del usuario actual | Sí (JWT) |

### Endpoints de Torneos

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| `GET` | `/api/tournaments` | Obtener lista de torneos | No |
| `GET` | `/api/tournaments/:id` | Obtener torneo por ID | No |
| `POST` | `/api/tournaments/:id/register` | Inscribir chef en torneo | Sí (JWT) |
| `POST` | `/api/tournaments/:id/submit` | Enviar resultado/puntaje | Sí (JWT) |
| `GET` | `/api/tournaments/:id/ranking` | Obtener ranking del torneo | No |

### Endpoints de Administración

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| `GET` | `/api/admin/chefs` | Obtener todos los chefs (admin) | Sí (Admin) |
| `GET` | `/api/admin/tournaments` | Obtener todos los torneos (admin) | Sí (Admin) |
| `POST` | `/api/admin/tournaments` | Crear nuevo torneo | Sí (Admin) |
| `PUT` | `/api/admin/tournaments/:id` | Actualizar torneo | Sí (Admin) |
| `DELETE` | `/api/admin/tournaments/:id` | Eliminar torneo | Sí (Admin) |
| `POST` | `/api/admin/tournaments/:id/results` | Subir resultados (admin) | Sí (Admin) |
| `PUT` | `/api/admin/chefs/:id` | Actualizar chef | Sí (Admin) |
| `DELETE` | `/api/admin/chefs/:id` | Eliminar chef | Sí (Admin) |

### Autenticación

La aplicación utiliza **JWT (JSON Web Tokens)** para la autenticación. El token se almacena en `localStorage` y se envía en el header `Authorization`:

```javascript
headers: {
  'Authorization': `Bearer ${token}`
}
```

---

## ✨ Características Implementadas

### 1. Landing Page (`HomePage`)
- ✅ Descripción del sistema
- ✅ Enlaces de navegación rápida
- ✅ Secciones informativas sobre el funcionamiento
- ✅ Diseño responsive con efecto glassmorphism

### 2. Listado de Torneos (`TournamentsListPage`)
- ✅ Visualización de todos los torneos
- ✅ Información de cada torneo: nombre, estado, fecha de inicio, participantes
- ✅ Indicadores de estado visuales (colores según estado)
- ✅ Enlaces a detalle de cada torneo
- ✅ Manejo de estados de carga y error

### 3. Detalle de Torneo (`TournamentDetailPage`)
- ✅ Información completa del torneo
- ✅ Listado de participantes inscritos
- ✅ Ranking ordenado por puntaje (de mayor a menor)
- ✅ Botón de inscripción (si el usuario está autenticado)
- ✅ Validaciones: torneo lleno, ya inscrito, torneo cerrado
- ✅ Mensajes informativos claros

### 4. Gestión de Chefs (`ChefsPage`, `ChefDetailPage`, `RegisterChefPage`)
- ✅ Listado de chefs con tarjetas visuales
- ✅ Perfil detallado de cada chef
- ✅ Formulario de registro con validaciones
- ✅ Campos: nombre, especialidad, años de experiencia, email, contraseña
- ✅ Imágenes de perfil con fallback

### 5. Autenticación (`LoginPage`, `ProfilePage`)
- ✅ Inicio de sesión con email y contraseña
- ✅ Gestión de tokens JWT
- ✅ Perfil de usuario autenticado
- ✅ Recuperación de contraseña (forgot/reset password)

### 6. Panel de Administración (`AdminPage`)
- ✅ Gestión completa de torneos (crear, editar, eliminar)
- ✅ Gestión de chefs (editar, eliminar)
- ✅ Subida de resultados para torneos
- ✅ Vista consolidada de todos los recursos
- ✅ Validaciones del lado del cliente y del servidor

### 7. Navegación (`Navbar`)
- ✅ Menú responsive
- ✅ Indicadores de estado de sesión
- ✅ Enlaces contextuales según rol (admin/usuario)
- ✅ Logout funcional

---

## ✅ Validaciones y Manejo de Errores

### Validaciones en el Cliente

#### Registro de Chef
- ✅ Nombre: requerido, no vacío
- ✅ Especialidad: requerida
- ✅ Años de experiencia: número >= 0
- ✅ Email: formato válido, único (validado por backend)
- ✅ Contraseña: requerida, mínimo de caracteres (validado por backend)

#### Creación/Edición de Torneo (Admin)
- ✅ Nombre: requerido
- ✅ Ubicación: requerida
- ✅ Fecha de inicio: formato válido
- ✅ Máximo de participantes: número entero > 0
- ✅ Descripción: opcional

#### Inscripción en Torneo
- ✅ Usuario debe estar autenticado
- ✅ Torneo no debe estar lleno
- ✅ Usuario no debe estar ya inscrito
- ✅ Torneo debe estar en estado "Pendiente"

#### Envío de Resultados
- ✅ Chef debe estar inscrito en el torneo
- ✅ Score debe estar entre 0 y 100
- ✅ Validación de que el chef tiene acceso (autenticación)

### Manejo de Errores

La aplicación implementa manejo de errores en múltiples niveles:

1. **Errores de Red**: Se muestran mensajes claros cuando falla la conexión con el backend
2. **Errores HTTP**: Se capturan y muestran los mensajes del backend
3. **Estados de Carga**: Indicadores visuales durante peticiones asíncronas
4. **Mensajes de Éxito**: Confirmaciones cuando las acciones se completan correctamente

Ejemplo de manejo de error:
```javascript
try {
  const response = await fetch(`${API_URL}/api/tournaments/${id}`);
  if (!response.ok) {
    const errData = await response.json();
    throw new Error(errData.message || `Error ${response.status}`);
  }
  // ... procesar respuesta
} catch (err) {
  setError(err.message);
}
```

---

## 🎨 Diseño y UX

### Características de Diseño

- ✅ **Responsive**: Funciona en móvil, tablet y escritorio
- ✅ **Glassmorphism**: Diseño moderno con efecto de vidrio
- ✅ **Estados Visuales**: Loading, error, éxito claramente diferenciados
- ✅ **Accesibilidad Básica**: Etiquetas en inputs, roles ARIA donde aplica
- ✅ **Microinteracciones**: Hover effects, transiciones suaves
- ✅ **Feedback Visual**: Mensajes claros para todas las acciones del usuario

### Estilos CSS Modulares

Cada componente tiene su archivo CSS dedicado, facilitando el mantenimiento y la escalabilidad.

---

## 📜 Scripts Disponibles

| Script | Comando | Descripción |
|--------|---------|-------------|
| Desarrollo | `npm run dev` | Inicia el servidor de desarrollo con Vite |
| Build | `npm run build` | Genera la build de producción |
| Preview | `npm run preview` | Previsualiza la build de producción localmente |

---

## 🛠️ Tecnologías Utilizadas

- **React 18.3.1**: Biblioteca para construir interfaces de usuario
- **React Router DOM 6.30.1**: Enrutamiento del lado del cliente
- **Vite 7.1.12**: Herramienta de build y servidor de desarrollo ultrarrápido
- **CSS3**: Estilos modulares con características modernas (Grid, Flexbox, Backdrop Filter)

---

## 🔄 Flujo de Uso Ejemplo

1. **Visitar la aplicación**: Navegar a `http://localhost:5173`
2. **Explorar torneos**: Ir a "Torneos" desde el menú o landing
3. **Ver detalle**: Click en "Ver Detalles" de un torneo
4. **Registrarse**: Ir a "Registrarse como Chef" y completar el formulario
5. **Iniciar sesión**: Usar email y contraseña para loguearse
6. **Inscribirse**: En el detalle del torneo, click en "Inscribirme"
7. **Ver ranking**: El ranking se actualiza automáticamente cuando hay resultados

**Como Administrador:**
1. Loguearse con cuenta admin
2. Acceder a `/admin`
3. Crear/editar/eliminar torneos
4. Subir resultados para torneos
5. Gestionar chefs

---

## 🐛 Solución de Problemas

### Error: "Failed to resolve import"

Si ves errores de importación de CSS, verifica que todos los archivos `.css` existan en `src/css/`.

### Error: "Cannot read properties of undefined"

Este error suele ocurrir cuando el backend no devuelve la estructura esperada. Verifica:
- Que el backend esté corriendo en `http://localhost:5000`
- Que los endpoints devuelvan la estructura correcta
- Que uses optional chaining (`?.`) para propiedades opcionales

### CORS Errors

Si ves errores de CORS, asegúrate de que el backend tenga configurado CORS para permitir requests desde `http://localhost:5173`.

---

## 📝 Notas Adicionales

- El proyecto está estructurado para ser fácilmente escalable
- Los componentes son modulares y reutilizables
- El manejo de estado se hace principalmente con `useState` y `useEffect` de React
- La autenticación persiste en `localStorage` (el token y datos del usuario)

---

## 📄 Licencia

Este proyecto fue desarrollado como parte de una prueba técnica.

---

## 👤 Autor

Desarrollado con ❤️ para la gestión de torneos de cocina.

---

## 🔗 Enlaces Relacionados

- [Documentación del Backend](../backend/README.md) (si está en el mismo repositorio)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [React Router Documentation](https://reactrouter.com/)



BACKEND


# 🍳 Kitchen Fighters - API Backend

API RESTful para la gestión de torneos de cocina. Sistema completo que permite registrar chefs, crear torneos, inscribir participantes, enviar puntuaciones y consultar rankings.

## 📋 Tabla de Contenidos

- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Endpoints de la API](#endpoints-de-la-api)
- [Autenticación](#autenticación)
- [Reglas de Negocio](#reglas-de-negocio)
- [Ejemplos de Uso](#ejemplos-de-uso)
- [Validaciones](#validaciones)
- [Manejo de Errores](#manejo-de-errores)
- [Testing](#testing)

## 🔧 Requisitos

- **Node.js**: v18 o superior
- **MongoDB**: Base de datos MongoDB (MongoDB Atlas)
- **npm** o **yarn**: Gestor de paquetes

### Verificar instalación:

```bash
# Verificar versión de Node.js
node --version

# Verificar versión de npm
npm --version

# Verificar instalación de MongoDB (si es local)
mongod --version
```

## 🚀 Instalación

### Paso 1: Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd Kitchen_Fighters_BackEnd
```

### Paso 2: Instalar dependencias

Usando **npm** (recomendado):
```bash
npm install
```

O usando **yarn**:
```bash
yarn install
```

O usando **pnpm**:
```bash
pnpm install
```

Esto instalará todas las dependencias necesarias listadas en `package.json`:
- Express, Mongoose, JWT, bcryptjs, etc.

### Paso 3: Configurar variables de entorno

Crear archivo `.env` en la raíz del proyecto (ver sección [Configuración](#configuración))

### Paso 4: Iniciar el servidor
```bash
# Modo desarrollo (con nodemon)
npm run dev

# Modo producción
npm start
```

El servidor estará disponible en `http://localhost:5000` (o el puerto configurado en `.env`)

## ⚙️ Configuración

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Puerto del servidor
PORT=5000

# MongoDB Connection String
MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/nombre_db?retryWrites=true&w=majority

# JWT Secret (para autenticación)
JWT_SECRET=tu_secreto_jwt_muy_seguro_aqui

# Frontend URL (para enlaces de reseteo de contraseña)
FRONTEND_URL=http://localhost:3000

# Email Configuration (para reseteo de contraseña)
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_contraseña_de_aplicacion
```

### 📧 Configuración de Email (Reseteo de Contraseña)

⚠️ **IMPORTANTE:** La funcionalidad de reseteo de contraseña requiere un **correo electrónico real** configurado. El sistema envía emails reales a los usuarios cuando solicitan restablecer su contraseña.

#### Configuración para Gmail:

1. **Usar un correo Gmail real** que tengas acceso.

2. **Generar una "Contraseña de aplicación"** (no uses tu contraseña normal):
   - Ve a tu cuenta de Google: https://myaccount.google.com/
   - Seguridad → Verificación en dos pasos (debe estar activada)
   - Busca "Contraseñas de aplicaciones"
   - Genera una nueva contraseña para "Correo" y "Otro (personalizado)" → nombre: "Kitchen Fighters"
   - **Copia la contraseña generada** (16 caracteres sin espacios)

3. **Configurar en `.env`:**
   ```env
   EMAIL_USER=tu_email_real@gmail.com
   EMAIL_PASS=la_contraseña_de_aplicacion_generada
   ```

#### Configuración para otros proveedores:

Si usas otro proveedor de email (Outlook, Yahoo, etc.), modifica `src/config/mailer.js` con los datos SMTP correspondientes:
- **Outlook/Hotmail:** `smtp-mail.outlook.com`, puerto 587
- **Yahoo:** `smtp.mail.yahoo.com`, puerto 465 o 587

#### Verificación:

Al iniciar el servidor, deberías ver en la consola:
```
Nodemailer listo para enviar correos.
```

Si ves un error, revisa que:
- `EMAIL_USER` sea un correo real y válido
- `EMAIL_PASS` sea la contraseña de aplicación correcta (no tu contraseña normal)
- Tengas la verificación en 2 pasos activada (si usas Gmail)

## 📁 Estructura del Proyecto

```
Kitchen_Fighters_BackEnd/
├── src/
│   ├── config/
│   │   ├── db.js              # Configuración de MongoDB
│   │   ├── mailer.js          # Configuración de nodemailer
│   │   └── multer.config.js   # Configuración de carga de archivos
│   ├── controllers/
│   │   ├── admin.controller.js    # Controladores de administración
│   │   ├── chef.controller.js     # Controladores de chefs
│   │   └── tournament.controller.js # Controladores de torneos
│   ├── middleware/
│   │   ├── auth.middleware.js     # Middleware de autenticación JWT
│   │   ├── checkAdmin.middleware.js # Middleware de verificación de admin
│   │   └── logger.js              # Middleware de logging (morgan)
│   ├── models/
│   │   ├── chef.model.js          # Modelo de Chef (Mongoose)
│   │   └── tournament.model.js    # Modelo de Tournament (Mongoose)
│   └── routes/
│       ├── admin.routes.js        # Rutas de administración
│       ├── chef.routes.js         # Rutas de chefs
│       ├── tournament.routes.js   # Rutas de torneos
│       └── index.js               # Router principal
├── uploads/                       # Directorio para imágenes subidas
├── .env                           # Variables de entorno
├── index.js                         # Punto de entrada de la aplicación
└── package.json
```

## 🌐 Endpoints de la API

### Base URL
```
http://localhost:5000/api
```

### 🔓 Endpoints Públicos (Chefs)

#### POST `/api/chefs`
Registrar un nuevo chef.

**Request Body:**
```json
{
  "name": "Juan Pérez",
  "specialty": "Cocina Italiana",
  "experienceYears": 5,
  "email": "juan@example.com",
  "password": "password123"
}
```

**Response (201 Created):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Juan Pérez",
  "specialty": "Cocina Italiana",
  "experienceYears": 5,
  "email": "juan@example.com",
  "role": "user",
  "createdAt": "2024-01-15T10:00:00.000Z",
  "updatedAt": "2024-01-15T10:00:00.000Z"
}
```

#### POST `/api/chefs/login`
Iniciar sesión.

**Request Body:**
```json
{
  "email": "juan@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "chef": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "role": "user"
  }
}
```

#### GET `/api/chefs`
Listar todos los chefs (público, sin email).

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Juan Pérez",
    "specialty": "Cocina Italiana",
    "experienceYears": 5
  }
]
```

#### GET `/api/chefs/:id`
Obtener información de un chef específico.

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Juan Pérez",
  "specialty": "Cocina Italiana",
  "experienceYears": 5,
  "role": "user"
}
```

#### POST `/api/chefs/forgot-password`
Solicitar reseteo de contraseña. El sistema enviará un email real al usuario con un enlace para restablecer su contraseña.

⚠️ **Requisito:** Debe estar configurado un correo real en las variables de entorno (`EMAIL_USER` y `EMAIL_PASS`) para que esta funcionalidad funcione.

**Request Body:**
```json
{
  "email": "juan@example.com"
}
```

**Response (200 OK):**
```json
{
  "message": "Si el correo está registrado, recibirás un enlace de reseteo."
}
```

**Nota:** Por seguridad, el sistema siempre responde con éxito, incluso si el email no existe en la base de datos.

#### POST `/api/chefs/reset-password/:token`
Restablecer contraseña usando el token recibido por email.

**Request Body:**
```json
{
  "password": "nuevaPassword123"
}
```

### 🔒 Endpoints Protegidos (Requieren Token JWT)

#### GET `/api/chefs/me`
Obtener perfil del chef autenticado.

**Headers:**
```
Authorization: Bearer <token>
```

#### PUT `/api/chefs/profile`
Actualizar perfil del chef autenticado (incluye carga de imagen).

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body (form-data):**
- `description`: (opcional) Nueva descripción
- `specialty`: (opcional) Nueva especialidad
- `experienceYears`: (opcional) Nuevos años de experiencia
- `profileImage`: (opcional) Archivo de imagen

### 🏆 Endpoints de Torneos

#### POST `/api/tournaments`
Crear un nuevo torneo.

**Request Body:**
```json
{
  "name": "Torneo de Cocina 2024",
  "inicio": "2024-12-15T10:00:00Z"
}
```

**Response (201 Created):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Torneo de Cocina 2024",
  "inicio": "2024-12-15T10:00:00.000Z",
  "estado": "Pendiente",
  "participants": [],
  "results": [],
  "createdAt": "2024-01-15T10:00:00.000Z"
}
```

#### GET `/api/tournaments`
Listar todos los torneos.

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Torneo de Cocina 2024",
    "inicio": "2024-12-15T10:00:00.000Z",
    "estado": "Pendiente",
    "participants": []
  }
]
```

#### GET `/api/tournaments/:id`
Obtener detalles de un torneo específico.

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Torneo de Cocina 2024",
  "inicio": "2024-12-15T10:00:00.000Z",
  "estado": "En Curso",
  "participants": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Juan Pérez",
      "specialty": "Cocina Italiana"
    }
  ],
  "results": []
}
```

#### POST `/api/tournaments/:id/register` 🔒
Inscribir un chef en un torneo (requiere autenticación).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "message": "Chef inscrito correctamente"
}
```

#### POST `/api/tournaments/:id/submit` 🔒
Enviar puntuación de un chef para un torneo (requiere autenticación).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "chefId": "507f1f77bcf86cd799439011",
  "score": 85
}
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "estado": "En Curso",
  "results": [
    {
      "chef": "507f1f77bcf86cd799439011",
      "score": 85
    }
  ]
}
```

#### GET `/api/tournaments/:id/ranking`
Obtener el ranking de un torneo ordenado por puntuación.

**Response (200 OK):**
```json
[
  {
    "chef": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Juan Pérez"
    },
    "score": 95
  },
  {
    "chef": {
      "_id": "507f1f77bcf86cd799439013",
      "name": "María García"
    },
    "score": 88
  }
]
```

### 👨‍💼 Endpoints de Administración (Requieren rol Admin)

**Todos los endpoints de admin requieren:**
- Token JWT válido
- Rol de usuario: `admin`

#### GET `/api/admin/chefs`
Obtener todos los chefs (solo admin).

#### PUT `/api/admin/chefs/:id`
Cambiar rol de un chef.

**Request Body:**
```json
{
  "role": "admin"
}
```

#### DELETE `/api/admin/chefs/:id`
Eliminar un chef.

#### GET `/api/admin/tournaments`
Obtener todos los torneos con detalles completos.

#### POST `/api/admin/tournaments`
Crear torneo (versión admin con más campos).

**Request Body:**
```json
{
  "name": "Torneo Master Chef",
  "startDate": "2024-12-15",
  "description": "Torneo de alto nivel",
  "maxParticipants": 16
}
```

#### PUT `/api/admin/tournaments/:id`
Actualizar torneo.

#### DELETE `/api/admin/tournaments/:id`
Eliminar torneo.

#### PUT `/api/admin/tournaments/:id/results`
Actualizar resultados del torneo en lote.

**Request Body:**
```json
{
  "results": [
    {
      "chef": "507f1f77bcf86cd799439011",
      "score": 95
    },
    {
      "chef": "507f1f77bcf86cd799439013",
      "score": 88
    }
  ]
}
```

## 🔐 Autenticación

La API utiliza JWT (JSON Web Tokens) para autenticación.

### Cómo obtener un token:

1. Registrar un chef con `POST /api/chefs`
2. Iniciar sesión con `POST /api/chefs/login`
3. El token se devuelve en la respuesta del login

### Cómo usar el token:

Incluir el token en el header `Authorization` de todas las peticiones protegidas:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Expiración del token:

Los tokens expiran después de **1 hora**. Después de esto, el usuario debe iniciar sesión nuevamente.

### 🔑 Credenciales de Prueba (Admin)

Para facilitar las pruebas, existe un usuario administrador preconfigurado:

**Usuario Admin:**
- **Email:** `Juanfelipejaramillohenao@gmail.com`
- **Contraseña:** `123456`
- **Rol:** `admin`

Puedes usar estas credenciales para:
- Probar endpoints de administración (`/api/admin/*`)
- Acceder a funcionalidades exclusivas de admin
- Gestionar torneos y chefs

**Ejemplo de login con credenciales de admin:**
```bash
curl -X POST http://localhost:5000/api/chefs/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "Juanfelipejaramillohenao@gmail.com",
    "password": "123456"
  }'
```

⚠️ **Nota de Seguridad:** Estas credenciales son solo para desarrollo/pruebas. En producción, asegúrate de cambiar las contraseñas por defecto.

## 📜 Reglas de Negocio

### Torneos

1. **Estados del torneo:**
   - `Pendiente`: El torneo aún no ha comenzado, se pueden inscribir chefs
   - `En Curso`: El torneo ha comenzado, se pueden enviar puntuaciones
   - `Finalizado`: Todos los participantes han enviado sus puntuaciones
   - `Cancelado`: El torneo fue cancelado

2. **Inscripción de chefs:**
   - Solo se pueden inscribir chefs cuando el torneo está en estado `Pendiente`
   - Un chef no puede inscribirse dos veces en el mismo torneo
   - El torneo puede tener un límite máximo de participantes (`maxParticipants`)

3. **Puntuaciones:**
   - Solo los chefs inscritos pueden enviar puntuaciones
   - Cada chef solo puede enviar una puntuación por torneo
   - Las puntuaciones deben estar entre 0 y 100
   - Cuando un chef envía su primera puntuación, el torneo pasa automáticamente a estado `En Curso`
   - Cuando todos los participantes han enviado sus puntuaciones, el torneo pasa a estado `Finalizado`

4. **Ranking:**
   - El ranking se ordena por puntuación de mayor a menor
   - Solo se muestran chefs que han enviado su puntuación

### Chefs

1. **Roles:**
   - `user`: Usuario estándar (por defecto)
   - `admin`: Administrador con acceso a rutas especiales

2. **Validaciones:**
   - El email debe ser único
   - La contraseña debe tener al menos 6 caracteres
   - Los años de experiencia deben ser un número positivo (>= 0)

## 💡 Ejemplos de Uso

### Flujo completo: Crear torneo, inscribir chef y enviar puntuación

#### 1. Registrar un chef

```bash
curl -X POST http://localhost:5000/api/chefs \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "specialty": "Cocina Italiana",
    "experienceYears": 5,
    "email": "juan@example.com",
    "password": "password123"
  }'
```

#### 2. Iniciar sesión

```bash
curl -X POST http://localhost:5000/api/chefs/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@example.com",
    "password": "password123"
  }'
```

Guardar el `token` de la respuesta.

#### 3. Crear un torneo

```bash
curl -X POST http://localhost:5000/api/tournaments \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Torneo de Cocina 2024",
    "inicio": "2024-12-15T10:00:00Z"
  }'
```

Guardar el `_id` del torneo.

#### 4. Inscribir chef en el torneo

```bash
curl -X POST http://localhost:5000/api/tournaments/TOURNAMENT_ID/register \
  -H "Authorization: Bearer TOKEN_AQUI" \
  -H "Content-Type: application/json"
```

#### 5. Enviar puntuación

```bash
curl -X POST http://localhost:5000/api/tournaments/TOURNAMENT_ID/submit \
  -H "Authorization: Bearer TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "chefId": "CHEF_ID_AQUI",
    "score": 85
  }'
```

#### 6. Ver ranking

```bash
curl http://localhost:5000/api/tournaments/TOURNAMENT_ID/ranking
```

## ✅ Validaciones

### Chef
- `name`: Obligatorio, string
- `specialty`: Obligatorio, string
- `experienceYears`: Obligatorio, número >= 0
- `email`: Obligatorio, formato de email válido, único
- `password`: Obligatorio, mínimo 6 caracteres

### Torneo
- `name`: Obligatorio, string, único
- `inicio`: Opcional, fecha válida (formato ISO 8601)
- `estado`: Automático, enum: `['Pendiente', 'En Curso', 'Finalizado', 'Cancelado']`

### Puntuación
- `score`: Obligatorio, número entre 0 y 100
- `chefId`: Obligatorio, ID válido de un chef inscrito en el torneo

## 🚨 Manejo de Errores

La API devuelve códigos de estado HTTP estándar:

- `200 OK`: Petición exitosa
- `201 Created`: Recurso creado exitosamente
- `400 Bad Request`: Error de validación o datos incorrectos
- `401 Unauthorized`: Token inválido o faltante
- `403 Forbidden`: Acceso denegado (requiere rol admin)
- `404 Not Found`: Recurso no encontrado
- `409 Conflict`: Conflicto (ej: email duplicado, torneo lleno)
- `500 Internal Server Error`: Error interno del servidor

### Formato de error:

```json
{
  "message": "Descripción del error",
  "errors": {
    "campo": "Mensaje de error específico"
  }
}
```

### Ejemplos de errores comunes:

```json
// Email duplicado
{
  "message": "El correo electrónico 'juan@example.com' ya está en uso."
}

// Torneo lleno
{
  "message": "El torneo ya alcanzó el límite de participantes"
}

// Chef ya inscrito
{
  "message": "Ya estás inscrito en este torneo"
}

// Puntuación inválida
{
  "message": "El score debe estar entre 0 y 100"
}
```

## 🧪 Testing

### Ejecutar el servidor en modo desarrollo:

```bash
npm run dev
```

### Probar endpoints con curl o Postman:

1. Importar la colección de Postman (si está disponible)
2. O usar los ejemplos de curl proporcionados arriba

### Variables de entorno para testing:

Para pruebas locales, asegúrate de tener configurado:
- `MONGO_URI`: Conexión a una base de datos de prueba
- `JWT_SECRET`: Cualquier string seguro para desarrollo

## 📦 Dependencias Principales

- **express**: Framework web para Node.js
- **mongoose**: ODM para MongoDB
- **jsonwebtoken**: Generación y verificación de tokens JWT
- **bcryptjs**: Hash de contraseñas
- **morgan**: Logger HTTP para desarrollo
- **cors**: Middleware para habilitar CORS
- **multer**: Manejo de carga de archivos
- **nodemailer**: Envío de emails (reseteo de contraseña)
- **dotenv**: Manejo de variables de entorno

## 📝 Notas Importantes

1. **Base de datos**: La API utiliza MongoDB. Asegúrate de tener una instancia corriendo o usar MongoDB Atlas.

2. **Carga de archivos**: Las imágenes de perfil se guardan en `/uploads`. Asegúrate de que este directorio exista.

3. **Seguridad**: 
   - Nunca expongas el `JWT_SECRET` en el código
   - Usa HTTPS en producción
   - Valida todas las entradas del usuario

4. **Producción**: 
   - Cambiar `NODE_ENV=production`
   - Configurar variables de entorno de forma segura
   - Usar una base de datos de producción
   - Configurar logs apropiados

## 🤝 Contribución

Para contribuir al proyecto:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es parte de una prueba técnica.

---
