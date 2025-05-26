import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "@/components/CustomButton";
import { logout } from "@/utils/AuthUtils";
import useAuthStore from "@/store/AuthStore";
import { getAuth } from "firebase/auth";
import CustomInputField from "@/components/CustomInputField";
import useBackendUrlStore from "@/store/BackendUrlStore";
import { useShallow } from "zustand/react/shallow";
import LanguageSelector from "@/components/LanguageSelector";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const { t } = useTranslation();

  const {
    roverBackendUrl,
    setRoverBackendUrl,
    imageServiceUrl,
    setImageServiceUrl,
  } = useBackendUrlStore(
    useShallow((state) => ({
      roverBackendUrl: state.roverBackendUrl,
      setRoverBackendUrl: state.setRoverBackendUrl,
      imageServiceUrl: state.imageServiceUrl,
      setImageServiceUrl: state.setImageServiceUrl,
    }))
  );

  const [newRoverBackendUrl, setNewRoverBackendUrl] = useState(roverBackendUrl);
  const [newImageServiceUrl, setNewImageServiceUrl] = useState(imageServiceUrl);
  const [isEditingRoverUrl, setIsEditingRoverUrl] = useState(false);
  const [isEditingImageUrl, setIsEditingImageUrl] = useState(false);

  const auth = getAuth();
  const user = auth.currentUser;
  const handleRoverBackendUrlChange = () => {
    if (isEditingRoverUrl) {
      setRoverBackendUrl(newRoverBackendUrl);
      Alert.alert(t("success"), "Rover Backend Url updated successfully");
    }
    setIsEditingRoverUrl(!isEditingRoverUrl);
  };

  const handleImageServiceUrlChange = () => {
    if (isEditingImageUrl) {
      setImageServiceUrl(newImageServiceUrl);
      Alert.alert(t("success"), "Image Service Url updated successfully");
    }
    setIsEditingImageUrl(!isEditingImageUrl);
  };
  return (
    <View className="flex-1 w-full justify-center px-5">
      <View className="gap-2">
        <Text className="text-xl font-bold">{t("username")}</Text>
        <CustomInputField
          placeholder="username"
          useTranslation={true}
          value={user?.displayName || ""}
          borderStyles="border-2 border-green-500"
        />
      </View>
      <View className="gap-2">
        <Text className="text-xl font-bold">{t("email")}</Text>
        <CustomInputField
          placeholder="email"
          useTranslation={true}
          value={user?.email || ""}
          borderStyles="border-2 border-green-500"
        />
      </View>
      <View className="gap-2">
        <Text className="text-xl font-bold">Rover Backend Url</Text>
        <View className="flex-row w-full gap-2">
          <CustomInputField
            placeholder="Rover Backend Url"
            value={newRoverBackendUrl || ""}
            borderStyles="border-2 border-green-500"
            containerStyles="flex-1"
            handleChangeText={(text) => setNewRoverBackendUrl(text)}
            editable={isEditingRoverUrl}
          />
          <CustomButton
            onPress={handleRoverBackendUrlChange}
            label={isEditingRoverUrl ? t("confirm") : t("edit")}
            textStyles="text-white"
            containerStyles="p-5 h-[48px]"
          />
        </View>
      </View>
      <View className="gap-2">
        <Text className="text-xl font-bold">Image Service Url</Text>
        <View className="flex-row w-full gap-2">
          <CustomInputField
            placeholder="Image Service Url"
            value={newImageServiceUrl || ""}
            borderStyles="border-2 border-green-500"
            containerStyles="flex-1"
            handleChangeText={(text) => setNewImageServiceUrl(text)}
            editable={isEditingImageUrl}
          />
          <CustomButton
            onPress={handleImageServiceUrlChange}
            label={isEditingImageUrl ? t("confirm") : t("edit")}
            textStyles="text-white"
            containerStyles="p-5 h-[48px]"
          />
        </View>
      </View>
      {/* Language Settings Section */}
      <View className="gap-2 mt-4">
        <Text className="text-xl font-bold">{t("language")}</Text>
        <LanguageSelector containerStyle="mt-2" />
      </View>
      <CustomButton
        onPress={() => logout(setUser)}
        label={t("logout")}
        textStyles="text-white"
        containerStyles="p-5 mt-4"
        useTranslation={true}
      />
    </View>
  );
};

export default Profile;
