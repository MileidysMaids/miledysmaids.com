import { Pool } from "pg";

const pool = new Pool({
  connectionString: "postgresql://postgres:mysecretpassword@localhost:5432/mileidysmaids",
});

export default { query: (text, params) => pool.query(text, params) };
