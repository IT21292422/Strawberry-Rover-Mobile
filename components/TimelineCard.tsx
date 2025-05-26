import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

interface Props {
  date: string;
  duration: string;
}
const TimelineCard = ({ date, duration }: Props) => {
  const { t } = useTranslation();
  return (
    <View
      testID="timeline-card"
      className="flex flex-row justify-between rounded-3xl p-5 bg-[#FAFAFA]"
    >
      <View className="flex flex-col gap-1">
        <Text className="text-lg">
          {t("workedHoursOn")} {date}
        </Text>
        <Text className="text-3xl font-bold">{duration}</Text>
      </View>
      <View className="rounded-full p-4 bg-[#F3E8FF]">
        <Ionicons
          testID="timer-outline-icon"
          name="timer-outline"
          size={40}
          color="#9333EA"
        />
      </View>
    </View>
  );
};

export default TimelineCard;
