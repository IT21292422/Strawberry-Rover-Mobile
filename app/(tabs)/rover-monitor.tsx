import React from "react";
import { WebView } from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";

const RoverMonitoring = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        source={{ uri: "https://strawberry-3-d-rover-model.vercel.app/" }}
        style={{ flex: 1 }}
      />
    </SafeAreaView>
  );
};

export default RoverMonitoring;
