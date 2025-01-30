import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
  Platform,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
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
import Grid from "@/components/Grid";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { getValueFor } from "@/constants/secureStore";

//three more features to build, alert to show they have finihes d 5 images, then the final result, then tutorial in th3e app

const Questions = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [activeOptionIndex, setActiveOptionIndex] = useState<number | null>(
    null
  );
  const [showLayer, setShowLayer] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isImage1, setIsImage1] = useState(true);
  const [grid, setGrid] = useState(false);
  const [taskCompletionModalVisible, setTaskCompletionModalVisible] =
    useState(false);
  const [fiveTaskCompletionModalVisible, setFiveTaskCompletionModalVisible] =
    useState(false);
  const animation = useRef<LottieView>(null);

  const swiperRef = useRef<Swiper>(null);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const imageScale = useSharedValue(1);
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const fetchName = async () => {
      const storedName = await getValueFor("name");
      setName(storedName); // Update the state once the value is retrieved
    };
    fetchName();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (fiveTaskCompletionModalVisible) {
      timer = setTimeout(() => {
        setFiveTaskCompletionModalVisible(false);
      }, 3000); // 5 seconds
    }
    return () => clearTimeout(timer);
  }, [fiveTaskCompletionModalVisible]);

  useEffect(() => {
    if (currentIndex == 5 || currentIndex == 10 || currentIndex == 15) {
      setFiveTaskCompletionModalVisible(true);
    }
  }, [currentIndex]);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: imageScale.value },
      ],
    };
  });

  console.log(name, answers, currentIndex);
  const handleSwipe = (direction: string) => {
    const nextIndex = (currentIndex + 1) % questionsData.length;

    // Save the answer based on swipe direction
    setAnswers((prev) => ({
      ...prev,
      [questionsData[currentIndex].id]: direction,
    }));
    // Move to the next image/question
    if (nextIndex == 0) {
      console.log("going no where");
      setTaskCompletionModalVisible(true);
    } else setCurrentIndex(nextIndex);
  };
  console.log(currentIndex);

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
      setActiveOptionIndex(null);
      setIsImage1(true);
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
        setIsImage1(true);

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
    if (translationX < -90)
      return questionsData[currentIndex].type == "percent"
        ? "30%"
        : "broadleaf";
    if (translationX < 0 && translationX > -90)
      return questionsData[currentIndex].type == "percent" ? "70%" : "conifer";
    if (translationX > 0 && translationX < 90)
      return questionsData[currentIndex].type == "percent" ? "100%" : "mixed";
    return "unsure";
  };

  const renderPercentageOptions = () => {
    return (
      <View className="flex-row w-full px-4 mb-5 mt-auto justify-center gap-x-1">
        {["0-30%", "31-70%", "71-100%", "Unsure"].map((option, index) => (
          <TouchableOpacity
            key={option}
            className="flex-1 items-center px-1 py-5 bg-white rounded-lg  border-2  border-green-700"
            style={{
              backgroundColor: activeOptionIndex === index ? "green" : "white",
            }}
          >
            <Text className="text-md text-green-900">{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderDominantTreeOptions = () => {
    return (
      <View className="flex-row w-full px-4 mb-5 mt-auto justify-center gap-x-1">
        {["Braodleaf", "Conifer", "Mixed", "Unsure"].map((option, index) => (
          <TouchableOpacity
            key={option}
            className="flex-1 items-center px-1 py-5 bg-white rounded-lg  border-2  border-green-700"
            style={{
              backgroundColor: activeOptionIndex === index ? "green" : "white",
            }}
          >
            <Text className="text-md text-green-900">{option}</Text>
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

  const scale = useSharedValue(1);

  // Pinch Gesture Handler
  const pinchHandler =
    useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
      onActive: (event) => {
        scale.value = event.scale; // No more error
      },
      onEnd: () => {
        scale.value = withSpring(1); // Reset scale smoothly
      },
    });

  // Animated style for scaling the image
  const animatedImageStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
  return (
    <View className="flex-1">
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

      <StatusBar style="dark" />

      <SafeAreaView className="flex-1  items-center  ">
        <Text className="text-lg text-center font-bold text-[20px] mt-0 px-1.5 leading-5 pt-10">
          {questionsData[currentIndex].question}
        </Text>
        <Text className="mb-10 text-[16px] italic text-gray-400">
          {questionsData[currentIndex].instruction}
        </Text>

        <View className="w-full h-[50%] items-center">
          <GestureHandlerRootView>
            <PinchGestureHandler onGestureEvent={pinchHandler}>
              <Animated.View style={[animatedImageStyle]}>
                <PanGestureHandler
                  onGestureEvent={onGestureEvent}
                  onEnded={onGestureEnd}
                >
                  <Animated.View style={[animatedStyle]}>
                    {/* {renderImageLayer()} */}
                    <Image
                      source={
                        isImage1
                          ? questionsData[currentIndex].image1
                          : questionsData[currentIndex].image2
                      }
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

                    {grid && <Grid />}

                    <View className="absolute flex-row justify-between w-full  bottom-[2%]">
                      <TouchableOpacity
                        onPress={() => {
                          setIsImage1(!isImage1);
                        }}
                        className="flex flex-row left-3 bg-white px-2  rounded-lg justify-center items-center z-1"
                      >
                        <SimpleLineIcons
                          name="layers"
                          size={15}
                          color="black"
                        />
                        <Text className="text-sm ml-2">
                          Layer{isImage1 ? 1 : 2}
                        </Text>
                      </TouchableOpacity>
                      <View className="flex flex-row right-3 justify-center items-center gap-3">
                        <TouchableOpacity
                          onPress={() => {
                            setGrid((prev) => !prev);
                          }}
                          className="  rounded-md justify-center items-center border border-white "
                        >
                          <MaterialIcons
                            name="grid-3x3"
                            size={20}
                            color="white"
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            setModalVisible(true);
                          }}
                          className="  rounded-lg justify-center items-center"
                        >
                          <Feather name="info" size={24} color="white" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Animated.View>
                </PanGestureHandler>
              </Animated.View>
            </PinchGestureHandler>
          </GestureHandlerRootView>
        </View>
        {questionsData[currentIndex].type === "yesno" && (
          <TouchableOpacity className="flex  bg-white p-3 rounded-lg justify-center items-center mt-14">
            <MaterialIcons name="not-interested" size={24} color="red" />
            <Text className="font-bold">Unsure</Text>
          </TouchableOpacity>
        )}
        {questionsData[currentIndex].type === "percent" &&
          renderPercentageOptions()}
        {questionsData[currentIndex].type === "broadleaf" &&
          renderDominantTreeOptions()}
      </SafeAreaView>
      <View>
        <Modal
          visible={taskCompletionModalVisible || fiveTaskCompletionModalVisible}
          transparent={true}
          animationType="fade"
        >
          <View
            className={`${
              Platform.OS !== "android"
                ? "flex-1 justify-center items-center bg-black/90 "
                : " flex-1 justify-center items-center bg-black/90 px-4 border-r-2 w-96 z-10 pointer-events-auto"
            }`}
            style={{
              alignItems: "center",
              pointerEvents: "auto",
            }}
          >
            <View className="bg-green-50 rounded-lg p-5 w-[80%] ">
              <View className="flex  items-center justify-between px-1 mb-2 gap-6">
                <Text className="text-center text-2xl font-bold">
                  {taskCompletionModalVisible
                    ? "Thanks for completing all your tasks"
                    : "Congratulations, you just completed five tasks"}
                </Text>
                {taskCompletionModalVisible && (
                  <Text className="">Score: 14/16</Text>
                )}
                <TouchableOpacity
                  className=" items-center  bg-white rounded-lg  px-5 py-3 border-2 border-green-800"
                  style={{ zIndex: 10000 }}
                  onPress={() => {
                    setTaskCompletionModalVisible(false);
                    setFiveTaskCompletionModalVisible(false);
                    if (taskCompletionModalVisible)
                      router.navigate("/(roots)/(tabs)/home");
                  }}
                >
                  <Text className="text-md px-1 text-green-900">Done</Text>
                </TouchableOpacity>
              </View>
            </View>
            <LottieView
              autoPlay
              ref={animation}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: "none",
                // backgroundColor: "red",
              }}
              // Find more Lottie files at https://lottiefiles.com/featured
              source={require("../../assets/lottie.json")}
            />
          </View>
        </Modal>
      </View>
      <View>
        <Modal visible={modalVisible} transparent={true} animationType="fade">
          <View
            className={`${
              Platform.OS !== "android"
                ? "flex-1 justify-center items-center bg-black/90 "
                : " flex-1 justify-center items-center bg-black/90 px-4 border-r-2 w-96 z-10 pointer-events-auto"
            }`}
            style={{
              alignItems: "center",
              pointerEvents: "auto",
            }}
          >
            {/* <View
          className="flex-1 justify-center items-center bg-black/90"
          style={{ zIndex: 1000 }} // Ensure high zIndex
        > */}
            <View className="bg-green-100 rounded-lg p-3 w-[94%] h-[350px] z-20">
              <View className="flex flex-row items-center justify-between px-1 mb-2 z-30">
                <Text className="text-center flex-grow text-2xl font-bold ml-5">
                  Hints
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                  }}
                  style={{ zIndex: 10000 }}
                >
                  <Ionicons name="close" size={25} />
                </TouchableOpacity>
              </View>
              <Swiper
                loop={true}
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
                style={{ zIndex: 100000 }} // Ensure Swiper has a higher zIndex
              >
                {questionsData[currentIndex].modal.map((question, index) => (
                  <View
                    key={index}
                    className="flex-1 justify-center items-center"
                    style={{ pointerEvents: "auto" }} // Ensure swiper content is interactive
                  >
                    <Image
                      source={question.image}
                      style={{
                        width: "100%",
                        height: "100%",
                        resizeMode: "contain",
                      }}
                    />
                    <TouchableOpacity
                      className="absolute bottom-12  items-center px-1 py-2 bg-white rounded-lg "
                      style={{ zIndex: 3000 }}
                    >
                      <Text className="text-md px-1 text-green-900">
                        {question.id}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </Swiper>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default Questions;
