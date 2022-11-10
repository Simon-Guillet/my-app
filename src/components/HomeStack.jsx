import { Image, View, Text, FlatList } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React, { useEffect, useState } from "react"

export function HomeScreen({ navigation }) {
	const [data, setData] = useState([])

	const getAPIData = async () => {
		try {
			const response = await fetch(
				"https://www.breakingbadapi.com/api/characters"
			)
			const json = await response.json()
			setData(json)
			console.log(json[0])
		} catch (error) {
			console.error(error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		setData(getAPIData())
	}, [])

	return (
		<View
			style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
		>
			<Text>Home Screen</Text>
			<FlatList
				data={data}
				horizontal={false}
				numColumns={2}
				renderItem={({ item }) => (
					<View>
						<Image
							source={{ uri: item.img }}
							style={{ width: 150, height: 150 }}
						/>
						<Text>{item.name}</Text>
					</View>
				)}
			/>
		</View>
	)
}
