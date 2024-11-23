import cors from "cors";
import dotenv from "dotenv";
import express, { Application, Request, Response, NextFunction } from "express";

import ApiError from "../entities/ApiError";
import userRoutes from "../routes/userRoutes";
import { HTTP_CODE } from "../common/constant";

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/users", userRoutes);

app.use(
  (error: ApiError, _req: Request, res: Response, _next: NextFunction) => {
    res.status(HTTP_CODE.OK).json({
      code: error.code ?? HTTP_CODE.INTERNAL_SERVER_ERROR,
      status: error.status ?? false,
      message: error.message,
    });
  },
);

const port = 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
