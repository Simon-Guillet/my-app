import {
	Button,
	StyleSheet,
	Text,
	View,
	Image,
	ScrollView,
	Pressable,
	FlatList,
} from "react-native"
import * as React from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { getSimMovies } from "../api/TmdbSimMov"

export function DetailsScreen({ route, navigation }) {
	const { movie } = route.params
	const [isFavorite, setIsFavorite] = React.useState(false)
	const [simMovies, setSimMovies] = React.useState([])

	React.useEffect(() => {
		AsyncStorage.getItem(movie.id.toString()).then((value) => {
			if (value !== null) {
				setIsFavorite(true)
			}
		})

		getSimMovies(movie.id).then((data) => {
			setSimMovies(data.results)
		})
	}, [movie.id])

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
			<ScrollView style={styles.scroller}>
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
				<View style={styles.buttonWrapper}>
					<Button
						title={
							isFavorite
								? "Supprimer des favoris"
								: "Ajouter aux favoris"
						}
						onPress={toggleFavorite}
						color={isFavorite ? "gray" : "tomato"}
						style={styles.favorite}
					/>
				</View>

				<Text style={styles.overview}>{movie.overview}</Text>
				<Text style={styles.title}>Films similaires</Text>

				<FlatList
					data={simMovies}
					keyExtractor={(item) => item.id.toString()}
					horizontal={true}
					renderItem={({ item }) => (
						<Pressable
							style={styles.card}
							onPress={() => {
								navigation.navigate("Details", {
									movie: item,
								})
							}}
						>
							<Image
								source={{
									uri:
										"https://image.tmdb.org/t/p/w342" +
										item.poster_path,
								}}
								style={styles.image}
							/>
							<View style={styles.textContainer}>
								<Text style={styles.text}>{item.title}</Text>
							</View>
						</Pressable>
					)}
				/>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	scroller: {
		flex: 1,
		width: "100%",
	},
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
		textAlign: "center",
	},
	date: {
		fontSize: 16,
		textAlign: "center",
	},
	rating: {
		fontSize: 20,
		textAlign: "center",
	},
	buttonWrapper: {
		flexDirection: "row",
		justifyContent: "center",
	},
	overview: {
		fontSize: 20,
		marginVertical: 20,
		marginHorizontal: 10,
	},
	card: {
		margin: 5,
	},
	image: {
		width: 120,
		height: 180,
	},
	textContainer: {
		flexDirection: "column",
	},
	text: {
		flex: 1,
		flexWrap: "wrap",
		width: 120,
	},
})
