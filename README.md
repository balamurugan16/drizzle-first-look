# Drizzle ORM
  - Object Relational Mapper
  - Unopinionated → No need to build the application around Drizzle like Hibernate or Entity framework
  - Drizzle is like Tailwind whereas Others are like Bootstrap
  - Drizzle has adapters for all drivers and databases
  - Drizzle allows to use our own driver to connect with databases
  - Eg: Postgres has node-postgres, pg, neon etc.

## Features
  - Adapters for all databases
  - Flexible and unopinionated
  - Create and apply migrations

## Key takeaways
  - Lightweight, flexible, and unopinionated
  - Provides adapter for all drivers and databases
  - Drizzlekit -> migrations
  - Drizzlestudio -> DB client UI
  - Create schemas 
    - Table name is first parameter
    - Provides functions for each databases
    - Provides database specific datatypes for columns
    - Constraints can be added by chaining
    - indexes can be added as the third parameter
    - Relationships can be added using the references method
    - Join tables should be created for many to many relationship
  - Inserting data
    - Similar to SQL query
    - Does not return any data unless provided in the returning method
  - Querying data
    - 2 styes (SQL like and Query like)
    - Query like is similar to prisma
    - To work with relationships, drizzle level relationships should be created
    - SQL like is simple and similar to SQL queries.
    - the `sql` function can be used to inject raw sql string
  = inserting and updating are similar to sql queries