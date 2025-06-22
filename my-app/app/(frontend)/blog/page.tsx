import { urlFor } from "@/sanity/lib/image"
import { sanityFetch } from "@/sanity/lib/live"
import { POSTS_QUERY } from "@/sanity/lib/queries"
import { authorType } from "@/sanity/schemaTypes/authorType"
import Image from "next/image"
import Link from "next/link"

export default async function Blog() {
  const {data: posts} = await sanityFetch({ query: POSTS_QUERY })
  const convertDate = (date: string | null) => {
    if (date){
      return new Date(date).toLocaleDateString("en-US", {day: "numeric", month: "short", year: "numeric"}
      )}
    else{
      return null
    }
  }
  
  return (
    <section>
        <h1>My Blog Posts</h1>
        {posts.map((post) => (
          <div className="py-2" key={post._id}>
            <Link
              className="block hover:text-blue-500 text-2xl"
              href={`/blog/${post?.slug?.current}`}
            >
              {post?.title}
            </Link>
            
            By {post.authorName} {convertDate(post?.publishedAt)}
            {post?.mainImage ? (
              <Image
                src={urlFor(post.mainImage)
                  .width(800)
                  .height(300)
                  .auto("format")
                  .url()}
                alt={post?.mainImage?.alt || ""}
                width="800"
                height="300"
              />
            ) : null}
          </div>
        ))}
    </section>
  )
}