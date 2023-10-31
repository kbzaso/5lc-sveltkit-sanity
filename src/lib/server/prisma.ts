import { PrismaClient } from "@prisma/client";

let prismaClient: PrismaClient;

const getPrismaClient = (): PrismaClient => {
  if (!prismaClient) {
    prismaClient = new PrismaClient();
  }

  return prismaClient;
};

export const client = getPrismaClient();