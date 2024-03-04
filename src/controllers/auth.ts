import { Request, Response } from "express";
import User from "../models/User.model";
import * as bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthController {
  /**
   *  Create a new user
   * @param req request object
   * @param res response object
   * return null if successful and error message if fails
   */
  static createUser = async (req: Request, res: Response) => {
    try {
      let userObject = req.body;

      const hashPassword = await bcryptjs.hash(userObject.password, 10);
      userObject = { ...userObject, password: hashPassword };
      const user = await User.create(userObject);
      res.json({
        message: "Account created successfully!",
        success: true,
      });
    } catch (error: any) {
      console.log(error.message);
      res.status(500).send(`Server error: ${error.message}`);
    }
  };

  /**
   * Login function for user
   * @param req request object containing email and password
   * @param res response object
   * @returns error in case of mismatch or user object if successful
   */
  static login = async (req: Request, res: Response) => {
    const JWT_SECRET = process.env.JWT_SECRET!;

    console.log("jwt secret:", JWT_SECRET);
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email: email });

      if (!user) {
        return res.status(404).send("Account not found!");
      }

      // Check if password is corrent
      const passwordCheck = await bcryptjs.compare(password, user.password);

      if (!passwordCheck) {
        return res
          .status(403)
          .json({ message: "Invalid Credentials!", success: false });
      }

      if (user.status === "disabled") {
        return res
          .status(403)
          .json({ message: "Account has been DISABLED!", success: false });
      }

      // Calculate the expiry time for the token until 11:59PM of the same login day
      const expiryDate = new Date();
      expiryDate.setHours(23, 59, 59, 999);

      // Generate JWT token with user role included in payload
      const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
        expiresIn: Math.floor((expiryDate.getTime() - Date.now()) / 1000),
      });

      res.status(200).json({
        data: { user, token },
        success: true,
      });

      user.update({ ...user, last_login: new Date() });
    } catch (error: any) {
      console.log(error.message);
      res.status(500).send(`Server error: ${error.message}`);
    }
  };

  /**
   * Get Users to get all users in the database
   * @param req Request object
   * @param res response object
   * return the list of users, or an empty list
   */
  static getUsers = async (req: Request, res: Response) => {
    try {
      const users = await User.findAll();
      res.json({
        data: users,
        success: true,
      });
    } catch (error: any) {
      console.log(`Error: ${error}`);
      res.status(500).json({ message: error, success: false });
    }
  };

  /**
   * updateUser, function to update user details
   * @param req Request object
   * @param res Response object
   * @returns returns true if successfully, false otherwise
   */
  static updateUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res
          .status(404)
          .json({ message: "User not found!", success: false });
      }

      user.update(req.body);
      res.status(200).json({ message: "User updated!", success: true });
    } catch (error: any) {
      console.log(`Error Update:, ${error}`);
      res.status(500).json({ message: `Error: ${error}`, success: false });
    }
  };

  /**
   * deleteUser, function to delete a particular user from the database
   * @param req Request object
   * @param res Response object
   * @returns returns true if successfully, false otherwise
   */
  static deleteUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res
          .status(404)
          .json({ message: "User not found!", success: false });
      }

      user.destroy();
      res
        .status(200)
        .json({ message: "User deleted successfully!", success: true });
    } catch (error: any) {
      console.log(`Error: ${error}`);
      res.status(500).json({ message: `Error: ${error}`, success: false });
    }
  };
}
