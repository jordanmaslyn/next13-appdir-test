import { PostsList } from "@/components/PostsList";

export default async function Blog() {
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
      <h1 className="text-3xl font-bold uppercase mb-4">Latest Blog Posts</h1>
      {/* @ts-expect-error Server Component */}
      <PostsList posts={posts} />
    </div>
  );
}
