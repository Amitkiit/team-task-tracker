import { Request, Response } from "express";
import Organization from "../models/organization.model";
import User from "../models/user.model";
import { AuthRequest } from "../middleware/auth.middleware";
import {
 getCache,
 setCache,
 deleteCache
}
from
"../services/cache.service";

export const getOrganization =
async (
  req: AuthRequest,
  res: Response
) => {

  try {

    const cacheKey =
      `organization:${req.user?.organizationId}`;

    const cachedOrg =
      await getCache(cacheKey);

    if (cachedOrg) {

      console.log(
        "Serving organization from Redis"
      );

      return res
        .status(200)
        .json(cachedOrg);
    }

    const organization =
      await Organization.findById(
        req.user?.organizationId
      );

    if (!organization) {

      return res
        .status(404)
        .json({
          message:
            "Organization not found"
        });
    }

    await setCache(
      cacheKey,
      organization,
      60
    );

    return res
      .status(200)
      .json(organization);

  } catch {

    return res
      .status(500)
      .json({
        message:
          "Internal Server Error"
      });
  }
};
export const updateOrganization =
async (
  req: AuthRequest,
  res: Response
) => {

  try {

    const { name } = req.body;

    const organization =
      await Organization.findByIdAndUpdate(
        req.user?.organizationId,
        { name },
        { new: true }
      );

    return res.status(200).json(
      organization
    );

  } catch (error) {

    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
};

export const getOrganizationMembers =
async (
  req: AuthRequest,
  res: Response
) => {

  try {

    const cacheKey =
      `members:${req.user?.organizationId}`;

    const cachedUsers =
      await getCache(cacheKey);

    if (cachedUsers) {

      console.log(
        "Serving members from Redis"
      );

      return res
        .status(200)
        .json(cachedUsers);
    }

    const users =
      await User.find({
        organization:
          req.user?.organizationId
      })
      .select(
        "-password -refreshToken"
      );

    await setCache(
      cacheKey,
      users,
      60
    );

    return res
      .status(200)
      .json(users);

  } catch (error) {

    return res
      .status(500)
      .json({
        message:
          "Internal Server Error"
      });
  }
};

export const removeMember =
async (
  req: Request,
  res: Response
) => {

  try {

    const { userId } =
      req.params;
 const user =
await User.findById(userId);
await User.findByIdAndDelete(
  userId
);
if (user) {

  await deleteCache(
    `members:${user.organization}`
  );
}

    return res.status(200).json({
      message:
        "Member removed successfully"
    });

  } catch {

    return res.status(500).json({
      message:
        "Internal Server Error"
    });
  }
};