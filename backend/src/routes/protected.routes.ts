import { Router } from "express";

import {
  authenticate
} from "../middleware/auth.middleware";

import {
  authorize
} from "../middleware/role.middleware";

import {
  checkOrganizationOwnership
} from "../middleware/organization.middleware";

const router = Router();

router.get(
  "/admin",
  authenticate,
  checkOrganizationOwnership,
  authorize("ADMIN"),
  (req, res) => {
    res.json({
      message:
        "Admin Access Granted"
    });
  }
);

router.get(
  "/manager",
  authenticate,
  checkOrganizationOwnership,
  authorize(
    "ADMIN",
    "MANAGER"
  ),
  (req, res) => {
    res.json({
      message:
        "Manager Access Granted"
    });
  }
);

router.get(
  "/member",
  authenticate,
  checkOrganizationOwnership,
  authorize(
    "ADMIN",
    "MANAGER",
    "MEMBER"
  ),
  (req, res) => {
    res.json({
      message:
        "Member Access Granted"
    });
  }
);

export default router;