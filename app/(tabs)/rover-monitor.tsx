import React, { useRef } from "react";
import { WebView } from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";
import useRoverStore from "@/store/RoverStore";

const RoverMonitoring = () => {
  const currentRoverId = useRoverStore((state) => state.currentRoverId);

  const webViewRef = useRef<WebView>(null);
  const token = "jwt-token-akmal";
  const roverId = currentRoverId;

  // Function to send data to WebView after it loads
  const sendDataToWebView = () => {
    const message = JSON.stringify({ token, roverId });

    // Inject JavaScript directly into window object
    const injectedJavaScript = `
      // Store data in window object
      window.mobileData = ${message};
      
      // Trigger a global function if it exists
      if (window.handleMobileData) {
        window.handleMobileData(${message});
      }
      
      true;
    `;

    webViewRef.current?.injectJavaScript(injectedJavaScript);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        ref={webViewRef}
        source={{ uri: `${process.env.EXPO_PUBLIC_3D_MODEL_FRONTEND}` }}
        style={{ flex: 1 }}
        onLoadEnd={sendDataToWebView}
      />
    </SafeAreaView>
  );
};

export default RoverMonitoring;
