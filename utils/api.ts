import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UpdateRoverPayloadType, userPayloadType } from "./types/Types";

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

export const useGetCurrentOperationStatus = (
  roverId: string,
  onSuccess?: (data: any) => void
) => {
  return useMutation({
    mutationFn: () => getCurrentOperationStatus(roverId),
    onSuccess: (data) => {
      if (onSuccess) {
        onSuccess(data);
      }
    },
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

export const useUpdateRover = (
  onSuccess?: () => void,
  onError?: () => void
) => {
  return useMutation({
    mutationFn: (payload: UpdateRoverPayloadType) => updateRover(payload),
    onSuccess,
    onError,
  });
};

export const useGetRoverImageData = (roverId: number) => {
  return useQuery({
    queryKey: ["get-rover-image-data"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${process.env.EXPO_PUBLIC_IMAGE_SERVICE}/rovers/flower-images/${roverId}`
        );
        return response.data;
      } catch (error) {
        console.error("Error getting rover image data", error);
        throw error;
      }
    },
  });
};

const createUser = async (payload: userPayloadType) => {
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_IMAGE_SERVICE}/users/`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Error creating user ", error);
    throw error;
  }
};

export const useCreateUser = (onSuccess?: () => void, onError?: () => void) => {
  return useMutation({
    mutationFn: (payload: userPayloadType) => createUser(payload),
    onSuccess,
    onError,
  });
};
