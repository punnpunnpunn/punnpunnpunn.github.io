import { sanityFetch } from "@/sanity/lib/live";
import { POST_QUERY } from "@/sanity/lib/queries";
import { PortableText } from "next-sanity";
import { notFound } from "next/navigation";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { getPostHogClient } from "@/lib/posthog-server";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: post } = await sanityFetch({
    query: POST_QUERY,
    params: { slug },
  });

  if (!post) {
    notFound();
  }

  const posthogClient = getPostHogClient();
  posthogClient.capture({
    distinctId: "anonymous",
    event: "blog_post_viewed",
    properties: {
      slug,
      title: post.title,
    },
  });

  const convertDate = (date: string | null) => {
    if (date){
      return new Date(date).toLocaleDateString("en-US", {day: "numeric", month: "long", year: "numeric"}
      )}
    else{
      return null
    }
  }

  return (
    <section>
      <h1 className="text-justify p-0 mt-[70px] mb-[10px] font-medium">{post?.title}</h1>
      <p>By Punpun <br/> {convertDate(post?.publishedAt)} </p>

      {post?.mainImage ? (
        <Image
          src={urlFor(post.mainImage).width(2000).auto("format").url()}
          alt={post?.mainImage?.alt || ""}
          width="2000"
          height="1000"
          className="my-5 max-w-[750px] w-full"
        />
      ) : null}
      {post?.body ? (
        <div className="text-xl">
          <PortableText value={post.body}/>
        </div>
      ): null}
    </section>
  );
}