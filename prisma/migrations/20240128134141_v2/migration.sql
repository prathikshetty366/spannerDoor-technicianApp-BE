-- CreateTable
CREATE TABLE "Package" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Package_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Addons" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "packageId" UUID NOT NULL,
    "price" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Addons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Garage" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "pincode" INTEGER NOT NULL,
    "incharge" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Garage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "licence" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "gst" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "notifications" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" UUID NOT NULL,
    "customerId" UUID NOT NULL,
    "registration" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "last_service_date" TIMESTAMP(3) NOT NULL,
    "next_service_date" TIMESTAMP(3) NOT NULL,
    "insurance_expiry_date" TIMESTAMP(3) NOT NULL,
    "emission_expiry_date" TIMESTAMP(3) NOT NULL,
    "odo_reading" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceBookings" (
    "id" UUID NOT NULL,
    "garageId" UUID NOT NULL,
    "customerId" UUID NOT NULL,
    "addonId" UUID NOT NULL,
    "packageId" UUID NOT NULL,
    "vehicleId" UUID NOT NULL,
    "service_status" INTEGER NOT NULL,
    "checklist_status" INTEGER NOT NULL,
    "technicianId" UUID NOT NULL,
    "start_time" TEXT NOT NULL,
    "end_time" TEXT NOT NULL,
    "technician_feedback" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ServiceBookings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Addons" ADD CONSTRAINT "Addons_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceBookings" ADD CONSTRAINT "ServiceBookings_garageId_fkey" FOREIGN KEY ("garageId") REFERENCES "Garage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceBookings" ADD CONSTRAINT "ServiceBookings_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceBookings" ADD CONSTRAINT "ServiceBookings_addonId_fkey" FOREIGN KEY ("addonId") REFERENCES "Addons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceBookings" ADD CONSTRAINT "ServiceBookings_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceBookings" ADD CONSTRAINT "ServiceBookings_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceBookings" ADD CONSTRAINT "ServiceBookings_technicianId_fkey" FOREIGN KEY ("technicianId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
