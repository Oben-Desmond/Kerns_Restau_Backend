import { Request, Response } from "express";
import User from "../models/User.model";

export class AuthController {
  /**
   *  Create a new user
   * @param req request object
   * @param res response object
   * return null if successful and error message if fails
   */
  static createUser = async (req: Request, res: Response) => {
    try {
      const user = await User.create(req.body);
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
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });

      if (!user) {
        return res.status(404).send("Account not found!");
      }

      if (user.password !== password) {
        return res.status(403).send("Invalid Credentials!");
      }

      res.status(200).json({
        data: user,
        success: true,
      });
    } catch (error: any) {
      console.log(error.message);
      res.status(500).send(`Server error: ${error.message}`);
    }
  };
}
