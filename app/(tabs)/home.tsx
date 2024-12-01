import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import start from "@/assets/images/strawberry/start.png";
import { StatusBar } from "expo-status-bar";

const Home = () => {
  return (
    <ScreenWrapper colors={["#161b2e", "#0a4d4a", "#766e67"]}>
      <View className="mb-6">
        <Text className="text-gray-200 mb-3 font-bold text-4xl text-left">
          Welcome Back
        </Text>
        <Text className="text-indigo-100 text-xl font-medium">
          Here are some of the latest updates on your farm.
        </Text>
      </View>
      <View>
        <TouchableOpacity>
          <Image source={start} className="h-20 w-20" />
        </TouchableOpacity>
      </View>
      <StatusBar style="light" />
    </ScreenWrapper>
  );
};

export default Home;
