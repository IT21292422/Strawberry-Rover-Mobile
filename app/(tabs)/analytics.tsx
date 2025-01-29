import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import CustomInputField from "@/components/CustomInputField";
import CustomButton from "@/components/CustomButton";
import { useGetCurrentOperationStatus, useUpdateRover } from "@/utils/api";

const Analytics = () => {
  const [roverId, setRoverId] = useState("");
  const [initialId, setInitialId] = useState("");
  const [userId, setUserId] = useState("");
  const [status, setStatus] = useState("");

  const {
    mutate: getOperationStatus,
    isPending: getStatusPending,
    error: statusError,
    isError: isStatusError,
    data: currentOperationStatus,
  } = useGetCurrentOperationStatus(roverId);

  const {
    mutate: updateRover,
    isPending: updateRoverPending,
    error: updateRoverError,
    isError: isUpdateRoverError,
    data: updateRoverData,
  } = useUpdateRover();
  console.log(currentOperationStatus);
  const payload = {
    initialId: parseInt(initialId),
    roverStatus: parseInt(status),
    userId: parseInt(userId),
  };

  const handleSend = () => {
    updateRover(payload);
  };

  return (
    <ScreenWrapper>
      <ScrollView>
        <Text className="text-2xl font-bold text-center">
          Test Rover Status
        </Text>
        <CustomInputField
          placeholder="Rover ID"
          value={roverId}
          handleChangeText={(e) => setRoverId(e)}
          containerStyles="mt-7"
        />
        <View className="mt-10 w-full h-32 border border-gray-300 rounded-lg">
          {getStatusPending ? (
            <View className="flex justify-center items-center h-full">
              <ActivityIndicator size="large" />
            </View>
          ) : isStatusError ? (
            <Text className="p-5 text-xl text-center">
              {statusError.toString()}
            </Text>
          ) : (
            currentOperationStatus && (
              <>
                <Text className="p-1 text-lg text-start">
                  <Text className="font-bold">Rover ID:</Text>{" "}
                  {currentOperationStatus[0]?.roverId}
                  {"\n"}
                  <Text className="font-bold">Initial IDs:</Text>{" "}
                  {currentOperationStatus[0]?.initialId}
                  {"\n"}
                  <Text className="font-bold">Rover Status: </Text>
                  {currentOperationStatus[0]?.roverStatus}
                  {"\n"}
                  <Text className="font-bold">Created At:</Text>{" "}
                  {currentOperationStatus[0]?.createdAt}
                </Text>
              </>
            )
          )}
        </View>
        <CustomButton
          label="Refresh"
          onPress={getOperationStatus}
          containerStyles="mt-7 bg-yellow-500"
          textStyles="text-white"
          isDisabled={getStatusPending}
        />
        <CustomInputField
          placeholder="Initial ID"
          value={initialId}
          handleChangeText={(e) => setInitialId(e)}
          containerStyles="mt-7"
        />
        <CustomInputField
          placeholder="User ID"
          value={userId}
          handleChangeText={(e) => setUserId(e)}
          containerStyles="mt-7"
        />
        <View className="flex flex-row justify-center gap-5 mt-10">
          <CustomButton
            label="0"
            onPress={() => setStatus("0")}
            containerStyles="h-20 w-20 rounded-full bg-red-500"
            textStyles="text-white"
          />
          <CustomButton
            label="1"
            onPress={() => setStatus("1")}
            containerStyles="h-20 w-20 rounded-full bg-yellow-500"
            textStyles="text-white"
          />
          <CustomButton
            label="2"
            onPress={() => setStatus("2")}
            containerStyles="h-20 w-20 rounded-full bg-green-500"
            textStyles="text-white"
          />
          <CustomButton
            label="3"
            onPress={() => setStatus("3")}
            containerStyles="h-20 w-20 rounded-full bg-blue-500"
            textStyles="text-white"
          />
        </View>
        <Text className="text-center mt-5 text-2xl">Status = {status}</Text>
        <View className="mt-5 w-full h-24 border border-gray-300 rounded-lg">
          {updateRoverPending ? (
            <View className="flex justify-center items-center h-full">
              <ActivityIndicator size="large" />
            </View>
          ) : isUpdateRoverError ? (
            <Text className="p-5 text-xl text-center">
              {updateRoverError.toString()}
            </Text>
          ) : (
            currentOperationStatus && (
              <>
                <Text className="p-1 text-lg text-start">
                  <Text className="font-bold">Time:</Text>{" "}
                  {updateRoverData?.time}
                  {"\n"}
                  <Text className="font-bold">Info:</Text>{" "}
                  {updateRoverData?.info}
                  {"\n"}
                  <Text className="font-bold">Status: </Text>
                  {updateRoverData?.status}
                </Text>
              </>
            )
          )}
        </View>
        <CustomButton
          label="Send"
          onPress={handleSend}
          containerStyles="mt-7"
          textStyles="text-white"
          isDisabled={updateRoverPending}
        />
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Analytics;
