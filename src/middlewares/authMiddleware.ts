import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User, { UserDocument } from "../models/User";
import { NextFunction, Request, Response } from "express";

interface AuthMiddlewareRequest extends Request {
  user?: UserDocument;
}

const protect = asyncHandler(
  async (req: AuthMiddlewareRequest, res: Response, next: NextFunction) => {
    let token;

    token = req.cookies.jwt;

    if (token) {
      try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as {
          userId: string;
        };
        req.user = await User.findById(decodedToken.userId).select("-password");
        next();
      } catch (error: any) {
        res.status(401);
        throw new Error("Not authorized, invalid token");
      }
    } else {
      res.status(401);
      throw new Error("Not authorized");
    }
  },
);

export { protect };
