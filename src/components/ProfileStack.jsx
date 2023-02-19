import {
	Image,
	View,
	Text,
	StyleSheet,
	TextInput,
	Button,
	Platform,
} from "react-native"
import React, { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as ImagePicker from "expo-image-picker"

export function ProfileScreen() {
	const [error, setError] = useState(false)
	const [user, setUser] = useState({ name: "", picture: "" })
	const [value, setValue] = useState("")
	const [image, setImage] = useState(null)

	useEffect(() => {
		AsyncStorage.getItem("user")
			.then((user) => {
				if (user === null) {
					AsyncStorage.setItem(
						"user",
						JSON.stringify({ name: "Inconnu", picture: "" })
					)
					setUser({ name: "Inconnu", picture: "" })
				} else {
					setUser(JSON.parse(user))
				}
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
		setUser((prevState) => ({ ...prevState, name: value }))
		AsyncStorage.setItem("user", JSON.stringify({ ...user, name: value }))
	}

	const deleteAccount = () => {
		setUser({ name: "Inconnu", picture: "" })
		AsyncStorage.setItem(
			"user",
			JSON.stringify({ name: "Inconnu", picture: "" })
		)
	}

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		})

		if (!result.canceled) {
			setImage(result.assets[0].uri)
			setUser((prevState) => ({
				...prevState,
				picture: result.assets[0].uri,
			}))
			AsyncStorage.setItem(
				"user",
				JSON.stringify({ ...user, picture: result.assets[0].uri })
			)
		}
	}

	if (error) {
		return <Text>Une erreur est survenue</Text>
	}

	return (
		<View style={styles.container}>
			<View style={styles.card}>
				{user && user.picture === "" && (
					<Image
						style={styles.image}
						source={require("../../assets/default-user.jpg")}
					/>
				)}
				{user && user.picture !== "" && (
					<Image
						style={styles.image}
						source={{
							uri: user.picture,
						}}
					/>
				)}
				<Button title="Choisir une image" onPress={pickImage} />

				{user && user.name === "" && (
					<Text style={styles.text}>Nom : Inconnu</Text>
				)}
				{user && user.name !== "" && (
					<Text style={styles.text}>Nom : {user.name}</Text>
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
				{user && (user.name !== "Inconnu" || user.picture !== "") ? (
					<Button
						title="Supprimer mon compte"
						color="red"
						onPress={deleteAccount}
					/>
				) : null}
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
