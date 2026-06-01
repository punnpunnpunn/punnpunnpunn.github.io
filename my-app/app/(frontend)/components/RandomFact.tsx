'use client'

import { urlFor } from "@/sanity/lib/image"
import { FUNFACT_QUERY_RESULT } from "@/sanity/types"
import Image from "next/image"
import { useState } from "react"
import posthog from "posthog-js"

const RandomFact = ({factList}: {factList: FUNFACT_QUERY_RESULT}) => {
    const [randomFact, setRandomFact] = useState(-1)
    function randomizeFact() {
        setRandomFact(-2)
        const index = Math.floor(Math.random()*factList.length)
        setRandomFact(index)
        posthog.capture("fun_fact_generated", {
            fact_index: index,
            total_facts: factList.length,
        })
    }

    return (
        <section>
            <h1>Random Fact Generator</h1>
            <div className="max-w-sm h-auto min-h-[18rem] rounded border m-auto flex flex-col items-center justify-center shadow-2xl bg-neutral-300" onClick={randomizeFact}>
                {factList[randomFact]?.image ? (
                    <Image
                    src={urlFor(factList[randomFact].image).width(800).auto("format").url()}
                    alt={""}
                    width={800}
                    height={800}
                    className="w-3xs h-auto rounded-xl p-2"
                    priority
                    />
                ) : null}
                <p className="p-4 text-2xl text-center font-extralight">{randomFact == -1 ? "Click to generate a random fun 👆 fact about Punpun 👆" : factList[randomFact].fact}</p>
            </div>
        </section>
    )
}

export default RandomFact