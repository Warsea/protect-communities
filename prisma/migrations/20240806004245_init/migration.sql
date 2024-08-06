-- CreateTable
CREATE TABLE "ReligiousInstitution" (
    "id" SERIAL NOT NULL,
    "temple" TEXT NOT NULL,
    "division" TEXT NOT NULL,
    "whatsappGroup" TEXT NOT NULL,
    "protectingInstitution" TEXT NOT NULL,

    CONSTRAINT "ReligiousInstitution_pkey" PRIMARY KEY ("id")
);
