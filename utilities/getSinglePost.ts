import { cache } from "react";

export const getSinglePost = cache(async (slug: string) => {
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
                query GetPostBySlug($slug: ID!) {
                    post(id: $slug, idType:SLUG) {
                      title
                      slug
                      date
                      content
                      featuredImage {
                        node {
                          altText
                          sourceUrl
                          mediaDetails {
                            width
                            height
                            sizes(include: [MEDIUM_LARGE, MEDIUM]) {
                              height
                              width
                              sourceUrl
                            }
                          }
                        }
                      }
                    }
                  }
                          `,
        variables: {
          slug,
        },
      }),
    }).then((res) => res.json())
  ).data.post as {
    title: string;
    slug: string;
    content: string;
    date: string;
    featuredImage: {
      node: {
        sourceUrl: string;
        altText: string;
        mediaDetails: {
          width: number;
          height: number;
          sizes: Array<{
            height: number;
            width: number;
            sourceUrl: string;
          }> | null;
        };
      };
    };
  };
});
