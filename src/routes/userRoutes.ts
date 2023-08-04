import { authUser } from "../controllers/userController";
import express from "express";
const router = express.Router();

router.post("/auth", authUser);

export default router;
