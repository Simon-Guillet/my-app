import * as React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { HomeScreen } from "./src/components/HomeStack"
import { DetailsScreen } from "./src/components/DetailStack"
import { SeriesScreen } from "./src/components/SeriesStack"
import { DetailsSeriesScreen } from "./src/components/DetailSeriesStack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Ionicons from "react-native-vector-icons/Ionicons"

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function HomeStackScreen() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="List"
				component={HomeScreen}
				options={{ title: "Les Films Populaires" }}
			/>
			<Stack.Screen
				name="Details"
				component={DetailsScreen}
				options={{ title: "Détails du Film" }}
			/>
		</Stack.Navigator>
	)
}

function SeriesStackScreen() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="SeriesList"
				component={SeriesScreen}
				options={{ title: "Les Séries Populaires" }}
			/>
			<Stack.Screen
				name="DetailsSeries"
				component={DetailsSeriesScreen}
				options={{ title: "Détails de la Série" }}
			/>
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
						} else if (route.name === "Series") {
							iconName = focused ? "ios-tv" : "ios-tv-outline"
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
					headerShown: false,
				})}
			>
				<Tab.Screen name="Movies" component={HomeStackScreen} />
				<Tab.Screen name="Series" component={SeriesStackScreen} />
			</Tab.Navigator>
		</NavigationContainer>
	)
}

export default App
