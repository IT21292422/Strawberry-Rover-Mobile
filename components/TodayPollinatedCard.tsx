import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  flowerCount: number;
}
const TodayPollinatedCard = ({ flowerCount }: Props) => {
  return (
    <View className="flex flex-row justify-between rounded-3xl p-5 bg-[#FAFAFA]">
      <View className="flex flex-col gap-1">
        <Text className="text-lg">Total Pollinated Today</Text>
        <Text className="text-3xl font-bold text-secondary">{flowerCount}</Text>
      </View>
      <View className="rounded-full p-4 bg-[#F3E8FF]">
        <Ionicons name="flower-outline" size={40} color="#9333EA" />
      </View>
    </View>
  );
};

export default TodayPollinatedCard;
