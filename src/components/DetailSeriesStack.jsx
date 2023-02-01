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
import { getSimSeries } from "../api/TmdbSimSer"

export function DetailsSeriesScreen({ route, navigation }) {
	const { serie } = route.params
	const [isFavorite, setIsFavorite] = React.useState(false)
	const [simSeries, setSimSeries] = React.useState([])

	React.useEffect(() => {
		AsyncStorage.getItem(serie.id.toString()).then((value) => {
			if (value !== null) {
				setIsFavorite(true)
			}
		})

		getSimSeries(serie.id).then((data) => {
			setSimSeries(data.results)
		})
	}, [serie.id])

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
			<ScrollView style={styles.scroller}>
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
				<View style={styles.buttonWrapper}>
					<Button
						title={
							isFavorite
								? "Supprimer des favoris"
								: "Ajouter aux favoris"
						}
						onPress={toggleFavorite}
						color={isFavorite ? "gray" : "tomato"}
					/>
				</View>

				<Text style={styles.overview}>{serie.overview}</Text>
				{simSeries.length > 0 && (
					<Text style={styles.title}>Séries similaires</Text>
				)}
				<FlatList
					data={simSeries}
					keyExtractor={(item) => item.id.toString()}
					horizontal={true}
					renderItem={({ item }) => (
						<Pressable
							style={styles.card}
							onPress={() => {
								navigation.navigate("DetailsSeries", {
									serie: item,
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
								<Text style={styles.text}>{item.name}</Text>
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
