import { createContext, useState, useContext, ReactNode } from "react";
interface AlertContextType {
  severity: "success" | "info" | "warning" | "error";
  message: string;
  open: boolean;
  setSeverity: (severity: "success" | "info" | "warning" | "error") => void;
  setMessage: (message: string) => void;
  setOpen: (open: boolean) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [severity, setSeverity] = useState<"success" | "info" | "warning" | "error">("success");
  const [message, setMessage] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  return (
    <AlertContext.Provider value={{ severity, message, open, setSeverity, setMessage, setOpen }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
