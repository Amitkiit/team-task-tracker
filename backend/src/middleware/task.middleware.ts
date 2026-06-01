import {
  Response,
  NextFunction
} from "express";

import {
  AuthRequest
} from "./auth.middleware";

import Task from "../models/task.model";

export const validateTaskOwnership =
  async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {

    try {

      const task =
        await Task.findById(
          req.params.taskId
        );

      if (!task) {

        return res
          .status(404)
          .json({
            message:
              "Task not found"
          });
      }

      if (
        task.organization.toString()
        !==
        req.user?.organizationId
      ) {

        return res
          .status(403)
          .json({
            message:
              "Access denied"
          });
      }

      next();

    } catch (error) {

      return res
        .status(500)
        .json({
          message:
            "Task validation failed"
        });
    }
  };