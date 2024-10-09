import bg from "@/assets/images/bg.png";

import forest from "@/assets/images/Frame 427319387.png";
import { Dimensions } from "react-native";

export const questionsData = [
  {
    id: 1,
    question: "Is this a dense forest?",
    image1: require("@/assets/images/Frame 427319375.png"),
    image2: require("@/assets/images/Frame 427319376.png"),
    type: "yesno",
  },
  {
    id: 2,
    question: "How much percent forest cover?",

    image1: require("@/assets/images/Frame 427319375.png"),
    image2: require("@/assets/images/Frame 427319376.png"),
    type: "percent",
  },
  {
    id: 3,
    question: "Is the forest healthy?",

    image1: require("@/assets/images/Frame 427319375.png"),
    image2: require("@/assets/images/Frame 427319376.png"),
    type: "percent",
  },
];

export const { width, height } = Dimensions.get("window");

export const SWIPE_THRESHOLD = width * 0.25;
export const VERTICAL_SWIPE_THRESHOLD = height * 0.1;

export const icons = {};

export const image = {
  bg,
  forest,
};
