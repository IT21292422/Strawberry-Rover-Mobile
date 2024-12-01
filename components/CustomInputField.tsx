import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons as Icon } from "@expo/vector-icons";

interface CustomInputFieldProps {
  value: string;
  type?: string;
  placeholder: string;
  handleChangeText: (text: string) => void;
  containerStyles?: string;
}

const CustomInputField: React.FC<CustomInputFieldProps> = ({
  value,
  type = "text",
  placeholder,
  handleChangeText,
  containerStyles,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={`space-y-2 ${containerStyles}`}>
      <View
        className={`flex-row bg-gray-100 w-full h-16 px-4 rounded-2xl justify-between items-center ${
          isFocused ? "border-2 border-primary" : "border border-gray-100"
        }`}
      >
        <TextInput
          className="text-xl"
          placeholder={placeholder}
          value={value}
          onChangeText={handleChangeText}
          secureTextEntry={type === "password" && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
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
    </View>
  );
};

export default CustomInputField;
