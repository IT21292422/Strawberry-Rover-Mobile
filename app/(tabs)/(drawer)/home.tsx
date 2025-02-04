import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { StatusBar } from "expo-status-bar";
import { Ionicons as Icon } from "@expo/vector-icons";
import StatusCard from "@/components/StatusCard";
import { useGetRoverImageData } from "@/utils/api";

const Home = () => {
  const [status, setStatus] = useState(false);

  const { data: roverData } = useGetRoverImageData(1);

  const latestData = roverData
    ? [...roverData].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )[0]
    : null;

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
          value={latestData?.temp}
          isTemperature
          containerStyles="items-center"
        />
        <View className="flex flex-col gap-5">
          <StatusCard
            iconName="water"
            iconColor="blue"
            bgColor="bg-[#EDDCFC]"
            name="Humidity"
            value={latestData?.humidity}
          />
          <StatusCard
            iconName="battery-full"
            iconColor="green"
            bgColor="bg-[#DEE4FE]"
            name="Battery Status"
            value={latestData?.battery_status}
          />
        </View>
      </View>
      <StatusBar style="light" />
    </ScreenWrapper>
  );
};

export default Home;
