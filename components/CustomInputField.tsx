import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons as Icon } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

interface CustomInputFieldProps {
  value: string;
  type?: string;
  error?: string;
  placeholder: string;
  handleChangeText?: (text: string) => void;
  containerStyles?: string;
  onBlur?: (e: any) => void;
  borderStyles?: string;
  editable?: boolean;
  useTranslation?: boolean;
}

const CustomInputField: React.FC<CustomInputFieldProps> = ({
  value,
  type = "text",
  error,
  placeholder,
  handleChangeText,
  containerStyles,
  onBlur,
  borderStyles,
  editable = true,
  useTranslation: shouldTranslate = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { t } = useTranslation();

  const placeholderText = shouldTranslate ? t(placeholder) : placeholder;

  return (
    <View className={`space-y-2 ${containerStyles}`}>
      <View
        className={`flex-row bg-gray-100 w-full h-16 px-4 rounded-2xl justify-between items-center ${borderStyles} ${
          isFocused ? "border-2 border-primary" : "border border-gray-100"
        }`}
      >
        <TextInput
          className="text-xl"
          placeholder={placeholderText}
          value={value}
          onChangeText={handleChangeText}
          secureTextEntry={type === "password" && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur && onBlur(e);
          }}
          editable={editable}
        />
        {type === "password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={!showPassword ? "eye" : "eye-off"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        )}
      </View>
      <Text className="text-lg pl-3 text-red-500">{error}</Text>
    </View>
  );
};

export default CustomInputField;
