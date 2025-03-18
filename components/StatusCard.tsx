import { View, Text } from "react-native";
import React from "react";
import { Ionicons as Icon } from "@expo/vector-icons";

interface StatusCardProps {
  iconName: keyof typeof Icon.glyphMap;
  iconColor: string;
  bgColor: string;
  name: string;
  value: number | string;
  isTemperature?: boolean;
  textStyles?: string;
  containerStyles?: string;
}

const StatusCard: React.FC<StatusCardProps> = ({
  iconName,
  iconColor,
  bgColor,
  name,
  value,
  textStyles,
  containerStyles,
  isTemperature,
}) => {
  return (
    <View
      className={`flex flex-row ${bgColor} justify-start py-6 rounded-3xl w-52 h-40 ${containerStyles}`}
    >
      <View className="flex justify-center items-center">
        <Icon name={iconName} size={48} color={iconColor} />
      </View>
      <View className="flex flex-col justify-center">
        <Text className="text-2xl">{name}</Text>
        <Text className={`text-2xl font-bold ${textStyles}`}>
          {value}
          <Text className="text-base font-semibold">
            {isTemperature ? "°C" : "%"}
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default StatusCard;
