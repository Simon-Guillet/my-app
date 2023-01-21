import {
	Image,
	View,
	Text,
	FlatList,
	Pressable,
	StyleSheet,
	ActivityIndicator,
} from "react-native"
import React, { useEffect, useState } from "react"
import { getMovies } from "../api/TmdbPopMov"

export function HomeScreen({ navigation }) {
	const [list, setList] = useState([])
	const [page, setPage] = useState(1)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)

	useEffect(() => {
		getMovies(page)
			.then((data) => {
				setList((prevList) => [...prevList, ...data.results])
				setLoading(false)
			})
			.catch((error) => {
				console.error(error)
				setError(true)
			})
	}, [page])

	const fetchMore = () => {
		setLoading(true)
		setPage(page + 1)
	}

	if (error) {
		return <Text>An error has occurred</Text>
	}

	return (
		<View style={styles.container}>
			<FlatList
				data={list}
				horizontal={false}
				numColumns={2}
				onEndReachedThreshold={1}
				onEndReached={() => fetchMore()}
				renderItem={({ item }) => (
					<Pressable
						style={styles.card}
						onPress={() => {
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
				ListFooterComponent={
					loading ? <ActivityIndicator size="large" /> : null
				}
				keyExtractor={(item) => item.id.toString()}
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
