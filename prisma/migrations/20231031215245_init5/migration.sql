-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "payment_status" DROP NOT NULL,
ALTER COLUMN "payment_status" DROP DEFAULT,
ALTER COLUMN "payment_status" SET DATA TYPE TEXT;
