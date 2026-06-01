import jwt from "jsonwebtoken";

const JWT_ACCESS_SECRET =
  process.env.JWT_ACCESS_SECRET ||
  "test-access-secret";

const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET ||
  "test-refresh-secret";

export const generateAccessToken = (
  userId: string,
  role: string,
  organizationId?: string
) => {

  return jwt.sign(
    {
      userId,
      role,
      organizationId
    },
    JWT_ACCESS_SECRET,
    {
      expiresIn: "7d"
    }
  );
};

export const generateRefreshToken = (
  userId: string
) => {

  return jwt.sign(
    {
      userId
    },
    JWT_REFRESH_SECRET,
    {
      expiresIn: "7d"
    }
  );
};

export const verifyAccessToken = (
  token: string
) => {

  return jwt.verify(
    token,
    JWT_ACCESS_SECRET
  );
};

export const verifyRefreshToken = (
  token: string
) => {

  return jwt.verify(
    token,
    JWT_REFRESH_SECRET
  );
};