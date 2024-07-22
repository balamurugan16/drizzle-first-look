// node postgres wrapper function
import postgres from "postgres"
import { drizzle } from "drizzle-orm/postgres-js"
import * as schema from "./schema"

/*
The steps remains the same for any driver to create a db instance in drizzle

- Create a client from the driver
- Pass the client in the driver specific drizzle
  function to get the database instance

For example, if node-postgres is the driver, then
*/

const client = postgres(process.env.DB_URL as string)
export const db = drizzle(client, { schema })