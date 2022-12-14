import { useEffect, useState } from "react"

export function getEpisodes() {
    const [data, setData] = useState([])

    const getAPIData = async () => {
        try {
            const response = await fetch(
                "https://www.breakingbadapi.com/api/episodes"
            )
            const json = await response.json()
            setData(json)
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    useEffect(() => {
        setData(getAPIData())
    }, [])

    return data
}