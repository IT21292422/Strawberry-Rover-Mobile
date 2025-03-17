import { View, Text, FlatList } from "react-native";
import React from "react";
import useRoverStore from "@/store/RoverStore";
import { useGetRoverImageData } from "@/utils/api";
import { RoverImageData } from "@/utils/types/Types";
import TimelineCard from "@/components/TimelineCard";
import { DateTime, Duration } from "luxon";

interface GroupedByDate {
  [date: string]: Date[];
}

const PollinationTimeline = () => {
  const currentRoverId = useRoverStore((state) => state.currentRoverId);
  const { data: roverData } = useGetRoverImageData(currentRoverId);

  const groupedByDate: GroupedByDate = roverData.reduce(
    (acc: GroupedByDate, entry: RoverImageData) => {
      const date = entry.created_at.split("T")[0];
      if (!acc[date]) acc[date] = [];
      acc[date].push(new Date(entry.created_at));
      return acc;
    },
    {}
  );

  const maxGap = 60 * 60 * 1000; // 60 minutes

  const pollinationDays = Object.entries(groupedByDate).map(
    ([date, timestamps]) => {
      timestamps.sort((a, b) => a.getTime() - b.getTime());
      let totalDuration = 0;

      for (let i = 1; i < timestamps.length; i++) {
        let gap = timestamps[i].getTime() - timestamps[i - 1].getTime();
        if (gap <= maxGap) {
          totalDuration += gap;
        }
      }

      const formattedDate = DateTime.fromISO(date).toLocaleString(
        DateTime.DATE_HUGE
      );

      const duration = Duration.fromMillis(totalDuration);
      const formattedDuration = duration.toFormat("h'h' m'm'");

      return {
        date: formattedDate,
        duration: formattedDuration,
      };
    }
  );

  const pollination = [
    { date: "Friday, March 14, 2025", duration: "1h 30m" },
    { date: "Tuesday, March 11, 2025", duration: "2h 30m" },
    { date: "Monday, March 10, 2025", duration: "3h 30m" },
  ];

  return (
    <View style={{ padding: 20 }}>
      <FlatList
        data={pollination}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <View className="my-4">
            <TimelineCard date={item.date} duration={item.duration} />
          </View>
        )}
      />
    </View>
  );
};

export default PollinationTimeline;
