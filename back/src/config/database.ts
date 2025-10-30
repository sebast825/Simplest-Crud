import sql from 'mssql';

import dotenv from 'dotenv';
dotenv.config();

const dbConfig = {
    server: process.env.DB_SERVER ?? 'localhost',
    port: Number(process.env.DB_PORT),
    database: process.env.DB_DATABASE ,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    options: {
        encrypt: process.env.DB_ENCRYPT === 'true',
        trustServerCertificate: process.env.DB_TRUST_CERT === 'true',
        enableArithAbort: true,
    }
};
let pool : sql.ConnectionPool| null = null;;

const connectDB  = async (): Promise<sql.ConnectionPool>   => {
    if (!pool) {
        pool = await sql.connect(dbConfig);
        console.log('Conected to SQL Server');
    }
    return pool;
};

module.exports = { connectDB, sql };