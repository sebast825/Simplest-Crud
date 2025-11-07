# Project Description

This application is a full-stack web system developed with React and TypeScript on the frontend, and Node.js, Express, and TypeScript on the backend, connected to a SQL Server database.
It allows users to register, log in, and manage tasks through a CRUD protected by JWT token authentication.

## Run App
```bash

## Run the back end
cd back
# create .env file with required informaiton follow .env.example
npm install
npm run dev

## Run the front end
cd front
npm install
npm run dev
```

## Database Backup

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

## Main Features

- User registration and login with secure authentication.
- Task CRUD accessible only to authenticated users.
- Secure token handling stored in cookies.
- SQL Server database connection for data persistence.
- Modular and well-organized code following good development practices.

## Technologies

- Frontend: React + TypeScript
- Backend: Node.js + Express
- Database: SQL Server
- Authentication: JWT
- Styles: Bootstrap

## Project Structure
```bash
Project/
├─ back/
│ ├─ src/
│ │ ├─ config/
│ │ ├─ controllers/
│ │ ├─ database/
│ │ ├─ dto/
│ │ ├─ helpers/
│ │ ├─ middlewares/
│ │ ├─ repositories/
│ │ ├─ routes/
│ │ ├─ services/
│ │ └─ server.ts
│ ├─ .env.Example
│ ├─ .gitignore
│ ├─ package.json
│ └─ tsconfig.json
│
├─ front/
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
│ ├─ index.html
│ ├─ eslint.config.js
│ README.md

```



