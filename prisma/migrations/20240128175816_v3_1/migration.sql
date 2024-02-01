/*
  Warnings:

  - The `addonId` column on the `ServiceBookings` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "ServiceBookings" DROP CONSTRAINT "ServiceBookings_addonId_fkey";

-- AlterTable
ALTER TABLE "ServiceBookings" DROP COLUMN "addonId",
ADD COLUMN     "addonId" UUID[];

-- CreateTable
CREATE TABLE "_ServiceBookingsToAddons" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ServiceBookingsToAddons_AB_unique" ON "_ServiceBookingsToAddons"("A", "B");

-- CreateIndex
CREATE INDEX "_ServiceBookingsToAddons_B_index" ON "_ServiceBookingsToAddons"("B");

-- AddForeignKey
ALTER TABLE "_ServiceBookingsToAddons" ADD CONSTRAINT "_ServiceBookingsToAddons_A_fkey" FOREIGN KEY ("A") REFERENCES "Addons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ServiceBookingsToAddons" ADD CONSTRAINT "_ServiceBookingsToAddons_B_fkey" FOREIGN KEY ("B") REFERENCES "ServiceBookings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
