import { PrismaClient } from "@prisma/client";

 async function createDatabaseIfNotExists() {
  let attempts = 0;
  const maxAttempts = 10;
  
  while (attempts < maxAttempts) {
    try {
      const masterDb = new PrismaClient({
        datasources: {
          db: {
            url: "sqlserver://sqlserver:1433;database=master;user=sa;password=Your_password123;trustServerCertificate=true"
          }
        }
      });
   console.log('Executing CREATE DATABASE...');
      await masterDb.$executeRaw`IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'myDb') CREATE DATABASE myDb`;
      
      console.log('Database verified/created successfully');
      await masterDb.$disconnect();
      console.log('Database verified/created');
      return;
    } catch (error: any) {
      attempts++;
      console.log(`Attempt ${attempts}/${maxAttempts}: Database not ready, retrying in 5s...`);
      
      if (attempts === maxAttempts) {
        console.log('Max attempts reached, skipping database creation');
        return;
      }
      
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
}

 async function runMigrations() {
  try {
    // Ejecutar prisma db push para crear las tablas
    const { execSync } = require('child_process');
    execSync('npx prisma db push', { stdio: 'inherit' });


    console.log('Database migrations completed');
  } catch (error: any) {
    console.log('Migration error:', error.message);
  }
}

async function createServer(){
  await createDatabaseIfNotExists();
 await runMigrations();
} 
createServer()