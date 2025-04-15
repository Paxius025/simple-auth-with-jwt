import express from "express";
import { config } from "dotenv";
import cors from "cors";
import healthCheck from "./routes/dbHealth.js";

config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/db-health",healthCheck);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
