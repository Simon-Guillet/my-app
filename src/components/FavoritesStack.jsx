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
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native"

export function FavoritesScreen() {
	const [list, setList] = useState([])
	const [error, setError] = useState(false)
	const navigation = useNavigation()

	useEffect(() => {
		const unsubscribe = navigation.addListener("focus", () => {
			AsyncStorage.getAllKeys()
				.then((keys) => {
					console.log(keys)
					return AsyncStorage.multiGet(keys)
				})
				.then((stores) => {
					setList(
						stores.map((result, i, store) => {
							return JSON.parse(store[i][1])
						})
					)
				})
				.catch((error) => {
					console.error(error)
					setError(true)
				})
		})

		return unsubscribe
	}, [navigation])

	if (error) {
		return <Text>An error has occurred</Text>
	}

	return (
		<View style={styles.container}>
			<FlatList
				data={list}
				horizontal={false}
				numColumns={2}
				renderItem={({ item }) => (
					<View style={styles.card}>
						<Image
							source={{
								uri:
									"https://image.tmdb.org/t/p/original" +
									item.poster_path,
							}}
							style={styles.image}
						/>
						<View style={styles.titleContainer}>
							<Text style={styles.title}>
								{item.title ?? item.name}
							</Text>
						</View>
					</View>
				)}
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
