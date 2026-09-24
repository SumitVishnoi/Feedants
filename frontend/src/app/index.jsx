import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 24 }}>Home Screen</Text>

      <Pressable
        onPress={() =>
          router.push("/competition/6ab50f6d3c363383a37cedc4")
        }
        style={{
          marginTop: 20,
          padding: 15,
          backgroundColor: "black",
        }}
      >
        <Text style={{ color: "white" }}>
          Open Competition
        </Text>
      </Pressable>
    </View>
  );
}