import { Button, StyleSheet, Text, View } from "react-native"
import * as React from "react"

export function DetailsScreen({ navigation }) {
	return (
		<View
			style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
		>
			<Text>Details Screen</Text>
			<Button
				title="Go to Details... again"
				onPress={() => navigation.navigate("Details")}
			/>
			<Button
				title="Go to Home"
				onPress={() => navigation.navigate("Home")}
			/>
			<Button title="Go back" onPress={() => navigation.goBack()} />
		</View>
	)
}
