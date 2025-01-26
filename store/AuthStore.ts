import { User } from "firebase/auth";
import { create } from "zustand";

interface AuthStoreType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const useAuthStore = create<AuthStoreType>((set) => ({
  user: null,
  setUser: (user: User | null) => set({ user }),
}));

export default useAuthStore;
