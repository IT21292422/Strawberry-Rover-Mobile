import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

interface LanguageSelectorProps {
  containerStyle?: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  containerStyle,
}) => {
  const { t, i18n } = useTranslation();

  const languages = [
    { code: "en", label: "languageEnglish" },
    { code: "fr", label: "languageFrench" },
    { code: "es", label: "languageSpanish" },
    { code: "si", label: "languageSinhala" },
  ];
  return (
    <View className={`flex flex-row justify-center mb-4 ${containerStyle}`}>
      {languages.map((lang) => (
        <TouchableOpacity
          key={lang.code}
          onPress={() => i18n.changeLanguage(lang.code)}
          className={`px-4 py-2 mx-1 rounded-md ${
            i18n.language === lang.code ? "bg-primary" : "bg-gray-200"
          }`}
        >
          <Text
            className={`font-medium ${
              i18n.language === lang.code ? "text-white" : "text-gray-700"
            }`}
          >
            {t(lang.label)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default LanguageSelector;
