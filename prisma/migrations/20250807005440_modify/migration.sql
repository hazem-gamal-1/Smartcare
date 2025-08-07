/*
  Warnings:

  - The primary key for the `Appointment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `duration` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `reason` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Appointment` table. All the data in the column will be lost.
  - You are about to alter the column `date` on the `Appointment` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.
  - You are about to alter the column `id` on the `Appointment` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Added the required column `consultationType` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Appointment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "doctorId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "time" TEXT NOT NULL,
    "consultationType" TEXT NOT NULL,
    "symptoms" TEXT,
    "currentMedications" TEXT,
    CONSTRAINT "Appointment_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Appointment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Appointment" ("date", "doctorId", "id", "time", "userId") SELECT "date", "doctorId", "id", "time", "userId" FROM "Appointment";
DROP TABLE "Appointment";
ALTER TABLE "new_Appointment" RENAME TO "Appointment";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
