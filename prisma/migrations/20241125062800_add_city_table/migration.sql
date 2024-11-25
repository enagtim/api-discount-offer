/*
  Warnings:

  - You are about to drop the `SupplierOrAdmin` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `city` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'SUPPLIER');

-- DropForeignKey
ALTER TABLE "Promotion" DROP CONSTRAINT "Promotion_supplierId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "city" TEXT NOT NULL;

-- DropTable
DROP TABLE "SupplierOrAdmin";

-- DropEnum
DROP TYPE "AdminOrSypplierRole";

-- CreateTable
CREATE TABLE "InfoRole" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "InfoRole_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InfoRole_email_key" ON "InfoRole"("email");

-- AddForeignKey
ALTER TABLE "Promotion" ADD CONSTRAINT "Promotion_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "InfoRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
