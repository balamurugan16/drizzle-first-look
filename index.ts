import { asc, count, eq, gt, sql } from "drizzle-orm";
import { db } from "./src/drizzle";
import { UserPreferenceTable, UserTable } from "./src/drizzle/schema";

/*  
? Creating data
? The db instance exposes the insert function
? This looks like a SQL Insert Query
? It accepts one or many values to be inserted just like SQL
? The insert command by default doesn't return any values
*/

db.insert(UserTable).values({
  name: "Bala",
  age: 24,
  email: "balamurugand16@gmail.com"
})
  // ? To return values out form insert command, the following schema needs to be provided
  // ? In this case, the id of the inserted row(s) will be returned with label userId
  .returning({
    userId: UserTable.id
  })


/*
? Querying data
2 types of querying
  - query API
  - SQL Like API
*/

// ? All the tables will be avaiable in the query
const users = await db.query.UserTable.findMany({
  // ? Columns to be exposed
  columns: {
    name: true,
  },
  // ? Key value pair 
  // ? allows to run raw sql using the sql function which accepts a template string
  extras: {
    lowerCase: sql<string>`lower(${UserTable.name})`.as("lowerCaseName")
  },
  // ? The with property will work only when the Drizzle level relationships
  // ? are setup in place
  with: {
    posts: true,
    preferences: true
  },
  orderBy: asc(UserTable.name),
  where: eq(UserTable.age, 23)
})

console.log(users)

const sqlUsers = await db
  .select({ id: UserTable.id, count: count(UserTable.age) })
  .from(UserTable)
  .where(eq(UserTable, 21))
  .leftJoin(
    UserPreferenceTable,
    eq(UserPreferenceTable.userId, UserTable.id)
  ).orderBy(UserTable.name)
  .groupBy(UserTable.age)
  .having(columns => gt(columns.count, 1))

// ? Update

// const updatedUser = await db.update(UserTable).set({
//   age: 30
// }).where(eq(UserTable.age, 2))

// ? Delete
// const deletedUser = await db.delete(UserTable).where(eq(UserTable.age, 2))