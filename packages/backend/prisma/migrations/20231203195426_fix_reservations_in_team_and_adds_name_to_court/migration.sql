/*
  Warnings:

  - You are about to drop the column `reservationId` on the `Team` table. All the data in the column will be lost.
  - Added the required column `name` to the `Court` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_reservationId_fkey";

-- AlterTable
ALTER TABLE "Court" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "reservationId";

-- CreateTable
CREATE TABLE "_ReservationToTeam" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ReservationToTeam_AB_unique" ON "_ReservationToTeam"("A", "B");

-- CreateIndex
CREATE INDEX "_ReservationToTeam_B_index" ON "_ReservationToTeam"("B");

-- AddForeignKey
ALTER TABLE "_ReservationToTeam" ADD CONSTRAINT "_ReservationToTeam_A_fkey" FOREIGN KEY ("A") REFERENCES "Reservation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReservationToTeam" ADD CONSTRAINT "_ReservationToTeam_B_fkey" FOREIGN KEY ("B") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
