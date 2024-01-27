-- CreateTable
CREATE TABLE "Property" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "number" TEXT NOT NULL,
    "apartment" TEXT,
    "street" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "avg_rating" INTEGER,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "review_id" SERIAL NOT NULL,
    "review_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "t_start" TIMESTAMP(3) NOT NULL,
    "t_end" TIMESTAMP(3) NOT NULL,
    "cleanliness" INTEGER NOT NULL,
    "cleanliness_comment" TEXT,
    "maintenance" INTEGER NOT NULL,
    "maintenance_comment" TEXT,
    "value_for_money" INTEGER NOT NULL,
    "value_for_money_comment" TEXT,
    "deposit_handling" INTEGER NOT NULL,
    "deposit_handling_comment" TEXT,
    "amenities" INTEGER NOT NULL,
    "amenities_comment" TEXT,
    "landlord_responsiveness" INTEGER NOT NULL,
    "landlord_responsiveness_comment" TEXT,
    "monthly_rent" INTEGER NOT NULL,
    "monthly_bill" INTEGER NOT NULL,
    "council_tax" INTEGER NOT NULL,
    "general_comment" TEXT NOT NULL,
    "property_id" INTEGER NOT NULL,
    "tenant_id" INTEGER NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("review_id")
);

-- CreateTable
CREATE TABLE "Tenant" (
    "tenant_id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Tenant_pkey" PRIMARY KEY ("tenant_id")
);

-- CreateTable
CREATE TABLE "Photo" (
    "photo_id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "review_id" INTEGER NOT NULL,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("photo_id")
);

-- CreateTable
CREATE TABLE "Search" (
    "search_id" SERIAL NOT NULL,
    "search_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "review_id" INTEGER NOT NULL,
    "tenant_id" INTEGER NOT NULL,

    CONSTRAINT "Search_pkey" PRIMARY KEY ("search_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tenant_email_key" ON "Tenant"("email");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "Tenant"("tenant_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "Review"("review_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Search" ADD CONSTRAINT "Search_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "Tenant"("tenant_id") ON DELETE RESTRICT ON UPDATE CASCADE;
