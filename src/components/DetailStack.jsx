import { Button, StyleSheet, Text, View, Image } from "react-native"
import * as React from "react"

export function DetailsScreen({ route, navigation }) {
	const { movie } = route.params
	return (
		<View style={{ flex: 1, alignItems: "center" }}>
			<Image
				source={{
					uri:
						"https://image.tmdb.org/t/p/original" +
						movie.backdrop_path,
				}}
				style={{ width: 500, height: 280 }}
			/>
			<Text style={{ fontSize: 32, fontWeight: "bold" }}>
				{movie.title}
			</Text>
			<Text style={{ fontSize: 16 }}>{movie.release_date}</Text>
			<Text style={{ fontSize: 20 }}>Rating: {movie.vote_average}</Text>
			<Text
				style={{
					fontSize: 20,
					marginVertical: 20,
					marginHorizontal: 10,
				}}
			>
				{movie.overview}
			</Text>

			{/* <Image
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
			<Text style={{ fontSize: 20 }}>Seasons: {character.appearance}</Text> */}
		</View>
	)
}
