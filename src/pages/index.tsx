import Head from "next/head";
import RecipeComponent from "../components/Recipe";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import superjson from "superjson";

import { trpc } from "../utils/trpc";
import { appRouter } from "../server/trpc/router/_app";
import { createContextInner } from "../server/trpc/context";

export async function getStaticProps() {
  const ssg = await createProxySSGHelpers({
    router: appRouter,
    ctx: await createContextInner({ session: null }),
    transformer: superjson,
  });

  await ssg.recipe.getAll.prefetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 100,
  };
}

const Home = () => {
  const recipesQuery = trpc.recipe.getAll.useQuery();

  if (recipesQuery.status !== "success") {
    return <div>loading...</div>;
  }

  const { data } = recipesQuery;
  return (
    <>
      <Head>
        <title>Asthas Recept</title>
        <meta name="description" content="Astha Andréassons recept" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-start">
        <div>
          {data.map((recipe) => (
            <RecipeComponent key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
