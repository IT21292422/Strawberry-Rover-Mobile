import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { StatusBar } from "expo-status-bar";
import { Ionicons as Icon } from "@expo/vector-icons";
import StatusCard from "@/components/StatusCard";
import {
  useGetCurrentOperationStatus,
  useGetRoverImageData,
  useGetUser,
  useUpdateRover,
} from "@/utils/api";
import { RoverStatus } from "@/utils/types/Types";
import useAuthStore from "@/store/AuthStore";
import useRoverStore from "@/store/RoverStore";
import { useShallow } from "zustand/react/shallow";

const Home = () => {
  const [status, setStatus] = useState();

  const user = useAuthStore((state) => state.user);
  const {
    userId,
    currentRoverId,
    rovers,
    setCurrentRoverId,
    setUserId,
    setRovers,
  } = useRoverStore(
    useShallow((state) => ({
      userId: state.userId,
      currentRoverId: state.currentRoverId,
      rovers: state.rovers,
      setCurrentRoverId: state.setCurrentRoverId,
      setUserId: state.setUserId,
      setRovers: state.setRovers,
    }))
  );

  const { data: userData } = useGetUser(user?.email as string);

  useEffect(() => {
    if (userData) {
      setUserId(userData.userId);
      setRovers(userData.rovers);
      setCurrentRoverId(userData.rovers[0].roverId.toString());
    }
  }, [userData]);

  const { data: roverData } = useGetRoverImageData(currentRoverId);

  const handleStatusSuccess = (data: any) => {
    setStatus(data[0]?.roverStatus);
  };

  const { mutate: getOperationStatus } = useGetCurrentOperationStatus(
    currentRoverId,
    handleStatusSuccess
  );

  useEffect(() => {
    getOperationStatus();
  }, []);

  const handleSuccess = () => {
    getOperationStatus();
    Alert.alert("Success", "Rover Status Updated Successfully");
  };

  const handleError = () => {
    Alert.alert(
      "Error Updating Rover Status",
      updateRoverError ? updateRoverError.toString() : "Unknown error"
    );
  };

  const {
    mutate: updateRover,
    isPending: updateRoverPending,
    error: updateRoverError,
  } = useUpdateRover(handleSuccess, handleError);

  const handleUpdateRoverStatus = (roverStatus: number) => {
    const payload = {
      initialId: 1,
      roverStatus: roverStatus,
      userId: userId,
    };
    updateRover(payload);
  };

  const latestData = roverData
    ? [...roverData].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )[0]
    : null;

  const selectRoverStatus = (status: number) => {
    switch (status) {
      case RoverStatus.START:
        return "Running";
      case RoverStatus.STOP:
        return "Stopped";
      case RoverStatus.PAUSE:
        return "Paused";
      case RoverStatus.SERVICE:
        return "Service";
      default:
        return "";
    }
  };

  return (
    <ScreenWrapper>
      <View className="mb-6">
        <Text className="text-gray-900 mb-3 font-bold text-4xl text-left">
          Welcome Back
        </Text>
        <Text className="text-gray-500 text-xl font-medium">
          Here are some of the latest updates on your farm.
        </Text>
      </View>
      <View className="flex flex-row justify-center gap-5 mt-5 mb-10">
        <StatusCard
          iconName="thermometer-outline"
          iconColor="red"
          bgColor="bg-[#FFCBD5]"
          name="Temperature"
          value={latestData?.temp}
          isTemperature
          containerStyles="items-center"
        />
        <StatusCard
          iconName="water"
          iconColor="blue"
          bgColor="bg-[#EDDCFC]"
          name="Humidity"
          value={latestData?.humidity}
        />
      </View>
      <View className="flex flex-row justify-around items-center border rounded-full p-1 bg-gray-100 border-gray-400">
        <View className="flex flex-col gap-5 p-5 items-center">
          <View className="bg-yellow-500 w-48 h-14 rounded-full flex flex-row justify-center items-center gap-4">
            <View
              className={`w-3 h-3 ${
                status === RoverStatus.START ? "bg-green-500" : "bg-red-500"
              } rounded-full animate-pulse`}
            ></View>
            {updateRoverPending ? (
              <ActivityIndicator size="large" />
            ) : (
              <Text className="text-2xl text-white text-center">
                {selectRoverStatus(status ?? 0)}
              </Text>
            )}
          </View>
          <View className="flex flex-row gap-5">
            <View className="rounded-full p-3 bg-[#EDDCFC]">
              <TouchableOpacity
                onPress={() => handleUpdateRoverStatus(RoverStatus.SERVICE)}
              >
                <Icon name="build-outline" size={40} color="red" />
              </TouchableOpacity>
            </View>
            <View className="rounded-full p-3 bg-[#EDDCFC]">
              <TouchableOpacity
                onPress={() => handleUpdateRoverStatus(RoverStatus.PAUSE)}
              >
                <Icon name="pause-outline" size={40} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View className="rounded-full p-3 bg-[#FFCBD5]">
          <TouchableOpacity
            onPress={() => {
              status === RoverStatus.START
                ? handleUpdateRoverStatus(RoverStatus.STOP)
                : handleUpdateRoverStatus(RoverStatus.START);
            }}
          >
            <Icon
              name={
                status === RoverStatus.START ? `stop-outline` : `power-outline`
              }
              size={100}
              color="red"
            />
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="light" />
    </ScreenWrapper>
  );
};

export default Home;
