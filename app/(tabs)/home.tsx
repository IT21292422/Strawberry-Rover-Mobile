import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { StatusBar } from "expo-status-bar";
import { Ionicons as Icon } from "@expo/vector-icons";
import StatusCard from "@/components/StatusCard";

const Home = () => {
  const [status, setStatus] = useState(false);
  return (
    <ScreenWrapper>
      <View className="mb-6">
        <Text className="text-gray-900 mb-3 font-bold text-4xl text-left">
          Welcome Back
        </Text>
        <Text className="text-gray-500 text-xl font-medium">
          Here are some of the latest updates on your farm.
        </Text>
      </View>
      <View className="flex 1 justify-center items-center">
        <TouchableOpacity onPress={() => setStatus(!status)}>
          <Icon
            name="power"
            size={200}
            color={status === false ? "red" : "green"}
          />
        </TouchableOpacity>
      </View>
      <View className="flex flex-row justify-center gap-5 mt-10">
        <StatusCard
          iconName="thermometer-outline"
          iconColor="red"
          bgColor="bg-[#FFCBD5]"
          name="Temperature"
          value="25"
          isTemperature
          containerStyles="items-center"
        />
        <View className="flex flex-col gap-5">
          <StatusCard
            iconName="water"
            iconColor="blue"
            bgColor="bg-[#EDDCFC]"
            name="Humidity"
            value="60"
          />
          <StatusCard
            iconName="battery-full"
            iconColor="green"
            bgColor="bg-[#DEE4FE]"
            name="Battery Status"
            value="80"
          />
        </View>
      </View>
      <StatusBar style="light" />
    </ScreenWrapper>
  );
};

export default Home;
