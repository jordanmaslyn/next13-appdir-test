import { cache } from "react";

export const getDatesOfRecentPosts = cache(async () => {
  return (
    await fetch(`${process.env.GRAPHQL_ENDPOINT}`, {
      method: "POST",
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
