import { defineConfig } from "drizzle-kit";

// @ts-ignore
export default defineConfig({
  schema: "./src/api/_internal/db/tables.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: false,
  },
});
