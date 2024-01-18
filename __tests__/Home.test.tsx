import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DashboardPage from "@/app/(dashboard)/(routes)/page";

it("test1", () => {
  render(<DashboardPage />); // ARRANGE

  const myElem = screen.getByText("overview"); // ACT

  expect(myElem).toBeInTheDocument();
});

it("test2", () => {
  render(<DashboardPage />); // ARRANGE

  const myElem = screen.getByText(/overview/i); // ACT

  expect(myElem).toBeInTheDocument(); // ASSERT
});

it("test3", () => {
  render(<DashboardPage />); // ARRANGE

  const myElem = screen.getByRole("heading", {
    name: "Header",
  }); // ACT

  expect(myElem).toBeInTheDocument(); // ASSERT
});
