import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import HomePage from "./homePage";
import JobService from "../services/jobService";
import { AlertProvider } from "../contexts/alertContext";
import { LoaderProvider } from "../contexts/loaderContext";
import '@testing-library/jest-dom';

jest.mock("../services/jobService");

const mockJobs = [
    {
        id: "1",
        title: "Job 1",
        description: "Description 1",
        expiration: new Date().toISOString(),
        owner: { name: "test", contactInfo: "test@test.com" },
        lowestBid: 100,
        numberOfBids: 5,
        requirements: "Test requirements",
        createdAt: new Date().toISOString(),
    },
    {
        id: "2",
        title: "Job 2",
        description: "Description 2",
        expiration: new Date().toISOString(),
        owner: { name: "test", contactInfo: "test@test.com" },
        lowestBid: 100,
        numberOfBids: 5,
        requirements: "Test requirements",
        createdAt: new Date().toISOString(),
    }
];

// Helper function to render the component
const renderHomePage = async () => {
    await act(async () => {
        render(
            <AlertProvider>
                <LoaderProvider>
                    <HomePage />
                </LoaderProvider>
            </AlertProvider>
        );
    });
};

describe("HomePage", () => {
    beforeEach(() => {
        (JobService.getAllJobs as jest.Mock).mockResolvedValueOnce({ status: 200, data: mockJobs });
    });

    it("renders welcome message", async () => {
        await renderHomePage();
        expect(screen.getByText("Welcome to the Best Marketplace")).toBeInTheDocument();
    });

    it("renders Post a Job button", async () => {
        await renderHomePage();
        expect(screen.getByText("Post a Job")).toBeInTheDocument();
    });

    it("opens job modal when Post a Job button is clicked", async () => {
        await renderHomePage();
        fireEvent.click(screen.getByText("Post a Job"));
        expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("fetches and displays recent jobs", async () => {
        await renderHomePage();
        await waitFor(() => {
            const jobElements1 = screen.queryAllByText("Job 1");
            const jobElements2 = screen.queryAllByText("Job 2");
            expect(screen.getByText("Recently Added Jobs")).toBeInTheDocument();
            expect(jobElements1).toHaveLength(1); // Adjusted length check
            expect(jobElements2).toHaveLength(1); // Adjusted length check
        });
    });

    it("fetches and displays most active jobs", async () => {
        await renderHomePage();
        await waitFor(() => {
            expect(screen.getByText("Most Active Jobs")).toBeInTheDocument();
        });
    });
});
