import Link from "next/link";
import { type SanityDocument } from "next-sanity";

import { client } from "../../sanity/client";

export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(
    `
    *[_type == "post" && defined(slug.current)] |
    order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}
    `,
    {},
    { next: { revalidate: 30 } }
  );

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <h1 className="text-4xl font-bold mb-8">Posts</h1>
      <ul className="flex flex-col gap-y-4">
        {posts.map((post) => (
          <li className="hover:underline" key={post._id}>
            <Link href={`/blog/${post.slug.current}`}>
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
