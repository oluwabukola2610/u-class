import { View, Text, Image, SafeAreaView } from "react-native";
import React, { ReactNode } from "react";
import { image } from "@/constants";

interface CustomBackgroundProps {
  children: ReactNode;
}

const CustomBackground: React.FC<CustomBackgroundProps> = ({ children }) => {
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
      <SafeAreaView className="flex-1">{children}</SafeAreaView>
    </View>
  );
};

export default CustomBackground;
