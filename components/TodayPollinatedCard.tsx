import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

interface Props {
  flowerCount: number;
}
const TodayPollinatedCard = ({ flowerCount }: Props) => {
  const { t } = useTranslation();

  return (
    <View
      testID="today-pollinated-card"
      className="flex flex-row justify-between rounded-3xl p-5 bg-[#FAFAFA]"
    >
      <View className="flex flex-col gap-1">
        <Text className="text-lg">{t("totalPollinatedToday")}</Text>
        <Text className="text-3xl font-bold text-secondary">{flowerCount}</Text>
      </View>
      <View className="rounded-full p-4 bg-[#F3E8FF]">
        <Ionicons
          testID="flower-outline-icon"
          name="flower-outline"
          size={40}
          color="#9333EA"
        />
      </View>
    </View>
  );
};

export default TodayPollinatedCard;
