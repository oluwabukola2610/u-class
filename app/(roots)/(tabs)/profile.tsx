import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import CustomBackground from "@/components/CustomBackground";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

const statGrid = [
  { id: 1, text: "Total swipes", num: 0 },
  { id: 2, text: "Total time swiping", num: 0 },

  { id: 3, text: "Total area swiped", num: 0 },

  { id: 4, text: "Total projects", num: 0 },
];

const settingGrid = [
  { id: 1, text: "Change Username" },
  { id: 2, text: "Reset Password" },

  { id: 3, text: "Language" },

  { id: 4, text: "Sign out" },
];

const Profile = () => {
  return (
    <CustomBackground>
      <StatusBar style="dark" />

      <View className="flex-1 ">
        <View className="flex w-full h-32">
          <Image
            source={require("@/assets/images/profile.png")}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "contain",
            }}
          />
        </View>
        <Text className="text-lg font-bold text-gray-800 mx-6">Statistics</Text>
        <View className="flex flex-row flex-wrap items-center justify-center">
          {statGrid.map((stat) => (
            <TouchableOpacity
              key={stat.id}
              className="w-[45%] m-1 bg-white p-4 rounded-lg h-24"
            >
              <Text className="mb-4 text-xs">{stat.text}</Text>
              <Text className="text-3xl font-bold">{stat.num}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text className="text-lg font-bold text-gray-800 mt-4 mx-6">
          Setings
        </Text>
        <View className="flex  items-center justify-center w-full">
          {settingGrid.map((stat) => (
            <TouchableOpacity
              key={stat.id}
              className="w-[90%] flex flex-row  my-1 bg-white px-4 mx-7 rounded-lg h-14 justify-between items-center"
            >
              <Text className=" text-xs">{stat.text}</Text>
              <AntDesign name="right" size={24} color="black" />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </CustomBackground>
  );
};

export default Profile;
