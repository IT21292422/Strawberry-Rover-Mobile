import React from "react";
import { Tabs } from "expo-router";
import { Ionicons as Icon } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

const TabLayout = () => {
  const { t } = useTranslation();

  return (
    <Tabs screenOptions={{ tabBarShowLabel: false }}>
      <Tabs.Screen
        name="(drawer)"
        options={{
          title: t("home"),
          headerShown: false,
          href: "/(drawer)/home",
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? "home" : "home-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="rover-monitor"
        options={{
          title: t("roverMonitor"),
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? "compass" : "compass-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          title: t("analytics"),
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? "analytics" : "analytics-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t("profile"),
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? "person" : "person-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
