import { View, Text } from "react-native";
import React from "react";

const Grid = () => {
  return (
    <View className="absolute inset-0 items-center justify-center pointer-events-none w-full h-full ">
      <View className="w-full h-[1px] bg-white absolute top-[33%]" />
      <View className="h-full w-[1px] bg-white absolute top-[5%] left-[33%]" />
      <View className="w-full h-[1px] bg-white absolute top-[66%]" />
      <View className="h-full w-[1px] bg-white absolute top-[5%] left-[66%]" />
    </View>
  );
};

export default Grid;
