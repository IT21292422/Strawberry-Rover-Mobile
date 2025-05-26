import React from "react";
import { render } from "@testing-library/react-native";
import TodayPollinatedCard from "../TodayPollinatedCard";

// Mock Ionicons to avoid internal state updates
jest.mock("@expo/vector-icons", () => ({
  Ionicons: "Icon",
}));

describe("TodayPollinatedCard Component", () => {
  it("renders the flower count correctly", () => {
    const { getByText } = render(<TodayPollinatedCard flowerCount={42} />);

    expect(getByText("Total Pollinated Today")).toBeTruthy(); // Verifies the title
    expect(getByText("42")).toBeTruthy(); // Verifies the flower count
  });

  it("renders the flower icon", () => {
    const { getByTestId } = render(<TodayPollinatedCard flowerCount={42} />);

    expect(getByTestId("flower-outline-icon")).toBeTruthy(); // Verifies the icon
  });

  it("applies the correct styles to the container", () => {
    const { getByTestId } = render(<TodayPollinatedCard flowerCount={42} />);

    const container = getByTestId("today-pollinated-card");
    expect(container.props.className).toContain(
      "flex flex-row justify-between rounded-3xl p-5 bg-[#FAFAFA]"
    );
  });
});
