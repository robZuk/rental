import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // for custom matchers

import CartItem from "./cart-item";

// Mock the useCart and useModalCalendar hooks
jest.mock("@/hooks/use-cart", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    removeItem: jest.fn(),
  })),
}));

jest.mock("@/hooks/use-calendar-modal", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    onOpen: jest.fn(),
  })),
}));

// Mock the Image component to avoid rendering issues
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => <img {...props} />,
}));

// Mock the date-fns library
jest.mock("date-fns", () => ({
  ...jest.requireActual("date-fns"),
  format: jest.fn(() => "01/01/2022"), // Adjust the mock as needed
}));

describe("CartItem component", () => {
  const mockData = {
    equipmentId: "123",
    name: "Sample Equipment",
    price: "20",
    image: "sample.jpg",
    initialDays: 3,
    dates: ["2022-01-01", "2022-01-02", "2022-01-03"],
  };

  it("renders CartItem component correctly", () => {
    render(<CartItem data={mockData} />);

    // You can add more specific queries based on your component structure
    expect(screen.getByText("Sample Equipment")).toBeInTheDocument();
    expect(screen.getByText("$20/day")).toBeInTheDocument();
    expect(screen.getByText("Reserved days: 3")).toBeInTheDocument();
    // Add more assertions as needed
  });

  it("triggers onRemove function when remove button is clicked", () => {
    render(<CartItem data={mockData} />);

    fireEvent.click(screen.getByLabelText("Remove"));

    // You can assert that the onRemove function is called as expected
    // For example, you can assert on the mock function
    expect(mockData.removeItem).toHaveBeenCalledWith("123");
  });

  it("triggers onOpen function when Edit dates button is clicked", () => {
    render(<CartItem data={mockData} />);

    fireEvent.click(screen.getByText("Edit dates"));

    // You can assert that the onOpen function is called as expected
    // For example, you can assert on the mock function
    expect(mockData.onOpen).toHaveBeenCalledWith(
      ["2022-01-01", "2022-01-02", "2022-01-03"],
      3,
      "123"
    );
  });
});
