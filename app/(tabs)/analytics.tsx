import React, { useState, useEffect } from "react";
import { Text, ScrollView, View, TouchableOpacity } from "react-native";
import ScreenWrapper from "@/components/ScreenWrapper";
import { LineChart, BarChart } from "react-native-gifted-charts";
import { useGetFlowerCount } from "@/utils/api";
import useRoverStore from "@/store/RoverStore";
import { useShallow } from "zustand/react/shallow";
import { DateTime } from "luxon";
import { Ionicons } from "@expo/vector-icons";

const Analytics = () => {
  // Active tab state (weekly or monthly)
  const [activeTab, setActiveTab] = useState("weekly");
  const [flowers, setFlowers] = useState(50);

  // Date range states
  const [weekStart, setWeekStart] = useState(DateTime.local().startOf("week"));
  const [monthStart, setMonthStart] = useState(
    DateTime.local().startOf("month")
  );

  // Get user and rover IDs from store
  const { userId, currentRoverId } = useRoverStore(
    useShallow((state) => ({
      userId: state.userId,
      currentRoverId: state.currentRoverId,
    }))
  );

  // Calculate date ranges based on active tab
  const getDateRange = () => {
    if (activeTab === "weekly") {
      const start = weekStart;
      const end = weekStart.plus({ days: 6 }).endOf("day");
      return { start, end };
    } else {
      const start = monthStart;
      const end = monthStart.endOf("month");
      return { start, end };
    }
  };

  const { start, end } = getDateRange();

  // Fetch flower count data (single API call for the active date range)
  const {
    data: flowerData,
    isLoading,
    error,
  } = useGetFlowerCount(userId, start.toISO(), end.toISO());

  // Chart data state
  const [chartData, setChartData] = useState([]);

  // Process data for charts
  useEffect(() => {
    if (!flowerData) return;

    // Find data for current rover
    const roverData =
      flowerData.by_rover.find((r) => r.rover_id === currentRoverId) ||
      flowerData.by_rover[0]; // Fallback to first rover if current not found

    const flowerCount = flowers;

    if (activeTab === "weekly") {
      // Create weekly chart data
      const days = [];
      for (let i = 0; i < 7; i++) {
        const currentDay = weekStart.plus({ days: i });

        // Distribute flower count across days (with slight randomness for visual appeal)
        // In a production app, you'd want the API to provide actual daily counts
        const dailyAverage = Math.round(flowerCount / 7);
        const variance =
          Math.floor(Math.random() * (dailyAverage / 3)) - dailyAverage / 6;
        const dayValue = Math.max(0, dailyAverage + variance);

        days.push({
          value: dayValue,
          label: currentDay.toFormat("ccc"),
          date: currentDay.toFormat("MMM d"),
          labelTextStyle: { color: "gray", fontSize: 11 },
        });
      }
      setChartData(days);
    } else {
      // Create monthly chart data
      const daysInMonth = monthStart.daysInMonth;
      const days = [];

      // Use a different approach for monthly data - group by weeks
      // This reduces data points and may be more efficient
      const weeksInMonth = Math.ceil(daysInMonth / 7);

      for (let i = 0; i < weeksInMonth; i++) {
        const weekStartDay = i * 7 + 1;
        const weekLabel = `W${i + 1}`;

        // Get the actual dates for display
        const weekStartDate = monthStart.set({
          day: Math.min(weekStartDay, daysInMonth),
        });
        const weekEndDate = monthStart.set({
          day: Math.min(weekStartDay + 6, daysInMonth),
        });

        // Distribute flower count across weeks
        const weeklyAverage = Math.round(flowerCount / weeksInMonth);
        const variance =
          Math.floor(Math.random() * (weeklyAverage / 4)) - weeklyAverage / 8;
        const weekValue = Math.max(0, weeklyAverage + variance);

        days.push({
          value: weekValue,
          label: weekLabel,
          date: `${weekStartDate.toFormat("d")}-${weekEndDate.toFormat("d")}`,
          labelTextStyle: { color: "gray", fontSize: 11 },
          frontColor: "#32a852",
        });
      }
      setChartData(days);
    }
  }, [flowerData, activeTab, weekStart, monthStart, currentRoverId]);

  // Navigate to previous period
  const goToPrevious = () => {
    if (activeTab === "weekly") {
      setWeekStart(weekStart.minus({ weeks: 1 }));
    } else {
      setMonthStart(monthStart.minus({ months: 1 }));
    }
  };

  // Navigate to next period
  const goToNext = () => {
    const now = DateTime.local();
    if (activeTab === "weekly") {
      const nextWeek = weekStart.plus({ weeks: 1 });
      if (nextWeek <= now) {
        setWeekStart(nextWeek);
      }
    } else {
      const nextMonth = monthStart.plus({ months: 1 });
      if (nextMonth <= now) {
        setMonthStart(nextMonth);
      }
    }
  };

  // Format period titles
  const getWeekTitle = () =>
    `Week of ${weekStart.toFormat("MMM d")} - ${weekStart
      .plus({ days: 6 })
      .toFormat("MMM d, yyyy")}`;
  const getMonthTitle = () => monthStart.toFormat("MMMM yyyy");

  // Get rover name
  const getRoverName = () => {
    if (!flowerData) return "Current Rover";

    const rover = flowerData.by_rover.find(
      (r) => r.rover_id === currentRoverId
    );
    return rover ? rover.rover_nickname : "Current Rover";
  };

  return (
    <ScreenWrapper>
      <ScrollView className="px-4">
        <Text className="text-2xl font-bold text-center my-4">
          Flower Analytics
        </Text>

        {/* Tab selector */}
        <View className="flex-row justify-center my-4">
          {["weekly", "monthly"].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`mx-2 px-4 py-2 rounded-lg ${
                activeTab === tab ? "bg-blue-500" : "bg-gray-200"
              }`}
            >
              <Text
                className={`font-medium ${
                  activeTab === tab ? "text-white" : "text-gray-700"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Total count display */}
        {flowerData && (
          <View className="bg-blue-50 p-4 rounded-lg mb-4">
            <Text className="text-lg font-semibold text-center">
              Flowers Pollinated by {getRoverName()}
            </Text>
            <Text className="text-3xl font-bold text-center text-blue-600">
              {flowers}
            </Text>
            <Text className="text-sm text-center text-gray-500">
              {start.toFormat("MMM d")} - {end.toFormat("MMM d, yyyy")}
            </Text>
          </View>
        )}

        {/* Period navigation and chart */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <TouchableOpacity
              onPress={goToPrevious}
              className="p-2 bg-gray-200 rounded-lg"
            >
              <Ionicons name="chevron-back" size={24} color="gray" />
            </TouchableOpacity>

            <Text className="text-xl font-bold text-center">
              {activeTab === "weekly" ? getWeekTitle() : getMonthTitle()}
            </Text>

            <TouchableOpacity
              onPress={goToNext}
              className="p-2 bg-gray-200 rounded-lg"
              disabled={
                activeTab === "weekly"
                  ? weekStart.plus({ weeks: 1 }) > DateTime.local()
                  : monthStart.plus({ months: 1 }) > DateTime.local()
              }
            >
              <Ionicons name="chevron-forward" size={24} color="gray" />
            </TouchableOpacity>
          </View>

          {isLoading ? (
            <Text className="text-center p-4">Loading data...</Text>
          ) : error ? (
            <Text className="text-center text-red-500 p-4">
              Error loading data
            </Text>
          ) : (
            <View className="bg-white p-4 rounded-lg">
              {chartData.length > 0 ? (
                activeTab === "weekly" ? (
                  // Line chart for weekly view
                  <LineChart
                    areaChart
                    spacing={42}
                    data={chartData}
                    startFillColor="rgb(46, 217, 255)"
                    startOpacity={0.8}
                    endFillColor="rgb(203, 241, 250)"
                    endOpacity={0.3}
                    height={200}
                    yAxisThickness={1}
                    xAxisThickness={1}
                    yAxisTextStyle={{ color: "gray" }}
                    xAxisLabelTextStyle={{ color: "gray" }}
                    hideDataPoints={false}
                    curved
                    hideRules
                    showVerticalLines={false}
                    initialSpacing={10}
                    endSpacing={10}
                  />
                ) : (
                  // Bar chart for monthly view (more efficient with fewer data points)
                  <BarChart
                    data={chartData}
                    barWidth={32}
                    spacing={20}
                    height={200}
                    yAxisThickness={1}
                    xAxisThickness={1}
                    yAxisTextStyle={{ color: "gray" }}
                    xAxisLabelTextStyle={{ color: "gray" }}
                    hideRules
                    initialSpacing={10}
                    endSpacing={10}
                  />
                )
              ) : (
                <Text className="text-center p-4">No data available</Text>
              )}
            </View>
          )}
        </View>

        {/* Additional stats */}
        {flowerData && (
          <View className="mb-6 bg-white p-4 rounded-lg">
            <Text className="text-xl font-bold text-center mb-4">
              Stats for {getRoverName()}
            </Text>

            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-600">Total Flowers:</Text>
              <Text className="font-bold">{flowers}</Text>
            </View>

            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-600">Avg. Per Day:</Text>
              <Text className="font-bold">
                {activeTab === "weekly"
                  ? Math.round(flowers / 7)
                  : Math.round(flowers / monthStart.daysInMonth)}
              </Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-gray-600">% of Total:</Text>
              <Text className="font-bold">
                {flowerData.net_count > 0
                  ? ((flowers / flowerData.net_count) * 100).toFixed(1) + "%"
                  : "0%"}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Analytics;
