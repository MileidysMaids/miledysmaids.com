/*
  Warnings:

  - You are about to drop the column `status` on the `Slot` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Service" ALTER COLUMN "cleaning_sub_category" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Slot" DROP COLUMN "status";
