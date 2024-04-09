/*
  Warnings:

  - Added the required column `author` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pageCount` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "pageCount" INTEGER NOT NULL,
ADD COLUMN     "thumbnail" TEXT NOT NULL;
