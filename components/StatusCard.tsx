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
      testID="status-card"
      className={`flex flex-row ${bgColor} justify-start py-6 rounded-3xl w-52 h-40 ${containerStyles}`}
    >
      <Icon name={iconName} size={48} color={iconColor} />
      <Text className="text-2xl">{name}</Text>
      {isTemperature ? (
        <Text className={`text-2xl font-bold ${textStyles}`}>
          {value}
          <Text className="text-base font-semibold">°C</Text>
        </Text>
      ) : (
        <Text className={`text-2xl font-bold ${textStyles}`}>
          {value}
          <Text className="text-base font-semibold">%</Text>
        </Text>
      )}
    </View>
  );
};

export default StatusCard;
