/*
  Warnings:

  - You are about to drop the `ArticleKeyword` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ArticleKeyword";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_ArticleToKeyword" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ArticleToKeyword_A_fkey" FOREIGN KEY ("A") REFERENCES "Article" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ArticleToKeyword_B_fkey" FOREIGN KEY ("B") REFERENCES "Keyword" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_ArticleToKeyword_AB_unique" ON "_ArticleToKeyword"("A", "B");

-- CreateIndex
CREATE INDEX "_ArticleToKeyword_B_index" ON "_ArticleToKeyword"("B");
