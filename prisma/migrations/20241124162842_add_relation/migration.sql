/*
  Warnings:

  - You are about to drop the column `image` on the `Promotion` table. All the data in the column will be lost.
  - You are about to drop the `_PromotionsTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserTags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PromotionsTag" DROP CONSTRAINT "_PromotionsTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_PromotionsTag" DROP CONSTRAINT "_PromotionsTag_B_fkey";

-- DropForeignKey
ALTER TABLE "_UserTags" DROP CONSTRAINT "_UserTags_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserTags" DROP CONSTRAINT "_UserTags_B_fkey";

-- AlterTable
ALTER TABLE "Promotion" DROP COLUMN "image";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "notifications" BOOLEAN NOT NULL DEFAULT true;

-- DropTable
DROP TABLE "_PromotionsTag";

-- DropTable
DROP TABLE "_UserTags";

-- CreateTable
CREATE TABLE "PromotionTag" (
    "id" SERIAL NOT NULL,
    "promotionId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PromotionTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTag" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,
    "subscribedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserTag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PromotionTag_promotionId_tagId_key" ON "PromotionTag"("promotionId", "tagId");

-- CreateIndex
CREATE UNIQUE INDEX "UserTag_userId_tagId_key" ON "UserTag"("userId", "tagId");

-- AddForeignKey
ALTER TABLE "PromotionTag" ADD CONSTRAINT "PromotionTag_promotionId_fkey" FOREIGN KEY ("promotionId") REFERENCES "Promotion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromotionTag" ADD CONSTRAINT "PromotionTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTag" ADD CONSTRAINT "UserTag_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTag" ADD CONSTRAINT "UserTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
