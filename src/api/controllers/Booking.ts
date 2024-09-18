import { Request, Response } from "express";
import { prisma } from "../db/db";
import moment from "moment";

export const createBookingController = async (req: Request, res: Response) => {
  try {
    const { address, contact, service, slot } = JSON.parse(req.body);

    // Create or find the customer based on their contact info (email or phone)
    const customer = await prisma.customer.upsert({
      where: { email: contact.email },
      update: { phone: contact.phone },
      create: contact,
    });

    // Create the service details
    const createdService = await prisma.service.create({ data: service });

    // Create the address
    const createdAddress = await prisma.address.create({ data: address });

    // Update the slot status to "BOOKED" and associate it with the booking
    const createdSlot = await prisma.slot.create({ data: slot });

    // Step 5: Create the booking by linking customer, service, address, and slot
    const booking = await prisma.booking.create({
      data: {
        customer: { connect: { id: customer.id } },
        slot: { connect: { id: createdSlot.id } },
        service: { connect: { id: createdService.id } },
        address: { connect: { id: createdAddress.id } },
      },
    });

    return res.status(200).json({ message: "Booking created successfully", booking });
  } catch (error) {
    console.error("Error creating booking:", error);
    return res.status(500).json({ message: "Error creating booking", error });
  }
};

export const getAllBookedSlotsByDayController = async (req: Request, res: Response) => {
  try {
    const { date } = req.query as { date: string };

    const bookedSlots = await prisma.slot.findMany({
      where: {
        date: {
          gte: moment(date).startOf("day").toDate(),
          lte: moment(date).endOf("day").toDate(),
        },
      },
      include: { booking: { select: { id: true } } },
      orderBy: { time: "asc" },
    });

    return res.status(200).json({ bookedSlots });
  } catch (error) {
    console.error("Error getting booked slots:", error);
    return res.status(500).json({ message: "Error getting booked slots", error });
  }
};

export const getAllBookedDaysController = async (req: Request, res: Response) => {
  // Helper function to normalize time (adds leading zero for hours and ensures space before AM/PM)
  const normalizeTime = (time: string) => {
    return moment(time, ["h:mm A", "hh:mm A"]).format("hh:mm A").trim().toUpperCase();
  };

  const requiredTimes: string[] = ["8:00AM", "9:00AM", "10:00AM", "11:00AM", "12:00PM", "1:00PM", "2:00PM"];

  try {
    // Get fully booked days between start date and a month in the future
    const fullyBookedSlots = await prisma.slot.findMany({
      where: {
        date: {
          gte: moment().startOf("day").add(1, "day").toDate(),
          lte: moment().add(1, "month").endOf("day").toDate(),
        },
      },
      select: { date: true },
      orderBy: { date: "asc" },
    });

    // Process the booked slots to find fully booked days
    const slotsByDate = fullyBookedSlots.reduce(
      (acc, slot) => {
        const slotDate = new Date(slot.date);

        // Convert the UTC time to local time using Moment.js
        const localTime = moment(slotDate).local(); // Converts to local time

        // Extract the date in YYYY-MM-DD format and time in HH:mm AM/PM format
        const dateKey = localTime.format("YYYY-MM-DD"); // Local date
        const timeKey = localTime.format("hh:mm A"); // Local time

        if (!acc[dateKey]) acc[dateKey] = new Set();
        acc[dateKey].add(normalizeTime(timeKey)); // Add normalized time to the set of times for this date
        return acc;
      },
      {} as Record<string, Set<string>>,
    );

    // Log the slotsByDate to check the data structure
    console.log("Slots by date (local times):", slotsByDate);

    // Find fully booked days by checking if every normalized required time is present for a date
    const fullyBookedDays = Object.entries(slotsByDate)
      .filter(([date, times]) => {
        const missingTimes = requiredTimes.filter((time) => !times.has(normalizeTime(time)));
        if (missingTimes.length > 0) {
          console.log(`For date ${date}, missing times:`, missingTimes); // Log missing times for debugging
        }
        return requiredTimes.every((time) => times.has(normalizeTime(time)));
      })
      .map(([date]) => date);

    // Log the fully booked days to check the final result
    console.log("Fully booked days:", fullyBookedDays);

    return res.status(200).json({ fullyBookedDays });
  } catch (error) {
    console.error("Error getting days fully booked:", error);
    return res.status(500).json({ message: "Error getting days fully booked", error });
  }
};
