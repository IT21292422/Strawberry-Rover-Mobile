import { View, Text } from "react-native";
import React from "react";
import CustomButton from "@/components/CustomButton";
import { logout } from "@/utils/AuthUtils";
import useAuthStore from "@/store/AuthStore";

const Profile = () => {
  const setUser = useAuthStore((state) => state.setUser);
  return (
    <View className="flex-1 justify-center items-center">
      <CustomButton
        onPress={() => logout(setUser)}
        label="Logout"
        textStyles="text-white"
        containerStyles="p-5"
      />
    </View>
  );
};

export default Profile;
