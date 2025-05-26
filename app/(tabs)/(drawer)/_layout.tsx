import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";

const DrawerLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="home"
          options={{
            drawerLabel: "Home",
            title: "",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="images"
          options={{
            drawerLabel: "Images",
            title: "Images",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="camera" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="pollination-timeline"
          options={{
            drawerLabel: "Pollination Timeline",
            title: "Pollination Timeline",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="layers" color={color} size={size} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default DrawerLayout;
