/*
  Warnings:

  - The primary key for the `ArticleKeyword` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `ArticleKeyword` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ArticleKeyword" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "articleId" INTEGER NOT NULL,
    "keywordId" INTEGER NOT NULL,
    CONSTRAINT "ArticleKeyword_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ArticleKeyword_keywordId_fkey" FOREIGN KEY ("keywordId") REFERENCES "Keyword" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ArticleKeyword" ("articleId", "keywordId") SELECT "articleId", "keywordId" FROM "ArticleKeyword";
DROP TABLE "ArticleKeyword";
ALTER TABLE "new_ArticleKeyword" RENAME TO "ArticleKeyword";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
