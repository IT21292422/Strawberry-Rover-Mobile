import { Slot } from "expo-router";
import "../global.css";
import { PaperProvider } from "react-native-paper";
import { useEffect } from "react";
import { initializeAuth } from "@/utils/AuthUtils";
import useAuthStore from "@/store/AuthStore";

export default function RootLayout() {
  const setUser = useAuthStore((state) => state.setUser);
  useEffect(() => {
    initializeAuth(setUser);
  }, []);
  return (
    <PaperProvider>
      <Slot />
    </PaperProvider>
  );
}
