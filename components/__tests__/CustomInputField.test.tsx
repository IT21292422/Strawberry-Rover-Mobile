import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";
import CustomInputField from "../CustomInputField";

describe("CustomInputField Component", () => {
  it("renders the placeholder correctly", () => {
    const { getByPlaceholderText } = render(
      <CustomInputField value="" placeholder="Enter text" />
    );

    expect(getByPlaceholderText("Enter text")).toBeTruthy();
  });

  it("calls handleChangeText when text is entered", () => {
    const handleChangeTextMock = jest.fn();
    const { getByPlaceholderText } = render(
      <CustomInputField
        value=""
        placeholder="Enter text"
        handleChangeText={handleChangeTextMock}
      />
    );

    fireEvent.changeText(getByPlaceholderText("Enter text"), "New text");
    expect(handleChangeTextMock).toHaveBeenCalledWith("New text");
  });

  it("displays the error message when provided", () => {
    const { getByText } = render(
      <CustomInputField
        value=""
        placeholder="Enter text"
        error="Error message"
      />
    );

    expect(getByText("Error message")).toBeTruthy();
  });

  it("toggles password visibility when the eye icon is pressed", async () => {
    const { getByPlaceholderText, getByRole } = render(
      <CustomInputField
        value="password"
        placeholder="Enter password"
        type="password"
      />
    );

    const input = getByPlaceholderText("Enter password");
    const toggleButton = getByRole("button");

    // Initially, the password should be hidden
    expect(input.props.secureTextEntry).toBe(true);

    // Toggle visibility
    await act(() => {
      fireEvent.press(toggleButton);
    });
    expect(input.props.secureTextEntry).toBe(false);

    // Toggle back to hidden
    await act(() => {
      fireEvent.press(toggleButton);
    });
    expect(input.props.secureTextEntry).toBe(true);
  });

  it("applies the correct styles when focused", () => {
    const { getByPlaceholderText, getByTestId } = render(
      <CustomInputField
        value=""
        placeholder="Enter text"
        containerStyles="test-container"
      />
    );

    const input = getByPlaceholderText("Enter text");
    const container = getByTestId("input-container"); // Add a test ID to the parent container

    act(() => {
      fireEvent(input, "focus");
    });

    expect(container.props.className).toContain("border-primary");
  });

  it("does not allow editing when editable is false", () => {
    const { getByPlaceholderText } = render(
      <CustomInputField
        value="Non-editable"
        placeholder="Enter text"
        editable={false}
      />
    );

    const input = getByPlaceholderText("Enter text");
    expect(input.props.editable).toBe(false);
  });

  it("calls onBlur when the input loses focus", () => {
    const onBlurMock = jest.fn();
    const { getByPlaceholderText } = render(
      <CustomInputField value="" placeholder="Enter text" onBlur={onBlurMock} />
    );

    const input = getByPlaceholderText("Enter text");

    act(() => {
      fireEvent(input, "blur");
    });

    expect(onBlurMock).toHaveBeenCalled();
  });

  it("renders custom border styles", () => {
    const { getByTestId } = render(
      <CustomInputField
        value=""
        placeholder="Enter text"
        borderStyles="custom-border"
      />
    );

    const container = getByTestId("input-container");
    expect(container.props.className).toContain("custom-border");
  });
});
