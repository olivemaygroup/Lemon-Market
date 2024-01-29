-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "review_date" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Favourites" (
    "favourite_id" SERIAL NOT NULL,
    "review_id" INTEGER NOT NULL,
    "tenant_id" INTEGER NOT NULL,

    CONSTRAINT "Favourites_pkey" PRIMARY KEY ("favourite_id")
);

-- AddForeignKey
ALTER TABLE "Favourites" ADD CONSTRAINT "Favourites_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "Tenant"("tenant_id") ON DELETE RESTRICT ON UPDATE CASCADE;
