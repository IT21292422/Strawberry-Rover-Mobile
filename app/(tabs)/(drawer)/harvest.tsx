import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { AnimatedFAB } from "react-native-paper";

const Harvest = () => {
  return (
    <SafeAreaView>
      <ScrollView></ScrollView>
      <AnimatedFAB
        icon={"plus"}
        label={"Label"}
        extended={true}
        onPress={() => console.log("Pressed")}
        animateFrom={"right"}
        iconMode={"static"}
      />
    </SafeAreaView>
  );
};

export default Harvest;
