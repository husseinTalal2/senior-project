import { prisma } from "../../prisma/prisma";

export async function getByUserId(userId: string) {
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
      teams: {
        select: {
          logo: true,
          name: true,
          members: {
            select: {
              id: true,
            },
          },
          id: true,
        },
      },
    },
  });
}

export async function getAll() {}

export async function getById(id: number, userId: string) {
  const reservation = await prisma.reservation.findUnique({
    where: {
      id,
    },
    include: {
      court: {
        include: {
          location: true,
        },
      },
      teams: {
        select: {
          members: {
            select: {
              id: true,
            },
          },
          name: true,
          logo: true,
        },
      },
    },
  });

  const opponentTeam = reservation?.teams.find((team) =>
    team.members.find((m) => m.id !== userId)
  );

  return {
    ...reservation,
    opponentTeam,
  };
}
