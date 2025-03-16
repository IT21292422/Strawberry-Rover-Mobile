import { View, Text, FlatList } from "react-native";
import React from "react";
import useRoverStore from "@/store/RoverStore";
import { useGetRoverImageData } from "@/utils/api";

const PollinationTimeline = () => {
  const currentRoverId = useRoverStore((state) => state.currentRoverId);
  const { data: roverData } = useGetRoverImageData(currentRoverId);

  const groupedByDate = roverData.reduce((acc, entry) => {
    const date = entry.created_at.split("T")[0]; // Extract only the date part
    if (!acc[date]) acc[date] = [];
    acc[date].push(new Date(entry.created_at));
    return acc;
  }, {});

  // Step 2: Calculate duration per day
  const maxGap = 60 * 60 * 1000; // 30 minutes in milliseconds

  const pollinationDays = Object.entries(groupedByDate).map(
    ([date, timestamps]) => {
      timestamps.sort((a, b) => a - b); // Sort timestamps in order
      let totalDuration = 0;

      for (let i = 1; i < timestamps.length; i++) {
        let gap = timestamps[i] - timestamps[i - 1]; // Time difference in milliseconds
        if (gap <= maxGap) {
          totalDuration += gap; // Add only if gap is small
        }
      }

      return {
        date,
        duration: `${Math.round(totalDuration / (1000 * 60))} minutes`,
      };
    }
  );

  return (
    <View style={{ padding: 20 }}>
      <FlatList
        data={pollinationDays}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {item.date}
            </Text>
            <Text style={{ fontSize: 16, color: "gray" }}>
              Duration: {item.duration}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default PollinationTimeline;
