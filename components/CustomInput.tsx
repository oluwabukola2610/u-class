import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardTypeOptions,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CustomInputProps {
  title: string;
  handlechange?: (text: string) => void;
  value?: string;
  keyboardType?: KeyboardTypeOptions | undefined;
  placeholder?: string;

  error?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  title,
  value,
  handlechange,
  keyboardType,
  placeholder,
  error,
}) => {
  const [showpassword, setShowpassword] = useState(false);

  const isPassword = title === "Password" || title === "Confirm Password";

  return (
    <View className="relative mt-5">
      <View className="mb-1">
        <Text className="text-black text-lg">{title}</Text>
      </View>
      <View
        className={` h-12 px-4 border-gray-200 rounded-lg w-full border border-gray/50 focus:border-gray flex items-center justify-between flex-row bg-white`}
      >
        <TextInput
          className="text-base font-normal "
          value={value}
          onChangeText={handlechange}
          keyboardType={keyboardType}
          secureTextEntry={isPassword && !showpassword}
          placeholder={placeholder}
          placeholderTextColor="#D9D9D9"
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setShowpassword(!showpassword)}>
            <Ionicons
              name={showpassword ? "eye-off" : "eye"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text className="font-medium text-sm text-red-600 pt-2">{error}</Text>
      )}
    </View>
  );
};

export default CustomInput;
