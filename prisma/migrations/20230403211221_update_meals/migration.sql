-- AlterTable
ALTER TABLE "Meal" ADD COLUMN     "sessionId" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "sessionId" DROP NOT NULL;
