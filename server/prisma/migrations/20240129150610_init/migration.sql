/*
  Warnings:

  - Added the required column `total_review_rating` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "num_of_reviews" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "total_review_rating" INTEGER NOT NULL;
