import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";

const DrawerLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="home"
          options={{
            drawerLabel: "Home",
            title: "",
          }}
        />
        <Drawer.Screen
          name="images"
          options={{
            drawerLabel: "Images",
            title: "Images",
          }}
        />
        <Drawer.Screen
          name="harvest"
          options={{
            drawerLabel: "Harvest",
            title: "Harvest",
          }}
        />
        <Drawer.Screen
          name="test-image"
          options={{
            drawerLabel: "Test Image",
            title: "Test Image",
          }}
        />
        <Drawer.Screen
          name="test-flower-detect"
          options={{
            drawerLabel: "Test Flower Detect",
            title: "Test Flower Detection",
          }}
        />
        <Drawer.Screen
          name="test-rover"
          options={{
            drawerLabel: "Test Rover",
            title: "Test Rover",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default DrawerLayout;
