import { View, Text, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";

import React from "react";
import CustomBackground from "@/components/CustomBackground";
import { ScrollView } from "react-native";
import { router } from "expo-router";
import { Image } from "react-native";

const Tutorial = () => {
  return (
    <CustomBackground>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
        <StatusBar style="dark" />
        <View className="mb-4">
          <Text className="text-lg font-semibold">1. Swipe to Classify</Text>
          <Text className="text-base text-gray-700 mt-1">
            Swipe images to classify them:
          </Text>
          <Text className="text-base text-gray-700 mt-1">
            - Swipe **Right** for "Yes"
            {"\n"}- Swipe **Left** for "No"
            {"\n"}- Swipe **Down** for "Unsure"
          </Text>
        </View>
        <View className="mb-4">
          <Text className="text-lg font-semibold">2. Answer Options</Text>
          <Text className="text-base text-gray-700 mt-1">
            For certain questions, you'll have multiple answer options:
            {"\n"}- Swipe to the corresponding button to select your answer.
          </Text>
        </View>

        <View className="mb-4">
          <Text className="text-lg font-semibold">
            3. View and Toggle Image Layers
          </Text>
          <Text className="text-base text-gray-700 mt-1">
            Tap the **Layer** button to toggle between two different images of
            the same location.
          </Text>
        </View>

        <View className="mb-4">
          <Text className="text-lg font-semibold">
            4. Grid and Hint Overlay
          </Text>
          <Image
            source={require("@/assets/images/tutorialIconImage.jpg")}
            resizeMode="contain"
            className=" mb-4  w-[100%]"
          />
          <Text className="text-base text-gray-700 mt-1">
            - Use the **Grid** icon to the left to enable or disable the grid
            overlay on the images for better reference.
          </Text>
          <Text className="text-base text-gray-700 mt-1">
            - Use the **hint** icon to the right to enable or disable the hint
            modal for you to be able to have more infor mation about what the
            options should look like. For example, if the question asks about
            forest or non-forest, the hint shows you what a forest should look
            like and what a non forest should look like
          </Text>
        </View>

        <View className="mb-4">
          <Text className="text-lg font-semibold">
            5. Progress and Completion
          </Text>
          <Text className="text-base text-gray-700 mt-1">
            The app tracks your progress:
            {"\n"}- After completing five tasks, you'll see a progress message.
            {"\n"}- When you finish all tasks, a final score screen will appear.
          </Text>
        </View>

        <View className="mb-4">
          <Text className="text-lg font-semibold">6. Hints and Guidance</Text>
          <Text className="text-base text-gray-700 mt-1">
            Tap the **Info** icon to access helpful hints and instructions.
          </Text>
        </View>

        <View className="mt-6">
          <Text className="text-base text-center text-gray-700">
            Please ensure to classify all images and answer each question
            carefully. Your responses contribute to valuable data collection for
            the project.
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-10 bg-green-600 py-3 rounded-lg"
        >
          <Text className="text-center text-white font-semibold text-lg">
            Got It!
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </CustomBackground>
  );
};

export default Tutorial;
