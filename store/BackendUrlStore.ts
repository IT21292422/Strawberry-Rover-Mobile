import { create } from "zustand";

interface BackendUrlStoreType {
  roverBackendUrl: string;
  imageServiceUrl: string;
  setRoverBackendUrl: (url: string) => void;
  setImageServiceUrl: (url: string) => void;
}

const useBackendUrlStore = create<BackendUrlStoreType>((set) => ({
  roverBackendUrl: process.env.EXPO_PUBLIC_ROVER_BACKEND || "",
  imageServiceUrl: process.env.EXPO_PUBLIC_IMAGE_SERVICE || "",
  setRoverBackendUrl: (url: string) => set({ roverBackendUrl: url }),
  setImageServiceUrl: (url: string) => set({ imageServiceUrl: url }),
}));

export default useBackendUrlStore;
