import { Button, StyleSheet, Text, View, Image, ScrollView } from "react-native"
import * as React from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

export function DetailsScreen({ route, navigation }) {
	const { movie } = route.params
	const [isFavorite, setIsFavorite] = React.useState(false)

	React.useEffect(() => {
		AsyncStorage.getItem(movie.id.toString()).then((value) => {
			if (value !== null) {
				setIsFavorite(true)
			}
		})
	}, [])

	const toggleFavorite = () => {
		if (isFavorite) {
			AsyncStorage.removeItem(movie.id.toString())
			setIsFavorite(false)
		} else {
			AsyncStorage.setItem(movie.id.toString(), JSON.stringify(movie))
			setIsFavorite(true)
		}
	}

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
			<Text style={styles.rating}>
				Note moyenne : {movie.vote_average}
			</Text>
			<Button
				title={
					isFavorite ? "Supprimer des favoris" : "Ajouter aux favoris"
				}
				onPress={toggleFavorite}
				color={isFavorite ? "tomato" : "blue"}
			/>
			<ScrollView>
				<Text style={styles.overview}>{movie.overview}</Text>
			</ScrollView>
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
