import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ThemeToggle from "../components/ThemeToggle";
import "@testing-library/jest-dom";

describe("ThemeToggle Component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("loads with light theme by default", () => {
    render(<ThemeToggle />);

    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(screen.getByRole("button")).toContainHTML("<svg");
  });

  test("loads with dark theme if set in localStorage", () => {
    localStorage.setItem("theme", "dark");
    render(<ThemeToggle />);

    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(screen.getByRole("button")).toContainHTML("<svg");
  });
});
