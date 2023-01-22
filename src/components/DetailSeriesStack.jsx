import { Button, StyleSheet, Text, View, Image, ScrollView } from "react-native"
import * as React from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

export function DetailsSeriesScreen({ route, navigation }) {
	const { serie } = route.params
	const [isFavorite, setIsFavorite] = React.useState(false)

	React.useEffect(() => {
		AsyncStorage.getItem(serie.id.toString()).then((value) => {
			if (value !== null) {
				setIsFavorite(true)
			}
		})
	}, [])

	const toggleFavorite = () => {
		if (isFavorite) {
			AsyncStorage.removeItem(serie.id.toString())
			setIsFavorite(false)
		} else {
			AsyncStorage.setItem(serie.id.toString(), JSON.stringify(serie))
			setIsFavorite(true)
		}
	}

	return (
		<View style={styles.container}>
			<Image
				source={{
					uri:
						"https://image.tmdb.org/t/p/original" +
						serie.backdrop_path,
				}}
				style={styles.banner}
			/>
			<Text style={styles.title}>{serie.name}</Text>
			<Text style={styles.date}>{serie.first_air_date}</Text>
			<Text style={styles.rating}>
				Note moyenne : {serie.vote_average}
			</Text>
			<Button
				title={
					isFavorite ? "Supprimer des favoris" : "Ajouter aux favoris"
				}
				onPress={toggleFavorite}
				color={isFavorite ? "tomato" : "blue"}
			/>
			<ScrollView>
				<Text style={styles.overview}>{serie.overview}</Text>
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
