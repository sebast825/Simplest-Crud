import sql from "mssql";
import { ENV } from "./env";

const dbConfig = {
  server: ENV.DB_SERVER ?? "localhost",
  port: Number(ENV.DB_PORT),
  database: ENV.DB_DATABASE,
  user: ENV.DB_USER,
  password: ENV.DB_PASSWORD,
  options: {
    encrypt: ENV.DB_ENCRYPT,
    trustServerCertificate: ENV.DB_TRUST_CERT,
    enableArithAbort: true,
  },
};
let pool: sql.ConnectionPool | null = null;

const connectDB = async (): Promise<sql.ConnectionPool> => {
  if (!pool) {
    pool = await sql.connect(dbConfig);
    console.log("Conected to SQL Server");
  }
  return pool;
};

export { connectDB, sql };
