import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", message: "Backend working!" });
});

app.listen(5055, "127.0.0.1", () => {
  console.log("Express ready on port 5055");
});