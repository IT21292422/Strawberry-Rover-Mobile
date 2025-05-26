import { View, Text, Alert, ScrollView } from "react-native";
import React, { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { logout } from "@/utils/AuthUtils";
import useAuthStore from "@/store/AuthStore";
import { getAuth } from "firebase/auth";
import CustomInputField from "@/components/CustomInputField";
import useBackendUrlStore from "@/store/BackendUrlStore";
import { useShallow } from "zustand/react/shallow";
import { Ionicons } from "@expo/vector-icons";
import ScreenWrapper from "@/components/ScreenWrapper";
import { useQueryClient } from "@tanstack/react-query";
import LanguageSelector from "@/components/LanguageSelector";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const setUser = useAuthStore((state) => state.setUser);

  const queryClient = useQueryClient();
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
      queryClient.invalidateQueries({ queryKey: ["rover-operation-status"] });
      Alert.alert(t("success"), t("roverBackendUrlUpdated"));
    }
    setIsEditingRoverUrl(!isEditingRoverUrl);
  };

  const handleImageServiceUrlChange = () => {
    if (isEditingImageUrl) {
      setImageServiceUrl(newImageServiceUrl);
      queryClient.invalidateQueries({ queryKey: ["get-rover-image-data"] });
      Alert.alert(t("success"), t("imageServiceUrlUpdated"));
    }
    setIsEditingImageUrl(!isEditingImageUrl);
  };
  return (
    <ScreenWrapper>
      <ScrollView>
        <View className="flex-col items-center justify-center  my-4">
          <Text className="text-2xl font-bold text-center">{t("profile")}</Text>
          <View className="flex-row w-full justify-end items-center px-5 mb-2">
            <LanguageSelector isCompact={true} />
          </View>
          <Ionicons name="person-circle" size={100} />
        </View>

        <View className="w-full justify-center px-5">
          <View className="gap-2">
            <Text className="text-xl font-bold">{t("username")}</Text>
            <CustomInputField
              placeholder={t("username")}
              value={user?.displayName || ""}
              borderStyles="border-2 border-green-500"
              editable={false}
            />
          </View>
          <View className="gap-2">
            <Text className="text-xl font-bold">{t("email")}</Text>
            <CustomInputField
              placeholder={t("email")}
              value={user?.email || ""}
              borderStyles="border-2 border-green-500"
              editable={false}
            />
          </View>
          <View className="gap-2">
            <Text className="text-xl font-bold">{t("roverBackendUrl")}</Text>
            <View className="flex-row w-full gap-2">
              <CustomInputField
                placeholder={t("roverBackendUrl")}
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
            <Text className="text-xl font-bold">{t("imageServiceUrl")}</Text>
            <View className="flex-row w-full gap-2">
              <CustomInputField
                placeholder={t("imageServiceUrl")}
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
          <CustomButton
            onPress={() => logout(setUser)}
            label={t("logout")}
            textStyles="text-white"
            containerStyles="p-5"
          />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Profile;
