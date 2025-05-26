import React from "react";
import { render } from "@testing-library/react-native";
import TimelineCard from "../TimelineCard";

// Mock Ionicons to avoid internal state updates
jest.mock("@expo/vector-icons", () => ({
  Ionicons: "Icon",
}));

describe("TimelineCard Component", () => {
  it("renders the date and duration correctly", () => {
    const { getByText } = render(
      <TimelineCard date="April 26, 2025" duration="5h 30m" />
    );

    expect(getByText("Worked Hours on April 26, 2025")).toBeTruthy(); // Verifies the date
    expect(getByText("5h 30m")).toBeTruthy(); // Verifies the duration
  });

  it("renders the timer icon", () => {
    const { getByTestId } = render(
      <TimelineCard date="April 26, 2025" duration="5h 30m" />
    );

    expect(getByTestId("timer-outline-icon")).toBeTruthy(); // Verifies the icon
  });

  it("applies the correct styles to the container", () => {
    const { getByTestId } = render(
      <TimelineCard date="April 26, 2025" duration="5h 30m" />
    );

    const container = getByTestId("timeline-card");
    expect(container.props.className).toContain(
      "flex flex-row justify-between rounded-3xl p-5 bg-[#FAFAFA]"
    );
  });
});
