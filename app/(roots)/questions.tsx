import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
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
  image,
  questionsData,
  width,
} from "@/constants";
import Swiper from "react-native-swiper";

const Questions = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [activeOptionIndex, setActiveOptionIndex] = useState<number | null>(
    null
  );
  const [showLayer, setShowLayer] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const swiperRef = useRef<Swiper>(null);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const imageScale = useSharedValue(1);

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

  const onGestureEnd = (event: any) => {
    const { translationX, translationY } = event.nativeEvent;
    if (questionsData[currentIndex].type == "yesno") {
      if (translationX > SWIPE_THRESHOLD) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        runOnJS(handleSwipe)("yes");
      } else if (translationX < -SWIPE_THRESHOLD) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        runOnJS(handleSwipe)("no");
      } else if (translationY > VERTICAL_SWIPE_THRESHOLD) {
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
    if (translationX < -90) {
      return "30%";
    }
    if (translationX < 0 && translationX > -90) return "70%";
    if (translationX > 0 && translationX < 90) return "100%";
    return "unsure";
  };

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

  const renderImageLayer = () => {
    if (!showLayer) return null;
    return (
      <Image
        source={{ uri: "/assets/images/Frame 427319387.png" }}
        style={{
          position: "absolute",
          zIndex: 1,
        }}
      />
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
                {renderImageLayer()}
                <Image
                  source={questionsData[currentIndex].image}
                  style={{
                    width: width - 20,
                    height: width - 20 * imageScale.value,
                  }}
                  className=" mt-4"
                />
                {questionsData[currentIndex].type === "yesno" && (
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
                )}
                <View className="absolute flex-row justify-between w-full  bottom-[2%]">
                  <TouchableOpacity className="flex flex-row left-3 bg-white px-2  rounded-lg justify-center items-center z-1">
                    <SimpleLineIcons name="layers" size={15} color="black" />
                    <Text className="text-sm ml-2">Layer1</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(true);
                    }}
                    className=" right-3 rounded-lg justify-center items-center"
                  >
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

        <Modal visible={modalVisible} transparent={true} animationType="fade">
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-white rounded-lg p-3 w-[90%] h-[400px]">
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="absolute top-5 right-3 z-10"
              >
                <Ionicons name="close" size={25} />
              </TouchableOpacity>

              <Swiper
                loop={false}
                showsPagination={true}
                ref={swiperRef}
                dotStyle={{
                  backgroundColor: "#e5e5e5",
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 3,
                }}
                activeDotStyle={{
                  backgroundColor: "green",
                  width: 20,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 3,
                }}
              >
                {questionsData.map((question, index) => (
                  <View
                    key={index}
                    className="flex-1 justify-center items-center"
                  >
                    <Image
                      source={image.forest}
                      style={{
                        width: "100%",
                        height: "100%",
                        resizeMode: "contain",
                      }}
                    />
                  </View>
                ))}
              </Swiper>
            </View>
          </View>
        </Modal>
      </View>
    </CustomBackground>
  );
};

export default Questions;
