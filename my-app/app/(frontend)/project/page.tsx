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
          <div className="max-w-xs w-full sm:max-w-2xl sm:flex m-auto my-[50px] h-auto shadow-lg sm:shadow-none rounded-lg" key={project._id}>
            {project?.mainImage ? (
              <div className="sm:float-left sm:w-[45%] m-2.5">
              <Image
                src={urlFor(project.mainImage).width(800).auto("format").url()}
                alt={project?.mainImage?.alt || ""}
                width={800}
                height={600}
                className="w-full max-w-lg h-auto rounded-xl"
              />
              </div>
            ) : null}
            <div className="m-2.5 sm:float-left sm:w-[45%] h-auto">
              <Link className="text-gray-900 font-bold text-3xl mb-3 underline" href={String(project?.link)}>{project?.title}</Link>
              <p className="text-lg text-justify my-1 sm:border-b">{project?.description}</p>
            </div>
          </div>
        ))}
    </section>
  )
}