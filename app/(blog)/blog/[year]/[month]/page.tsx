import { PostsList } from "@/components/PostsList";
import { getPostsList } from "@/utilities/getPostsList";

export default async function PostsByMonth({
  params,
}: {
  params: { year: string; month: string };
}) {
  const posts = await getPostsList(Number(params.year), Number(params.month));

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
