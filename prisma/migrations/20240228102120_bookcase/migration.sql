-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "category" DROP NOT NULL,
ALTER COLUMN "author" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "pageCount" DROP NOT NULL,
ALTER COLUMN "thumbnail" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Bookcase" ADD COLUMN     "user_id" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "Bookcase" ADD CONSTRAINT "Bookcase_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
