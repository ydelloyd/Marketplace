import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import BidModal from "./bidModal";
import { AlertProvider } from "../../contexts/alertContext";
import { LoaderProvider } from "../../contexts/loaderContext";
import jobService from "../../services/jobService";

// Mock the jobService
jest.mock("../../services/jobService");

const mockHandleClose = jest.fn();

const renderComponent = (props = {}) => {
  return render(
    <AlertProvider>
      <LoaderProvider>
        <BidModal id="1" open={true} handleClose={mockHandleClose} {...props} />
      </LoaderProvider>
    </AlertProvider>
  );
};

describe("BidModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders BidModal component", () => {
    renderComponent();
    expect(screen.getByText("Place a Bid")).toBeInTheDocument();
  });

  test("displays validation errors when submitting empty form", async () => {
    renderComponent();

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(screen.getByText("Amount must be a positive number")).toBeInTheDocument();
    });
  });

  test("displays validation error for invalid email", async () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText("Amount ($)"), {
      target: { value: "100" }
    });
    fireEvent.change(screen.getByLabelText("Contact Email"), {
      target: { value: "invalid-email" }
    });
    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(screen.getByText("Invalid email address")).toBeInTheDocument();
    });
  });

  test("submits form successfully", async () => {
    (jobService.placeBid as jest.Mock).mockResolvedValue({ status: 201 });

    renderComponent();

    fireEvent.change(screen.getByLabelText("Amount ($)"), {
      target: { value: "100" }
    });
    fireEvent.change(screen.getByLabelText("Contact Email"), {
      target: { value: "test@example.com" }
    });
    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(jobService.placeBid).toHaveBeenCalledWith("1", {
        amount: 100,
        contact_email: "test@example.com"
      });
      expect(mockHandleClose).toHaveBeenCalled();
    });
  });

});
