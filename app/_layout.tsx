import { Slot } from "expo-router";
import "../global.css";
import { PaperProvider } from "react-native-paper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { initializeAuth } from "@/utils/AuthUtils";
import useAuthStore from "@/store/AuthStore";
// Import i18n to initialize it
import "@/utils/i18n";

export default function RootLayout() {
  const queryClient = new QueryClient();
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    initializeAuth(setUser);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <Slot />
      </PaperProvider>
    </QueryClientProvider>
  );
}
