import { Router } from "express";

import {
  authenticate
} from "../middleware/auth.middleware";

import {
  authorize
} from "../middleware/role.middleware";

import {
  getOrganization,
  updateOrganization,
  getOrganizationMembers,
  removeMember
} from "../controllers/organization.controller";

const router = Router();

router.get(
  "/",
  authenticate,
  getOrganization
);

router.put(
  "/",
  authenticate,
  authorize("ADMIN"),
  updateOrganization
);

router.get(
  "/members",
  authenticate,
  authorize(
    "ADMIN",
    "MANAGER"
  ),
  getOrganizationMembers
);

router.delete(
  "/members/:userId",
  authenticate,
  authorize("ADMIN"),
  removeMember
);

export default router;