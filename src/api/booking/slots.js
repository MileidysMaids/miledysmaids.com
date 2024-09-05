import pool from "../db/db";

export default async (req, res) => {
  try {
    switch (req.method) {
      // Get all booked slots by day
      case "GET": {
        // Extract query parameters from the request
        let { date } = req.query;

        // Validate date parameter
        if (!date) return res.status(400).json({ error: "Date parameter is required" });

        try {
          // Query to get all slots for the given date
          const query = `
          SELECT *
          FROM Slots
          WHERE day = $1;
        `;

          const result = await pool.query(query, [date]);

          // Extract the booked slots for the given date from the query result
          const bookedSlots = [];
          result.rows.map((row) => bookedSlots.push(row.slot_number));

          return res.json({ bookedSlots });
        } catch (error) {
          console.error("Error fetching booked slots by day:", error);
          return res.status(500).json({ error: "Internal Server Error" });
        }
      }

      case "POST": {
        const { slot_number, full_name, phone, day, address, cleaning_service } = req.body;

        const requiredFields = Object.keys(req.body);
        if (requiredFields.some((field) => !req.body[field])) {
          return res.status(400).json({ error: "Missing required fields" });
        }

        try {
          // Check if the slot number already exists for the given day
          const checkSlotQuery = `
          SELECT COUNT(*) AS count
          FROM Slots
          WHERE day = $1 AND slot_number = $2;
        `;

          const slotResult = await pool.query(checkSlotQuery, [day, slot_number]);

          if (slotResult.rows[0].count > 0) {
            return res.status(400).json({ error: "Slot number already exists for the given day" });
          }

          // Insert a new slot
          const insertSlotQuery = ` 
          INSERT INTO Slots (slot_number, phone, day, address, cleaning_service, full_name)
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING *;
        `;

          const newSlotResult = await pool.query(insertSlotQuery, [slot_number, phone, day, address, cleaning_service, full_name]);
          const newSlot = newSlotResult.rows[0];

          // Check if a row for the given day already exists in the "Days" table
          const checkDayQuery = `
          SELECT COUNT(*) AS count
          FROM days
          WHERE day = $1;
        `;

          const dayResult = await pool.query(checkDayQuery, [day]);

          if (dayResult.rows[0].count == 0) {
            // If the row for the given day doesn't exist, insert a new row
            const insertDayQuery = `
            INSERT INTO days (day, booked_slots)
            VALUES ($1, 1);
          `;

            await pool.query(insertDayQuery, [day]);
          } else {
            // If the row for the given day exists, update the booked_slots value
            const updateDayQuery = `
            UPDATE days
            SET booked_slots = booked_slots + 1
            WHERE day = $1;
          `;

            await pool.query(updateDayQuery, [day]);
          }

          res.status(201).json({ success: true, slot: newSlot });
        } catch (error) {
          console.error("Error posting a new slot:", error);
          res.status(500).json({ error: "Internal Server Error" });
        }
      }

      default: {
        return res.status(405).send({ error: "Method not allowed" });
      }
    }
  } catch (error) {
    console.error("Error posting a new slot:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
