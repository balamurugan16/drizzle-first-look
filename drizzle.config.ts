import { defineConfig } from "drizzle-kit"

/*
? Migration files are created and applied using this file
? Drizzle config is required to configure the 
? dialect, connection string, schema file and migrations.
? Drizzle studio also uses this file
*/

export default defineConfig({
  schema: "./src/drizzle/schema.ts",
  out: "./src/drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DB_URL as string
  }
})
