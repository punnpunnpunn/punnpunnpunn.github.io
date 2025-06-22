import { sanityFetch } from "@/sanity/lib/live"
import { POSTS_QUERY } from "@/sanity/lib/queries"
import { Post } from "@/sanity/types"
import Link from "next/link"

export default async function Blog() {
  const {data: posts} = await sanityFetch({ query: POSTS_QUERY })

  return (
    <section>
        <h1>My Blog Posts</h1>
        {posts.map((post) => (
          <div key={post._id}>
            <Link
              className="block p-4 hover:text-blue-500 text-2xl"
              href={`/blog/${post?.slug?.current}`}
            >
              {post?.title}
            </Link>
          </div>
        ))}
    </section>
  )
}