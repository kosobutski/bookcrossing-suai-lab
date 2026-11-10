// Проверяет соединение Prisma с PostgreSQL без создания таблиц.
import "dotenv/config";
import { prisma } from "../app/lib/prisma";

type ConnectionInfo = {
  database: string;
  role: string;
  port: number;
};

async function main() {
  const rows = await prisma.$queryRaw<ConnectionInfo[]>`
    SELECT
      current_database() AS database,
      current_user AS role,
      inet_server_port() AS port
  `;

  // Выводим только безопасные сведения, без DATABASE_URL.
  console.log("Prisma connected:", rows[0]);
}

main()
  .catch((error) => {
    console.error("Prisma connection failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
