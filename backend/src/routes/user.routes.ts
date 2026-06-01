import { Router } from "express";

import {
  authenticate
} from "../middleware/auth.middleware";

import {
  authorize
} from "../middleware/role.middleware";

import {
  createMember,
  getMembers,
  deleteMember
} from "../controllers/user.controller";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  createMember
);

router.get(
  "/",
  authenticate,
  getMembers
);

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  deleteMember
);

export default router;