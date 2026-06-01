import { Request, Response } from "express";
import User, { IUser, UserRole } from "../models/user.model";
import Organization from "../models/organization.model";

import { hashPassword, comparePassword } from "../services/auth.service";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../services/token.service";

export const register = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { name, email, password, organizationName } = req.body;

    const existingUser: IUser | null = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const organization = await Organization.create({
      name: organizationName,
    });

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: UserRole.ADMIN,
      organization: organization._id,
    });

    const accessToken = generateAccessToken(
      user._id.toString(),
      user.role,
      user.organization.toString(),
    );

    const refreshToken = generateRefreshToken(user._id.toString());

    user.refreshToken = refreshToken;

    await user.save();

    return res.status(201).json({
      accessToken,
      refreshToken,
      user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;
    console.log("Login Email:", email);
    const user: IUser | null = await User.findOne({ email });
    console.log("User Found:", user);
    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await comparePassword(password, user.password);
    console.log("Password Match:", isMatch);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const accessToken = generateAccessToken(
      user._id.toString(),
      user.role,
      user.organization.toString(),
    );

    const refreshToken = generateRefreshToken(user._id.toString());

    user.refreshToken = refreshToken;

    await user.save();

    return res.status(200).json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const refreshAccessToken = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const token = req.body.refreshToken;

    if (!token) {
      return res.status(401).json({
        message: "Refresh token required",
      });
    }

    const user: IUser | null = await User.findOne({
      refreshToken: token,
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid refresh token",
      });
    }
    const accessToken = generateAccessToken(
      user._id.toString(),
      user.role,
      user.organization.toString(),
    );
    return res.status(200).json({
      accessToken,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
export const getAllUsers = async (
  req: Request,
  res: Response
) => {
  const users = await User.find();

  return res.json(users);
};