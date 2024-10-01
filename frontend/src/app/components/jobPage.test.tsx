import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import JobCard from "./jobPage";
import { useAlert } from "../contexts/alertContext";
import { useLoader } from "../contexts/loaderContext";
import JobService from "../services/jobService";
import { AxiosHeaders } from "axios";
import "@testing-library/jest-dom";

jest.mock("../contexts/alertContext");
jest.mock("../contexts/loaderContext");
jest.mock("../services/jobService");

const mockUseAlert = useAlert as jest.MockedFunction<typeof useAlert>;
const mockUseLoader = useLoader as jest.MockedFunction<typeof useLoader>;
const mockJobService = JobService as jest.Mocked<typeof JobService>;

describe("JobCard Component", () => {
  beforeEach(() => {
    mockUseAlert.mockReturnValue({
      setOpen: jest.fn(),
      setMessage: jest.fn(),
      setSeverity: jest.fn(),
      severity: "info",
      message: "",
      open: false
    });

    mockUseLoader.mockReturnValue({
      loading: false,
      setLoading: jest.fn()
    });
  });

  it("renders 'No Job Found' when job id is invalid", async () => {
    render(
      <MemoryRouter initialEntries={["/job/invalid"]}>
        <Routes>
          <Route path="/job/:id" element={<JobCard />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("No Job Found")).toBeInTheDocument();
  });

  it("renders job details when job id is valid", async () => {
    const job = {
      id: "1",
      title: "Test Job",
      description: "Job Description",
      requirements: "Job Requirements",
      numberOfBids: 5,
      lowestBid: 100,
      expiration: "2023-12-31T23:59:59Z",
      createdAt: "2023-01-01T00:00:00Z",
      owner: {
        name: "John Doe",
        contactInfo: "john.doe@example.com"
      }
    };

    mockJobService.getJobDetails.mockResolvedValue({
      status: 200,
      data: job,
      statusText: "OK",
      headers: new AxiosHeaders(),
      config: {
        headers: new AxiosHeaders()
      }
    });

    render(
      <MemoryRouter initialEntries={["/job/1"]}>
        <Routes>
          <Route path="/job/:id" element={<JobCard />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText("Test Job")).toBeInTheDocument()
    );
    expect(screen.getByText("Job Description")).toBeInTheDocument();
    expect(screen.getByText("Job Requirements")).toBeInTheDocument();
    expect(screen.getByDisplayValue("5")).toBeInTheDocument();
    expect(screen.getByDisplayValue("$100")).toBeInTheDocument();
    expect(screen.getByText("Contact John Doe at:")).toBeInTheDocument();
    expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
  });

  it("opens bid modal when bid button is clicked", async () => {
    const job = {
      id: "1",
      title: "Test Job",
      description: "Job Description",
      requirements: "Job Requirements",
      numberOfBids: 5,
      lowestBid: 100,
      expiration: "2023-12-31T23:59:59Z",
      createdAt: "2023-01-01T00:00:00Z",
      owner: {
        name: "John Doe",
        contactInfo: "john.doe@example.com"
      }
    };

    mockJobService.getJobDetails.mockResolvedValue({
      status: 200,
      data: job,
      statusText: "OK",
      headers: new AxiosHeaders(),
      config: {
        headers: new AxiosHeaders()
      }
    });

    render(
      <MemoryRouter initialEntries={["/job/1"]}>
        <Routes>
          <Route path="/job/:id" element={<JobCard />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText("Test Job")).toBeInTheDocument()
    );

    const bidButton = screen.getByTestId("bid");
    fireEvent.click(bidButton);

    await waitFor(() =>
      expect(screen.getByText("Place a Bid")).toBeInTheDocument()
    );
  });
});
