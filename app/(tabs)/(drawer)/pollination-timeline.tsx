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

  return (
    <View style={{ padding: 20 }}>
      <FlatList
        data={pollinationDays}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <TimelineCard date={item.date} duration={item.duration} />
        )}
      />
    </View>
  );
};

export default PollinationTimeline;
