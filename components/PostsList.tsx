import Link from "next/link";

interface Props {
  posts: Array<{ title: string; slug: string; excerpt: string; date: string }>;
}

export function PostsList({ posts }: Props) {
  return posts.map((post) => {
    return (
      <article key={post.slug} className="my-8">
        <p className="text-sm text-gray-600">
          {new Date(post.date).toLocaleDateString("en-us", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h1 className="text-5xl font-bold">
          <Link href={`/post/${post.slug}`}>{post.title}</Link>
        </h1>
        <div
          className="text-xl font-serif"
          dangerouslySetInnerHTML={{ __html: post.excerpt }}
        />
      </article>
    );
  });
}
