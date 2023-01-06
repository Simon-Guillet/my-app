import * as React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { HomeScreen } from "./src/components/HomeStack"
import { DetailsScreen } from "./src/components/DetailStack"
import { EpisodesScreen } from "./src/components/EpisodesStack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Ionicons from "react-native-vector-icons/Ionicons"

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function HomeStackScreen() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="List" component={HomeScreen} />
			<Stack.Screen name="Details" component={DetailsScreen} />
		</Stack.Navigator>
	)
}

function App() {
	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName

						if (route.name === "Movies") {
							iconName = focused ? "ios-film" : "ios-film-outline"
						} else if (route.name === "Episodes") {
							iconName = focused ? "ios-list" : "ios-list-outline"
						}

						// You can return any component that you like here!
						return (
							<Ionicons
								name={iconName}
								size={size}
								color={color}
							/>
						)
					},
					tabBarActiveTintColor: "tomato",
					tabBarInactiveTintColor: "gray",
				})}
			>
				<Tab.Screen name="Movies" component={HomeStackScreen} />
				<Tab.Screen name="Episodes" component={EpisodesScreen} />
			</Tab.Navigator>
		</NavigationContainer>
	)
}

export default App
