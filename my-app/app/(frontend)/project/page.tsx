import { sanityFetch } from "@/sanity/lib/live"
import { PROJECTS_QUERY } from "@/sanity/lib/queries"
import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"
import Link from "next/link"

export default async function Home() {
  const {data: projects} = await sanityFetch({query: PROJECTS_QUERY})

  return (
    <section>
        <h1>My personal projects</h1>
        {projects.map((project) => (
          <div className="max-w-xs w-full sm:max-w-2xl sm:flex m-auto my-[50px] shadow-lg sm:shadow-none rounded-lg" key={project._id}>
            {project?.mainImage ? (
              <Image
                src={urlFor(project.mainImage).width(800).height(400).auto("format").url()}
                alt={project?.mainImage?.alt || ""}
                width={800}
                height={400}
                className="w-sm rounded-xl"
              />
            ) : null}
            <div className="p-4 flex flex-col">
              <Link className="text-gray-900 font-bold text-2xl mb-3 underline" href={String(project?.link)}>{project?.title}</Link>
              <p className="text-base text-justify mb-1">{project?.description}</p>
            </div>
          </div>
        ))}
    </section>
  )
}