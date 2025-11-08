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

- Table creation scripts: `/database/schema.sql`


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


## API Routes

### Health Check
- GET `/api/health` - General API status
- GET `/api/health/database` - Database connection status

### Authentication
- POST `/api/auth/login` - User login
- POST `/api/auth/register` - User registration

### Tasks
- GET `/api/tasks/user` - Get user tasks
- POST `/api/tasks` - Create new task
- PATCH `/api/tasks/:taskId` - Update task status
- DELETE `/api/tasks/:taskId` - Delete task

> Note: All Task routes require Authorization header with JWT token.



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

