import { createPool } from "mysql2/promise";
import dbConfig from "../config/db.config";

export async function connect() {
  const connection = await createPool({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    connectionLimit: 10,
  });

  return connection;
}
