/*
  Warnings:

  - You are about to drop the column `email` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `product` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `customer_email` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_name` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "phone",
DROP COLUMN "product",
ADD COLUMN     "customer_email" TEXT NOT NULL,
ADD COLUMN     "customer_name" TEXT NOT NULL,
ADD COLUMN     "customer_phone" TEXT;

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tickets_sold" INTEGER,
    "sales" INTEGER,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_id_key" ON "Product"("id");

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
