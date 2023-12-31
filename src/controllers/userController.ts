import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User, { UserDocument } from "../models/User";
import {
  AuthUserRequestBody,
  AuthUserResponse,
  ProtectedRouteRequest,
  RegisterRequestBody,
  RegisterUserResponse,
} from "../utils/types";
import generateToken from "../utils/generateToken";

// @desc    Auth user/set Token
// route    POST /api/users/auth
// @access  Public
const authUser = asyncHandler(
  async (
    req: Request<{}, {}, AuthUserRequestBody>,
    res: Response<AuthUserResponse>,
  ) => {
    const { email, password } = req.body;
    const user: UserDocument | null = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  },
);

// @desc    Register a new user
// route    POST /api/users
// @access  Public
const registerUser = asyncHandler(
  async (
    req: Request<{}, {}, RegisterRequestBody>,
    res: Response<RegisterUserResponse>,
  ) => {
    const { name, email, password } = req.body;
    const userExists: UserDocument | null = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user: UserDocument = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  },
);

// @desc    Logout user
// route    POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logged out" });
});

// @desc    Get user profile
// route    GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(
  async (req: ProtectedRouteRequest, res: Response) => {
    const user = {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    };
    res.status(200).json(user);
  },
);

// @desc    Update user profile
// route    PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(
  async (req: ProtectedRouteRequest, res: Response) => {
    const user: UserDocument | null = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      if (req.body.password) {
        user.password = req.body.password;
      }
      const updatedUser = await user.save();
      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  },
);

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
