import { PrismaClient } from '@/generated/prisma/client';

// declare global {
//   // allow global `var` declarations
//   // eslint-disable-next-line no-var
//   var prisma: PrismaClient | undefined;
// }

const globalPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;