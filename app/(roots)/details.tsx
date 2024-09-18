import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { image } from "@/constants";
import CustomButton from "@/components/Custombutton";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const Details = () => {
  return (
    <View className="flex-1">
      <Image
        source={image.bg}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      />
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 50, 
          left: 16, 
          zIndex: 1,
        }}
        onPress={() => router.back()} 
      >
        <Ionicons name="arrow-back-outline" size={24} color="#009951" />
      </TouchableOpacity>

      <View className="pt-24 w-full">
        <Image
          source={image.forest}
          style={{
            width: "100%",
            height: 250,
            resizeMode: "cover",
          }}
        />
        <Text
          className="text-base"
          style={{
            marginTop: 16,
            paddingHorizontal: 16,
          }}
        >
          Abuja, the capital city of Nigeria, is known for its planned urban
          design, but it is also surrounded by areas with natural vegetation,
          including forests. While it doesn't have vast, dense forests like some
          other parts of Nigeria, it does have significant green spaces and
          forested areas, particularly in the surrounding hills and parklands.
        </Text>
        <View className="p-4 mt-6">
          <CustomButton
            title="Continue"
            textStyles="text-white"
            containerStyles="bg-[#009951] mb-4 "
          />
          <CustomButton
            title="Tutorial"
            textStyles="text-[#009951]"
            containerStyles="bg-[#7878801F]"
          />
        </View>
      </View>
    </View>
  );
};

export default Details;
