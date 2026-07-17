import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const db = new PrismaClient({ adapter });

async function main() {
  await db.bookmark.createMany({
    data: [
      {
        title: "Prisma docs",
        url: "https://www.prisma.io/docs",
        note: "ORM reference",
      },
      { title: "Zod docs", url: "https://zod.dev" },
    ],
  });
  console.log("Seeded 2 bookmarks");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
