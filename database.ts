import { Database } from "./deps.ts";
import User from "./models/User.ts";

const db = new Database("sqlite3", {
  filepath: "./database.sqlite",
});

db.link([User]);
db.sync();
