-- CreateEnum
CREATE TYPE "CourtType" AS ENUM ('FOOTBALL', 'VOLLEYBALL');

-- AlterTable
ALTER TABLE "Court" ADD COLUMN     "courtType" "CourtType" NOT NULL DEFAULT 'FOOTBALL';
