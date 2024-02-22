import express from "express";
import { UserLogsController } from "../controllers/userLogs";
import { restrictToRole } from "../services/authMiddleWare.service";

const router = express.Router();

// Get all users logs route
router.get("/", restrictToRole(["admin"]), UserLogsController.getAllUserLogs);

// Get all single user logs route
router.get(
  "/:id",
  restrictToRole(["admin"]),
  UserLogsController.getAllSingleUserLogs
);

export default router;
