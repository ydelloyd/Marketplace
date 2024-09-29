// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CssBaseline, Container } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export function App() {
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
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              The Best Marketplace
            </Typography>
          </Toolbar>
        </AppBar>
      <Container maxWidth={false}>
        <BrowserRouter>
          <Routes>
            <Route element={<HomePage />} path="/" />
          </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
