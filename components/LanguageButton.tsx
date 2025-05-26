import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { Ionicons as Icon } from "@expo/vector-icons";

interface LanguageButtonProps {
  containerStyle?: string;
  showIcon?: boolean;
}

const LanguageButton: React.FC<LanguageButtonProps> = ({
  containerStyle,
  showIcon = true,
}) => {
  const { t, i18n } = useTranslation();
  // Cycle through languages when button is pressed
  const toggleLanguage = () => {
    // Cycle through languages: en -> fr -> es -> si -> en
    const nextLanguage: Record<string, string> = {
      en: "fr",
      fr: "es",
      es: "si",
      si: "en",
    };

    i18n.changeLanguage(nextLanguage[i18n.language] || "en");
  };

  // Get flag emoji for current language
  const getLanguageFlag = (): string => {
    const flags: Record<string, string> = {
      en: "🇬🇧",
      fr: "🇫🇷",
      es: "🇪🇸",
      si: "🇱🇰",
    };

    return flags[i18n.language] || "🌐";
  };
  return (
    <TouchableOpacity
      onPress={toggleLanguage}
      className={`flex-row items-center bg-gray-100 rounded-lg p-2 ${containerStyle}`}
    >
      <Text style={{ fontSize: 16 }}>{getLanguageFlag()} </Text>
      <Text className="text-sm font-medium">{t("language")}</Text>
      {showIcon && (
        <Icon
          name="chevron-down"
          size={16}
          color="#666"
          style={{ marginLeft: 2 }}
        />
      )}
    </TouchableOpacity>
  );
};

export default LanguageButton;
