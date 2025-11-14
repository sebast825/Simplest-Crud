import { PrismaClient } from "@prisma/client";

import dotenv from "dotenv";
dotenv.config();

const dbName = process.env.DATABASE_NAME || "my_app_database";
const dbUser = process.env.DATABASE_USER || "sa";
const dbPassword = process.env.DATABASE_PASSWORD || "Your_password123";

async function createDatabaseIfNotExists() {
  let attempts = 0;
  const maxAttempts = 10;

  while (attempts < maxAttempts) {
    try {
      const masterDb = new PrismaClient({
        datasources: {
          db: {
            url: `sqlserver://sqlserver:1433;database=master;user=${dbUser};password=${dbPassword};trustServerCertificate=true`,
          },
        },
      });
      await masterDb.$executeRaw`IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = ${dbName}) CREATE DATABASE ${dbName}`;

      await masterDb.$disconnect();
      console.log("Database verified/created");
      return;
    } catch (error: any) {
      attempts++;
      console.log(
        `Attempt ${attempts}/${maxAttempts}: Database not ready, retrying in 5s...`
      );

      if (attempts === maxAttempts) {
        console.log("Max attempts reached, skipping database creation");
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
}

async function runMigrations() {
  try {
    // Ejecutar prisma db push para crear las tablas
    const { execSync } = require("child_process");
    execSync("npx prisma db push", { stdio: "inherit" });

    console.log("Database migrations completed");
  } catch (error: any) {
    console.log("Migration error:", error.message);
  }
}

async function createServer() {
  await createDatabaseIfNotExists();
  await runMigrations();
}
createServer();
