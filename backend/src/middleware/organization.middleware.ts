import {
  Response,
  NextFunction
} from "express";

import {
  AuthRequest
} from "./auth.middleware";

import User from "../models/user.model";

export const checkOrganizationOwnership =
  async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {

    try {

      if (!req.user) {
        return res.status(401).json({
          message: "Unauthorized"
        });
      }

      const user =
        await User.findById(
          req.user.userId
        );

      if (!user) {
        return res.status(404).json({
          message: "User not found"
        });
      }

      req.user.organizationId =
        user.organization.toString();

      next();

    } catch (error) {

      return res.status(500).json({
        message:
          "Organization validation failed"
      });
    }
  };