import { Request, Response, NextFunction } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";

export const restrictToRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const JWT_SECRET = process.env.JWT_SECRET!;
    const token = req.headers.authorization?.replace("Bearer ", "").trim(); // Extract the token from the Authorization header

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const decodedToken = jwt.verify(token, JWT_SECRET) as {
        role: string;
        exp: number;
      }; // Replace with your actual secret key
      const userRole = decodedToken.role; // Assuming the role is stored in the token payload

      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: "Access forbidden" });
      }

      // Check if the token is expired
      const currentTimestamp = Math.floor(Date.now() / 1000);
      if (decodedToken.exp < currentTimestamp) {
        return res.status(401).json({ message: "Token expired" });
      }

      next();
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return res.status(401).json({ message: "Token expired" });
      } else {
        return res.status(403).json({ message: "Invalid token" });
      }
    }
  };
};
