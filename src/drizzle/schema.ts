import { relations } from "drizzle-orm"
import { boolean, integer, pgEnum, pgTable, real, timestamp, unique, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core"

export const UserRole = pgEnum("userRole", ["ADMIN", "BASIC"])

export const UserTable = pgTable("user", {
  //? accepts the column name as the first parameter
  id: uuid("id").primaryKey().defaultRandom(),
  //? Serial is used to create auto incremented indexes
  //? id: serial("id").primaryKey(), 
  name: varchar("name", { length: 255 }).notNull(),
  //? constrainsts like notNull and unique can be chained with the datatypes
  age: integer("age").notNull(),
  //? The datatypes also accepts a second parameter for configuration
  email: varchar("email", { length: 255 }).notNull().unique(),
  role: UserRole("userRole").default("BASIC").notNull()
  //? The third parameter where the constraints and indexes can be configured
}, table => ({
  emailIndex: uniqueIndex("emailIndex").on(table.email),
  //? here this index will check if combination of name and age is unique
  uniqueNameAndAge: unique("uniqueNameAndAge").on(table.name, table.age)
}))

export const UserPreferenceTable = pgTable("userPreference", {
  id: uuid("id").primaryKey().defaultRandom(),
  emailUpdates: boolean("emailUpdates").notNull().default(false),
  //? columns can be referenced using the references property
  //? this will be a foreign key this is the One to one relationship
  userId: uuid("userId").references(() => UserTable.id, {
    //? Here the actions that should happen automatically when a related row is deleted
    //? can be specified, Ondelete and onupdate
    // onDelete: "cascade"
    // onUpdate: "cascade"
  }).notNull()
})

export const PostTable = pgTable("post", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 })
    //? Arrays are also supported if the database supports it
    .notNull(), // .array()
  averageRating: real("userId")
    .notNull()
    .default(0), //? to specify a custom type, chain the following method with type generic .$type<1|2>(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  //? One to many relationship -> Same as One to one relationship
  authorId: uuid("authorId")
    .references(() => UserTable.id)
    .notNull()
})

export const CategoryTable = pgTable("category", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
})

/*
? The below table is a JOIN TABLE which will be a junction table for 
? two tables to map the many to many relationship
*/
export const PostCategoryTable = pgTable(
  "postCategory",
  {
    postId: uuid("postId").references(() => PostTable.id).notNull(),
    categoryId: uuid("categoryId").references(() => CategoryTable.id).notNull(),
  }
)

// ? In drizzle, the relationships should be mentioned twice.
// ? The references function creates a database level relationship
// ? This database level relationship will create a relationship in the db
// ? but Drizzle doesn't know that the relationship exists.

// ? Now a drizzle level relationship should be implemented
// ? This is used only in the query styled api

export const UserTableRelations = relations(UserTable, ({ one, many }) => {
  return {
    preferences: one(UserPreferenceTable),
    posts: many(PostTable)
  }
})
export const UserPreferenceTableRelations = relations(UserPreferenceTable, ({ one }) => {
  return {
    user: one(UserTable, {
      fields: [UserPreferenceTable.userId],
      references: [UserTable.id]
    }),
  }
})

export const PostTableRelations = relations(PostTable, ({ one, many }) => {
  return {
    author: one(UserTable, {
      fields: [PostTable.authorId],
      references: [UserTable.id]
    }),
    postCategories: many(PostCategoryTable)
  }
})

export const CategoryTableRelations = relations(CategoryTable, ({ many }) => {
  return {
    posts: many(PostTable)
  }
})

export const PostCategoryTableRelations = relations(
  PostCategoryTable,
  ({ one }) => {
    return {
      post: one(PostTable, {
        fields: [PostCategoryTable.postId],
        references: [PostTable.id]
      }),
      category: one(CategoryTable, {
        fields: [PostCategoryTable.postId],
        references: [CategoryTable.id]
      })
    }
  }
)
