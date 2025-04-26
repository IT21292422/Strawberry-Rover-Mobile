import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UpdateRoverPayloadType, userPayloadType } from "./types/Types";
import useBackendUrlStore from "@/store/BackendUrlStore";

const getCurrentOperationStatus = async (
  roverBackendUrl: string,
  roverId: string
) => {
  try {
    const response = await axios.post(`${roverBackendUrl}/rover/${roverId}`);
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
  const roverBackendUrl = useBackendUrlStore((state) => state.roverBackendUrl);
  return useMutation({
    mutationFn: () => getCurrentOperationStatus(roverBackendUrl, roverId),
    onSuccess: (data) => {
      if (onSuccess) {
        onSuccess(data);
      }
    },
  });
};

const updateRover = async (
  roverBackendUrl: string,
  payload: UpdateRoverPayloadType
) => {
  try {
    const response = await axios.post(
      `${roverBackendUrl}/rover/update`,
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
  const roverBackendUrl = useBackendUrlStore((state) => state.roverBackendUrl);
  return useMutation({
    mutationFn: (payload: UpdateRoverPayloadType) =>
      updateRover(roverBackendUrl, payload),
    onSuccess,
    onError,
  });
};

export const useGetRoverImageData = (roverId: number) => {
  const imageServiceUrl = useBackendUrlStore((state) => state.imageServiceUrl);
  return useQuery({
    queryKey: ["get-rover-image-data"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${imageServiceUrl}/rovers/flower-images/${roverId}`
        );
        return response.data;
      } catch (error) {
        console.error("Error getting rover image data", error);
        throw error;
      }
    },
  });
};

const createUser = async (
  imageServiceUrl: string,
  payload: userPayloadType
) => {
  try {
    const response = await axios.post(`${imageServiceUrl}/users/`, payload);
    return response.data;
  } catch (error) {
    console.error("Error creating user ", error);
    throw error;
  }
};

export const useCreateUser = (onSuccess?: () => void, onError?: () => void) => {
  const imageServiceUrl = useBackendUrlStore((state) => state.imageServiceUrl);
  return useMutation({
    mutationFn: (payload: userPayloadType) =>
      createUser(imageServiceUrl, payload),
    onSuccess,
    onError,
  });
};

const getCurrentStatus = async (roverBackendUrl: string, roverId: string) => {
  try {
    const response = await axios.post(
      `${roverBackendUrl}/rover/status/${roverId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting current rover operation status", error);
    throw error;
  }
};

export const useGetCurrentStatus = (roverId: string) => {
  const roverBackendUrl = useBackendUrlStore((state) => state.roverBackendUrl);
  return useMutation({
    mutationFn: () => getCurrentStatus(roverBackendUrl, roverId),
  });
};
