-- CreateEnum
CREATE TYPE "SlotStatus" AS ENUM ('AVAILABLE', 'BOOKED');

-- CreateEnum
CREATE TYPE "CleaningCategory" AS ENUM ('RESIDENTIAL', 'COMMERCIAL');

-- CreateEnum
CREATE TYPE "CleaningSubCategory" AS ENUM ('HOUSE', 'APARTMENT', 'OFFICE');

-- CreateEnum
CREATE TYPE "PackageType" AS ENUM ('STANDARD', 'DEEP_CLEAN');

-- CreateEnum
CREATE TYPE "ServiceFrequency" AS ENUM ('ONE_TIME', 'WEEKLY', 'MONTHLY');

-- CreateTable
CREATE TABLE "Slot" (
    "id" SERIAL NOT NULL,
    "slot_number" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TEXT NOT NULL,

    CONSTRAINT "Slot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "full_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "cleaning_category" "CleaningCategory" NOT NULL,
    "cleaning_sub_category" "CleaningSubCategory",
    "bedroom_count" INTEGER,
    "bathroom_count" INTEGER,
    "window_count" INTEGER,
    "oven_count" INTEGER,
    "includes_baseboard_cleaning" BOOLEAN NOT NULL DEFAULT false,
    "includes_kitchen_cabinet_cleaning" BOOLEAN NOT NULL DEFAULT false,
    "includes_bathroom_cabinet_cleaning" BOOLEAN NOT NULL DEFAULT false,
    "includes_linen_change" BOOLEAN NOT NULL DEFAULT false,
    "includes_basement" BOOLEAN NOT NULL DEFAULT false,
    "pet_present" BOOLEAN NOT NULL DEFAULT false,
    "square_feet" INTEGER NOT NULL,
    "package_type" "PackageType",
    "service_frequency" "ServiceFrequency" NOT NULL,
    "is_recurring" BOOLEAN DEFAULT false,
    "has_multiple_toilets" BOOLEAN DEFAULT false,
    "toilet_count" INTEGER,
    "refrigerator_count" INTEGER,
    "microwave_count" INTEGER,
    "floor_count" INTEGER,
    "cleaning_supplies_provided" BOOLEAN DEFAULT false,
    "eco_friendly_products" BOOLEAN DEFAULT false,
    "includes_garage" BOOLEAN DEFAULT false,
    "parking_availability" BOOLEAN DEFAULT false,
    "floor_type" TEXT,
    "special_requests" TEXT,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "street" TEXT NOT NULL,
    "unit" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "slot_id" INTEGER NOT NULL,
    "service_id" INTEGER NOT NULL,
    "address_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Slot_date_time_slot_number_key" ON "Slot"("date", "time", "slot_number");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- CreateIndex
CREATE INDEX "Service_cleaning_category_cleaning_sub_category_idx" ON "Service"("cleaning_category", "cleaning_sub_category");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_slot_id_key" ON "Booking"("slot_id");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_service_id_key" ON "Booking"("service_id");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_address_id_key" ON "Booking"("address_id");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_slot_id_fkey" FOREIGN KEY ("slot_id") REFERENCES "Slot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
