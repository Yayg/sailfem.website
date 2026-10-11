import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { ROLE_SEED } from "../src/lib/roles";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  for (const role of ROLE_SEED) {
    await prisma.role.upsert({
      where: { slug: role.slug },
      update: { label: role.label },
      create: role,
    });
  }
  console.log(`Seeded ${ROLE_SEED.length} roles.`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
