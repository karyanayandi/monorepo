import { NextFunction, Request, Response } from "express";

import { handleResponse } from "../common/util";
import { fetchUser, updateUser } from "../repository/userCollection";

const getUserData = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;

  try {
    const userData = await fetchUser(userId);
    handleResponse(res, "User successfully fetched!", userData);
  } catch (error) {
    next(error);
  }
};

const putUserData = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;

  try {
    const userData = await updateUser(userId, req.body);

    handleResponse(res, "User successfully updted!", userData);
  } catch (error) {
    next(error);
  }
};

export { getUserData, putUserData };
