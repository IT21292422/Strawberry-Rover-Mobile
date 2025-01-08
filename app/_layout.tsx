import { Slot } from "expo-router";
import "../global.css";
import { PaperProvider } from "react-native-paper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function RootLayout() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <Slot />
      </PaperProvider>
    </QueryClientProvider>
  );
}
