/*
  Warnings:

  - You are about to drop the `AIToolResult` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `isComingSoon` on the `AITool` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `allergies` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `documents` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `medicalHistory` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `urgency` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `reviewCount` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `verified` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfBirth` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `User` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "AIToolResult";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Review";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AITool" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL
);
INSERT INTO "new_AITool" ("category", "description", "id", "imageUrl", "title") SELECT "category", "description", "id", "imageUrl", "title" FROM "AITool";
DROP TABLE "AITool";
ALTER TABLE "new_AITool" RENAME TO "AITool";
CREATE TABLE "new_Appointment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    CONSTRAINT "Appointment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Appointment_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Appointment" ("date", "doctorId", "duration", "id", "reason", "status", "time", "type", "userId") SELECT "date", "doctorId", "duration", "id", "reason", "status", "time", "type", "userId" FROM "Appointment";
DROP TABLE "Appointment";
ALTER TABLE "new_Appointment" RENAME TO "Appointment";
CREATE TABLE "new_Booking" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "symptoms" TEXT NOT NULL,
    "currentMedications" TEXT NOT NULL,
    CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Booking" ("currentMedications", "id", "symptoms", "userId") SELECT "currentMedications", "id", "symptoms", "userId" FROM "Booking";
DROP TABLE "Booking";
ALTER TABLE "new_Booking" RENAME TO "Booking";
CREATE TABLE "new_Doctor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "specialtyId" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "availableToday" BOOLEAN NOT NULL,
    "nextAvailable" TEXT NOT NULL,
    "education" JSONB,
    "certifications" JSONB,
    "languages" JSONB,
    "consultationTypes" JSONB,
    "availableSlots" JSONB,
    "stats" JSONB,
    CONSTRAINT "Doctor_specialtyId_fkey" FOREIGN KEY ("specialtyId") REFERENCES "Specialty" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Doctor" ("availableSlots", "availableToday", "bio", "certifications", "consultationTypes", "education", "experience", "id", "imageUrl", "languages", "location", "name", "nextAvailable", "specialtyId", "stats", "title") SELECT "availableSlots", "availableToday", "bio", "certifications", "consultationTypes", "education", "experience", "id", "imageUrl", "languages", "location", "name", "nextAvailable", "specialtyId", "stats", "title" FROM "Doctor";
DROP TABLE "Doctor";
ALTER TABLE "new_Doctor" RENAME TO "Doctor";
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT NOT NULL
);
INSERT INTO "new_User" ("email", "firstName", "id", "lastName", "password", "phone") SELECT "email", "firstName", "id", "lastName", "password", "phone" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
