# Descripción del proyecto

Esta aplicación es un sistema web fullstack desarrollado con React y Typescript en el frontend y Node.js, Express y Typescript  en el backend, conectado a una base de datos SQL Server. Permite a los usuarios registrarse, iniciar sesión y gestionar tareas a través de un CRUD protegido con autenticación mediante tokens JWT.

## Run App
```bash

## Run the back end
cd back
create .env file with required informaiton follow .env.example
npm install
npm run dev

## Run the front end
cd front
npm install
npm run dev
```

## Backup de la base de datos

```sql
CREATE TABLE users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    email NVARCHAR(255) NOT NULL,
    password NVARCHAR(255) NOT NULL, 
    creationDate DATETIME DEFAULT GETDATE()
);

CREATE TABLE tasks (
    id INT IDENTITY(1,1) PRIMARY KEY,
    title NVARCHAR(255) NOT NULL,
    done BIT DEFAULT 0,
    userId INT NULL,
    createdAt DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_tasks_users FOREIGN KEY (userId) REFERENCES users(id)
);

```

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



