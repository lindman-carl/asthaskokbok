import { prisma } from "../src/server/db/client";

async function main() {
  await prisma.recipe.createMany({
    data: [
      {
        content: "Så här gör man hallongråttorna. Med sylt och allt.",
        title: "Hallongråttor",
      },
      {
        content: "Ett tag skulle alla göra schackrutor!",
        title: "Schackrutor",
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
