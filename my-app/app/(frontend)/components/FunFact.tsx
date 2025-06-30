import { sanityFetch } from "@/sanity/lib/live"
import { FUNFACT_QUERY } from "@/sanity/lib/queries"
import RandomFact from "./RandomFact"

export default async function FunFact() {
  const {data: funFacts} = await sanityFetch({ query: FUNFACT_QUERY })

  return (
    <>
        <RandomFact factList={funFacts}/>
    </>
  )
}