/*
  Warnings:

  - You are about to drop the column `product_id` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `sales` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `tickets_sold` on the `Product` table. All the data in the column will be lost.
  - Added the required column `productId` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_product_id_fkey";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "product_id",
ADD COLUMN     "productId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "sales",
DROP COLUMN "tickets_sold";

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
