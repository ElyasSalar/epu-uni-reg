import { createConnection, Connection } from "mysql2/promise";

export default class DbConnection {
  static connection: Connection;

  static async getConnection(): Promise<Connection> {
    if (this.connection) {
      return this.connection;
    }

    const databaseName = process.env.DB_NAME as string;
    const port = Number(process.env.DB_PORT) as number;
    const user = process.env.DB_USER as string;
    const host = process.env.DB_HOST as string;
    const password = process.env.DB_PASSWORD as string;

    this.connection = await createConnection({
      database: databaseName,
      password,
      host,
      user,
      port,
    })
    
    return this.connection;
  }
}