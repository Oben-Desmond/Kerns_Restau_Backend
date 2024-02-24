import express from "express";
import { AuthController } from "../controllers/auth";
import { restrictToRole } from "../services/authMiddleWare.service";

const router = express.Router();

// Create a new user
router.post("/sign-up", AuthController.createUser);

// Login user to the system

router.post("/login", AuthController.login);

// Get all users from the system
router.get("/users", restrictToRole(["admin"]), AuthController.getUsers);

// Update a user information
router.put("/users/:id", restrictToRole(["admin"]), AuthController.updateUser);

router.delete(
  "/users/:id",
  restrictToRole(["admin"]),
  AuthController.deleteUser
);

export default router;
