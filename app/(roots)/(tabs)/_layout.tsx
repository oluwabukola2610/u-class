import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#D8FBEA",
          height: 75,
          paddingBottom: 10,
          paddingHorizontal: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.3,
          shadowRadius: 10,
          elevation: 10,
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "lightgray",
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View className=" items-center">
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={25}
                color={focused ? "#009951" : "black"}
              />

              <Text
                style={{
                  color: focused ? "#009951" : "black",
                  marginLeft: 5,
                  fontSize: 16,
                }}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />

      {/* Setting Screen */}
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View className=" items-center">
              <Ionicons
                name={focused ? "person-outline" : "person-outline"}
                size={25}
                color={focused ? "#009951" : "black"}
              />

              <Text
                style={{
                  color: focused ? "#009951" : "black",
                  marginLeft: 5,
                  fontSize: 16,
                }}
              >
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
