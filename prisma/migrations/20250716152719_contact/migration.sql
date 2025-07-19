/*
  Warnings:

  - You are about to drop the `ContactInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SocialLink` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ContactInfo";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "SocialLink";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ContactMessage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
