import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
prisma.$connect()
  .then(() => console.log('Conectado a SQL Server con Prisma'))
  .catch((err:any) => console.error('Error de conexión Prisma:', err));

