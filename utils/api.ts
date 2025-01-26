import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UpdateRoverPayloadType } from "./types/Types";

const getCurrentOperationStatus = async (roverId: string) => {
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_ROVER_BACKEND}/rover/${roverId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting current rover operation status", error);
    throw error;
  }
};

export const useGetCurrentOperationStatus = (roverId: string) => {
  return useMutation({
    mutationFn: () => getCurrentOperationStatus(roverId),
  });
};

const updateRover = async (payload: UpdateRoverPayloadType) => {
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_ROVER_BACKEND}/rover/update`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Error updating rover ", error);
    throw error;
  }
};

export const useUpdateRover = () => {
  return useMutation({
    mutationFn: (payload: UpdateRoverPayloadType) => updateRover(payload),
  });
};
