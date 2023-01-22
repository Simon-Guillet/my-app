import * as React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { HomeScreen } from "./src/components/HomeStack"
import { DetailsScreen } from "./src/components/DetailStack"
import { SeriesScreen } from "./src/components/SeriesStack"
import { DetailsSeriesScreen } from "./src/components/DetailSeriesStack"
import { FavoritesScreen } from "./src/components/FavoritesStack"
import { SearchScreen } from "./src/components/SearchStack"
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

function FavoritesStackScreen() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="FavoritesList"
				component={FavoritesScreen}
				options={{ title: "Mes Favoris" }}
			/>
		</Stack.Navigator>
	)
}

function SearchStackScreen() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="SearchList"
				component={SearchScreen}
				options={{ title: "Rechercher" }}
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
						} else if (route.name === "Favorites") {
							iconName = focused
								? "ios-heart"
								: "ios-heart-outline"
						} else if (route.name === "Search") {
							iconName = focused
								? "ios-search"
								: "ios-search-outline"
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
				<Tab.Screen
					name="Movies"
					component={HomeStackScreen}
					options={{ title: "Les Films" }}
				/>
				<Tab.Screen
					name="Series"
					component={SeriesStackScreen}
					options={{ title: "Les Séries" }}
				/>
				<Tab.Screen
					name="Favorites"
					component={FavoritesStackScreen}
					options={{ title: "Vos Favoris" }}
				/>
				<Tab.Screen
					name="Search"
					component={SearchStackScreen}
					options={{ title: "Rechercher" }}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	)
}

export default App
