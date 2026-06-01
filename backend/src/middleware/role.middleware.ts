import {
  Response,
  NextFunction
} from "express";

import {
  AuthRequest
} from "./auth.middleware";

export const authorize =
  (...roles: string[]) =>
  (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {

     console.log(
      "USER:",
      req.user
    );

    console.log(
      "ALLOWED ROLES:",
      roles
    );

    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }

    if (
      !roles.includes(req.user.role)
      
    ) {
         console.log(
        "ROLE FAILED:",
        req.user.role
      );
      return res.status(403).json({
        message: "Forbidden"
      });
    }
     console.log(
      "ROLE PASSED"
    );
    next();
  };