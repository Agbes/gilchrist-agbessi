/*
  Warnings:

  - Added the required column `imageUrl` to the `Experience` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Experience" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "periode" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "lieu" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Experience" ("createdAt", "description", "id", "lieu", "name", "periode", "updatedAt") SELECT "createdAt", "description", "id", "lieu", "name", "periode", "updatedAt" FROM "Experience";
DROP TABLE "Experience";
ALTER TABLE "new_Experience" RENAME TO "Experience";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
