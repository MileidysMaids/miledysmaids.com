-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "floor_type" TEXT,
ADD COLUMN     "includes_garage" BOOLEAN DEFAULT false,
ADD COLUMN     "parking_availability" BOOLEAN DEFAULT false,
ADD COLUMN     "special_requests" TEXT,
ALTER COLUMN "bedroom_count" DROP NOT NULL,
ALTER COLUMN "bathroom_count" DROP NOT NULL,
ALTER COLUMN "window_count" DROP NOT NULL,
ALTER COLUMN "oven_count" DROP NOT NULL;
