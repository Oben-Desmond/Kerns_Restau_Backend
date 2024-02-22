// authMiddleware.ts

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export const restrictToRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.replace("Bearer ", ""); // Extract the token from the Authorization header

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const decodedToken = jwt.verify(token, JWT_SECRET); // Replace with your actual secret key
      const userRole = decodedToken?.role; // Assuming the role is stored in the token payload

      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: "Access forbidden" });
      }

      next();
    } catch (error) {
      return res.status(403).json({ message: "Invalid token" });
    }
  };
};
