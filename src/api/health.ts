import type { Request, Response } from "express";
import { getAllBookedDaysController } from "./_internal/controllers/Booking";

export default async (req: Request, res: Response) => {
  try {
    switch (req.method) {
      case "GET":
        // Get fully booked slots for today for testing
        return getAllBookedDaysController(req, res);

      default:
        return res.status(405).send({ error: "Method not allowed" });
    }
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error: { error, message: error.message } });
  }
};
