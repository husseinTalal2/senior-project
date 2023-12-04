import { prisma } from "../../prisma/prisma";

export async function getAll() {
  return await prisma.court.findMany({});
}

export async function getById(id: number) {
  return await prisma.court.findUnique({
    where: { id },
    include: {
      location: true,
    },
  });
}

export async function getCourtSchedule(courtId: number) {
  return await prisma.court.findUnique({
    where: {
      id: courtId,
    },
    select: {
      reservations: {
        select: {
          from: true,
          to: true,
        },
      },
    },
  });
}

export async function getNearest() {}
