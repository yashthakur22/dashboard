/*
  Warnings:

  - Added the required column `nurse` to the `ScheduledCall` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `ScheduledCall` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ScheduledCall" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "patientId" INTEGER NOT NULL,
    "dateTime" DATETIME NOT NULL,
    "questions" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "nurse" TEXT NOT NULL,
    CONSTRAINT "ScheduledCall_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ScheduledCall" ("dateTime", "id", "patientId", "questions") SELECT "dateTime", "id", "patientId", "questions" FROM "ScheduledCall";
DROP TABLE "ScheduledCall";
ALTER TABLE "new_ScheduledCall" RENAME TO "ScheduledCall";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
