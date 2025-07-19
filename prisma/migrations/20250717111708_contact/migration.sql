-- CreateTable
CREATE TABLE "SocialPlatform" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "color" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SocialLink" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "platformId" INTEGER NOT NULL,
    CONSTRAINT "SocialLink_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "SocialPlatform" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ContactInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "color" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SocialPlatform_name_key" ON "SocialPlatform"("name");
