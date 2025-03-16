import React, { useState, useEffect } from "react";
import { Text, ScrollView, View, TouchableOpacity } from "react-native";
import ScreenWrapper from "@/components/ScreenWrapper";
import { LineChart } from "react-native-gifted-charts";
import { useGetFlowerCount } from "@/utils/api";
import useRoverStore from "@/store/RoverStore";
import { useShallow } from "zustand/react/shallow";
import { DateTime, Interval } from "luxon";
import { Ionicons } from "@expo/vector-icons";

const Analytics = () => {
  // Active tab state (weekly or monthly)
  const [activeTab, setActiveTab] = useState("weekly");

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

  // Calculate date ranges based on active period
  const getDateRange = () => {
    if (activeTab === "weekly") {
      const start = weekStart;
      const end = weekStart.plus({ days: 6 });
      return { start, end };
    } else {
      const start = monthStart;
      const end = monthStart.endOf("month");
      return { start, end };
    }
  };

  const { start, end } = getDateRange();

  // Format dates for API
  const formattedStartDate = start.toISO();
  const formattedEndDate = end.toISO();

  // Fetch flower count data
  const {
    data: flowerCountData,
    isLoading,
    error,
  } = useGetFlowerCount(userId, formattedStartDate, formattedEndDate);

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

  // Process data for charts
  const [weeklyChartData, setWeeklyChartData] = useState([]);
  const [monthlyChartData, setMonthlyChartData] = useState([]);
  const [selectedRoverId, setSelectedRoverId] = useState(null);

  useEffect(() => {
    if (!flowerCountData) return;

    // Set selected rover (default to current or first in list)
    if (!selectedRoverId && flowerCountData.by_rover.length > 0) {
      setSelectedRoverId(
        currentRoverId || flowerCountData.by_rover[0].rover_id
      );
    }

    const roverData = flowerCountData.by_rover.find(
      (rover) => rover.rover_id === selectedRoverId
    );
    const totalFlowers = roverData ? roverData.flower_count : 0;

    // Generate weekly data
    if (activeTab === "weekly") {
      const days = [];
      for (let i = 0; i < 7; i++) {
        const day = weekStart.plus({ days: i });
        days.push({
          value: Math.floor(totalFlowers / 7), // Mock data
          label: day.toFormat("ccc"), // Mon, Tue, etc.
          date: day.toISO(),
        });
      }
      setWeeklyChartData(days);
    }
    // Generate monthly data
    else {
      const daysInMonth = monthStart.daysInMonth;
      const days = [];
      for (let i = 1; i <= daysInMonth; i++) {
        // Only show every few days on the chart to avoid overcrowding
        if (i % 3 === 1 || i === daysInMonth) {
          const day = monthStart.set({ day: i });
          days.push({
            value: Math.floor(totalFlowers / daysInMonth), // Mock data
            label: day.toFormat("d"), // 1, 2, etc.
            date: day.toISO(),
          });
        }
      }
      setMonthlyChartData(days);
    }
  }, [flowerCountData, activeTab, weekStart, monthStart, currentRoverId]);

  // Function to handle rover selection
  const handleRoverSelect = (roverId) => {
    setSelectedRoverId(roverId);
    // In a real implementation, you would re-fetch or re-process data for this specific rover
  };

  // Format period titles
  const getWeekTitle = () =>
    `Week of ${weekStart.toFormat("MMM d")} - ${weekStart
      .plus({ days: 6 })
      .toFormat("MMM d, yyyy")}`;
  const getMonthTitle = () => monthStart.toFormat("MMMM yyyy");

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
        {flowerCountData && (
          <View className="bg-blue-50 p-4 rounded-lg mb-4">
            <Text className="text-lg font-semibold text-center">
              Total Flowers Pollinated
            </Text>
            <Text className="text-3xl font-bold text-center text-blue-600">
              {flowerCountData.net_count}
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
              {activeTab === "weekly" && weeklyChartData.length > 0 ? (
                <LineChart
                  areaChart
                  spacing={42}
                  data={weeklyChartData}
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
                />
              ) : activeTab === "monthly" && monthlyChartData.length > 0 ? (
                <LineChart
                  areaChart
                  spacing={36}
                  data={monthlyChartData}
                  startFillColor="rgb(73, 169, 89)"
                  startOpacity={0.8}
                  endFillColor="rgb(200, 240, 205)"
                  endOpacity={0.3}
                  height={200}
                  yAxisThickness={1}
                  xAxisThickness={1}
                  yAxisTextStyle={{ color: "gray" }}
                  xAxisLabelTextStyle={{ color: "gray" }}
                  hideDataPoints={false}
                  curved
                />
              ) : (
                <Text className="text-center p-4">No data available</Text>
              )}
            </View>
          )}
        </View>

        {/* Rover selection */}
        {flowerCountData && flowerCountData.by_rover && (
          <View className="mb-6">
            <Text className="text-xl font-bold text-center mb-4">By Rover</Text>

            <View className="flex-row flex-wrap justify-center">
              {flowerCountData.by_rover.map((rover) => (
                <TouchableOpacity
                  key={rover.rover_id}
                  onPress={() => handleRoverSelect(rover.rover_id)}
                  className={`m-1 px-3 py-2 rounded-lg ${
                    selectedRoverId === rover.rover_id
                      ? "bg-green-500"
                      : "bg-gray-200"
                  }`}
                >
                  <Text
                    className={`${
                      selectedRoverId === rover.rover_id
                        ? "text-white"
                        : "text-gray-700"
                    }`}
                  >
                    {rover.rover_nickname} ({rover.flower_count})
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Analytics;
