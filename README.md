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



