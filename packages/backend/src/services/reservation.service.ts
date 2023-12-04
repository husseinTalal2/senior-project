import { $Enums } from "@prisma/client";
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
      OR: [
        {
          homeTeamId: {
            in: teamsIds,
          },
        },
        {
          awayTeamId: {
            in: teamsIds,
          },
        },
      ],
    },
    include: {
      court: true,
      homeTeam: {
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
      awayTeam: {
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

type ReservationCreateInput = {
  from: Date | string;
  to: Date | string;
  homeTeamId: number;
  courtId: number;
};
export async function createNewReservation(data: ReservationCreateInput) {
  return await prisma.reservation.create({
    data: {
      from: data.from,
      to: data.to,
      status: [$Enums.ReservationStatus.PENDING],
      court: {
        connect: {
          id: data.courtId,
        },
      },
      homeTeam: {
        connect: {
          id: data.homeTeamId,
        },
      },
    },
  });
}
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
      homeTeam: {
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
      awayTeam: {
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

  return {
    ...reservation,
  };
}
