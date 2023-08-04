import { Request, Response, NextFunction } from "express";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error: Error = new Error(`Not Found - ${req.originalUrl}`);
  res.sendStatus(404);
  next(error);
};
