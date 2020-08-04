import { Client } from "./deps.ts";
import CONFIG from "./config.ts";

const dbClient = new Client(CONFIG);
await dbClient.connect();
const result = await dbClient.query("SELECT * FROM users;");
console.log(result.rows);
// await dbClient.end();
export default dbClient;
