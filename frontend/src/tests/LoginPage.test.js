import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import "@testing-library/jest-dom";
import { userLogin } from "../features/auth/authSlice";

jest.mock("../features/auth/authSlice", () => ({
  userLogin: jest.fn(),
}));

describe("LoginPage Component", () => {
  test("renders login form", () => {
    render(
      <Provider store={store}>
        <Router>
          <LoginPage />
        </Router>
      </Provider>
    );

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/пароль/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /войти/i })).toBeInTheDocument();
  });

  test("displays error when login fails", async () => {
    userLogin.mockReturnValueOnce({
      type: "auth/userLogin/rejected",
      payload: "Неверный логин или пароль",
    });

    render(
      <Provider store={store}>
        <Router>
          <LoginPage />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/пароль/i), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /войти/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/неверный логин или пароль/i)
      ).toBeInTheDocument();
    });
  });

  test("redirects to profile on successful login", async () => {
    const mockNavigate = jest.fn();
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => mockNavigate,
    }));

    userLogin.mockReturnValueOnce({
      type: "auth/userLogin/fulfilled",
      payload: { token: "123456" },
    });

    render(
      <Provider store={store}>
        <Router>
          <LoginPage />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/пароль/i), {
      target: { value: "correctpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /войти/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/profile");
    });
  });

  test("disables login button while loading", () => {
    store = mockStore({
      auth: {
        isLoading: true,
        token: null,
      },
    });

    render(
      <Provider store={store}>
        <Router>
          <LoginPage />
        </Router>
      </Provider>
    );

    // Проверяем, что кнопка заблокирована во время загрузки
    const loginButton = screen.getByRole("button", { name: /вход/i });
    expect(loginButton).toBeDisabled();
  });
});
