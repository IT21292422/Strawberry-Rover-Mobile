import { WebView } from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";

const TestFlowerDetect = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        source={{ uri: `${process.env.EXPO_PUBLIC_IMAGE_SERVICE}` }}
        style={{ flex: 1 }}
      />
    </SafeAreaView>
  );
};

export default TestFlowerDetect;
