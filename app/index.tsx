import { View, Text, ImageBackground, SafeAreaView } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import ScreenWrapper from "@/components/ScreenWrapper";
import Images from "@/constants/Images";

const App = () => {
  return (
    <View className="flex-1">
      <ImageBackground
        source={Images.onboardingBackground}
        resizeMode="cover"
        className="flex-1"
      >
        <ScreenWrapper colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0.8)"]}>
          <SafeAreaView className="flex-1 px-1 justify-between">
            <View>
              <Text className="text-center text-white font-bold text-4xl">
                Strawberry Pollinator
              </Text>
              <Text className="text-center text-white font-normal text-2xl mt-3">
                Automating pollination for Smart Farming
              </Text>
            </View>
            <View>
              <CustomButton
                onPress={() => router.push("/signin")}
                label="Get Started"
                textStyles="text-white"
              />
            </View>
            <StatusBar style="light" />
          </SafeAreaView>
        </ScreenWrapper>
      </ImageBackground>
    </View>
  );
};

export default App;
