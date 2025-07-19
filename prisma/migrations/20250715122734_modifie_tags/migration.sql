/*
  Warnings:

  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `topic` on the `Article` table. All the data in the column will be lost.
  - Added the required column `topicId` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Tag";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "TagCompetence" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "competenceId" INTEGER NOT NULL,
    CONSTRAINT "TagCompetence_competenceId_fkey" FOREIGN KEY ("competenceId") REFERENCES "Competence" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Topic" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TagArticle" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ArticleTags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ArticleTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Article" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ArticleTags_B_fkey" FOREIGN KEY ("B") REFERENCES "TagArticle" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Article" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "readTime" TEXT NOT NULL,
    "topicId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Article_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Article" ("createdAt", "date", "description", "id", "readTime", "slug", "title", "updatedAt") SELECT "createdAt", "date", "description", "id", "readTime", "slug", "title", "updatedAt" FROM "Article";
DROP TABLE "Article";
ALTER TABLE "new_Article" RENAME TO "Article";
CREATE UNIQUE INDEX "Article_slug_key" ON "Article"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Topic_name_key" ON "Topic"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TagArticle_name_key" ON "TagArticle"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ArticleTags_AB_unique" ON "_ArticleTags"("A", "B");

-- CreateIndex
CREATE INDEX "_ArticleTags_B_index" ON "_ArticleTags"("B");
