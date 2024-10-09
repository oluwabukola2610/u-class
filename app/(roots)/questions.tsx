import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import CustomBackground from "@/components/CustomBackground";
import {
  Feather,
  Ionicons,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import {
  SWIPE_THRESHOLD,
  VERTICAL_SWIPE_THRESHOLD,
  height,
  questionsData,
  width,
} from "@/constants";

const Questions = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [activeOptionIndex, setActiveOptionIndex] = useState<number | null>(
    null
  );

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const imageScale = useSharedValue(1); // To scale the image down while dragging

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: imageScale.value },
      ],
    };
  });

  const handleSwipe = (direction: string) => {
    const nextIndex = (currentIndex + 1) % questionsData.length;

    // Save the answer based on swipe direction
    setAnswers((prev) => ({
      ...prev,
      [questionsData[currentIndex].id]: direction,
    }));
    // Move to the next image/question
    setCurrentIndex(nextIndex);
  };

  const onGestureEvent = (event: any) => {
    const { translationX, translationY } = event.nativeEvent;
    translateX.value = translationX;
    translateY.value = translationY;
    imageScale.value =
      questionsData[currentIndex].type == "yesno"
        ? 1
        : Math.max(0.05, 0.7 - translationY / height);
    if (translationY > VERTICAL_SWIPE_THRESHOLD) {
      if (translationX < -90) {
        setActiveOptionIndex(0);
      } else if (translationX < 0 && translationX > -SWIPE_THRESHOLD) {
        setActiveOptionIndex(1);
      } else if (translationX > 0 && translationX < SWIPE_THRESHOLD) {
        setActiveOptionIndex(2);
      } else {
        setActiveOptionIndex(3);
      }
    }
  };
  useEffect(() => {}, [answers]);

  const onGestureEnd = (event: any) => {
    const { translationX, translationY } = event.nativeEvent;
    // console.log(questionsData[currentIndex].type);
    console.log(event.nativeEvent);

    if (questionsData[currentIndex].type == "yesno") {
      //   console.log("in here");
      if (translationX > SWIPE_THRESHOLD) {
        // Swiped right -> 'yes'
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        runOnJS(handleSwipe)("yes");
      } else if (translationX < -SWIPE_THRESHOLD) {
        // Swiped left -> 'no'
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        runOnJS(handleSwipe)("no");
      } else if (translationY > VERTICAL_SWIPE_THRESHOLD) {
        // Swiped down -> 'unsure'
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        runOnJS(handleSwipe)("unsure");
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    } else {
      if (translationY > VERTICAL_SWIPE_THRESHOLD) {
        const selectedOption = getSelectedOptionn(translationX);
        console.log(translateX);
        getSelectedOptionn;
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        imageScale.value = withSpring(1);

        runOnJS(handleSwipe)(selectedOption);
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        imageScale.value = withSpring(1);
      }
    }
  };

  const getSelectedOptionn = (translationX: number) => {
    setActiveOptionIndex(null);
    const screenHeight = width;
    if (translationX < -90) {
      console.log(screenHeight / 4);
      return "30%";
    }
    if (translationX < 0 && translationX > -90) return "70%";
    if (translationX > 0 && translationX < 90) return "100%";
    return "unsure";
  };
  console.log(answers);
  const renderPercentageOptions = () => {
    return (
      <View className="flex-row w-full px-4 mb-5 mt-auto justify-center gap-x-1">
        {["30%", "70%", "100%", "Unsure"].map((option, index) => (
          <TouchableOpacity
            key={option}
            className="flex-1 items-center py-2 bg-white rounded-lg"
            style={{
              backgroundColor: activeOptionIndex === index ? "green" : "white",
            }}
          >
            <Text className="text-lg">{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  return (
    <CustomBackground>
      <View className="flex-1  items-center">
        <Text className="text-lg text-center font-bold text-[20px] mt-10 px-1.5 leading-5">
          {questionsData[currentIndex].question}
        </Text>
        <Text className="mb-10 text-[16px] italic text-gray-400">
          (Swipe right,left or down)
        </Text>
        <View className="w-full h-[50%] items-center">
          <GestureHandlerRootView>
            <PanGestureHandler
              onGestureEvent={onGestureEvent}
              onEnded={onGestureEnd}
            >
              <Animated.View style={[animatedStyle]}>
                <Image
                  source={questionsData[currentIndex].image}
                  style={{
                    width: width - 20,
                    height: width - 20 * imageScale.value,
                  }}
                  className=" mt-4"
                />
                {questionsData[currentIndex].type === "yesno" && (
                  <>
                    <View className="absolute flex-row justify-between w-full mb-5  top-[45%]">
                      <TouchableOpacity className="flex left-3 bg-white w-12 h-12 rounded-lg justify-center items-center">
                        <Ionicons name="arrow-undo" size={24} color="black" />
                        <Text className="ml-1 font-bold">No</Text>
                      </TouchableOpacity>
                      <TouchableOpacity className=" right-3 bg-white w-12 h-12 rounded-lg justify-center items-center">
                        <Ionicons
                          name="arrow-redo-sharp"
                          size={24}
                          color="black"
                        />
                        <Text className=" font-bold">Yes</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
                <View className="absolute flex-row justify-between w-full  bottom-[2%]">
                  <TouchableOpacity className="flex flex-row left-3 bg-white px-2  rounded-lg justify-center items-center">
                    <SimpleLineIcons name="layers" size={15} color="black" />
                    <Text className="text-sm ml-2">Layer1</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className=" right-3 rounded-lg justify-center items-center">
                    <Feather name="info" size={24} color="white" />
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </PanGestureHandler>
          </GestureHandlerRootView>
        </View>
        {questionsData[currentIndex].type === "yesno" && (
          <TouchableOpacity className="flex  bg-white p-3 rounded-lg justify-center items-center mt-10">
            <MaterialIcons name="not-interested" size={24} color="red" />
            <Text className="font-bold">Unsure</Text>
          </TouchableOpacity>
        )}
        {questionsData[currentIndex].type === "percent" &&
          renderPercentageOptions()}
      </View>
    </CustomBackground>
  );
};
export default Questions;
