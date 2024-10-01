import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./app";
import { AlertProvider, useAlert } from "./contexts/alertContext";
import { LoaderProvider, useLoader } from "./contexts/loaderContext";
import "@testing-library/jest-dom";
import { ReactNode, useEffect } from "react";

describe("App Component", () => {
  test("renders the AppBar with title", () => {
    render(
      <AlertProvider>
        <LoaderProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </LoaderProvider>
      </AlertProvider>
    );
    expect(screen.getByText("The Best Marketplace")).toBeInTheDocument();
  });

  test("navigates to HomePage on clicking back button", () => {
    render(
      <AlertProvider>
        <LoaderProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </LoaderProvider>
      </AlertProvider>
    );
    const backButton = screen.getByLabelText("menu");
    fireEvent.click(backButton);
    expect(window.location.href).toBe("http://localhost/");
  });

  test("displays Snackbar when alert is open", () => {
    // Mock AlertProvider component that sets the alert to open on mount
    const MockAlertProvider = ({ children }: { children: ReactNode }) => {
      const { setOpen } = useAlert(); // Using useAlert within the AlertProvider context

      useEffect(() => {
        setOpen(true); // Set the alert to be open
      }, [setOpen]);

      return <div>{children}</div>;
    };

    render(
      <AlertProvider>
        <MockAlertProvider>
          <LoaderProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </LoaderProvider>
        </MockAlertProvider>
      </AlertProvider>
    );

    // Now check for the alert
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  test("displays Loader when loading is true", () => {
    // Mock LoaderProvider component that sets loading to true on mount
    const MockLoaderProvider = ({ children }: { children: ReactNode }) => {
      const { setLoading } = useLoader(); // Using useLoader within the LoaderProvider context

      useEffect(() => {
        setLoading(true); // Set loading to true
      }, [setLoading]);

      return <div>{children}</div>;
    };

    render(
      <AlertProvider>
        <LoaderProvider>
          <MockLoaderProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </MockLoaderProvider>
        </LoaderProvider>
      </AlertProvider>
    );

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });
});
