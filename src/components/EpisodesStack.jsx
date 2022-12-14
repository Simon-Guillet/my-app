import { Image, View, Text, FlatList, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { getEpisodes } from "../api/BreakingBadEpisodes";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export function EpisodesScreen({ navigation }) {
    const data = getEpisodes();

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <FlatList
                data={data}
                horizontal={false}
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() => {
                            console.log(item);
                            navigation.navigate("Episodes", {
                                screen: "Details",
                                episode: item,
                            });
                        }}
                        style={{ borderWidth: 1, borderColor: "black", padding: 10, margin: 10, borderRadius: 5 }}
                    >
                        <Text style={{fontWeight: "bold"}}>{item.title}</Text>
                        <Text>{item.series}: S{item.season} E{item.episode}</Text>
                    </Pressable>
                )}
            />
        </View>
    );
}