import { Role } from "@prisma/client";
import { prisma } from "../../prisma/prisma";

export async function createUser({
  id,
  name,
  email,
  avatar,
  role,
  location,
}: {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: Role;
  location: {
    latitude: number;
    longitude: number;
  };
}) {
  return await prisma.user.create({
    data: {
      id: id,
      email,
      name,
      role,
      avatar,
      location: {
        create: {
          latitude: location.latitude,
          longitude: location.longitude,
        },
      },
    },
  });
}
