import { View, Text, Image, ImageBackground } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Images from "@/constants/Images";
import CustomInputField from "@/components/CustomInputField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  return (
    <ImageBackground
      source={Images.primaryBackground}
      resizeMode="cover"
      className="flex-1"
    >
      <SafeAreaView className="flex-1 justify-center">
        <Text className="font-bold text-4xl text-white px-5">Sign In</Text>
        <View className="w-full h-1/2 px-5 my-6 bg-white rounded-t-3xl rounded-b-3xl py-6">
          <Text className="text-2xl font-bold mt-10">Welcome Back!</Text>
          <CustomInputField
            placeholder="Email Address"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            containerStyles="mt-7"
          />
          <CustomInputField
            placeholder="Password"
            type="password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            containerStyles="mt-7"
          />
          <CustomButton
            label="Sign In"
            onPress={() => router.push("/home")}
            containerStyles="mt-7"
            textStyles="text-white"
          />
          <View className="justify-center pt-5 flex-row gap-2 items-center">
            <Text className="text-lg">Don't have an account?</Text>
            <Link
              href="/signup"
              className="text-lg font-semibold text-secondary"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default SignIn;
