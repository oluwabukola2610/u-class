import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import { image } from "@/constants";
import { router, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { getValueFor } from "@/constants/secureStore";
import { Alert } from "react-native";

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
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const fetchName = async () => {
      const storedName = await getValueFor("name");
      setName(storedName); // Update the state once the value is retrieved
    };
    fetchName();
  }, []);

  // const router = useRouter();

  // useEffect(() => {
  //   const backAction = () => {
  //     // Show confirmation before navigating back
  //     Alert.alert("Hold on!", "Do you want to go back to the Sign In screen?", [
  //       {
  //         text: "Cancel",
  //         onPress: () => null,
  //         style: "cancel",
  //       },
  //       {
  //         text: "YES",
  //         onPress: () => console.log("not going back"), // Replace with your sign-in route
  //       },
  //     ]);
  //     return true; // Prevent default back action
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     backAction
  //   );

  //   return () => backHandler.remove(); // Cleanup the listener
  // }, []);

  return (
    <View className="flex-1 ">
      <StatusBar style="dark" />

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
        <Text className="text-xl font-bold">Welcome {name}</Text>
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
