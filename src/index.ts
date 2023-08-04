import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./configs/db";
import cookieParser from "cookie-parser";
dotenv.config();
const port: number | string = process.env.PORT || 5000;

// Import Routes
import userRoutes from "./routes/userRoutes";
import { errorHandler, notFound } from "./middlewares/errorHandler";

// Create App
const app = express();
app.use([
  express.json(),
  express.urlencoded({ extended: true }),
  cookieParser(),
]);

// Route Assigning
app.use("/api/users", userRoutes);
// Root Route
app.get("/", (req: Request, res: Response) => res.send("Server is Ready!!!"));
// Error Handlers
app.use([notFound, errorHandler]);
// Server Listening
app.listen(port, () => {
  console.log(`Server Is Started On PORT: ${port}`);
  connectDB();
});
