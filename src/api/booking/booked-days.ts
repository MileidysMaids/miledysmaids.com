import pool from "../db/db";

export default async (req, res) => {
  try {
    switch (req.method) {
      // Get slots by day
      case "GET": {
        try {
          // Query to get fully booked days within the date range
          const query = `
            SELECT day
            FROM days
            WHERE booked_slots = 5;
          `;

          const result = await pool.query(query);

          // Extract the fully booked days from the query result
          const fullyBookedDays = result.rows.map((row) => row.day);

          return res.json({ fullyBookedDays });
        } catch (error) {
          console.error("Error fetching fully booked days:", error);
          return res.status(500).json({ message: "Internal Server Error", error });
        }
      }

      default: {
        return res.status(405).send({ error: "Method not allowed" });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};
