import { Image, View, Text, StyleSheet, TextInput, Button } from "react-native"
import React, { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

export function ProfileScreen() {
	const [error, setError] = useState(false)
	const [user, setUser] = useState({})
	const [value, setValue] = useState("")

	useEffect(() => {
		AsyncStorage.getItem("user")
			.then((user) => {
				if (user === null) {
					AsyncStorage.setItem(
						"user",
						JSON.stringify({ name: "", picture: "" })
					)
				}
				AsyncStorage.setItem(
					"user",
					JSON.stringify({ name: "", picture: "" })
				)
				setUser(JSON.parse(user))
			})
			.catch((error) => {
				console.error(error)
				setError(true)
			})
	}, [])

	const handleChange = (text) => {
		setValue(text)
	}

	const handleSubmit = () => {
		setUser({ ...user, name: value })
		AsyncStorage.setItem("user", JSON.stringify(user))
	}

	if (error) {
		return <Text>Une erreur est survenue</Text>
	}

	return (
		<View style={styles.container}>
			<View style={styles.card}>
				{user.picture === "" && (
					<Text style={styles.text}>No picture</Text>
				)}
				{user.picture !== "" && (
					<Image
						style={styles.image}
						source={{
							uri: user.picture,
						}}
					/>
				)}
				{user.name !== "" && (
					<Text style={styles.text}>{user.name}</Text>
				)}
				<View style={styles.form}>
					<TextInput
						style={styles.input}
						placeholder="Nom"
						value={value}
						onChangeText={handleChange}
						onSubmitEditing={handleSubmit}
					/>
					<Button title="Enregistrer" onPress={handleSubmit} />
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	input: {
		height: 40,
		width: "50%",
		margin: 12,
		borderWidth: 1,
		padding: 10,
	},
	form: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	card: {
		backgroundColor: "#fff",
		borderRadius: 10,
		padding: 20,
		margin: 10,
		alignItems: "center",
		justifyContent: "center",
	},
	image: {
		width: 100,
		height: 100,
		borderRadius: 50,
		marginBottom: 20,
	},
	text: {
		fontSize: 16,
		marginBottom: 10,
	},
})
