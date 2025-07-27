import { urlFor } from "@/sanity/lib/image"
import { sanityFetch, SanityLive } from "@/sanity/lib/live"
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
          <div className="max-w-xs w-full sm:max-w-2xl sm:flex m-auto my-[50px] h-auto shadow-lg sm:shadow-none rounded-lg" key={post._id}>
            {post?.mainImage ? (
              <div className="sm:float-left sm:w-[45%] m-2.5 float-none">
              <Image
                src={urlFor(post.mainImage).width(2000).auto("format").url()}
                alt={post?.mainImage?.alt || ""}
                width={2000}
                height={1000}
                className="w-full max-w-lg h-auto rounded-xl"
              />
              </div>
            ) : null}
            <div className="m-2.5 sm:float-left sm:w-[45%] h-auto float-none">
              <Link className="font-bold text-3xl mb-3 underline" href={`/blog/${post?.slug?.current}`}>{post?.title}</Link>
              <p className="text-lg text-justify mb-1">{post?.description}</p>
              <p className="text-sm border-t">{convertDate(post?.publishedAt)}</p>
            </div>
          </div>
        ))}
        <SanityLive />
    </section>
  )
}