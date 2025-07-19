/*
  Warnings:

  - You are about to drop the `SocialLink` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `url` to the `SocialPlatform` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "SocialLink";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SocialPlatform" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "url" TEXT NOT NULL
);
INSERT INTO "new_SocialPlatform" ("color", "icon", "id", "name") SELECT "color", "icon", "id", "name" FROM "SocialPlatform";
DROP TABLE "SocialPlatform";
ALTER TABLE "new_SocialPlatform" RENAME TO "SocialPlatform";
CREATE UNIQUE INDEX "SocialPlatform_name_key" ON "SocialPlatform"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
