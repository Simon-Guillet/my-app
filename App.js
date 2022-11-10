import * as React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { HomeScreen } from "./src/components/HomeStack"
import { DetailsScreen } from "./src/components/DetailStack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Ionicons from "react-native-vector-icons/Ionicons"

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function App() {
	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName

						if (route.name === "Home") {
							iconName = focused ? "ios-home" : "ios-home-outline"
						} else if (route.name === "Details") {
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
				<Tab.Screen
					name="Home"
					component={HomeScreen}
					options={{ title: "My home" }}
				/>
				<Tab.Screen name="Details" component={DetailsScreen} />
			</Tab.Navigator>
		</NavigationContainer>
	)
}

export default App
