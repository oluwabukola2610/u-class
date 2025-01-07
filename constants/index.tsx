import bg from "@/assets/images/bg.png";

import forest from "@/assets/images/Frame 427319387.png";
import { Dimensions } from "react-native";

export const questionsData = [
  {
    id: 1,
    question: "Is this a forest?",
    instruction: "Swipe right,left or down",
    image1: require("@/assets/images/test1ha.png"),
    image2: require("@/assets/images/sentinel.png"),
    type: "yesno",
    modal: [
      {
        id: "forest",
        image: require("@/assets/images/test3.png"),
      },
      {
        id: "non-forest",
        image: require("@/assets/images/water.png"),
      },
    ],
  },
  {
    id: 2,
    question: "Is this a forest?",
    instruction: "Swipe right,left or down",
    image1: require("@/assets/images/test2.png"),
    image2: require("@/assets/images/sentinel.png"),
    type: "yesno",
    modal: [
      {
        id: "forest",
        image: require("@/assets/images/test3.png"),
      },
      {
        id: "non-forest",
        image: require("@/assets/images/water.png"),
      },
    ],
  },
  {
    id: 3,
    question: "Is this a forest?",
    instruction: "Swipe right,left or down",
    image1: require("@/assets/images/test3.png"),
    image2: require("@/assets/images/sentinel.png"),
    type: "yesno",
    modal: [
      {
        id: "forest",
        image: require("@/assets/images/test3.png"),
      },
      {
        id: "non-forest",
        image: require("@/assets/images/water.png"),
      },
    ],
  },
  {
    id: 4,
    question: "Is this a forest?",
    instruction: "Swipe right,left or down",
    image1: require("@/assets/images/water.png"),
    image2: require("@/assets/images/sentinel.png"),
    type: "yesno",
    modal: [
      {
        id: "forest",
        image: require("@/assets/images/test3.png"),
      },
      {
        id: "non-forest",
        image: require("@/assets/images/water.png"),
      },
    ],
  },
  {
    id: 5,
    question: "Is this a forest?",
    instruction: "Swipe right,left or down",
    image1: require("@/assets/images/grassland.png"),
    image2: require("@/assets/images/sentinel.png"),
    type: "yesno",
    modal: [
      {
        id: "forest",
        image: require("@/assets/images/test3.png"),
      },
      {
        id: "non-forest",
        image: require("@/assets/images/water.png"),
      },
    ],
  },
  {
    id: 6,
    question: "How much percent forest cover?",

    instruction: "Swipe down to the option",
    image1: require("@/assets/images/test2.png"),
    image2: require("@/assets/images/sentinel.png"),
    type: "percent",
    modal: [
      {
        id: "0-30%",
        image: require("@/assets/images/percentforest.png"),
      },
      {
        id: "31-70%",
        image: require("@/assets/images/test1ha.png"),
      },
      {
        id: "71-100%",
        image: require("@/assets/images/test3.png"),
      },
    ],
  },
  {
    id: 7,
    question: "How much percent forest cover?",

    instruction: "Swipe down to the option",
    image1: require("@/assets/images/test3.png"),
    image2: require("@/assets/images/sentinel.png"),
    type: "percent",
    modal: [
      {
        id: "0-30%",
        image: require("@/assets/images/percentforest.png"),
      },
      {
        id: "31-70%",
        image: require("@/assets/images/test1ha.png"),
      },
      {
        id: "71-100%",
        image: require("@/assets/images/test3.png"),
      },
    ],
  },
  {
    id: 8,
    question: "How much percent forest cover?",

    instruction: "Swipe down to the option",
    image1: require("@/assets/images/test1ha.png"),
    image2: require("@/assets/images/sentinel.png"),
    type: "percent",
    modal: [
      {
        id: "0-30%",
        image: require("@/assets/images/percentforest.png"),
      },
      {
        id: "31-70%",
        image: require("@/assets/images/test1ha.png"),
      },
      {
        id: "71-100%",
        image: require("@/assets/images/test3.png"),
      },
    ],
  },
  {
    id: 9,
    question: "How much percent forest cover?",

    instruction: "Swipe down to the option",
    image1: require("@/assets/images/forestNon1.png"),
    image2: require("@/assets/images/sentinel.png"),
    type: "percent",
    modal: [
      {
        id: "0-30%",
        image: require("@/assets/images/percentforest.png"),
      },
      {
        id: "31-70%",
        image: require("@/assets/images/test1ha.png"),
      },
      {
        id: "71-100%",
        image: require("@/assets/images/test3.png"),
      },
    ],
  },
  {
    id: 10,
    question: "How much percent forest cover?",

    instruction: "Swipe down to the option",
    image1: require("@/assets/images/percentforest.png"),
    image2: require("@/assets/images/sentinel.png"),
    type: "percent",
    modal: [
      {
        id: "0-30%",
        image: require("@/assets/images/percentforest.png"),
      },
      {
        id: "31-70%",
        image: require("@/assets/images/test1ha.png"),
      },
      {
        id: "71-100%",
        image: require("@/assets/images/test3.png"),
      },
    ],
  },

  {
    id: 11,
    question: " what type of forest is this?",
    instruction: "Swipe down to the option",
    image1: require("@/assets/images/test3.png"),
    image2: require("@/assets/images/sentinel.png"),
    type: "broadleaf",
    modal: [
      {
        id: "broadleaf",
        image: require("@/assets/images/test3.png"),
      },
      {
        id: "conifer",
        image: require("@/assets/images/sentinel.png"),
      },
    ],
  },
  {
    id: 12,
    question: " what type of forest is this?",
    instruction: "Swipe down to the option",
    image1: require("@/assets/images/conifer.png"),
    image2: require("@/assets/images/sentinel.png"),
    type: "broadleaf",
    modal: [
      {
        id: "forest",
        image: require("@/assets/images/water.png"),
      },
      {
        id: "forest",
        image: require("@/assets/images/sentinel.png"),
      },
    ],
  },
  {
    id: 13,
    question: " what type of forest is this?",
    instruction: "Swipe down to the option",
    image1: require("@/assets/images/types1.png"),
    image2: require("@/assets/images/sentinel.png"),
    type: "broadleaf",
    modal: [
      {
        id: "forest",
        image: require("@/assets/images/water.png"),
      },
      {
        id: "forest",
        image: require("@/assets/images/sentinel.png"),
      },
    ],
  },
  {
    id: 14,
    question: " what type of forest is this?",
    instruction: "Swipe down to the option",
    image1: require("@/assets/images/mixed.png"),
    image2: require("@/assets/images/sentinel.png"),
    type: "broadleaf",
    modal: [
      {
        id: "forest",
        image: require("@/assets/images/water.png"),
      },
      {
        id: "forest",
        image: require("@/assets/images/sentinel.png"),
      },
    ],
  },
  {
    id: 15,
    question: "Is this a plantation forest?",
    instruction: "Swipe right,left or down",
    image1: require("@/assets/images/test3.png"),
    image2: require("@/assets/images/sentinel.png"),
    type: "yesno",
    modal: [
      {
        id: "forest",
        image: require("@/assets/images/water.png"),
      },
      {
        id: "forest",
        image: require("@/assets/images/sentinel.png"),
      },
    ],
  },
  {
    id: 16,
    question: "Is this a plantation forest?",
    instruction: "Swipe right,left or down",
    image1: require("@/assets/images/plantation1.png"),
    image2: require("@/assets/images/sentinel.png"),
    type: "yesno",
    modal: [
      {
        id: "forest",
        image: require("@/assets/images/water.png"),
      },
      {
        id: "forest",
        image: require("@/assets/images/sentinel.png"),
      },
    ],
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
