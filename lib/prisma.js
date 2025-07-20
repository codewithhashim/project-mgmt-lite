// lib/prisma.js
import { PrismaClient } from '@prisma/client';

// Prevent multiple instances of PrismaClient in development (due to HMR)
// This is similar to the `global.projects` hack, but for the Prisma client itself.
let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;