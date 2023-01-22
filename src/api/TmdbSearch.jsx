export async function searchMulti(query = "Fight Club") {
	const API_KEY = "9962de3c66111255c5b403573ceab203"
	try {
		const response = await fetch(
			`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=fr-FR&query=${query}&page=1`
		)
		const json = await response.json()
		return json
	} catch (error) {
		console.error(error)
		throw error
	}
}
