/*
  Warnings:

  - You are about to drop the column `packageId` on the `Addons` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Addons" DROP CONSTRAINT "Addons_packageId_fkey";

-- AlterTable
ALTER TABLE "Addons" DROP COLUMN "packageId";
