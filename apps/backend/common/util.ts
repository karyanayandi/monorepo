import { Response } from "express";

import { HTTP_CODE } from "./constant";

export const handleResponse = (res: Response, message: string, data?: any) => {
  res.status(HTTP_CODE.OK).json({
    code: HTTP_CODE.OK,
    status: true,
    message: message,
    data: data ?? null,
  });
};
