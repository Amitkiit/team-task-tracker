import { Request, Response } from "express";
import User from "../models/user.model";
import { hashPassword } from "../services/auth.service";
import { AuthRequest } from "../middleware/auth.middleware";
import {
 getIO
}
from "../socket";

export const createMember = async (
  req: AuthRequest,
  res: Response
) => {
  try {

    const {
      name,
      email,
      password,
      role
    } = req.body;

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword =
      await hashPassword(password);

    const user =
      await User.create({
        name,
        email,
        password: hashedPassword,
        role,
        organization:
          req.user?.organizationId
      });
      getIO().emit(
 "member-created",
 user
);

    return res.status(201).json(user);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Failed to create member"
    });
  }
};

export const getMembers = async (
  req: AuthRequest,
  res: Response
) => {
  try {

    const users =
      await User.find({
        organization:
          req.user?.organizationId
      }).select("-password");

    return res.status(200).json(users);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch members"
    });
  }
};

export const deleteMember = async (
  req: Request,
  res: Response
) => {
  try {

    await User.findByIdAndDelete(
      req.params.id
    );

    getIO().emit(
 "member-deleted",
 req.params.id
);
    return res.status(200).json({
      message: "Member deleted"
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Delete failed"
    });
  }
};