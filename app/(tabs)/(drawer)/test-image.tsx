import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { useGetCurrentStatus } from "@/utils/api";
import CustomButton from "@/components/CustomButton";
import { ActivityIndicator } from "react-native-paper";
import useRoverStore from "@/store/RoverStore";

const TestImage = () => {
  const currentRoverId = useRoverStore((state) => state.currentRoverId);
  const {
    data: currentStatus,
    mutate,
    isPending,
  } = useGetCurrentStatus(currentRoverId);

  useEffect(() => {
    mutate();
  }, []);

  return (
    <View className="p-5">
      <View className="flex justify-center items-center m-10 border-2 border-primary w-fit h-[500px]">
        {isPending ? (
          <ActivityIndicator color="green" />
        ) : (
          <Image
            source={{
              uri: `data:image/png;base64,${currentStatus?.processed_image}`,
            }}
            className="w-96 h-[500px]"
            resizeMode="contain"
          />
        )}
      </View>
      <CustomButton
        onPress={() => mutate()}
        label={"Refresh"}
        textStyles="text-white"
      />
    </View>
  );
};

export default TestImage;
