import {
	Image,
	View,
	Text,
	StyleSheet,
	TextInput,
	FlatList,
	Pressable,
	ActivityIndicator,
} from "react-native"
import React, { useEffect, useState } from "react"
import { searchMulti } from "../api/TmdbSearch"

export function SearchScreen({ navigation }) {
	const [list, setList] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const [value, onChangeText] = React.useState("")

	useEffect(() => {
		if (!value.match(/[a-zA-Z0-9]/) || value.length < 1) {
			return
		}
		searchMulti(value)
			.then((data) => {
				setList(
					data.results.filter((item) => item.media_type !== "person")
				)
				setLoading(false)
			})
			.catch((error) => {
				console.error(error)
				setError(true)
			})
	}, [value])

	if (error) {
		return <Text>Une erreur est survenue</Text>
	}

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder="Rechercher"
				onChangeText={(text) => onChangeText(text)}
				value={value}
			/>
			{list.length === 0 && !loading ? <Text>Aucun résultat</Text> : null}
			<FlatList
				data={list}
				horizontal={false}
				numColumns={2}
				renderItem={({ item }) => (
					<Pressable
						style={styles.card}
						onPress={() => {
							if (item.media_type === "movie") {
								navigation.navigate("Movies", {
									screen: "Details",
									params: { movie: item },
								})
							} else if (item.media_type === "tv") {
								navigation.navigate("Series", {
									screen: "DetailsSeries",
									params: { serie: item },
								})
							} else if (item.media_type === "person") {
								navigation.navigate("People", {
									screen: "Details",
									params: { person: item },
								})
							}
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
							<Text style={styles.title}>
								{item.title ?? item.name ?? item.original_name}
							</Text>
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
	input: {
		height: 40,
		width: "50%",
		margin: 12,
		borderWidth: 1,
		padding: 10,
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
