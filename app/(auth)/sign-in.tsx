import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { image } from "@/constants";
import CustomInput from "@/components/CustomInput";
import { Link, router } from "expo-router";

import CustomBackground from "@/components/CustomBackground";
import CustomButton from "@/components/Custombutton";

const SignIn = () => {
  const [checked, setChecked] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const validate = {
    username: {
      required: "Username is required",
      minLength: {
        value: 6,
        message: "Username is invalid",
      },
    },
    password: {
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters long",
      },
    },
  };

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    router.push("/home");
  };

  return (
    <CustomBackground>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} className="flex-1">
          <View style={{ flex: 1 }}>
            <View className="p-4 pt-16 w-full ">
              <View>
                <Text className="text-center text-2xl font-bold text-general mb-2">
                  Sign In
                </Text>

                {/* username Input */}
                <Controller
                  control={control}
                  name="username"
                  rules={validate.username}
                  render={({ field: { onChange, value } }) => (
                    <CustomInput
                      title="Username"
                      placeholder="e.g Johnjade"
                      value={value}
                      handlechange={onChange}
                      error={errors.username?.message}
                    />
                  )}
                />

                {/* Password Input */}
                <Controller
                  control={control}
                  name="password"
                  rules={validate.password}
                  render={({ field: { onChange, value } }) => (
                    <CustomInput
                      title="Password"
                      placeholder="e.g Johnjade@gmail.com"
                      value={value}
                      handlechange={onChange}
                      error={errors.password?.message}
                    />
                  )}
                />
                <View className="flex-row justify-end  mt-2 align">
                  <Text className="text-xs text-end">Forget Password</Text>
                </View>
              </View>
            </View>
            {/* Submit Button */}
            <View className="px-4">
              <CustomButton
                title="Sign In"
                handlePress={handleSubmit(onSubmit)}
                containerStyles="bg-[#008543]"
                textStyles="text-white"
              />
              <View className="flex-row items-center mt-4 justify-center gap-x-2">
                <Text className="text-sm font-normal ">
                  Don't have an account?
                </Text>
                <Link
                  href="/sign-up"
                  className="text-sm font-normal text-green-600"
                >
                  Create an account
                </Link>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </CustomBackground>
  );
};

export default SignIn;
