import jwt from "jsonwebtoken";

import {
  Request,
  Response,
  NextFunction
} from "express";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: string;
    organizationId?: string;
  };
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {

  const header =
    req.headers.authorization;
    console.log("AUTH HEADER:", header);

  if (!header) {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }

  const token =
    header.split(" ")[1];
    console.log("TOKEN:", token);

  try {

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_ACCESS_SECRET as string
      ) as {
        userId: string;
        role: string;
        organizationId?: string;
      };

       console.log("DECODED:", decoded);

    req.user = decoded;

    next();

  } catch (error) {
  console.log("JWT ERROR:", error);

  return res.status(401).json({
    message: "Invalid token"
  });
}
}