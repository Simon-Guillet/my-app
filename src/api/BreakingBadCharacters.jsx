import React, { useEffect, useState } from "react"

export function getData() {
	const [data, setData] = useState([])

	const getAPIData = async () => {
		try {
			const response = await fetch(
				"https://www.breakingbadapi.com/api/characters"
			)
			const json = await response.json()
			setData(json)
			console.log(json[0])
		} catch (error) {
			console.error(error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		setData(getAPIData())
	}, [])

	console.log(data)
	return data
}
