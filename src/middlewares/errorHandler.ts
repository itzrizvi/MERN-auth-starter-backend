import { Request, Response, NextFunction } from "express";

interface MongooseError extends Error {
  kind?: string;
}

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error: MongooseError = new Error(`Not Found - ${req.originalUrl}`);
  res.sendStatus(404);
  next(error);
};

const errorHandler = (
  error: MongooseError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = error.message;
  // For Mongo DB Errors
  if (error.name === "CastError" && error.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource Not Found";
  }
  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? null : error.stack,
  });
};

export { notFound, errorHandler };
