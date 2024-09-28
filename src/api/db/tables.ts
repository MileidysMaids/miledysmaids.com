import { pgTable, pgEnum, serial, varchar, integer, boolean, uniqueIndex, timestamp, index, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { sql } from "drizzle-orm/sql";

// Enum definitions
export const slotStatus = pgEnum("SlotStatus", ["AVAILABLE", "BOOKED"]);
export const cleaningCategory = pgEnum("CleaningCategory", ["RESIDENTIAL", "COMMERCIAL"]);
export const cleaningSubCategory = pgEnum("CleaningSubCategory", ["HOUSE", "APARTMENT", "OFFICE"]);
export const packageType = pgEnum("PackageType", ["STANDARD", "DEEP_CLEAN"]);
export const serviceFrequency = pgEnum("ServiceFrequency", ["ONE_TIME", "WEEKLY", "MONTHLY"]);

// Booking Table (Define this early for references)
export const booking = pgTable("Booking", {
  id: serial("id").primaryKey(),
  customer_id: integer("customer_id")
    .references((): any => customer.id, { onDelete: "cascade" })
    .notNull(),
  slot_id: integer("slot_id")
    .references((): any => slot.id, { onDelete: "cascade" })
    .unique(),
  service_id: integer("service_id")
    .references((): any => service.id, { onDelete: "cascade" })
    .unique(),
  address_id: integer("address_id")
    .references((): any => address.id, { onDelete: "cascade" })
    .unique(),
  created_at: timestamp("created_at", { withTimezone: true }).default(sql`now()`),
  updated_at: timestamp("updated_at", { withTimezone: true })
    .default(sql`now()`)
    .$onUpdate((): any => sql`now()`),
});

// Slot Table
export const slot = pgTable(
  "Slot",
  {
    id: serial("id").primaryKey(),
    slot_number: integer("slot_number").notNull(),
    date: timestamp("date").notNull(),
    time: varchar("time", { length: 255 }).notNull(),
    booking_id: integer("booking_id").references(() => booking.id, { onDelete: "set null" }),
  },
  (table) => ({
    uniqueSlot: uniqueIndex("unique_slot").on(table.date, table.time, table.slot_number),
  }),
);

// Customer Table
export const customer = pgTable("Customer", {
  id: serial("id").primaryKey(),
  full_name: varchar("full_name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
});

// Service Table
export const service = pgTable(
  "Service",
  {
    id: serial("id").primaryKey(),
    cleaning_category: cleaningCategory("cleaning_category").notNull(),
    cleaning_sub_category: cleaningSubCategory("cleaning_sub_category"),
    bedroom_count: integer("bedroom_count"),
    bathroom_count: integer("bathroom_count"),
    window_count: integer("window_count"),
    oven_count: integer("oven_count"),
    includes_baseboard_cleaning: boolean("includes_baseboard_cleaning").default(false),
    includes_kitchen_cabinet_cleaning: boolean("includes_kitchen_cabinet_cleaning").default(false),
    includes_bathroom_cabinet_cleaning: boolean("includes_bathroom_cabinet_cleaning").default(false),
    includes_linen_change: boolean("includes_linen_change").default(false),
    includes_basement: boolean("includes_basement").default(false),
    pet_present: boolean("pet_present").default(false),
    square_feet: integer("square_feet").notNull(),
    package_type: packageType("package_type"),
    service_frequency: serviceFrequency("service_frequency").notNull(),
    is_recurring: boolean("is_recurring").default(false),
    has_multiple_toilets: boolean("has_multiple_toilets").default(false),
    toilet_count: integer("toilet_count"),
    refrigerator_count: integer("refrigerator_count"),
    microwave_count: integer("microwave_count"),
    floor_count: integer("floor_count"),
    cleaning_supplies_provided: boolean("cleaning_supplies_provided").default(false),
    eco_friendly_products: boolean("eco_friendly_products").default(false),
    includes_garage: boolean("includes_garage").default(false),
    parking_availability: boolean("parking_availability").default(false),
    floor_type: varchar("floor_type", { length: 255 }),
    special_requests: text("special_requests"),
  },
  (table) => ({
    serviceIndex: index("service_index").on(table.cleaning_category, table.cleaning_sub_category),
  }),
);

// Address Table
export const address = pgTable("Address", {
  id: serial("id").primaryKey(),
  street: varchar("street", { length: 255 }).notNull(),
  unit: varchar("unit", { length: 255 }),
  city: varchar("city", { length: 255 }).notNull(),
  state: varchar("state", { length: 255 }).notNull(),
  zip: varchar("zip", { length: 255 }).notNull(),
  booking_id: integer("booking_id").references(() => booking.id, { onDelete: "set null" }),
});

// Relations
export const customerRelations = relations(customer, ({ one, many }) => ({
  bookings: many(booking),
}));

export const slotRelations = relations(slot, ({ one }) => ({
  booking: one(booking, {
    fields: [slot.booking_id],
    references: [booking.id],
  }),
}));

export const serviceRelations = relations(service, ({ one }) => ({
  booking: one(booking, {
    fields: [service.id],
    references: [booking.service_id],
  }),
}));

export const addressRelations = relations(address, ({ one }) => ({
  booking: one(booking, {
    fields: [address.id],
    references: [booking.address_id],
  }),
}));

export const bookingRelations = relations(booking, ({ one }) => ({
  customer: one(customer, {
    fields: [booking.customer_id],
    references: [customer.id],
  }),
  slot: one(slot, {
    fields: [booking.slot_id],
    references: [slot.id],
  }),
  service: one(service, {
    fields: [booking.service_id],
    references: [service.id],
  }),
  address: one(address, {
    fields: [booking.address_id],
    references: [address.id],
  }),
}));
