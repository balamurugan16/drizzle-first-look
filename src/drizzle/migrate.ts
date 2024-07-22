import { drizzle } from "drizzle-orm/postgres-js"
import { migrate } from "drizzle-orm/postgres-js/migrator"
import postgres from "postgres"

//? This file will handle the migrations
//? Add the migration commands in the package.json file

const migrationClient = postgres(process.env.DB_URL as string, { max: 1 })

async function main() {
  await migrate(drizzle(migrationClient), {
    migrationsFolder: "./src/drizzle/migrations"
  })
  await migrationClient.end()
}

main()
