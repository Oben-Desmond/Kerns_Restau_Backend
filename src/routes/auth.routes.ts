import express from "express";
import { AuthController } from "../controllers/auth";

const router = express.Router();

// Create a new user
router.post("/sign-up", AuthController.createUser);

// Login user to the system

router.post("/login", AuthController.login);

export default router;
