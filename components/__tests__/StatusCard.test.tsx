import React from "react";
import { render } from "@testing-library/react-native";
import StatusCard from "../StatusCard";
import { Text } from "react-native";

jest.mock("@expo/vector-icons", () => ({
  Ionicons: "Icon",
}));

describe("StatusCard Component", () => {
  it("renders the icon, name, and value correctly", () => {
    const { getByText } = render(
      <StatusCard
        iconName="thermometer"
        iconColor="red"
        bgColor="bg-blue-500"
        name="Temperature"
        value={25}
        isTemperature={true}
      />
    );
    expect(getByText("Temperature")).toBeTruthy(); // Name
    expect(getByText("°C")).toBeTruthy(); // Temperature unit
  });

  it("renders percentage when isTemperature is false", () => {
    const { getByText } = render(
      <StatusCard
        iconName="water"
        iconColor="blue"
        bgColor="bg-green-500"
        name="Humidity"
        value={60}
        isTemperature={false}
      />
    );

    expect(getByText("Humidity")).toBeTruthy(); // Name
    expect(getByText("%")).toBeTruthy(); // Percentage unit
  });

  it("applies custom text and container styles", () => {
    const { getByText, getByTestId } = render(
      <StatusCard
        iconName="leaf"
        iconColor="green"
        bgColor="bg-yellow-500"
        name="Humidity"
        value="95"
        textStyles="text-green-500"
        containerStyles="flex-row"
      />
    );
    const container = getByTestId("status-card");
    expect(container.props.className).toContain("flex-row"); // Custom container styles
  });
});
