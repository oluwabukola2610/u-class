import React from "react";
import { View, Image, Text, ScrollView, TouchableOpacity } from "react-native";
import { styled } from "nativewind"; // Assuming you're using NativeWind
import { image } from "@/constants";
import { router } from "expo-router";

const imagesGrid1 = [
  { id: 1, source: require("@/assets/images/Frame 427319375.png") },
  { id: 2, source: require("@/assets/images/Frame 427319375.png") },
  { id: 3, source: require("@/assets/images/Frame 427319375.png") },
  { id: 4, source: require("@/assets/images/Frame 427319375.png") },
];

const imagesGrid2 = [
  { id: 1, source: require("@/assets/images/Frame 427319376.png") },
  { id: 2, source: require("@/assets/images/Frame 427319376.png") },
  { id: 3, source: require("@/assets/images/Frame 427319376.png") },
  { id: 4, source: require("@/assets/images/Frame 427319376.png") },
];
const handleImagePress = (imageId: number) => {
  router.navigate("/(roots)/details");
};

const Home = () => {
  return (
    <View className="flex-1 ">
      <Image
        source={image.bg}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      />
      <View className="p-6 pt-20 w-full">
        <Text className="text-xl font-bold">Welcome Praise,</Text>
        <Text className="text-base text-gray-600">
          Get started on a project
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          padding: 16,
        }}
      >
        <View className="flex-1">
          {imagesGrid1.map((img) => (
            <TouchableOpacity
              onPress={() => handleImagePress(img.id)}
              key={img.id}
            >
              <Image
                key={img.id}
                source={img.source}
                resizeMode="contain"
                className=" mb-4  w-[100%]"
              />
            </TouchableOpacity>
          ))}
        </View>

        <View className="flex-1">
          {imagesGrid2.map((img) => (
            <TouchableOpacity
              onPress={() => handleImagePress(img.id)}
              key={img.id}
            >
              <Image
                key={img.id}
                source={img.source}
                resizeMode="contain"
                className=" mb-4  w-[100%]"
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
