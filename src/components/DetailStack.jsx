import { Button, StyleSheet, Text, View, Image } from "react-native"
import * as React from "react"

export function DetailsScreen({ route, navigation }) {
	const { movie } = route.params
	return (
		<View style={styles.container}>
			<Image
				source={{
					uri:
						"https://image.tmdb.org/t/p/original" +
						movie.backdrop_path,
				}}
				style={styles.banner}
			/>
			<Text style={styles.title}>{movie.title}</Text>
			<Text style={styles.date}>{movie.release_date}</Text>
			<Text style={styles.rating}>Rating: {movie.vote_average}</Text>
			<Text style={styles.overview}>{movie.overview}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
	},
	banner: {
		width: 500,
		height: 280,
	},
	title: {
		fontSize: 32,
		fontWeight: "bold",
	},
	date: {
		fontSize: 16,
	},
	rating: {
		fontSize: 20,
	},
	overview: {
		fontSize: 20,
		marginVertical: 20,
		marginHorizontal: 10,
	},
})
