import { Text, ScrollView } from "react-native";
import ScreenWrapper from "@/components/ScreenWrapper";
import { LineChart } from "react-native-gifted-charts";

const Analytics = () => {
  const data = [
    { value: 15, label: "Mon" },
    { value: 30, label: "Tue" },
    { value: 26, label: "Wed" },
    { value: 40, label: "Thu" },
    { value: 40, label: "Fri" },
  ];

  return (
    <ScreenWrapper>
      <ScrollView>
        <Text className="text-2xl font-bold text-center">Analytics</Text>
        <Text className="text-xl font-bold text-center mt-10">
          No. of flowers pollinated during the week
        </Text>
        <LineChart
          areaChart
          spacing={70}
          data={data}
          startFillColor="rgb(46, 217, 255)"
          startOpacity={0.8}
          endFillColor="rgb(203, 241, 250)"
          endOpacity={0.3}
        />
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Analytics;
