/*
  Warnings:

  - You are about to drop the column `availableSlots` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `availableToday` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `consultationTypes` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `nextAvailable` on the `Doctor` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Doctor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "specialtyId" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "education" JSONB,
    "certifications" JSONB,
    "languages" JSONB,
    "stats" JSONB,
    CONSTRAINT "Doctor_specialtyId_fkey" FOREIGN KEY ("specialtyId") REFERENCES "Specialty" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Doctor" ("bio", "certifications", "education", "experience", "id", "imageUrl", "languages", "location", "name", "specialtyId", "stats", "title") SELECT "bio", "certifications", "education", "experience", "id", "imageUrl", "languages", "location", "name", "specialtyId", "stats", "title" FROM "Doctor";
DROP TABLE "Doctor";
ALTER TABLE "new_Doctor" RENAME TO "Doctor";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
