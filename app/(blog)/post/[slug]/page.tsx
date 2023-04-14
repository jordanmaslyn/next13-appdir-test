import Image from "next/image";

export default async function BlogPostSingle({
  params,
}: {
  params: { slug: string };
}) {
  const post = (
    await fetch(`${process.env.GRAPHQL_ENDPOINT}`, {
      method: "POST",
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
          slug: params.slug,
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

  const featuredImage =
    post.featuredImage?.node &&
    (post.featuredImage.node.mediaDetails.sizes
      ? {
          width: post.featuredImage.node.mediaDetails.sizes[0].width,
          height: post.featuredImage.node.mediaDetails.sizes[0].height,
          sourceUrl: post.featuredImage.node.mediaDetails.sizes[0].sourceUrl,
          altText: post.featuredImage.node.altText,
        }
      : {
          width: post.featuredImage.node.mediaDetails.width,
          height: post.featuredImage.node.mediaDetails.height,
          sourceUrl: post.featuredImage.node.sourceUrl,
          altText: post.featuredImage.node.altText,
        });

  return (
    <article>
      <header className="flex justify-between items-start border-solid border-b border-b-gray-400 mb-8 pb-4">
        <div className="mr-4">
          <h1 className="text-5xl font-bold">{post.title}</h1>
          <p className="text-sm text-gray-600">
            {new Date(post.date).toLocaleDateString("en-us", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        {featuredImage && (
          <Image
            className="flex-none w-1/4"
            src={featuredImage.sourceUrl}
            alt={featuredImage.altText}
            width={featuredImage.width}
            height={featuredImage.height}
          />
        )}
      </header>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}

export async function generateStaticParams() {
  const posts = (
    await fetch(`${process.env.GRAPHQL_ENDPOINT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
                query GetFreshestPosts($numOfPosts: Int!) {
                    posts(first: $numOfPosts) {
                      nodes {
                        slug
                      }
                    }
                  }
                  `,
        variables: {
          numOfPosts: 100,
        },
      }),
    }).then((res) => res.json())
  ).data.posts.nodes as Array<{
    slug: string;
  }>;

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
