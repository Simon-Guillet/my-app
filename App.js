import { StatusBar } from "expo-status-bar"
import { Button, StyleSheet, Text, View } from "react-native"
import * as React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { HomeScreen } from "./src/components/HomeStack"
import { DetailsScreen } from "./src/components/DetailStack"
import { NavBar } from "./src/components/NavBar"

const Stack = createNativeStackNavigator()

function App() {
	return (
		<NavigationContainer>
			<NavBar />
			<Stack.Navigator>
				<Stack.Screen
					name="Home"
					component={HomeScreen}
					options={{ title: "My home" }}
				/>
				<Stack.Screen name="Details" component={DetailsScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default App
