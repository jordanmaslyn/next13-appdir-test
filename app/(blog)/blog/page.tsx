import { PostsList } from "@/components/PostsList";
import { getPostsList } from "@/utilities/getPostsList";

export default async function Blog() {
  const posts = await getPostsList();

  return (
    <div>
      <h1 className="text-3xl font-bold uppercase mb-4">Latest Blog Posts</h1>
      {/* @ts-expect-error Server Component */}
      <PostsList posts={posts} />
    </div>
  );
}
