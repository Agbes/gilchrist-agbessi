-- CreateTable
CREATE TABLE "Hero" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "profileId" INTEGER,
    CONSTRAINT "Hero_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Skill" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "svgPath" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "heroId" INTEGER,
    CONSTRAINT "Skill_heroId_fkey" FOREIGN KEY ("heroId") REFERENCES "Hero" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Skill" ("color", "createdAt", "description", "id", "svgPath", "title", "updatedAt") SELECT "color", "createdAt", "description", "id", "svgPath", "title", "updatedAt" FROM "Skill";
DROP TABLE "Skill";
ALTER TABLE "new_Skill" RENAME TO "Skill";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Hero_profileId_key" ON "Hero"("profileId");
