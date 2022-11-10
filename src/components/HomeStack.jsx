import * as React from "react"
import { Button, View, Text } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

export function HomeScreen({ navigation }) {
	return (
		<View
			style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
		>
			<Text>Home Screen</Text>
			<Button
				title="Go to Details"
				onPress={() => {
					/* 1. Navigate to the Details route with params */
					navigation.navigate("Details", {
						itemId: 86,
						otherParam: "anything you want here",
					})
				}}
			/>
		</View>
	)
}
