-- CreateTable
CREATE TABLE "Users" (
    "NativeId" SERIAL NOT NULL,
    "Id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT,
    "phone" TEXT,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "isSuperAdmin" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "token" TEXT,
    "deviceToken" TEXT,
    "password" TEXT NOT NULL,
    "image_name" TEXT,
    "image_path" TEXT,
    "bus_id" TEXT NOT NULL,
    "organisation_id" TEXT NOT NULL,
    "lat" DECIMAL(65,30),
    "lng" DECIMAL(65,30),
    "currentAddress" TEXT,
    "busStop" TEXT,
    "busStopLat" DECIMAL(65,30),
    "busStopLng" DECIMAL(65,30),
    "isOnline" BOOLEAN DEFAULT false,
    "shareLocation" BOOLEAN DEFAULT false,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Buses" (
    "NativeId" SERIAL NOT NULL,
    "Id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "driver" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "plateNumber" TEXT,
    "route" TEXT,
    "lat" DECIMAL(65,30),
    "lng" DECIMAL(65,30),
    "password" TEXT NOT NULL,
    "deviceToken" TEXT,
    "isOnline" BOOLEAN DEFAULT false,
    "currentAddress" TEXT,
    "shareLocation" BOOLEAN DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "organisation_id" TEXT NOT NULL,

    CONSTRAINT "Buses_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Organisations" (
    "NativeId" SERIAL NOT NULL,
    "Id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "openHr" TEXT,
    "openMin" TEXT,
    "closeHr" TEXT,
    "closeMin" TEXT,
    "lat" DECIMAL(65,30),
    "lng" DECIMAL(65,30),

    CONSTRAINT "Organisations_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Buses_email_key" ON "Buses"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Organisations_email_key" ON "Organisations"("email");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_bus_id_fkey" FOREIGN KEY ("bus_id") REFERENCES "Buses"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_organisation_id_fkey" FOREIGN KEY ("organisation_id") REFERENCES "Organisations"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Buses" ADD CONSTRAINT "Buses_organisation_id_fkey" FOREIGN KEY ("organisation_id") REFERENCES "Organisations"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
