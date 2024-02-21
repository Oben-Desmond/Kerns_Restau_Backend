import { Request, Response } from "express";
import User from "../models/User.model";
import * as bcryptjs from "bcryptjs";

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
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email: email });

      if (!user) {
        return res.status(404).send("Account not found!");
      }

      // Check if password is corrent
      const passwordCheck = await bcryptjs.compare(password, user.password);

      if (!passwordCheck) {
        return res.status(403).send("Invalid Credentials!");
      }

      if (user.status === "disabled") {
        return res.status(403).send("Account has been DISABLED!");
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
