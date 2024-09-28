// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CssBaseline, Container } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";

export function App() {
  return (
    <div>
      <CssBaseline />
	  <Container>
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
