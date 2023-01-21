import {
	Image,
	View,
	Text,
	FlatList,
	Pressable,
	StyleSheet,
} from "react-native"
import React, { useEffect, useState } from "react"
import { getMovies } from "../api/TmdbPopMov"

export function HomeScreen({ navigation }) {
	const [list, setList] = useState([])
	let data = getMovies()
	let moreData = []
	useEffect(() => {
		setList(data.results)
	})

	const API_KEY = "9962de3c66111255c5b403573ceab203"

	const fetchMore = () => {
		console.log("fetching more")
		console.log("page:", data.page)

		const response = fetch(
			`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${
				data.page + 1
			}`
		)
			.then((response) => response.json())
			.then((json) => {
				moreData = json
				if (moreData.results !== undefined) {
					// console.log("moreData:", moreData.results[0])

					// console.log("list before:", list[0])
					setList([...list, ...moreData.results])
					console.log("list after:", list[list.length - 1].title)
				}
			})
			.catch((error) => {
				console.error(error)
			})
	}

	return (
		<View style={styles.container}>
			<FlatList
				data={list}
				horizontal={false}
				numColumns={2}
				onEndReachedThreshold={0.5}
				onEndReached={() => fetchMore()}
				renderItem={({ item }) => (
					<Pressable
						style={styles.card}
						onPress={() => {
							// console.log(item)
							navigation.navigate("Movies", {
								screen: "Details",
								params: { movie: item },
							})
						}}
					>
						<Image
							source={{
								uri:
									"https://image.tmdb.org/t/p/w500" +
									item.poster_path,
							}}
							style={styles.image}
						/>
						<View style={styles.titleContainer}>
							<Text style={styles.title}>{item.title}</Text>
						</View>
					</Pressable>
				)}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	card: {
		margin: 5,
	},
	image: {
		width: 160,
		height: 240,
	},
	titleContainer: {
		flexDirection: "row",
	},
	title: {
		flex: 1,
		flexWrap: "wrap",
	},
})
