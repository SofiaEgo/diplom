import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ChatFloatingButton from "../components/ChatFloatingButton";
import "@testing-library/jest-dom";

jest.mock("../components/ChatInterface", () => () => (
  <div data-testid="chat-interface">Chat Interface</div>
));

describe("ChatFloatingButton Component", () => {
  test("renders the floating chat button", () => {
    render(<ChatFloatingButton />);

    const chatButton = screen.getByRole("button");
    expect(chatButton).toBeInTheDocument();
    expect(chatButton).toContainHTML("<svg");
  });

  test("opens and closes the chat window on button click", () => {
    render(<ChatFloatingButton />);

    const chatButton = screen.getByRole("button");

    expect(screen.queryByTestId("chat-interface")).not.toBeInTheDocument();

    fireEvent.click(chatButton);
    expect(screen.getByTestId("chat-interface")).toBeInTheDocument();

    fireEvent.click(chatButton);
    expect(screen.queryByTestId("chat-interface")).not.toBeInTheDocument();
  });
});
