import { PostsList } from "@/components/PostsList";
import { getPostsList } from "@/utilities/getPostsList";

export default async function PostsByYear({
  params,
}: {
  params: { year: string };
}) {
  const posts = await getPostsList(Number(params.year));

  return (
    <div>
      <h1 className="text-3xl font-bold uppercase mb-4">
        Blog Posts from {params.year}
      </h1>
      {/* @ts-expect-error Server Component */}
      <PostsList posts={posts} />
    </div>
  );
}
