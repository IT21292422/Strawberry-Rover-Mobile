import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

const DrawerLayout = () => {
  const { t } = useTranslation();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="home"
          options={{
            drawerLabel: t("home"),
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
