import { cache } from "react";

export const getPostsList = cache(async (year?: number, month?: number) => {
  const variableDefinition =
    year && month ? `, $year: Int!, $month: Int!` : year ? `, $year: Int!` : "";
  const whereClause =
    year && month
      ? `, where: {dateQuery: {month: $month, year: $year}}`
      : year
      ? `, where: {dateQuery: {year: $year}}`
      : "";

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
                    query GetFreshestPosts($numOfPosts: Int!${variableDefinition}) {
                        posts(first: $numOfPosts${whereClause}) {
                          nodes {
                            title
                            slug
                            date
                            excerpt
                          }
                        }
                      }
                      `,
        variables: {
          numOfPosts: 10,
          year,
          month,
        },
      }),
    }).then((res) => res.json())
  ).data.posts.nodes as Array<{
    title: string;
    slug: string;
    excerpt: string;
    date: string;
  }>;
});
