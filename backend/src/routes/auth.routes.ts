import { Router } from "express";

import {
  register,
  login,
  refreshAccessToken,
  getAllUsers
} from "../controllers/auth.controller";

const router = Router();

router.post(
  "/register",
  register
);

router.post(
  "/login",
  login
);

router.post(
  "/refresh",
  refreshAccessToken
);
router.get(
  "/users",
  getAllUsers
);
export default router;