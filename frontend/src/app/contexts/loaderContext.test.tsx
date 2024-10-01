import React from "react";
import { render, screen, act } from "@testing-library/react";
import { LoaderProvider, useLoader } from "./loaderContext";

// A helper component to test the context
const TestComponent = () => {
    const { loading, setLoading } = useLoader();

    return (
        <div>
            <div data-testid="loading-state">{loading ? "Loading..." : "Loaded"}</div>
            <button onClick={() => setLoading(true)}>Set Loading</button>
            <button onClick={() => setLoading(false)}>Set Loaded</button>
        </div>
    );
};

describe("LoaderContext", () => {
    it("provides default loading state", () => {
        render(
            <LoaderProvider>
                <TestComponent />
            </LoaderProvider>
        );

        expect(screen.getByTestId("loading-state").textContent).toBe("Loaded");
    });

    it("updates loading state to true", () => {
        render(
            <LoaderProvider>
                <TestComponent />
            </LoaderProvider>
        );

        act(() => {
            screen.getByText("Set Loading").click();
        });

        expect(screen.getByTestId("loading-state").textContent).toBe("Loading...");
    });

    it("updates loading state to false", () => {
        render(
            <LoaderProvider>
                <TestComponent />
            </LoaderProvider>
        );

        act(() => {
            screen.getByText("Set Loaded").click();
        });

        expect(screen.getByTestId("loading-state").textContent).toBe("Loaded");
    });

    it("throws error when useLoader is used outside of LoaderProvider", () => {
        const consoleError = jest.spyOn(console, "error").mockImplementation(() => {});

        expect(() => render(<TestComponent />)).toThrow("useLoader must be used within a LoaderProvider");

        consoleError.mockRestore();
    });
});
