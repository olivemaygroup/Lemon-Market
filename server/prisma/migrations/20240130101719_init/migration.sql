/*
  Warnings:

  - You are about to drop the column `review_id` on the `Favourite` table. All the data in the column will be lost.
  - You are about to drop the column `review_id` on the `Search` table. All the data in the column will be lost.
  - Added the required column `property_id` to the `Favourite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `property_id` to the `Search` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Favourite" DROP COLUMN "review_id",
ADD COLUMN     "property_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Search" DROP COLUMN "review_id",
ADD COLUMN     "property_id" INTEGER NOT NULL;
