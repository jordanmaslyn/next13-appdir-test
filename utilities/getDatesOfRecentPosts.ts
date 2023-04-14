import { cache } from "react";

export const getDatesOfRecentPosts = cache(async () => {
  return (
    await fetch(`${process.env.GRAPHQL_ENDPOINT}`, {
      method: "POST",
      cache: "force-cache",
      next: {
        revalidate: 60,
      },
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
            query GetMonthsArchive($numOfPosts: Int!) {
                posts(first: $numOfPosts) {
                  nodes {
                    date
                  }
                }
              }
              `,
        variables: {
          numOfPosts: 100,
        },
      }),
    }).then((res) => res.json())
  ).data.posts.nodes as Array<{ date: string }>;
});
