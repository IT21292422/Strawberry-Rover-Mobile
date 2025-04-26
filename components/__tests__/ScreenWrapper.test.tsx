import React from "react";
import { render } from "@testing-library/react-native";
import ScreenWrapper from "../ScreenWrapper";
import { Text } from "react-native";

describe("ScreenWrapper Component", () => {
  it("renders children correctly", () => {
    const { getByText } = render(
      <ScreenWrapper>
        <Text>Test Content</Text>
      </ScreenWrapper>
    );

    expect(getByText("Test Content")).toBeTruthy(); // Verifies that children are rendered
  });

  it("applies the correct styles to the SafeAreaView", () => {
    const { getByTestId } = render(
      <ScreenWrapper>
        <Text>Test Content</Text>
      </ScreenWrapper>
    );

    const safeAreaView = getByTestId("screen-wrapper");
    expect(safeAreaView.props.className).toContain("flex-1 px-5 bg-white"); // Verifies styles
  });
});
