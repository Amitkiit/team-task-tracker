import { Response } from "express";
import {
  getIO
} from "../socket";
import {
  AuthRequest
} from "../middleware/auth.middleware";

import Task from "../models/task.model";

import {
  getCache,
  setCache,
  deleteCache
} from "../services/cache.service";

export const createTask =
async (
  req: AuthRequest,
  res: Response
) => {

  try {

    const task =
    await Task.create({

      ...req.body,

      organization:
      req.user?.organizationId,

      createdBy:
      req.user?.userId

    });

    await deleteCache(
      `tasks:${req.user?.organizationId}`
    );
    getIO().emit(
  "task-created",
  task
);

    return res
    .status(201)
    .json(task);

  } catch {

    return res
    .status(500)
    .json({
      message:
      "Task creation failed"
    });
  }
};

export const getTasks =
async (
  req: AuthRequest,
  res: Response
) => {

  try {

    const cacheKey =
    `tasks:${req.user?.organizationId}`;

    const cachedTasks =
    await getCache(cacheKey);

    if (cachedTasks) {

      console.log(
        "Serving tasks from Redis"
      );

      return res
      .status(200)
      .json(cachedTasks);
    }

    const tasks =
    await Task.find({

      organization:
      req.user?.organizationId

    })
    .populate(
      "assignedTo",
      "name email"
    );

    await setCache(
      cacheKey,
      tasks,
      60
    );

    getIO().emit(
  "task-assigned",
  tasks
);
    return res
    .status(200)
    .json(tasks);

  } catch {

    return res
    .status(500)
    .json({
      message:
      "Failed to fetch tasks"
    });
  }
};
export const assignTask = async (
  req: AuthRequest,
  res: Response
) => {

  try {

    const { assignedTo } =
      req.body;

    const task =
      await Task.findByIdAndUpdate(
        req.params.id,
        {
          assignedTo
        },
        {
          new: true
        }
      ).populate(
        "assignedTo",
        "name email"
      );

    await deleteCache(
      `tasks:${req.user?.organizationId}`
    );
     getIO().emit(
  "task-assigned",
  task
);
    return res.json(task);

  } catch {

    return res.status(500).json({
      message:
        "Failed to assign task"
    });
  }
};

export const updateTaskStatus = async (
  req: AuthRequest,
  res: Response
) => {

  try {

    const { status } =
      req.body;

    const task =
      await Task.findByIdAndUpdate(
        req.params.id,
        {
          status
        },
        {
          new: true
        }
      );

    await deleteCache(
      `tasks:${req.user?.organizationId}`
    );

 getIO().emit(
  "task-status-updated",
  task
);
    return res.json(task);

  } catch {

    return res.status(500).json({
      message:
        "Failed to update status"
    });
  }
};