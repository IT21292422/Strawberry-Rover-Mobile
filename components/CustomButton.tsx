import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { useTranslation } from "react-i18next";

interface Props {
  onPress: () => void;
  label: string;
  textStyles?: string;
  containerStyles?: string;
  isDisabled?: boolean;
  useTranslation?: boolean;
}

const CustomButton = ({
  onPress,
  label,
  textStyles,
  containerStyles,
  isDisabled,
  useTranslation: shouldTranslate = false,
}: Props) => {
  const { t } = useTranslation();

  const buttonLabel = shouldTranslate ? t(label) : label;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className={`bg-primary rounded-xl min-h-[62px] justify-center items-center ${containerStyles}`}
      disabled={isDisabled}
    >
      <Text className={`font-semibold text-xl ${textStyles}`}>
        {buttonLabel}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
