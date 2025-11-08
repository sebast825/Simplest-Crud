import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  DB_SERVER: process.env.DB_SERVER!,
  DB_DATABASE: process.env.DB_DATABASE!,
  DB_USER: process.env.DB_USER!,
  DB_PASSWORD: process.env.DB_PASSWORD!,
  DB_ENCRYPT: process.env.DB_ENCRYPT === "true",
  DB_TRUST_CERT: process.env.DB_TRUST_CERT === "true",
  PORT: process.env.PORT || "3000",
  DB_PORT: process.env.DB_PORT,
  JWT_SECRET: process.env.JWT_SECRET!,
  EXPIRES_IN: process.env.EXPIRES_IN || "1h",
  JWT_ISSUER: process.env.JWT_ISSUER!,
  JWT_AUDIENCE: process.env.JWT_AUDIENCE!,
};
