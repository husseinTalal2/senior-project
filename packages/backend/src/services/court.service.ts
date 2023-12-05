import { prisma } from "../../prisma/prisma";

export async function getAll(searchQuery: string | undefined) {
  return await prisma.court.findMany({
    where: {
      name: {
        contains: searchQuery,
      },
    },
  });
}

export async function getById(id: number) {
  return await prisma.court.findUnique({
    where: { id },
    include: {
      location: true,
      reservations: {
        where: {
          awayTeamId: {
            equals: null,
          },
        },
        include: {
          homeTeam: true,
        },
      },
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
          homeTeamId: true,
          awayTeamId: true,
        },
      },
    },
  });
}

export async function getNearest() {}
