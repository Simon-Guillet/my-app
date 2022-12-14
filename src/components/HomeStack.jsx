import { Image, View, Text, FlatList, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import { getCharacters } from "../api/BreakingBadCharacters"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

export function HomeScreen({ navigation }) {
	const data = getCharacters()

	return (
		<View
			style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
		>
			<FlatList
				data={data}
				horizontal={false}
				numColumns={2}
				renderItem={({ item }) => (
					<Pressable
						onPress={() => {
							console.log(item)
							navigation.navigate("Characters", {
								screen: "Details",
								params: { character: item },
							})
						}}
					>
						<Image
							source={{ uri: item.img }}
							style={{ width: 150, height: 150 }}
						/>
						<Text>{item.name}</Text>
					</Pressable>
				)}
			/>
		</View>
	)
}
