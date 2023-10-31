-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rut" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "ticketAmount" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "session_token" TEXT NOT NULL,
    "signature_token" TEXT NOT NULL,
    "priceTotal" DOUBLE PRECISION NOT NULL,
    "product" TEXT NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);
