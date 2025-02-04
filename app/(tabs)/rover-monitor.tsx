import React from "react";
import { WebView } from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";

const RoverMonitoring = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        source={{ uri: `${process.env.EXPO_PUBLIC_3D_MODEL_FRONTEND}` }}
        style={{ flex: 1 }}
      />
    </SafeAreaView>
  );
};

export default RoverMonitoring;
