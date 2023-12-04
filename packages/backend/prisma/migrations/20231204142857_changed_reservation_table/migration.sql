/*
  Warnings:

  - You are about to drop the `_ReservationToTeam` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `awayTeamId` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `homeTeamId` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ReservationToTeam" DROP CONSTRAINT "_ReservationToTeam_A_fkey";

-- DropForeignKey
ALTER TABLE "_ReservationToTeam" DROP CONSTRAINT "_ReservationToTeam_B_fkey";

-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "awayTeamId" INTEGER NOT NULL,
ADD COLUMN     "homeTeamId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_ReservationToTeam";

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_homeTeamId_fkey" FOREIGN KEY ("homeTeamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_awayTeamId_fkey" FOREIGN KEY ("awayTeamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
