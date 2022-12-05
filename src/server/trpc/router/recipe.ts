import { router, publicProcedure } from "../trpc";

export const recipeRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.recipe.findMany();
  }),
});
