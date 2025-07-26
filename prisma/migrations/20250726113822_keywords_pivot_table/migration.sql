/*
  Warnings:

  - You are about to drop the `_ArticleKeywords` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ArticleKeywords";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ArticleKeyword" (
    "articleId" INTEGER NOT NULL,
    "keywordId" INTEGER NOT NULL,

    PRIMARY KEY ("articleId", "keywordId"),
    CONSTRAINT "ArticleKeyword_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ArticleKeyword_keywordId_fkey" FOREIGN KEY ("keywordId") REFERENCES "Keyword" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
