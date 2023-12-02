import { prisma } from "../../prisma/prisma";

export class CourtService {
  constructor() {}
  async getAll() {
    return await prisma.court.findMany({});
  }

  async getById(id: number) {
    return await prisma.court.findUnique({
      where: { id },
      include: {
        location: true,
      },
    });
  }

  async getNearest() {}
}
