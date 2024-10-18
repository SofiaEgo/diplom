import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import ChatInterface from "../components/ChatInterface";
import "@testing-library/jest-dom";

jest.mock("axios");

describe("ChatInterface Component", () => {
  beforeEach(() => {
    axios.post.mockResolvedValue({ data: { text: "Hello, user!" } });
  });

  test("renders input and send button", () => {
    render(<ChatInterface />);

    expect(
      screen.getByPlaceholderText(/enter your message/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send/i })).toBeInTheDocument();
  });

  test("sends a message and receives a response from the bot", async () => {
    render(<ChatInterface />);

    const input = screen.getByPlaceholderText(/enter your message/i);
    const sendButton = screen.getByRole("button", { name: /send/i });

    fireEvent.change(input, { target: { value: "Hi there!" } });
    fireEvent.click(sendButton);

    expect(screen.getByText("Hi there!")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Hello, user!")).toBeInTheDocument();
    });

    expect(input.value).toBe("");
  });

  test("shows loading spinner while waiting for bot response", async () => {
    render(<ChatInterface />);

    const input = screen.getByPlaceholderText(/enter your message/i);
    const sendButton = screen.getByRole("button", { name: /send/i });

    axios.post.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ data: { text: "Hello!" } }), 1000)
        )
    );

    fireEvent.change(input, { target: { value: "Loading test" } });
    fireEvent.click(sendButton);

    expect(screen.getByRole("button", { name: /send/i })).toBeDisabled();

    await waitFor(() => {
      expect(screen.getByText("Hello!")).toBeInTheDocument();
    });
  });

  test("disables input and button while loading", () => {
    render(<ChatInterface />);

    const input = screen.getByPlaceholderText(/enter your message/i);
    const sendButton = screen.getByRole("button", { name: /send/i });

    fireEvent.change(input, { target: { value: "Testing" } });
    fireEvent.click(sendButton);

    expect(input).toBeDisabled();
    expect(sendButton).toBeDisabled();
  });
});
