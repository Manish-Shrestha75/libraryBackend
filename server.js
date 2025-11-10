import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import bookRoutes from "./routes/bookRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Mount routes
app.use("/books", bookRoutes);

// Start server
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
