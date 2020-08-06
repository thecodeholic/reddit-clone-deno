import { Client, QueryConfig } from "./deps.ts";
import CONFIG from "./config.ts";

const dbClient = new Client(CONFIG.db);
await dbClient.connect();
const result = await dbClient.query("SELECT * FROM users;");
console.log(result.rows);
// await dbClient.end();

export const queryArray = async (
  sql: string | QueryConfig,
  ...args: any[]
): Promise<any[]> => {
  const result = await dbClient.query(sql, ...args);

  return result.rows.map((row) => {
    return result.rowDescription.columns.reduce((obj: any, column, ind) => {
      obj[column.name] = row[ind];
      return obj;
    }, {});
  });
};

export const queryOne = async (sql: string | QueryConfig, ...args: any[]) => {
  const rows = await queryArray(sql, ...args);
  return rows[0];
};

export default dbClient;
