import { prisma } from "../../prisma/prisma";

export async function getTeamById(id: number) {
  return await prisma.team.findUnique({
    where: {
      id,
    },
    include: {
      members: true,
      joinRequests: true,
      awayReservations: {
        include: {
          court: {
            include: {
              location: true,
            },
          },
        },
      },
      homeReservations: {
        include: {
          court: {
            include: {
              location: true,
            },
          },
        },
      },
    },
  });
}

export async function getAllTeams(userId: string) {
  return prisma.team.findMany({
    where: {
      NOT: {
        members: {
          some: {
            id: userId,
          },
        },
      },
    },
    include: {
      members: true,
    },
  });
}
