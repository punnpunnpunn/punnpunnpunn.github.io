import { urlFor } from "@/sanity/lib/image"
import { sanityFetch, SanityLive } from "@/sanity/lib/live"
import { POSTS_QUERY } from "@/sanity/lib/queries"
import Image from "next/image"
import BlogPostLink from "../components/BlogPostLink"

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
    <section className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
        <h1>My Blog Posts</h1>
        
          <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
            <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
              {posts.map((post) => (
                <div className="rounded overflow-hidden shadow-lg" key={post._id}>
                    <div className="relative">
                      {post?.mainImage ? (
                        <BlogPostLink href={`/blog/${post?.slug?.current}`} slug={post?.slug?.current ?? ""} title={post?.title ?? null}>
                            <Image
                              src={urlFor(post.mainImage).width(2000).auto("format").url()}
                              alt={post?.mainImage?.alt || ""}
                              width={2000}
                              height={1000}
                              className="w-full max-w-lg h-auto rounded-xl"
                            />
                            <div
                                className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
                            </div>
                        </BlogPostLink>
                      ) : null}
                    </div>
                    <div className="px-6 py-4">

                        <BlogPostLink href={`/blog/${post?.slug?.current}`} slug={post?.slug?.current ?? ""} title={post?.title ?? null}
                            className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out">{post?.title}</BlogPostLink>
                        <p className="text-sm">
                            {post?.description}
                        </p>
                        <p className="text-sm border-t">{convertDate(post?.publishedAt)}</p>
                    </div>
                </div>
              ))}
            </div>
        </div>
        <SanityLive />
    </section>
  )
}