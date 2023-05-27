/*
  Warnings:

  - You are about to drop the column `email` on the `Organisations` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[plateNumber]` on the table `Buses` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Organisations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[website]` on the table `Organisations` will be added. If there are existing duplicate values, this will fail.
  - Made the column `plateNumber` on table `Buses` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `website` to the `Organisations` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Buses_email_key";

-- DropIndex
DROP INDEX "Organisations_email_key";

-- AlterTable
ALTER TABLE "Buses" ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "plateNumber" SET NOT NULL,
ALTER COLUMN "password" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Organisations" DROP COLUMN "email",
ADD COLUMN     "website" TEXT NOT NULL,
ALTER COLUMN "password" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Buses_plateNumber_key" ON "Buses"("plateNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Organisations_name_key" ON "Organisations"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Organisations_website_key" ON "Organisations"("website");
