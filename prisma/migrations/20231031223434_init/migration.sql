-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rut" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "ticketAmount" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "signature_token" TEXT NOT NULL,
    "priceTotal" DOUBLE PRECISION NOT NULL,
    "product" TEXT NOT NULL,
    "payment_status" TEXT,
    "payment_token" TEXT,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Payment_id_key" ON "Payment"("id");
