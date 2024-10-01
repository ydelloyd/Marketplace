import {
  CssBaseline,
  Container,
  Alert,
  Snackbar,
  Backdrop,
  CircularProgress
} from "@mui/material";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/homePage";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import JobPage from "./components/jobPage";
import { useAlert } from "./contexts/alertContext";
import { useLoader } from "./contexts/loaderContext";

export function App() {
  const { open, severity, message, setOpen } = useAlert();
  const { loading } = useLoader();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => (window.location.href = "/")}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            The Best Marketplace
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth={false}>

          <Routes>
            <Route element={<HomePage />} path="/" />
            <Route path="/job/:id" element={<JobPage />} />
          </Routes>

      </Container>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 100 }}
        open={loading}
      >
        <CircularProgress data-testid="spinner" color="inherit" />
      </Backdrop>
    </div>
  );
}

export default App;
