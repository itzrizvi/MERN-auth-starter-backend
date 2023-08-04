import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
const port: number | string = process.env.PORT || 5000;

// Import Routes
import userRoutes from "./routes/userRoutes";
// Create App
const app = express();

// Route Assigning
app.use("/api/users", userRoutes);
// Root Route
app.get("/", (req: Request, res: Response) => res.send("Server is Ready!!!"));
// Server Listening
app.listen(port, () => {
  console.log(`Server Is Started On PORT: ${port}`);
});
