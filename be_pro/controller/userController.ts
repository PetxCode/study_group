import { Request, Response } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import userModel from "../model/userModel";
import { sendEmail } from "../utils/email";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = crypto.randomBytes(3).toString("hex");
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      email,
      password: hash,
      verifiedToken: token,
    });

    sendEmail(user);

    return res.status(201).json({
      message: "user created",
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error creating user",
    });
  }
};

export const readUser = async (req: Request, res: Response) => {
  try {
    const user = await userModel.find();

    return res.status(200).json({
      message: "user read",
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error reading user",
    });
  }
};

export const readOneUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const user = await userModel.findById(userID);

    return res.status(200).json({
      message: "user read",
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error reading user",
    });
  }
};

export const signinUser = async (req: any, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (user) {
      const readPassword = await bcrypt.compare(password, user.password);

      if (readPassword) {
        if (user.verifiedToken === "" && user.verify) {
          const token = jwt.sign({ id: user._id }, "thh", { expiresIn: "2d" });

          req.session.isAuth = true;
          req.session.data = user._id;

          return res.status(201).json({
            message: "Welcome back",
            data: token,
          });
        } else {
          return res.status(404).json({
            message: "Your account hasn't been verified",
          });
        }
      } else {
        return res.status(404).json({
          message: "password is incorrect",
        });
      }
    } else {
      return res.status(404).json({
        message: "no user found",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error reading user",
    });
  }
};

export const verifyUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { verifiedToken } = req.body;
    const user: any = await userModel.findById(userID);

    if (user.verifiedToken === verifiedToken) {
      await userModel.findByIdAndUpdate(
        userID,
        {
          verifiedToken: "",
          verify: true,
        },
        { new: true }
      );

      return res.status(200).json({
        message: "user verify",
      });
    } else {
      return res.status(404).json({
        message: "user not found",
        data: user,
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error reading user",
    });
  }
};

export const readUserCookie = async (req: Request, res: Response) => {
  try {
    const user = req.session;

    return res.status(200).json({
      message: "user read",
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error reading user",
    });
  }
};

export const logOutUser = async (req: any, res: Response) => {
  try {
    const user = req.session.destroy();

    return res.status(200).json({
      message: "user has logged out",
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error reading user",
    });
  }
};
