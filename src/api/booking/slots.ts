import type { Request, Response } from "express";
import { createBookingController, getAllBookedSlotsByDayController } from "../controllers/Booking";

export default async (req: Request, res: Response) => {
  switch (req.method) {
    case "GET":
      return getAllBookedSlotsByDayController(req, res);

    case "POST":
      return createBookingController(req, res);

    default:
      return res.status(405).send({ error: "Method not allowed" });
  }
};
