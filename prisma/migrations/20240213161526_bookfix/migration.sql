/*
  Warnings:

  - The primary key for the `Book` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `reviewReview_id` on the `Book` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[book_id]` on the table `Review` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `book_id` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_reviewReview_id_fkey";

-- AlterTable
ALTER TABLE "Book" DROP CONSTRAINT "Book_pkey",
DROP COLUMN "reviewReview_id",
ALTER COLUMN "book_id" DROP DEFAULT,
ALTER COLUMN "book_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Book_pkey" PRIMARY KEY ("book_id");
DROP SEQUENCE "Book_book_id_seq";

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "book_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Review_book_id_key" ON "Review"("book_id");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book"("book_id") ON DELETE RESTRICT ON UPDATE CASCADE;
