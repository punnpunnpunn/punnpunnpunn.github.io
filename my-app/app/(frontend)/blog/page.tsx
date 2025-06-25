import { urlFor } from "@/sanity/lib/image"
import { sanityFetch } from "@/sanity/lib/live"
import { POSTS_QUERY } from "@/sanity/lib/queries"
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
          <div className="max-w-xs w-full sm:max-w-2xl sm:flex m-auto my-[50px] shadow-lg sm:shadow-none rounded-lg" key={post._id}>
            {post?.mainImage ? (
              <Image
                src={urlFor(post.mainImage).width(800).height(400).auto("format").url()}
                alt={post?.mainImage?.alt || ""}
                width={800}
                height={400}
                className="w-sm rounded-xl"
              />
            ) : null}
            <div className="p-4 flex flex-col">
              <Link className="text-gray-900 font-bold text-2xl mb-3 underline" href={`/blog/${post?.slug?.current}`}>{post?.title}</Link>
              <p className="text-base text-justify mb-1">{post?.description}</p>
              <p className="text-sm border-t">{convertDate(post?.publishedAt)}</p>
            </div>
          </div>
        ))}
    </section>
  )
}