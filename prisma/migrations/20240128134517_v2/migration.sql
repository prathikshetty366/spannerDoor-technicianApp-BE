-- CreateTable
CREATE TABLE "CustomerVoice" (
    "id" UUID NOT NULL,
    "bookingId" UUID NOT NULL,
    "customerId" UUID NOT NULL,
    "voice" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CustomerVoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuickOptions" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuickOptions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CustomerVoice" ADD CONSTRAINT "CustomerVoice_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
