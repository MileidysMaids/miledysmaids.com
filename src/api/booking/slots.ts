import { prisma } from "../db/db";
import type { FormValues } from "@/types/bookingTypes";
import type { Request, Response } from "express";

type day = {
  date: string;
};

export default async (req: Request, res: Response) => {
  try {
    switch (req.method) {
      // Get all booked slots by day
      case "GET": {
        // Extract query parameters from the request
        let { date } = req.query as day;

        // Validate date parameter
        if (!date) return res.status(400).json({ error: "Date parameter is required" });

        try {
          // Query to get all slots for the given date
          const bookedSlots = await prisma.days.findMany({
            where: { day: new Date(date) },
            select: { Slots: { select: { slot_number: true } } },
          });

          return res.json({ bookedSlots });
        } catch (error) {
          console.error("Error fetching booked slots by day:", error);
          return res.status(500).json({ message: "Error fetching booked slots by day", error });
        }
      }

      case "POST": {
        const { address, contact, service, slot } = JSON.parse(req.body);

        // Step 1: Create or find the customer based on their contact info (email or phone)
        const customer = await prisma.customer.upsert({
          where: { email: contact.email },
          update: {
            fullName: contact.full_name,
            phone: contact.phone,
          },
          create: {
            fullName: contact.full_name,
            phone: contact.phone,
            email: contact.email,
          },
        });

        const createdService = await prisma.service.create({
          data: {
            cleaningCategory: service.cleaning_category,
            cleaningSubCategory: service.cleaning_sub_category,
            bedroomCount: service.bedroom_count,
            bathroomCount: service.bathroom_count,
            windowCount: service.window_count,
            ovenCount: service.oven_count,
            includesBaseboardCleaning: service.includes_baseboard_cleaning,
            includesKitchenCabinetCleaning: service.includes_kitchen_cabinet_cleaning,
            includesBathroomCabinetCleaning: service.includes_bathroom_cabinet_cleaning,
            includesLinenChange: service.includes_linen_change,
            includesBasement: service.includes_basement,
            petPresent: service.pet_present,
            squareFeet: service.square_feet,
            packageType: service.package_type,
            serviceFrequency: service.service_frequency,
            refrigeratorCount: service.refrigerator_count,
            microwaveCount: service.microwave_count,
          },
        });
      }

      default: {
        return res.status(405).send({ error: "Method not allowed" });
      }
    }
  } catch (error) {
    console.error("Error posting a new slot:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};
