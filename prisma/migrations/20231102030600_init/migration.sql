/*
  Warnings:

  - You are about to drop the column `priceTotal` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `product_id` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "priceTotal",
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "product_id" TEXT NOT NULL,
ALTER COLUMN "rut" DROP NOT NULL;
