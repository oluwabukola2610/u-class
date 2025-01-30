import React from "react";
import { Stack, router } from "expo-router";
import { Pressable, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="details" options={{ headerShown: false }} />
      <Stack.Screen
        name="questions"
        options={{ headerShown: false }}
        // options={{
        //   headerTransparent: true,
        //   title: "",
        //   headerLeft: () => (
        //     <TouchableOpacity
        //       onPress={() => {
        //         router.back();
        //       }}
        //     >
        //       <Ionicons name="arrow-back-outline" size={24} color="#009951" />
        //     </TouchableOpacity>
        //   ),
        // }}
      />
      <Stack.Screen
        name="tutorial"
        options={{
          headerTransparent: true,
          title: "Tutorial",
          headerTitleAlign: "center", // This centers the title
          headerBackVisible: false,
          headerStyle: {
            backgroundColor: "#dcfce7",
          },
          headerLeft: () => (
            <Pressable
              onPressIn={() => {
                console.log("ppp");
                router.back();
              }}
              style={{}}
              accessibilityLabel="Back"
            >
              <Ionicons name="arrow-back-outline" size={24} color="#009951" />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
};

export default Layout;
