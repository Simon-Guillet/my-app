import { useEffect, useState } from "react"

export function getMovies(page = 1) {
	const [data, setData] = useState([])
	const API_KEY = "9962de3c66111255c5b403573ceab203"

	const getAPIData = async () => {
		try {
			const response = await fetch(
				`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
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

	if (data.results !== undefined) {
		console.log(data.results[0])
	}
	return data
}
