import { prisma } from "../../prisma/prisma";

export async function getByUserId(userId: number) {
  const userTeams = await prisma.team.findMany({
    where: {
      members: {
        some: {
          id: userId,
        },
      },
    },
    select: {
      id: true,
    },
  });
  const teamsIds = userTeams.map((id) => id.id);

  return await prisma.reservation.findMany({
    where: {
      teams: {
        some: {
          id: { in: teamsIds },
        },
      },
    },
    include: {
      court: true,
    },
  });
}

export async function getAll() {}

export async function getById(id: number) {
  return await prisma.reservation.findUnique({
    where: {
      id,
    },
    include: {
      court: true,
      teams: {
        include: {
          members: true,
        },
      },
    },
  });
}
