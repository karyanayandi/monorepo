import { Router } from "express";

import authMiddleware from "../middleware/authMiddleware";
import { getUserData, putUserData } from "../controller/api";

const router = Router();

router.get("/asuw/:userId", getUserData);
router.get("/fetch-user-data/:userId", authMiddleware, getUserData);
router.put("/update-user-data/:userId", authMiddleware, putUserData);

export default router;
