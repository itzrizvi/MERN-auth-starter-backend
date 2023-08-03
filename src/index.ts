import express, { Request, Response } from "express";
const port: number = 5000;
// Create App
const app = express();
// Root Route
app.get("/", (req: Request, res: Response) => res.send("Server is Ready!!!"));
// Server Listening
app.listen(port, () => {
  console.log(`Server Is Started On PORT: ${port}`);
});
