export async function getSimMovies(movie, page = 1) {
	const API_KEY = "9962de3c66111255c5b403573ceab203"
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/movie/${movie}/similar?api_key=${API_KEY}&language=fr-FR&region=FR&page=${page}`
		)
		const json = await response.json()
		return json
	} catch (error) {
		console.error(error)
		throw error
	}
}
