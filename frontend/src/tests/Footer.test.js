import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Footer from "../components/Footer";
import "@testing-library/jest-dom";

describe("Footer Component", () => {
  test("renders About, Team, and Contact links", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    expect(screen.getByText(/О компании/i)).toBeInTheDocument();
    expect(screen.getByText(/Наша команда/i)).toBeInTheDocument();
    expect(screen.getByText(/Контакты/i)).toBeInTheDocument();
  });

  test("renders social media icons", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
  });
});
