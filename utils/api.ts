import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

export const useGetCurrentOperationStatus = (roverId: string) => {
  const roverBackendUrl = useBackendUrlStore((state) => state.roverBackendUrl);
  return useQuery({
    queryKey: ["rover-operation-status", roverId],
    queryFn: () => getCurrentOperationStatus(roverBackendUrl, roverId),
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
  roverId: string,
  onSuccess: () => void,
  onError: () => void
) => {
  const queryClient = useQueryClient();
  const roverBackendUrl = useBackendUrlStore((state) => state.roverBackendUrl);
  return useMutation({
    mutationFn: (payload: UpdateRoverPayloadType) =>
      updateRover(roverBackendUrl, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["rover-operation-status", roverId],
      });
      onSuccess();
    },
    onError,
  });
};

export const useGetRoverImageData = (roverId: string) => {
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
    console.error("Error getting current rover status", error);
    throw error;
  }
};

export const useGetCurrentStatus = (roverId: string) => {
  const roverBackendUrl = useBackendUrlStore((state) => state.roverBackendUrl);
  return useMutation({
    mutationFn: () => getCurrentStatus(roverBackendUrl, roverId),
  });
};

export const useGetFlowerCount = (
  userId: number,
  startDate: string,
  endDate: string
) => {
  const imageServiceUrl = useBackendUrlStore((state) => state.imageServiceUrl);
  return useQuery({
    queryKey: ["get-flower-count"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${imageServiceUrl}/users/${userId}/get-flower-count`,
          {
            params: {
              start_date: startDate,
              end_date: endDate,
            },
          }
        );
        return response.data;
      } catch (error) {
        console.error("Error getting pollinated flower count", error);
        throw error;
      }
    },
  });
};

export const useGetUser = (email: string) => {
  const imageServiceUrl = useBackendUrlStore((state) => state.imageServiceUrl);
  return useQuery({
    queryKey: ["user", email],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${imageServiceUrl}/users/email/${email}`
        );
        return response.data;
      } catch (error) {
        console.error("Error getting user info", error);
        throw error;
      }
    },
  });
};
