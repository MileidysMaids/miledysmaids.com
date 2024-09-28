import { Request, Response } from "express";
import moment from "moment";
import { db } from "../db"; // Drizzle DB instance
import { customer, service, address, slot, booking } from "../db/tables"; // Import schema
import { eq, and, gte, lte, asc } from "drizzle-orm"; // Importing the eq function

export const createBookingController = async (req: Request, res: Response) => {
  try {
    const { address: addressData, contact, service: serviceData, slot: slotData } = JSON.parse(req.body);

    // Create or find the customer based on their contact info (email or phone)
    const existingCustomer = await db.select().from(customer).where(eq(customer.email, contact.email)).limit(1);

    let customerId;
    if (existingCustomer.length > 0) {
      customerId = existingCustomer[0].id;
      await db.update(customer).set({ phone: contact.phone }).where(eq(customer.id, customerId));
    } else {
      const [createdCustomer] = await db.insert(customer).values(contact).returning({ id: customer.id });
      customerId = createdCustomer.id;
    }

    // Create the service details
    const [createdService] = await db.insert(service).values(serviceData).returning({ id: service.id });

    // Create the address
    const [createdAddress] = await db.insert(address).values(addressData).returning({ id: address.id });

    // Create the slot and update its status
    const [createdSlot] = await db
      .insert(slot)
      .values({ ...slotData, status: "BOOKED" }) // Assuming 'status' field exists
      .returning({ id: slot.id });

    // Create the booking by linking customer, service, address, and slot
    const [createdBooking] = await db
      .insert(booking)
      .values({
        customer_id: customerId,
        service_id: createdService.id,
        address_id: createdAddress.id,
        slot_id: createdSlot.id,
      })
      .returning({ id: booking.id });

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: createdBooking,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ success: false, message: "Failed to create booking", error });
  }
};

export const getAllBookedSlotsByDayController = async (req: Request, res: Response) => {
  try {
    const { date } = req.query as { date: string };

    const startOfDay = moment(date).startOf("day").toDate();
    const endOfDay = moment(date).endOf("day").toDate();

    const bookedSlots = await db
      .select()
      .from(slot)
      .leftJoin(booking, eq(slot.id, booking.slot_id)) // Assuming booking.slot_id references slot.id
      .where(and(gte(slot.date, startOfDay), lte(slot.date, endOfDay)))
      .orderBy(asc(slot.time))
      .execute();

    return res.status(200).json({ bookedSlots });
  } catch (error) {
    console.error("Error getting booked slots:", error);
    return res.status(500).json({ message: "Error getting booked slots", error });
  }
};

export const getAllBookedDaysController = async (req: Request, res: Response) => {
  const normalizeTime = (time: string) => moment(time, ["h:mm A", "hh:mm A"]).format("hh:mm A").trim().toUpperCase();
  const requiredTimes: string[] = ["8:00AM", "9:00AM", "10:00AM", "11:00AM", "12:00PM", "1:00PM", "2:00PM"];

  try {
    const startOfTomorrow = moment().startOf("day").add(1, "day").toDate();
    const endOfNextMonth = moment().add(1, "month").endOf("day").toDate();

    const fullyBookedSlots = await db
      .select({ date: slot.date })
      .from(slot)
      .where(and(gte(slot.date, startOfTomorrow), lte(slot.date, endOfNextMonth)))
      .orderBy(asc(slot.date))
      .execute();

    const slotsByDate = fullyBookedSlots.reduce(
      (acc, { date }) => {
        const localTime = moment(date).local();
        const dateKey = localTime.format("YYYY-MM-DD");
        const timeKey = localTime.format("hh:mm A");

        if (!acc[dateKey]) acc[dateKey] = new Set();
        acc[dateKey].add(normalizeTime(timeKey));
        return acc;
      },
      {} as Record<string, Set<string>>,
    );

    const fullyBookedDays = Object.entries(slotsByDate)
      .filter(([date, times]) => {
        return requiredTimes.every((time) => times.has(normalizeTime(time)));
      })
      .map(([date]) => date);

    return res.status(200).json({ fullyBookedDays });
  } catch (error) {
    console.error("Error getting fully booked days:", error);
    return res.status(500).json({ message: "Error getting fully booked days", error });
  }
};
