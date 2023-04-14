import { PostsList } from "@/components/PostsList";

export default async function PostsByMonth({
  params,
}: {
  params: { year: string; month: string };
}) {
  const posts = (
    await fetch(`${process.env.GRAPHQL_ENDPOINT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
                query GetFreshestPosts($numOfPosts: Int!, $year: Int!, $month: Int!) {
                    posts(first: $numOfPosts, where: {dateQuery: {month: $month, year: $year}}) {
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
          year: Number(params.year),
          month: Number(params.month),
        },
      }),
    }).then((res) => res.json())
  ).data.posts.nodes as Array<{
    title: string;
    slug: string;
    excerpt: string;
    date: string;
  }>;
  return (
    <div>
      <h1 className="text-3xl font-bold uppercase mb-4">
        Blog Posts from{" "}
        {new Date(posts[0].date).toLocaleDateString("en-us", {
          year: "numeric",
          month: "long",
        })}
      </h1>
      {/* @ts-expect-error Server Component */}
      <PostsList posts={posts} />
    </div>
  );
}
