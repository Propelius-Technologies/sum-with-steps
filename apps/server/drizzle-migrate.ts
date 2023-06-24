import 'dotenv/config'
import {db} from "./lib/db/schema";
import {migrate} from "drizzle-orm/postgres-js/migrator";

migrate(db, { migrationsFolder: "drizzle" }).then(() => {
  console.log("Migrations complete")
}).catch((err) => {
  console.error("Error running migrations", err);
}).finally(() => {
  process.exit(0);
});
