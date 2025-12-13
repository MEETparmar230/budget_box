import { integer, jsonb, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";


export const users = pgTable("users",{
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    email: varchar({length:255}).notNull().unique(),
    password: varchar({length:255}).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull()
})

export const budgets = pgTable("budgets",{
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: integer("user_id").notNull().references(() => users.id),
    month: varchar({length:20}).notNull(),
    income:integer().notNull(),
    bills: integer().notNull(),
    food: integer().notNull(),
    transport: integer().notNull(),
    subscriptions: integer().notNull(),
    miscellaneous: integer().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    rawJson:jsonb("raw_json")
})