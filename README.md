# Descripción del proyecto

Esta aplicación es un sistema web fullstack desarrollado con React y Typescript en el frontend y Node.js, Express y Typescript  en el backend, conectado a una base de datos SQL Server. Permite a los usuarios registrarse, iniciar sesión y gestionar tareas a través de un CRUD protegido con autenticación mediante tokens JWT.

## Funcionalidades principales
- Registro y login de usuarios con autenticación segura.
- CRUD de tareas accesible solo para usuarios autenticados.
- Manejo seguro de tokens almacenados en cookies.
- Conexión a base de datos SQL Server para persistencia de datos.
- Código modular y organizado siguiendo buenas prácticas de desarrollo.

## Tecnologías usadas
- **Frontend:** React Typescript
- **Backend:** Node.js + Express
- **Base de datos:** SQL Server
- **Autenticación:** JWT
- **Estilos:** Bootstrap

## Estructura de Proyecto
```bash
SIMPLSET/
├─ back/
│ ├─ node_modules/
│ ├─ src/
│ │ ├─ config/
│ │ ├─ controllers/
│ │ ├─ database/
│ │ ├─ dto/
│ │ ├─ helpers/
│ │ ├─ middlewares/
│ │ ├─ routes/
│ │ ├─ services/
│ │ └─ server.ts
│ ├─ .env
│ ├─ .env.Example
│ ├─ .gitignore
│ ├─ package.json
│ ├─ package-lock.json
│ └─ tsconfig.json
│
├─ front/
│ ├─ node_modules/
│ ├─ public/
│ ├─ src/
│ │ ├─ api/
│ │ ├─ assets/
│ │ ├─ hooks/
│ │ ├─ modals/
│ │ ├─ pages/
│ │ ├─ routes/
│ │ ├─ types/
│ │ ├─ App.css
│ │ ├─ App.tsx
│ │ ├─ index.css
│ │ └─ main.tsx
│ ├─ .gitignore
│ ├─ package.json
│ ├─ package-lock.json
│ ├─ index.html
│ ├─ eslint.config.js
│ └─ README.md

```
