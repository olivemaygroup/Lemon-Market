/*
  Warnings:

  - The primary key for the `Property` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `apartment` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `postcode` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `street` on the `Property` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Property` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fullAddress` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Favourite" DROP CONSTRAINT "Favourite_property_id_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_property_id_fkey";

-- DropForeignKey
ALTER TABLE "Search" DROP CONSTRAINT "Search_property_id_fkey";

-- AlterTable
ALTER TABLE "Favourite" ALTER COLUMN "property_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Property" DROP CONSTRAINT "Property_pkey",
DROP COLUMN "apartment",
DROP COLUMN "city",
DROP COLUMN "number",
DROP COLUMN "postcode",
DROP COLUMN "street",
ADD COLUMN     "fullAddress" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Property_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Property_id_seq";

-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "property_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Search" ALTER COLUMN "property_id" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Property_id_key" ON "Property"("id");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Search" ADD CONSTRAINT "Search_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favourite" ADD CONSTRAINT "Favourite_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
