-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_awayTeamId_fkey";

-- AlterTable
ALTER TABLE "Reservation" ALTER COLUMN "awayTeamId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_awayTeamId_fkey" FOREIGN KEY ("awayTeamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;
