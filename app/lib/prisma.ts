// Единый серверный экземпляр PrismaClient. Файл импортируется только
// серверным кодом, поэтому директивы "use client" здесь нет.
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// При горячей перезагрузке в development модуль выполняется заново,
// поэтому клиент берётся из globalThis, а не создаётся повторно.
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
