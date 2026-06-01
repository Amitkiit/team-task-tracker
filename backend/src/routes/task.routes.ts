import { Router } from "express";

import {
 createTask,
 getTasks,
 assignTask,
 updateTaskStatus
}
from "../controllers/task.controller";
import {
  authenticate
} from "../middleware/auth.middleware";

import {
  authorize
} from "../middleware/role.middleware";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize(
    "ADMIN",
    "MANAGER"
  ),
  createTask
);

router.get(
  "/",
  authenticate,
  getTasks
);

router.put(
 "/:id/assign",
 authenticate,
 authorize(
  "ADMIN",
  "MANAGER"
 ),
 assignTask
);

router.put(
 "/:id/status",
 authenticate,
 updateTaskStatus
);
router.patch(
  "/:id/status",
  authenticate,
  authorize(
    "ADMIN",
    "MANAGER"
  ),
  updateTaskStatus
);

export default router;