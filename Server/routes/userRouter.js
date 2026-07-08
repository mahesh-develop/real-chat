import express from "express";
import {
    login,
    signup,
    checkAuth,
    updateProfile
} from "../controller/userController.js";

import { protectRoute } from "../middleware/auth.js";

const userRouter = express.Router();

// Signup
userRouter.post("/signup", signup);

// Login
userRouter.post("/login", login);

// Check Authentication
userRouter.get("/check", protectRoute, checkAuth);

// Update Profile
userRouter.put("/update-profile", protectRoute, updateProfile);

export default userRouter;