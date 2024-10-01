import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { JobModal } from "./jobModal";
import { AlertProvider } from "../../contexts/alertContext";
import { LoaderProvider } from "../../contexts/loaderContext";
import jobService from "../../services/jobService";

// Mock the jobService
jest.mock("../../services/jobService");

describe("JobModal Component", () => {
  const onClose = jest.fn();

  const renderComponent = (open: boolean) => {
    return render(
      <AlertProvider>
        <LoaderProvider>
          <JobModal open={open} onClose={onClose} />
        </LoaderProvider>
      </AlertProvider>
    );
  };

  it("should render the JobModal component", () => {
    renderComponent(true);
    expect(screen.getByText("Create a Job")).toBeInTheDocument();
  });

});
