import { create } from "zustand";

interface AuthStoreType {
  user: any;
  setUser: (user: any) => void;
}

const useAuthStore = create<AuthStoreType>((set) => ({
  user: null,
  setUser: (user: any) => set({ user }),
}));

export default useAuthStore;
