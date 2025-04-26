import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import CustomButton from "../CustomButton";

describe("CustomButton Component", () => {
  it("renders the button with the correct label", () => {
    const { getByText } = render(
      <CustomButton onPress={() => {}} label="Click Me" />
    );

    expect(getByText("Click Me")).toBeTruthy();
  });

  it("calls the onPress function when pressed", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <CustomButton onPress={onPressMock} label="Click Me" />
    );

    fireEvent.press(getByText("Click Me"));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it("applies the correct styles from props", () => {
    const { getByText } = render(
      <CustomButton
        onPress={() => {}}
        label="Styled Button"
        textStyles="text-red-500"
        containerStyles="bg-blue-500"
      />
    );

    const button = getByText("Styled Button");
    expect(button.props.className).toContain("text-red-500");
  });

  it("disables the button when isDisabled is true", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <CustomButton
        onPress={onPressMock}
        label="Disabled Button"
        isDisabled={true}
      />
    );

    const button = getByText("Disabled Button");
    fireEvent.press(button);
    expect(onPressMock).not.toHaveBeenCalled();
  });
});
