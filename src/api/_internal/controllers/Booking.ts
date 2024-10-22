import { Request, Response } from "express";
import moment from "moment-timezone";
import { db } from "../db"; // Drizzle DB instance
import { customer, service, address, slot, booking } from "../db/tables"; // Import schema
import { eq, and, gte, lte, asc, sql } from "drizzle-orm"; // Importing the eq function
import "../utils/logger";
import { FormValues } from "@/types/bookingTypes";

// Set timezone globally
moment.tz.setDefault("America/New_York");
// const localTime = moment.tz(date, "America/New_York");

const sendDiscordMessage = async (message: any) => {
  const channelId = "1234565272892084236"; // Bookings channel ID
  const botToken = process.env.DISCORD_BOT_TOKEN;

  if (!botToken) throw new Error("No Discord Webhook URL set in environment variables");

  // Prepare the message payload
  const data = {
    content: "A new booking has been submitted!",
    embeds: [
      {
        title: "New Booking",
        fields: [
          { name: "Name", value: message.contact.full_name || "N/A", inline: true },
          { name: "Email", value: message.contact.email || "N/A", inline: true },
          { name: "Phone", value: message.contact.phone || "N/A", inline: true },
          {
            name: "Address",
            value: `${message.address.street || "N/A"}, ${message.address.city || "N/A"}, ${message.address.state || "N/A"} ${message.address.zip || "N/A"}`,
            inline: true,
          },
          { name: "Service Category", value: message.service.cleaning_category || "N/A", inline: true },
          { name: "Service Type", value: message.service.cleaning_sub_category || "N/A", inline: true },
          { name: "Square Feet", value: message.service.square_feet?.toString() || "N/A", inline: true },
          { name: "Service Frequency", value: message.service.service_frequency || "N/A", inline: true },
          { name: "Window Count", value: message.service.window_count?.toString() || "N/A", inline: true },
          { name: "Bedroom Count", value: message.service.bedroom_count?.toString() || "N/A", inline: true },
          { name: "Bathroom Count", value: message.service.bathroom_count?.toString() || "N/A", inline: true },
          { name: "Refrigerator Count", value: message.service.refrigerator_count?.toString() || "N/A", inline: true },
          { name: "Oven Count", value: message.service.oven_count?.toString() || "N/A", inline: true },
          { name: "Baseboard Cleaning", value: message.service.includes_baseboard_cleaning ? "Yes" : "No", inline: true },
          { name: "Kitchen Cabinet Cleaning", value: message.service.includes_kitchen_cabinet_cleaning ? "Yes" : "No", inline: true },
          { name: "Linen Change Count", value: message.service.linen_change_count?.toString() || "N/A", inline: true },
          { name: "Slot Date", value: moment(message.slot.date).format("MMMM Do, YYYY"), inline: true },
          { name: "Slot Time", value: message.slot.time || "N/A", inline: true },
        ],
      },
    ],
  };

  // Make the POST request to the Discord API to send a message
  const response = await fetch(`https://discord.com/api/v9/channels/${channelId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bot ${botToken}`, // Auth header with bot token
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error(`Failed to send message: ${response.status} ${response.statusText}`);
};

export const createBookingController = async (req: Request, res: Response) => {
  try {
    const form = JSON.parse(req.body);
    const { address: addressData, contact, service: serviceData, slot: slotData } = form;

    // Start transaction
    await db.transaction(async (trx) => {
      // Create or find the customer based on their contact info (email or phone)
      const existingCustomer = await trx.select().from(customer).where(eq(customer.email, contact.email)).limit(1);

      let customerId;
      // Check if customer already exists
      if (existingCustomer.length > 0) {
        customerId = existingCustomer[0].id;
        // Update customer phone if already exists
        await trx.update(customer).set({ phone: contact.phone }).where(eq(customer.id, customerId));
      }

      // Check if customer doesn't exist
      if (existingCustomer.length === 0) {
        // Create new customer
        const [createdCustomer] = await trx.insert(customer).values(contact).returning({ id: customer.id });
        customerId = createdCustomer.id;
      }

      // Check if a slot with the same slot_number, date, and time already exists
      const query = and(
        eq(slot.slot_number, slotData.slot_number),
        eq(slot.date, moment(slotData.date).toDate()),
        eq(slot.time, slotData.time),
      );
      const existingSlot = await trx.select().from(slot).where(query).limit(1);
      if (existingSlot.length > 0) throw new Error("Slot already exists for the given time and date");

      // Create the service details
      const [createdService] = await trx.insert(service).values(serviceData).returning({ id: service.id });

      // Create or get the address
      const [addressResult] = await trx.insert(address).values(addressData).onConflictDoNothing().returning({ id: address.id });

      // If the address is not created, we should fetch the existing address ID
      let addressId;
      if (!addressResult) {
        const query = and(
          eq(address.street, addressData.street),
          eq(address.unit, addressData.unit),
          eq(address.city, addressData.city),
          eq(address.state, addressData.state),
          eq(address.zip, addressData.zip),
        );

        // Address already exists, retrieve its ID
        const existingAddress = await trx.select().from(address).where(query).limit(1);
        if (existingAddress.length > 0) addressId = existingAddress[0].id; // Existing address ID
      }

      if (addressResult) addressId = addressResult.id; // Newly created address

      // Create the slot
      const slot_values = { ...slotData, date: moment(slotData.date) };
      const [createdSlot] = await trx.insert(slot).values(slot_values).returning({ id: slot.id });
      if (!createdSlot || !createdSlot.id) throw new Error("Failed to create slot.");

      // Create the booking by linking customer, service, address, and slot
      const customer_id = sql`${customerId}`;
      const booking_values = { customer_id, slot_id: createdSlot.id, service_id: createdService.id, address_id: addressId };
      const [createdBooking] = await trx.insert(booking).values(booking_values).returning({ id: booking.id });
      if (!createdBooking || !createdBooking.id) throw new Error("Failed to create booking.");

      // Send notification to workers
      sendDiscordMessage(form);

      // Send notification to customer

      return res.status(201).json({ success: true, message: "Booking created successfully", data: createdBooking });
    });
  } catch (error: any) {
    console.error("Error creating booking:", error.message); // More detailed error logging
    return res.status(500).json({ success: false, message: "Failed to create booking", error: error.message });
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
    console.error(error);
    return res.status(500).json({ message: "Error getting booked slots", error });
  }
};

export const getAllBookedDaysController = async (req: Request, res: Response) => {
  const normalizeTime = (time: string) => moment(time, ["h:mm A", "hh:mm A"]).format("hh:mm A").trim().toUpperCase();
  const requiredTimes: string[] = ["8:00AM", "9:00AM", "10:00AM", "11:00AM", "12:00PM", "1:00PM", "2:00PM"];

  try {
    const startOfTomorrow = moment().tz("America/New_York").utc().startOf("day").toDate();
    const endOfNextMonth = moment().tz("America/New_York").utc().add(1, "month").endOf("day").toDate();

    console.log({
      startOfTomorrow: `${startOfTomorrow}`,
      endOfNextMonth: `${endOfNextMonth}`,
    });

    const fullyBookedSlots = await db
      .select({ date: slot.date })
      .from(slot)
      .where(and(gte(slot.date, startOfTomorrow), lte(slot.date, endOfNextMonth)))
      .orderBy(asc(slot.date))
      .execute();

    const slotsByDate = fullyBookedSlots.reduce(
      (acc, { date }) => {
        const localTime = moment(date).tz("America/New_York");
        const dateKey = localTime.format("YYYY-MM-DD");
        const timeKey = localTime.format("hh:mm A");

        if (!acc[dateKey]) acc[dateKey] = new Set();
        acc[dateKey].add(normalizeTime(timeKey));
        return acc;
      },
      {} as Record<string, Set<string>>,
    );

    const fullyBookedDays = Object.entries(slotsByDate)
      .filter(([_, times]) => requiredTimes.every((time) => times.has(normalizeTime(time))))
      .map(([date]) => date);

    return res.status(200).json({ fullyBookedDays });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error getting fully booked days", error });
  }
};
