import { Button, StyleSheet, Text, View, Image } from "react-native"
import * as React from "react"

export function DetailsScreen({ route, navigation }) {
	const { character } = route.params
	return (
		<View
			style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
		>
			<Text style={{ fontSize: 32 }}>{character.name}</Text>
			<Image
				source={{ uri: character.img }}
				style={{ width: 280, height: 400 }}
			/>
			<Text style={{ fontSize: 20 }}>Nickname: {character.nickname}</Text>
			<Text style={{ fontSize: 20 }}>Birthday: {character.birthday}</Text>
			<Text style={{ fontSize: 20 }}>Status: {character.status}</Text>
			<Text style={{ fontSize: 20 }}>Occupation: {character.occupation.forEach(job => {
				return job
			})}</Text>
			<Text style={{ fontSize: 20 }}>Portrayed: {character.portrayed}</Text>
			<Text style={{ fontSize: 20 }}>Seasons: {character.appearance}</Text>
		</View>
	)
}
