import { Request, Response, NextFunction } from "express";

import ApiError from "../entities/ApiError";
import admin from "../config/firebaseConfig";

const authMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const authToken = req.headers.authorization?.split("Bearer ")[1];

  console.log("authToken", authToken);

  try {
    if (!authToken) {
      throw new ApiError(401, "Authorization token not found");
    }

    await admin.auth().verifyIdToken(authToken);

    next();
  } catch (error) {
    next(new ApiError(401, "Unauthorized"));
  }
};

export default authMiddleware;
