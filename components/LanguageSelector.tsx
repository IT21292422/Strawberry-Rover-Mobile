import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";

interface LanguageSelectorProps {
  containerStyle?: string;
  isCompact?: boolean;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  containerStyle,
  isCompact = false,
}) => {
  const { t, i18n } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);

  const languages = [
    { code: "en", label: "languageEnglish", flag: "🇺🇸" },
    { code: "fr", label: "languageFrench", flag: "🇫🇷" },
    { code: "es", label: "languageSpanish", flag: "🇪🇸" },
    { code: "si", label: "languageSinhala", flag: "🇱🇰" },
  ];

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setModalVisible(false);
  };

  if (isCompact) {
    return (
      <View className={containerStyle}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="flex-row items-center space-x-1 p-2 rounded-lg bg-gray-100"
        >
          <Text style={{ fontSize: 18 }}>{currentLanguage.flag}</Text>
          <Ionicons name="chevron-down" size={16} color="#666" />
        </TouchableOpacity>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableOpacity
            style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
          >
            <View className="absolute top-16 right-4 bg-white rounded-lg shadow-lg py-2 w-40">
              {languages.map((lang) => (
                <TouchableOpacity
                  key={lang.code}
                  onPress={() => handleLanguageChange(lang.code)}
                  className={`flex-row items-center px-4 py-3 ${
                    i18n.language === lang.code ? "bg-gray-100" : ""
                  }`}
                >
                  <Text style={{ fontSize: 18, marginRight: 8 }}>
                    {lang.flag}
                  </Text>
                  <Text className="text-gray-800">{t(lang.label)}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }

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
          <View className="flex-row items-center">
            <Text style={{ fontSize: 18, marginRight: 4 }}>{lang.flag}</Text>
            <Text
              className={`font-medium ${
                i18n.language === lang.code ? "text-white" : "text-gray-700"
              }`}
            >
              {t(lang.label)}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default LanguageSelector;
