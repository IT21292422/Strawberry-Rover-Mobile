import { Rover } from "@/utils/types/Types";
import { create } from "zustand";

interface RoverStoreType {
  userId: number;
  currentRoverId: string;
  rovers: Rover[];
  setCurrentRoverId: (roverId: string) => void;
  setUserId: (userId: number) => void;
  setRovers: (rovers: Rover[]) => void;
}

const useRoverStore = create<RoverStoreType>((set) => ({
  userId: 1,
  currentRoverId: "1",
  rovers: [],
  setCurrentRoverId: (roverId: string) => set({ currentRoverId: roverId }),
  setUserId: (userId: number) => set({ userId: userId }),
  setRovers: (rovers: Rover[]) => set({ rovers: rovers }),
}));

export default useRoverStore;
