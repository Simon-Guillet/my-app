import { Image, View, Text, FlatList, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
// import { getCharacters } from "../api/BreakingBadCharacters"
import { getMovies, fetchMore } from "../api/TmdbPopMov"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

export function HomeScreen({ navigation }) {
	const data = getMovies()
	const fetchMore = () => {
		console.log("fetching more")
	}

	return (
		<View
			style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
		>
			<FlatList
				data={data.results}
				horizontal={false}
				numColumns={2}
				onEndReachedThreshold={0.5}
				onEndReached={fetchMore()}
				renderItem={({ item }) => (
					<Pressable
						style={{ margin: 5 }}
						onPress={() => {
							console.log(item)
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
							style={{ width: 160, height: 240 }}
						/>
						<View style={{ flexDirection: "row" }}>
							<Text style={{ flex: 1, flexWrap: "wrap" }}>
								{item.title}
							</Text>
						</View>
					</Pressable>
				)}
			/>
		</View>
	)
}
