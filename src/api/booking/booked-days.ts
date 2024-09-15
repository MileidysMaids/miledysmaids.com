import { Request, Response } from "express";
import { prisma } from "../db/db";

export default async (req: Request, res: Response) => {
  try {
    switch (req.method) {
      // Get slots by day
      case "GET": {
        return res.status(200).json({ fullyBookedDays: [] });
        const fullyBookedDays = await prisma.day.findMany({
          where: { booked_slots: 5 },
          select: { day: true },
        });
        return res.json({ fullyBookedDays: fullyBookedDays.map((day) => day.day) });
      }

      default: {
        return res.status(405).send({ error: "Method not allowed" });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};
