'use client'

import { FUNFACT_QUERYResult } from "@/sanity/types"
import Image from "next/image"
import { useState } from "react"

const RandomFact = ({factList}: {factList: FUNFACT_QUERYResult}) => {
    const [randomFact, setRandomFact] = useState("Generate random fact")
    function randomizeFact() {
        setRandomFact(String(factList[Math.floor(Math.random()*factList.length)].fact))
    }

    return (
        <>
            <p>{randomFact}</p>
            <button onClick={randomizeFact}>Randomize</button>
        </>
    )
}

export default RandomFact