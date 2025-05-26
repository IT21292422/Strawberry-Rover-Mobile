import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
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
          }}
        />
        <Drawer.Screen
          name="images"
          options={{
            drawerLabel: t("images"),
            title: t("images"),
          }}
        />{" "}
        <Drawer.Screen
          name="harvest"
          options={{
            drawerLabel: t("harvest"),
            title: t("harvest"),
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
