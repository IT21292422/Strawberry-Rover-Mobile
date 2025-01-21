import { View, Text, Image, ImageBackground, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Images from "@/constants/Images";
import CustomInputField from "@/components/CustomInputField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { signUp } from "@/utils/AuthUtils";
import useAuthStore from "@/store/AuthStore";

const SignUp = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    const { username, email, password, confirmPassword } = form;
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    try {
      setLoading(true);
      await signUp(username, email, password, true, setUser);
      router.replace("/home");
    } catch (error) {
      console.error("Error signing up: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={Images.primaryBackground}
      resizeMode="cover"
      className="flex-1"
    >
      <SafeAreaView className="flex-1 justify-center">
        <Text className="font-bold text-4xl text-white px-5">Sign Up</Text>
        <View className="w-full h-3/4 px-5 my-6 bg-white rounded-t-3xl rounded-b-3xl py-6">
          <Text className="text-2xl font-bold mt-10">
            Create A Free Account
          </Text>
          <CustomInputField
            placeholder="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            containerStyles="mt-7"
          />
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
          <CustomInputField
            placeholder="Confirm Password"
            type="password"
            value={form.confirmPassword}
            handleChangeText={(e) => setForm({ ...form, confirmPassword: e })}
            containerStyles="mt-7"
          />
          <CustomButton
            label={loading ? "Signing Up..." : "Sign Up"}
            onPress={handleSignUp}
            containerStyles="mt-7"
            textStyles="text-white"
            disabled={loading}
          />
          <View className="justify-center pt-5 flex-row gap-2 items-center">
            <Text className="text-lg">Already have an account?</Text>
            <Link
              href="/signin"
              className="text-lg font-semibold text-secondary"
            >
              Sign In
            </Link>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default SignUp;
