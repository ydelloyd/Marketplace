import express, { Request, Response } from "express";
import userRoutes from "./routes/userRoutes";
import jobRoutes from "./routes/jobRoutes";

const cors = require('cors');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);
app.use("/api/jobs", jobRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
